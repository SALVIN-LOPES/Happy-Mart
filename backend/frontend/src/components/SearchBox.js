import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      style={{ display: "flex", "flex-direction": "row" }}>
      <Form.Control
        type="text"
        name="q"
        placeholder="Search"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Submit
      </Button>
    </Form>
  );
};

export default SearchBox;
