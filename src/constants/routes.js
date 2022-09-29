const ROUTES = {
  FACTORIES: "/factories",
  PRODUCTS: "/factories/:factoryId",
  getProductsRoute: (factoryId) => `/factories/${factoryId}`,

  API_ROUTE: "http://127.0.0.1:8000/api",
};

export default ROUTES;
