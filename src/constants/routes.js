const ROUTES = {
  FACTORIES: "/factories",
  PRODUCTS: "/factories/:factoryId",
  getProductsRoute: (factoryId) => `/factories/${factoryId}`,

  API_ROUTE: "https://apim-get-assessment.azure-api.net/prathamesh/api",
  ORDERS_ROUTE: "https://apim-get-assessment.azure-api.net/prathamesh-orders",
};

export default ROUTES;
