from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated



#search functionality
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.core.paginator import Paginator

from base.models import Product, Review
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    # get the query fron homaPage
    query = request.query_params.get('keyword')
    if query == None:
        query = ""
    print('keyword = ',query)
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    
    paginator = Paginator(products,5)

    try:
        # if we pass the page
        products = paginator.page(page)
        # if we didnt pass the page
    except PageNotAnInteger:
        products = paginator.page(1)
        # if the page limit is exceeded
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None: 
        page = 1
    
    page = int(page)
    print("page: " + str(page))

    serializer = ProductSerializer(products, many=True)
    return Response(
        {
            "products" : serializer.data,
            "page":page,
            "pages":paginator.num_pages}
        )

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    # pk= product id
    user = request.user
    product = Product.objects.filter(_id = pk).first()
    data = request.data
    # if review of that user on that product exist notify hin
    alreadyExist = product.review_set.filter(user=user).exists()

    if alreadyExist:
        content = {'detail' : 'Review already exists'}
        print('Review already exists')
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    # no rating or 0
    elif data['rating'] == 0:
        content = {'detail' : 'Please select a Rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    # create review
    else : 
        review = Review.objects.create(
            user=user,
            product=product,
            name = user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )

        # get the len of the reviews on the product
        reviews = product.review_set.all()
        # update the product numReviews 
        product.numReviews =  len(reviews)

        # get the total rating for particulat product
        totalRating = 0
        for review in reviews:
            totalRating += review.rating
        
        product.rating = totalRating / len(reviews)
        product.save()

        if review is not None:
            review.save()
            return Response({'detail' : 'Review created successfully!'})
        return Response({'detail' :'Review was not  created!!'})














