from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name="order-add"),
    path('<str:pk>/', views.getOrderById, name="getOrderById"),
    path('<str:pk>/pay/', views.updateOrderToPaid, name="updateOrderToPaid"),
]