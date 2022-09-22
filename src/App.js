// Pages
import { Factory, Product } from "./pages";

//  React Router
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

// Constants
import ROUTES from "./constants/routes";

const router = createBrowserRouter([
  {
    path: ROUTES.FACTORIES,
    element: <Factory />,
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Product />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.FACTORIES} replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
