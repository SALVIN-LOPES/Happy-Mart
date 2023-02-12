from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name="order-add"),
    path('myorders/', views.getOrders, name="get-all-myorders"),
    path('<str:pk>/', views.getOrderById, name="getOrderById"),
    path('<str:pk>/pay/', views.updateOrderToPaid, name="updateOrderToPaid"),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name="updateOrderToDelivered"),
]