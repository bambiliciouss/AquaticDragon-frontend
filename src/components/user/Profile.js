import React, { useState, useEffect } from "react";
import Navbar from "components/layout/Headers/IndexNavbar";
import MetaData from "components/layout/MetaData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MyGallon from "components/gallon/MyGallon";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  return (
    <>
      <Navbar />
      <MetaData title={"My Profile"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "90px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div>
              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons users_single-02"
                  style={{ marginRight: "5px" }}></i>
                My Account
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link active" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
                  </a>
                </li>
              </ul>

              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons ui-1_simple-add"
                  style={{ marginRight: "5px" }}></i>
                My Gallons
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-gallon">
                    List of my Gallon/s
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/register-gallon">
                    Register New Gallon
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="user-profile">
              <div className="content">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header-profile ">
                        <h5
                          className="title"
                          style={{
                            paddingTop: "10px",
                          }}>
                          My Profile
                        </h5>
                        <hr />
                      </div>
                      <div
                        className="card-body"
                        style={{
                          padding: "30px",
                        }}>
                        <div className="row">
                          <div
                            className="col-md-4"
                            style={{ borderRight: "1px solid #ccc" }}>
                            <div className="text-center">
                              <img
                                className="avatar border-gray"
                                style={{
                                  width: "200px",
                                  height: "200px",
                                  borderRadius: "50%",
                                }}
                                src={user && user.avatar && user.avatar.url}
                                alt="User"
                              />
                              <div className="button-container text-center">
                                <div className="btn-container d-block">
                                  <button
                                    className="btn btn-info btn-sm mb-2"
                                    onClick={() => navigate("/me/update")}>
                                    Edit Profile
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div>
                              <div className="row">
                                <div className="col-md-6 pr-1">
                                  <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="First Name"
                                      value={user ? user.fname : ""}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                  <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Last Name"
                                      value={user ? user.lname : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-5 pr-1">
                                  <div className="form-group">
                                    <label>Phone No.</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Phone No."
                                      value={user ? user.phone : ""}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-3 px-1">
                                  <div className="form-group">
                                    <label>House No.</label>

                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        user && user.houseNo !== ""
                                          ? user.houseNo
                                          : "Update..."
                                      }
                                      value={user ? user.houseNo : ""}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-4 pl-1">
                                  <div className="form-group">
                                    <label>Purok No.</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        user && user.purokNum !== ""
                                          ? user.purokNum
                                          : "Update..."
                                      }
                                      value={user ? user.purokNum : ""}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Street Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        user && user.streetName !== ""
                                          ? user.streetName
                                          : "Update..."
                                      }
                                      value={user ? user.streetName : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6 pr-1">
                                  <div className="form-group">
                                    <label>Barangay</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        user && user.barangay !== ""
                                          ? user.barangay
                                          : "Update..."
                                      }
                                      value={user ? user.barangay : ""}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                  <div className="form-group">
                                    <label>City</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder={
                                        user && user.city !== ""
                                          ? user.city
                                          : "Update..."
                                      }
                                      value={user ? user.city : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Street Name"
                                      value={user ? user.email : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default Profile;
