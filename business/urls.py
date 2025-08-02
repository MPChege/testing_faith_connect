from django.urls import path

from business.views import BusinessDetailAPIView, BusinessUpdateView, BusinessListCreateAPIView

urlpatterns = [
  path('', BusinessListCreateAPIView.as_view(), name='business-list'),
    path('<uuid:id>', BusinessDetailAPIView.as_view(), name='business-detail'),

    path('<uuid:id>', BusinessUpdateView.as_view(), name='business-update'),
]
