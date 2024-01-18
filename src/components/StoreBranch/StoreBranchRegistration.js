import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStoreBranch,
  clearErrors,
} from "../../actions/storebranchActions";

import Navbar from "components/layout/Headers/IndexNavbar";
import { useNavigate } from "react-router-dom";
import MetaData from "components/layout/MetaData";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";
import { CREATE_STOREBRANCH_RESET } from "../../constants/storebranchConstants";
import { useForm } from "react-hook-form";

const StoreBranchRegistration = () => {
  const [storeBranch, setstoreBranch] = useState({
    branchNo: "",
    houseNo: "",
    streetName: "",
    purokNum: "",
    barangay: "",
    city: "",
    deliverFee: "",
  });

  const {
    branchNo,
    houseNo,
    streetName,
    purokNum,
    barangay,
    city,
    deliverFee,
  } = storeBranch;

  const [storeImage, setstoreImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { storeBranchcreated, error, loading } = useSelector(
    (state) => state.newStoreBranch
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (storeBranchcreated) {
      console.log("success store branch registration");
      navigate("/storebranchlist", { replace: true });
      dispatch({
        type: CREATE_STOREBRANCH_RESET,
      });
    }

    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }

    // Cleanup previous body classes and scroll positions
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    // Cleanup function
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch, error, storeBranchcreated, navigate]);

  const submitHandler = (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.set("branchNo", e.branchNo);
    formData.set("houseNo", e.houseNo);
    formData.set("streetName", e.streetName);
    formData.set("purokNum", e.purokNum);
    formData.set("barangay", e.barangay);
    formData.set("city", e.city);
    formData.set("deliverFee", e.deliverFee);
    formData.set("storeImage", storeImage);

    dispatch(createStoreBranch(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "storeImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setstoreImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setstoreBranch({ ...storeBranch, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <Navbar />
      <MetaData title={"Store Branch Registration"} />
      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "90px",
          marginLeft: "30%",
          marginRight: "30%",
        }}>
        <div className="row">
          {/* Sidebar */}

          <div className="col-md-12">
            <div className="user-profile">
              <div className="wrapper ">
                <div className="content">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-header-profile ">
                          <h5 className="title" style={{ textAlign: "center" }}>
                            Register New Store Branch
                          </h5>
                        </div>
                        <div className="card-body">
                          <Form onSubmit={handleSubmit(submitHandler)}>
                            <CardBody>
                              <Row>
                                <Col md="12">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons shopping_shop"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="Branch No..."
                                      className="form-control"
                                      type="text"
                                      name="branchNo"
                                      {...register("branchNo", {
                                        required:
                                          "Please enter a valid branch number.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.branchNo && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.branchNo.message}
                                    </h2>
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons location_pin"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="House No..."
                                      className="form-control"
                                      type="number"
                                      name="houseNo"
                                      {...register("houseNo", {
                                        required:
                                          "Please enter a valid house No.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.houseNo && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.houseNo.message}
                                    </h2>
                                  )}
                                </Col>

                                <Col md="6">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons location_pin"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="Purok No..."
                                      className="form-control"
                                      type="number"
                                      name="purokNum"
                                      {...register("purokNum", {
                                        required:
                                          "Please enter a valid Purok No.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.purokNum && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.purokNum.message}
                                    </h2>
                                  )}
                                </Col>
                              </Row>

                              <Row>
                                <Col md="12">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons location_pin"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="Street Name..."
                                      className="form-control"
                                      type="text"
                                      name="streetName"
                                      {...register("streetName", {
                                        required:
                                          "Please enter a valid Street Name.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.streetName && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.streetName.message}
                                    </h2>
                                  )}
                                </Col>
                              </Row>

                              <Row>
                                <Col md="6">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons location_pin"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="Barangay..."
                                      className="form-control"
                                      type="text"
                                      name="barangay"
                                      {...register("barangay", {
                                        required:
                                          "Please enter a valid Barangay.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.barangay && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.barangay.message}
                                    </h2>
                                  )}
                                </Col>
                                <Col md="6">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons location_pin"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="City..."
                                      className="form-control"
                                      type="text"
                                      name="city"
                                      {...register("city", {
                                        required: "Please enter a valid City.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.city && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.city.message}
                                    </h2>
                                  )}
                                </Col>
                              </Row>

                              <Row>
                                <Col md="12">
                                  <InputGroup className={"no-border"}>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="now-ui-icons business_money-coins"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <input
                                      placeholder="Delivery Fee..."
                                      className="form-control"
                                      type="text"
                                      name="deliveryFee"
                                      {...register("deliverFee", {
                                        required:
                                          "Please enter a valid fee.",
                                      })}></input>
                                  </InputGroup>
                                  {errors.deliverFee && (
                                    <h2
                                      className="h1-seo"
                                      style={{
                                        color: "red",
                                        fontSize: "small",
                                      }}>
                                      {errors.deliverFee.message}
                                    </h2>
                                  )}
                                </Col>
                              </Row>

                              <Row>
                                <Col md="12">
                                  <div className="form-group">
                                    <label htmlFor="avatar_upload">
                                      Store Image
                                    </label>

                                    <div className="row">
                                      <div className="col-sm-3"></div>
                                      <div className="col-sm-6">
                                        <div className="text-center">
                                          <img
                                            className="avatar border-gray"
                                            style={{
                                              width: "200px",
                                              height: "200px",
                                            }}
                                            src={avatarPreview}
                                            alt="User"
                                          />
                                        </div>

                                        <div className="custom-file">
                                          <input
                                            type="file"
                                            name="storeImage"
                                            className="custom-file-input"
                                            id="customFile"
                                            accept="images/*"
                                            {...register("storeImage", {
                                              required: true,
                                            })}
                                            onChange={(e) => {
                                              onChange(e);
                                              e.target.blur();
                                            }}
                                          />
                                          <label
                                            className="custom-file-label"
                                            htmlFor="customFile">
                                            Choose Image
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    {errors.storeImage && !storeImage && (
                                      <h2
                                        className="h1-seo"
                                        style={{
                                          color: "red",
                                          fontSize: "small",
                                        }}>
                                        Please select a valid image.
                                      </h2>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                            </CardBody>
                            <CardFooter className="text-center">
                              <div
                                className="btn-neutral btn-round"
                                id="update_button">
                                <button
                                  type="submit"
                                  className="btn btn-info btn-lg">
                                  Register
                                </button>
                              </div>
                            </CardFooter>
                          </Form>
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

export default StoreBranchRegistration;
