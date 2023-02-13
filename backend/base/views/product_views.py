from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser

from base.models import Product


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

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    data = request.data 
    product = Product.objects.create(
        user = user,
        name = data['name'],
        price = data['price'],
        brand = data['brand'],
        countInStock = data['countInStock'],
        category = data['category'],
        description = data['description'],
    )
    if product is not None:
        serializer = ProductSerializer(product, many=False)
        product.save()
        return Response(serializer.data)
    return Response({"detail" : "There is no such product saved in database!"})


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.filter(_id=pk).first()
    if product is not None:
        product.delete()
        return Response({"detail" : 'product deleted successfully!'})
    return Response({"detail" : "There is no such product saved in database!"})

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    # pk = product id
    product = Product.objects.filter(_id=pk).first()
    data = request.data
    product.name = data['name']
    product.price = data['price']
    product.category = data['category']
    product.brand = data['brand']

    if product is not None:
        product.delete()
        return Response({"detail" : 'product deleted successfully!'})
    return Response({"detail" : "There is no such product saved in database!"})















