import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { APIROUTE } from "./utils/APIROUTES";
import Navbar from "./components/Navbar";
import CategotiesPage from "./pages/CategotiesPage";
import CategoryWorkout from "./pages/CategoryWorkout";
import Loginpage from "./pages/Authpages/Loginpage";
import { setLoginState, setAdminName } from "./store/AdminSlice";

function AppLayout() {
  const dispatch = useDispatch();
  const loginstatus = useSelector((state: any) => state.AdminSlice.Loginstate);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data } = await axios.get(`${APIROUTE}/admin/CheckUserLogin`, {
          withCredentials: true,
        });
        if (data.id) {
          dispatch(setLoginState(true));
          dispatch(setAdminName(data.name));
        }
      } catch {
        dispatch(setLoginState(false));
      }
    };
    checkLogin();
  }, [dispatch]);

  return (
    <>
      {loginstatus && !isLoginPage && <Navbar />}
      <Routes>
        <Route path="/login" element={loginstatus ? <Navigate to="/" /> : <Loginpage />} />
        <Route path="/" element={loginstatus ? <CategotiesPage /> : <Navigate to="/login" />} />
        <Route path="/workouts" element={loginstatus ? <CategoryWorkout /> : <Navigate to="/login" />} />
        <Route path="*" element={loginstatus ? <CategotiesPage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
