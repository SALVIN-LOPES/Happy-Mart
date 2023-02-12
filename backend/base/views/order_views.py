from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from base.models import Order,OrderItem, ShippingAddress, Product

from rest_framework import status
from datetime import datetime

# get the order items and add them to the data base
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    print("user = ",user)
    print("data = ",data)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        # throw error
        return Response({'detail' : 'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. save the basic details about the order
        order = Order.objects.create(

            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],
            # isPaid = data['isPaid'],
            # paidAt = data['paidAt'],
            # isDelivered = data['isDelivered'],
            # deliveredAt = data['deliveredAt'],
        )
        # 2. save the shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],
            shippingPrice = data['shippingPrice'],
        )

        # 3. connect the relationship of order with the orderItems
        for i in orderItems:
            print("order = ",i)
            # get the product
            product = Product.objects.get(_id = i['product'])
            print("product = ",product)
            # create an ordetItem
            item = OrderItem.objects.create(
                order = order,
                product = product,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url,
            )
            print("item = ",item)
        # 4. update the Product['countInStock'] since someone has ordered the item
            product.countInStock  -= int(item.qty)
            product.save()

        serializer = OrderSerializer(order, many=False)

        return Response(serializer.data)

# get all the orders for the particulat user 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    user = request.user
    orders = Order.objects.filter(user=user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# the order is being saved in the database now write a view to fetch the order with id so to fetch from frontend
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    # pk = order id
    user = request.user
    # if the order does not exist
    try: 
        order = Order.objects.filter(_id = pk ).first()
        # check it the user is the same order user or not or staff menber
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail' : 'Not Authorized to view this order!'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail' : 'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)

# update the order to paid
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    # pk = order id
    user = request.user
    order = Order.objects.filter(_id = pk).first()
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response("order was Paid")

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToDelivered(request,pk):
    # pk = order id
    user = request.user
    order = Order.objects.filter(_id = pk).first()
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response("order was Paid")



