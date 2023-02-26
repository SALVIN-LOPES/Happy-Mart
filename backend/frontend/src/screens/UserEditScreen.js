import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: updateError,
    loading: updateLoading,
    success: updateSuccess,
  } = userUpdate;


  useEffect(() => {
    if (updateSuccess) {
      console.log("update success = ", updateSuccess);
      dispatch({
        type: USER_UPDATE_RESET,
      });
      navigate(`/admin/userlist`);
    } else {
      if (!user.name || user._id != id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, id, updateSuccess, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({
        id,
        name,
        email,
        isAdmin,
      })
    );
    navigate(`/admin/userlist`);
    console.log("update success = ", updateSuccess);
  };
  //  20022001@Sc

  return (
    <div>
      <Link to={`/admin/userlist`}>Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {updateLoading && <Loader />}
        {updateError && <Message variant="danger">{error}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Username..."
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
