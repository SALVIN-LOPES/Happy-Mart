from django.shortcuts import render
from django.http import JsonResponse
# from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response

from base.serializers import ProductSerializer

from base.models import Product, Review, Order, OrderItem, ShippingAddress

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/products/',
        'api/products/create/',

        'api/products/upload/',

        'api/products/<id>/reviews/',

        'api/products/top/',
        'api/products/<id>/',

        'api/products/delete/<id>/',
        'api/products/update/<id>/',
    ]

    return Response(routes)

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



    