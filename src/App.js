import { Routes, Route } from "react-router-dom";
import Index from "./Home";
import ProtectedRoute from "./components/route/ProtectedRoute";

import Login from "components/user/Login";
import Register from "components/user/Register";
import AdminRegistration from "components/admin/AdminRegistration";
import Profile from "components/user/Profile";
import ForgotPassword from "components/user/ForgotPassword";
import NewPassword from "components/user/NewPassword";
import EmailVerification from "components/user/VerifyEmail";
import UpdateProfile from "components/user/UpdateProfile";
import UpdatePassword from "components/user/UpdatePassword";

import RegisterGallon from "components/gallon/RegisterGallon";
import MyGallon from "components/gallon/MyGallon";

import Dashboard from "components/admin/Dashboard";
import UserList from "components/admin/UserList";
import RiderList from "components/admin/RiderList";
import EmployeeList from "components/admin/EmployeeList";
import GallonList from "components/admin/GallonList";
import StoreBranchList from "components/admin/StoreBranchList";


import EmployeeRegistration from "components/employee/EmployeeRegistration";
import RiderRegistration from "components/rider/RiderRegistration";
import StoreBranchRegistration from "components/StoreBranch/StoreBranchRegistration";
// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import "./assets/css/now-ui-kit.css";

import store from "./store";
import { loadUser } from "./actions/userActions";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route path="/admin" element={<AdminRegistration />} exact="true" />
        <Route path="/my-profile" element={<Profile />} exact="true" />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route
          path=":id/verify/:token"
          element={<EmailVerification />}
          exact="true"
        />

        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/register-gallon"
          element={
            <ProtectedRoute>
              <RegisterGallon />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route
          path="/my-gallon"
          element={
            <ProtectedRoute>
              <MyGallon />
            </ProtectedRoute>
          }
          exact="true"
        />

        <Route path="/my-verify" element={<EmailVerification />} exact="true" />

        {/* ADMIN */}
        <Route path="/dashboard" element={<Dashboard />} exact="true" />
        <Route path="/userlist" element={<UserList />} exact="true" />
        <Route path="/riderlist" element={<RiderList />} exact="true" />
        <Route path="/employeelist" element={<EmployeeList />} exact="true" />
        <Route path="/gallonlist" element={<GallonList />} exact="true" />
        <Route
          path="/storebranchlist"
          element={<StoreBranchList />}
          exact="true"
        />
        <Route
          path="/employee"
          element={<EmployeeRegistration />}
          exact="true"
        />
        <Route path="/rider" element={<RiderRegistration />} exact="true" />
        <Route
          path="/storebranch"
          element={<StoreBranchRegistration />}
          exact="true"
        />
      </Routes>
    </>
  );
}

export default App;
