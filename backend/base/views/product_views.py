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
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
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
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    if product is not None:
        product.save()
        return Response({"detail" : 'product updated successfully!'})
    return Response({"detail" : "There is no such product saved in database!"})

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.filter(_id=product_id).first()

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image uploaded successfully!')















