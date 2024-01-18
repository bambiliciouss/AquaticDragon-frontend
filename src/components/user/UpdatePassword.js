import React, { Fragment, useState, useEffect } from "react";
import Navbar from "components/layout/Headers/IndexNavbar";
import MetaData from "components/layout/MetaData";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const notifyError = (message = "") =>
    toast.error(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
    });

  const notifySuccess = (message = "") =>
    toast.success(message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
     
    });

  useEffect(() => {
    if (error) {
      console.log(error);
      notifyError(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      console.log("Password updated successfully");
      notifySuccess("Password updated successfully");
      navigate("/my-profile");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }

    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    dispatch(updatePassword(formData));
  };

  return (
    <>
      <Navbar />
      <MetaData title={"Update Password"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "90px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <div className="user-profile">
          <div class="wrapper ">
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-profile ">
                      <h5 className="title">Update Password</h5>
                    </div>
                    <div className="card-body">
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Old Password</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="Old Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>New Password</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="btn-neutral btn-round"
                          id="update_button">
                          <button type="submit" className="btn btn-info btn-lg">
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
