from django.urls import path
from base.views import user_views as views


urlpatterns = [
    # path('', views.getRoutes, name="GetRoutes"),
    path('', views.getUsers, name="getUsers"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='user-register'),
    path('profile/', views.getUserProfile, name="getUserProfile"),

    path('<str:pk>/', views.getUserById, name="getUserById"),
    path('update/<str:pk>/', views.updateUser, name="updateUser"),

    path('profile/update/', views.updateUserProfile, name="updateUserProfile"),
    path('delete/<str:pk>/', views.deleteUser, name="deleteUser"),

]