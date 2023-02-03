
from django.urls import path
from . import views


urlpatterns = [
    # path('', views.getRoutes, name="GetRoutes"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='user-register'),

    path('products/', views.getProducts, name="getProducts"),
    path('products/<str:pk>/', views.getProduct, name="getProduct"),
    path('users/profile/', views.getUserProfile, name="getUserProfile"),
    path('users/', views.getUsers, name="getUsers"),



]
# 20022001@Sc