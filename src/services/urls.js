export const appUrls = {
    //AUTH ENDPOINTS
   LOGIN_URL: "/auth/admin/signin",

   //ORDERS ENDPOINT
   GET_ORDER_URL: "/orders",
   UPDATE_ORDER_URL: "/orders/update",
   REFUND_ORDER_URL: "purchase/update/item",

   //CUSTOMER ENDPOINT
   GET_CUSTOMER_URL: "/user/all",
   GET_CUSTOMER_URL_BY_ID: "/user",


   //PRODUCTS ENDPOINT
   PRODUCTS_URL: "/product",
   UPLOAD_IMAGE_URL_A: "product/upload-image-1",
   UPLOAD_IMAGE_URL_B: "product/upload-image-2",
   UPLOAD_IMAGE_URL_C: "product/upload-image-3",

   //CATEGORY ENDPOINT
   GET_PRODUCTS_CATEGORY_URL: "/category",
   ADD_CATEGORY_URL: "/category/create",
   DELETE_CATEGORY_URL: "/category/delete",

   //ANALYTICS ENDPOINT 
   FETCH_ANALYTICS_URL: "/analytics/admin",

   //TRANSACTION ENDPOINT
   FETCH_TRANSACTION_URL: "/transactions",

   //VERIFY CUSTOMER
   VERIFY_CUSTOMER_URL: "/user/verification",

   //ASSIGN ORDER
   ASSIGN_ORDER_URL: "/order/assign"
};
