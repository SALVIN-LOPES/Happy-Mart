import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Buttom,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();

  const qty = location.search ? location.search.split("=")[1] : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if ((id, qty)) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  console.log("qty : ", qty);
  // get the cart items from state
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log("cartItems = ",cartItems);
  //
  return (
    <>
      <Row>
        <Col md={4}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
};

export default CartScreen;
