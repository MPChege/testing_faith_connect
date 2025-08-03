from django.urls import path

from business.views import UserFavoritesListView
from user_auth.user_management.views import UserProfileView, UserProfileUpdateView, UploadAvatarView

urlpatterns = [
    path('profile', UserProfileView.as_view(), name='user-profile'),
    path('profile-update', UserProfileUpdateView.as_view(), name='user-profile-update'),

    path('upload-avatar', UploadAvatarView.as_view(),name='upload-avatar'),

    path('favorites', UserFavoritesListView.as_view(), name='user-favorites'),

]
