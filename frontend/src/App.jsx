import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext/AuthProvider";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Add from "./pages/Add";

const routes = [
  {
      path : "/",
      element:Home
  },
  {
      path : "/add",
      element:Add
  }
]
const App = () => {
  const { authUser, loading } = useAuth();
  return (
     <>
    <Routes>
      {authUser &&
        routes.map((route, key) => {
          const Component = route.element;
          return (
            <Route
              key={key}
              path={route.path}
              element={<Component />}
            />
          );
        })}

      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
      {!authUser && (
        <Route path="*" element={<Navigate to="/login" />} />
      )} 
    </Routes>
      <Toaster />
     </>
  );
};

export default App;
