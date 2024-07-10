import Body from "./pages/home/body";
import AdminPage from "./pages/admin-panel";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import ResetPassword from "./pages/auth/ResetPassword";
import Orders from "./pages/orders";
export const routes = [
  { path: "/", element: <Body /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin-panel", element: <AdminPage /> },
  { path: "/cart", element: <Cart /> },
  { path: "/profile", element: <Profile /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/orders", element: <Orders /> },
];
