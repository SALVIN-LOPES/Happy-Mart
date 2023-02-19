import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants";

// reducer updates the state in the store
export const productListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    // loading
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    // after loading
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// reducer updates the state in the store
export const productDetailReducers = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    // loading
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    // after loading
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// reducer updates the state in the store
export const productCreateReducers = (state = {}, action) => {
  switch (action.type) {
    // loading
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    // after loading
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// reducer updates the state in the store
export const productCreateReviewReducers = (state = {}, action) => {
  switch (action.type) {
    // loading
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };

    // after loading
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

// reducer updates the state in the store
export const productUpdateReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    // loading
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    // after loading
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default:
      return state;
  }
};
// reducer updates the state in the store
export const productDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    // loading
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    // after loading
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
