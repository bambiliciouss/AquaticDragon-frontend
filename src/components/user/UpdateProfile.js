import React, { Fragment, useState, useEffect } from "react";
import Navbar from "components/layout/Headers/IndexNavbar";
import MetaData from "components/layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetName, setStreetName] = useState("");
  const [purokNum, setPurokNum] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(isUpdated);

    if (user) {
      setFname(user.fname);
      setLname(user.lname);
      setPhone(user.phone);
      setHouseNo(user.houseNo);
      setStreetName(user.streetName);
      setPurokNum(user.purokNum);
      setBarangay(user.barangay);
      setCity(user.city);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate("/my-profile", { replace: true });
      dispatch({
        type: UPDATE_PROFILE_RESET,
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
  }, [dispatch, error, isUpdated, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("fname", fname);
    formData.set("lname", lname);
    formData.set("phone", phone);
    formData.set("houseNo", houseNo);
    formData.set("streetName", streetName);
    formData.set("purokNum", purokNum);
    formData.set("barangay", barangay);
    formData.set("city", city);

    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);

        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <Navbar />
      <MetaData title={"Update Profile"} />

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
                      <h5 className="title">Edit</h5>
                    </div>
                    <div className="card-body">
                      <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data">
                        <div className="row">
                          <div className="col-md-6 pr-1">
                            <div className="form-group">
                              <label>First Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={fname}
                                onChange={(e) => setFname(e.target.value)}
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
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
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
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-3 px-1">
                            <div className="form-group">
                              <label>House No.</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="House No."
                                value={houseNo}
                                onChange={(e) => setHouseNo(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 pl-1">
                            <div className="form-group">
                              <label for="exampleInputEmail1">Purok No.</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Purok No."
                                value={purokNum}
                                onChange={(e) => setPurokNum(e.target.value)}
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
                                placeholder="Street No."
                                value={streetName}
                                onChange={(e) => setStreetName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 pr-1">
                            <div class="form-group">
                              <label for="barangaySelect">Barangay</label>
                              <select
                                className="form-control"
                                id="barangaySelect"
                                value={barangay}
                                onChange={(e) => setBarangay(e.target.value)}>
                                <option value="" disabled>
                                  Select Barangay
                                </option>
                                <option value="Central Bicutan">
                                  Central Bicutan
                                </option>
                                <option value="Upper Bicutan">
                                  Upper Bicutan
                                </option>
                                <option value="New Lower Bicutan">
                                  New Lower Bicutan
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6 pl-1">
                            {/* <div className="form-group">
                              <label>City</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div> */}

                            <div class="form-group">
                              <label for="citySelect">City</label>
                              <select
                                className="form-control"
                                id="citySelect"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}>
                                <option value="" disabled>
                                  Select City
                                </option>
                                <option value="Taguig City">
                                  Taguig City
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <label htmlFor="avatar_upload">Avatar</label>

                        <div className="row">
                          <div className="col-sm-3"></div>
                          <div className="col-sm-6">
                            <div className="text-center">
                              <img
                                className="avatar border-gray"
                                style={{
                                  width: "200px",
                                  height: "200px",
                                  borderRadius: "50%",
                                }}
                                src={avatarPreview}
                                alt="User"
                              />
                            </div>

                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                name="avatar"
                                accept="images/*"
                                onChange={onChange}
                              />
                              <label
                                htmlFor="customFile"
                                className="custom-file-label">
                                Choose Avatar
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className="btn-neutral btn-round"
                          id="update_button"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <button type="submit" className="btn btn-info btn-lg">
                            Update Profile
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

export default UpdateProfile;
