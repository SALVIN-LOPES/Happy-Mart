import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import Paginate from "../components/Paginate";
import { useLocation } from "react-router-dom";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useLocation().search;
  console.log("productlistscreen query = ", query);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const {
    products,
    loading: productListLoading,
    error: productListError,
    page,
    pages,
  } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productCreateLoading,
    error: productCreateError,
    success: productCreateSuccess,
    product: productCreated,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    error: productDeleteError,
    success: productDeleteSuccess,
  } = productDelete;

  // if productDeleteSuccess = true | fetch(listProducts again)

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate(`/login`);
    }

    if (productCreateSuccess) {
      // redirect to product edit page
      navigate(`/admin/product/${productCreated._id}/edit`);
    } else {
      dispatch(listProducts(query));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    productDeleteSuccess,
    productCreateSuccess,
    productCreated,
    query,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    console.log("product created successfully!!");
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler} S>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {productDeleteLoading && <Loader />}
      {productDeleteError && (
        <Message variant="danger">{productDeleteError}</Message>
      )}

      {productCreateLoading && <Loader />}
      {productCreateError && (
        <Message variant="danger">{productCreateError}</Message>
      )}

      {productListLoading ? (
        <Loader />
      ) : productListError ? (
        <Message variant="danger">{productListError}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => deleteHandler(product._id)}
                      variant="danger"
                      className="btn-sm">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} keyword={query} isAdmin={true} />
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
