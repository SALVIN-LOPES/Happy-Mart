import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  // get the shippinAddress from state;
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      }),
      setMessage("Shipping Address Successfully Submitted"),
      navigate("/payment")
    );

    console.log("shipping form submitted successfully");
  };

  return (
    <>
      <FormContainer>
        <CheckoutSteps step1 step2 />

        <h1>Shipping</h1>
        {message && <Message variant="success">{message}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="address"
              placeholder="Enter Address..."
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="city"
              placeholder="Enter City..."
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              required
              type="postalCode"
              placeholder="Enter PostalCode..."
              value={postalCode ? postalCode : ""}
              onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="country"
              placeholder="Enter Country..."
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
