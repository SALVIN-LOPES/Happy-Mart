import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation, useSearchParams } from "react-router-dom";
import Paginate from "../components/Paginate";

function HomeScreen() {
  const dispatch = useDispatch();
  // const [searchParams, setSearchParams] = useSearchParams("");
  // stay here
  // const query = searchParams ? searchParams.get("keyword", "page") : "";
  // fetch all the query from the URL

  const query = useLocation().search;
  // query = ?keyword=air&page=1 // keyword =  air

  console.log("query homeScreen = ", query);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  useEffect(() => {
    if (query) {
      dispatch(listProducts(query));
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, query]);

  return (
    <div>
      <h1>Latest Products</h1>
      {products.length === 0 && (
        <Message variant="info">
          There are no products with this query set
        </Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={query} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
