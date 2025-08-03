from django.urls import path

from business.views import BusinessDetailAPIView, BusinessUpdateView, BusinessListCreateAPIView, CategoryListAPIView,  FavoriteToggleView

urlpatterns = [
  path('', BusinessListCreateAPIView.as_view(), name='business-list'),
    path('<uuid:id>', BusinessDetailAPIView.as_view(), name='business-detail'),

    path('<uuid:id>', BusinessUpdateView.as_view(), name='business-update'),

    path("categories", CategoryListAPIView.as_view(), name="category-list"),

  path('<uuid:id>/favorite', FavoriteToggleView.as_view(), name='favorite-toggle'),

]
