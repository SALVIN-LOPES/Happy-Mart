import React from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "", isAdmin = false }) => {
  // pages = total pages
  // page = current page
  // keyword = search keyword
  // isAdmin = true or false
  if (keyword) {
    keyword = keyword.split("&")[0].split("=")[1];
  }

  console.log("PAGINATION KEYWORD = ", keyword);
  console.log("PAGINATION page = ", page);

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <div>
            <Link
              key={x + 1}
              to={
                !isAdmin
                  ? `/?keyword=${keyword}&page=${x + 1}`
                  : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
              }>
              <Row md={6}>
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    "margin-right": "20px",
                  }}>
                  {x + 1}
                </Col>
              </Row>
            </Link>
          </div>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
