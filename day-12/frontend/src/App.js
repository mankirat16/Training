import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UpdateContext } from "./adminContext";
import { routes } from "./routes";
import Login from "./pages/auth/login";
function App() {
  const { isLoggedIn } = useContext(UpdateContext);
  console.log(isLoggedIn, "");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            const isPublicRoute =
              route.path === "/signup" ||
              route.path === "/login" || route.path==='/reset-password'
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLoggedIn || isPublicRoute ? route.element : <Login />
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
