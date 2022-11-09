const ROUTES = {
  FACTORIES: "/factories",
  PRODUCTS: "/factories/:factoryId",
  getProductsRoute: (factoryId) => `/factories/${factoryId}`,

  API_ROUTE: "https://prathamesh-api.azurewebsites.net/api",
};

export default ROUTES;
