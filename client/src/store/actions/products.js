import {
    PRODUCTS_FETCHING,
    PRODUCTS_FETCHED,
    PRODUCTS_FAIL,
    CATEGORY_PRODUCTS_FETCHED,
    SINGLE_PRODUCT_FETCHED,
    PRODUCT_FETCH_REQUESTED,
    CATEGORY_PRODUCTS_FETCH_REQUEST,
    SINGLE_PRODUCT_FETCH_REQUEST,
} from './actionTypes';

export const fetchingProducts = () => ({
    type: PRODUCTS_FETCHING,
});

export const failedFetchingProducts = error => ({
    type: PRODUCTS_FAIL,
    payload: { error },
});

export const fetchedProducts = products => ({
    type: PRODUCTS_FETCHED,
    payload: { products },
});

export const fetchedCategoryProducts = (products, category_id) => ({
    type: CATEGORY_PRODUCTS_FETCHED,
    payload: { products, category_id },
});

export const fetchedSingleProduct = (product, product_id) => ({
    type: SINGLE_PRODUCT_FETCHED,
    payload: { product, product_id },
});

export const getProducts = () => ({
    type: PRODUCT_FETCH_REQUESTED,
});

// Redux thunk usage
// export const getProducts = () => {
//     return async dispatch => {
//         dispatch(fetchingProducts());

//         try {
//             const res = await axios.get('/products');
//             const data = await res.data;

//             dispatch(fetchedProducts(data.data));
//         } catch (err) {
//             dispatch(failedFetchingProducts(err.message));
//         }
//     };
// };

export const getCategoryProducts = category_id => ({
    type: CATEGORY_PRODUCTS_FETCH_REQUEST,
    payload: { category_id },
});

// Redux thunk usage
// export const getCategoryProducts = category_id => {
//     return async dispatch => {
//         dispatch(fetchingProducts());

//         try {
//             const res = await axios.get(`/products/category/${category_id}`);
//             const data = await res.data;

//             dispatch(fetchedCategoryProducts(data.data, category_id));
//         } catch (err) {
//             dispatch(failedFetchingProducts(err.message));
//         }
//     };
// };

export const getProduct = product_id => ({
    type: SINGLE_PRODUCT_FETCH_REQUEST,
    payload: { product_id },
});

// Redux thunk usage
// export const getProduct = product_id => {
//     return async dispatch => {
//         dispatch(fetchingProducts());

//         try {
//             const res = await axios.get(`/products/${product_id}/product`);
//             const data = await res.data;

//             dispatch(fetchedSingleProduct(data, product_id));
//         } catch (err) {
//             dispatch(failedFetchingProducts(err.message));
//         }
//     };
// };
