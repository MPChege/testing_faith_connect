import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { apiService } from "@/services/api";

interface LikeButtonProps {
  itemId: string;
  itemType: 'product' | 'service' | 'business';
  itemName: string;
  businessName: string;
  businessId: string;
  description?: string;
  price?: string;
  priceCurrency?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isActive?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LikeButton = ({
  itemId,
  itemType,
  itemName,
  businessName,
  businessId,
  description,
  price,
  priceCurrency,
  rating,
  reviewCount,
  inStock,
  isActive,
  className = "",
  size = "md"
}: LikeButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkIfLiked();
    }
  }, [isAuthenticated, user, itemId, businessId]);

  const checkIfLiked = async () => {
    try {
      // Always check API first for the most up-to-date status
      try {
        const apiFavorites = await apiService.getUserFavoritesVSet();
        const businessIdToCheck = businessId;
        
        // Check if this business is in the API favorites
        const isFavorited = apiFavorites.results?.some((fav: any) => {
          const favBusinessId = fav.business || fav.business_id || fav.id;
          return favBusinessId === businessIdToCheck || String(favBusinessId) === String(businessIdToCheck);
        });
        
        setIsLiked(!!isFavorited);
        
        // Also update localStorage to keep it in sync
        if (isFavorited) {
          const storedFavorites = localStorage.getItem(`favorites_${user?.id}`) || '{"products": [], "services": [], "businesses": []}';
          const favorites = JSON.parse(storedFavorites);
          
          // Ensure business is in businesses array
          const businessExists = favorites.businesses?.some((b: any) => 
            b.id === businessIdToCheck || b.business_id === businessIdToCheck
          );
          
          if (!businessExists) {
            if (!favorites.businesses) favorites.businesses = [];
            favorites.businesses.push({
              id: businessIdToCheck,
              type: 'business',
              name: businessName,
              business_name: businessName,
              business_id: businessIdToCheck,
              created_at: new Date().toISOString(),
            });
            localStorage.setItem(`favorites_${user?.id}`, JSON.stringify(favorites));
          }
        }
        
        return;
      } catch (apiError) {
        console.log("API check failed, falling back to localStorage:", apiError);
      }

      // Fallback to localStorage
      const storedFavorites = localStorage.getItem(`favorites_${user?.id}`);
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites);
        // Check in all arrays to handle any data inconsistencies
        const allItems = [
          ...(favorites.products || []), 
          ...(favorites.services || []), 
          ...(favorites.businesses || [])
        ];
        // For products/services, check if the business is favorited
        if (itemType === 'product' || itemType === 'service') {
          const likedItem = allItems.find((item: any) => 
            (item.business_id === businessId || item.businessId === businessId) && 
            (item.type === 'business' || item.id === businessId)
          );
          setIsLiked(!!likedItem);
        } else {
          const likedItem = allItems.find((item: any) => 
            item.id === itemId || item.id === businessId || 
            item.business_id === businessId || item.businessId === businessId
          );
          setIsLiked(!!likedItem);
        }
      }
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save favorites.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Always use businessId for API calls (products/services favorite the business)
      const targetBusinessId = businessId;

      if (isLiked) {
        // Unfavorite: Call both endpoints to unfavorite and unlike
        try {
          await apiService.toggleBusinessFavorite(targetBusinessId);
          await apiService.toggleBusinessLikeVSet(targetBusinessId);
        } catch (apiError) {
          console.error("API unfavorite failed:", apiError);
          // Continue with localStorage update even if API fails
        }

        // Update localStorage
        const storedFavorites = localStorage.getItem(`favorites_${user?.id}`) || '{"products": [], "services": [], "businesses": []}';
        const favorites = JSON.parse(storedFavorites);
        
        // Remove from all arrays where business matches
        if (favorites.products) {
          favorites.products = favorites.products.filter((item: any) => 
            item.business_id !== targetBusinessId && item.businessId !== targetBusinessId
          );
        }
        if (favorites.services) {
          favorites.services = favorites.services.filter((item: any) => 
            item.business_id !== targetBusinessId && item.businessId !== targetBusinessId
          );
        }
        if (favorites.businesses) {
          favorites.businesses = favorites.businesses.filter((item: any) => 
            item.id !== targetBusinessId && item.business_id !== targetBusinessId
          );
        }
        
        localStorage.setItem(`favorites_${user?.id}`, JSON.stringify(favorites));
        
        toast({
          title: "Removed from favorites",
          description: `${itemName} has been removed from your favorites.`,
        });
        setIsLiked(false);
      } else {
        // Favorite: Call both endpoints to favorite and like
        try {
          await apiService.toggleBusinessFavorite(targetBusinessId);
          await apiService.toggleBusinessLikeVSet(targetBusinessId);
        } catch (apiError) {
          console.error("API favorite failed:", apiError);
          toast({
            title: "Warning",
            description: "Failed to sync with server. Saved locally.",
            variant: "default",
          });
        }

        // Update localStorage
        const storedFavorites = localStorage.getItem(`favorites_${user?.id}`) || '{"products": [], "services": [], "businesses": []}';
        const favorites = JSON.parse(storedFavorites);
        
        const itemData = {
          id: itemType === 'business' ? itemId : `${itemType}-${itemId}`,
          type: itemType,
          name: itemName,
          description,
          price,
          price_currency: priceCurrency,
          business_name: businessName,
          business_id: targetBusinessId,
          rating,
          review_count: reviewCount,
          in_stock: inStock,
          is_active: isActive,
          created_at: new Date().toISOString(),
        };

        // Remove existing entries for this business/item
        if (favorites.products) {
          favorites.products = favorites.products.filter((item: any) => 
            item.business_id !== targetBusinessId && item.businessId !== targetBusinessId && item.id !== itemId
          );
        }
        if (favorites.services) {
          favorites.services = favorites.services.filter((item: any) => 
            item.business_id !== targetBusinessId && item.businessId !== targetBusinessId && item.id !== itemId
          );
        }
        if (favorites.businesses) {
          favorites.businesses = favorites.businesses.filter((item: any) => 
            item.id !== targetBusinessId && item.business_id !== targetBusinessId
          );
        }
        
        // Add to correct array
        const targetArray = itemType === 'product' ? 'products' : itemType === 'service' ? 'services' : 'businesses';
        favorites[targetArray].push(itemData);
        
        localStorage.setItem(`favorites_${user?.id}`, JSON.stringify(favorites));
        
        toast({
          title: "Added to favorites",
          description: `${itemName} has been added to your favorites!`,
        });
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-10 w-10';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  return (
    <Button
      onClick={handleLike}
      disabled={isLoading}
      variant="ghost"
      size="sm"
      className={`group relative overflow-hidden transition-all duration-300 hover:scale-110 active:scale-95 ${
        isLiked 
          ? 'text-red-500 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 shadow-lg shadow-red-500/20' 
          : 'text-gray-500 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:shadow-md'
      } ${getButtonSize()} p-0 rounded-full border-2 ${
        isLiked 
          ? 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50' 
          : 'border-gray-200 hover:border-red-300'
      } ${className}`}
      title={isLiked ? `Remove ${itemName} from favorites` : `Add ${itemName} to favorites`}
    >
      <Heart 
        className={`${getIconSize()} transition-all duration-300 ${
          isLiked 
            ? 'fill-current text-red-500 drop-shadow-sm' 
            : 'group-hover:scale-110 group-hover:drop-shadow-sm'
        }`} 
      />
      {isLiked && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-20 animate-pulse rounded-full"></div>
      )}
    </Button>
  );
};

export default LikeButton;
