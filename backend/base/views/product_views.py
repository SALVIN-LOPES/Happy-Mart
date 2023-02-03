from django.shortcuts import render
from django.http import JsonResponse
# from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User


from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from base.models import Product, Review, Order, OrderItem, ShippingAddress

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# decode the password
from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.filter(_id=pk).first()
    print("product = ",product)
    if product is not None:
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    return Response({"msg" : "haven't got the product searching for!!"})



















