import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
// reactstrap components
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

// core components
import { useDispatch, useSelector } from "react-redux";
import { newregister, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader";
import Navbar from "components/layout/Headers/IndexNavbar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
const EmployeeRegistration = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    phone: "",
    houseNo: "",
    streetName: "",
    purokNum: "",
    barangay: "",
    city: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("");

  const {
    fname,
    lname,
    phone,
    houseNo,
    streetName,
    purokNum,
    barangay,
    city,
    email,
    password,
  } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
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
    setRole("employee");

    if (error) {
      notifyError(error);
      console.log(error);
      dispatch(clearErrors());
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
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    //e.preventDefault();

    const formData = new FormData();
    formData.set("fname", e.fname);
    formData.set("lname", e.lname);
    formData.set("phone", e.phone);
    formData.set("houseNo", e.houseNo);
    formData.set("streetName", e.streetName);
    formData.set("purokNum", e.purokNum);
    formData.set("barangay", e.barangay);
    formData.set("city", e.city);
    formData.set("email", e.email);
    formData.set("password", e.password);
    formData.set("avatar", avatar);
    formData.set("role", role);

  
  
    dispatch(newregister(formData));

    navigate("/employeelist");
    notifySuccess("An email sent to your Email account, please verify");
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      {loading ? (
        <Loader loadingTime={20} />
      ) : (
        <>
          <Navbar />
          <div className="page-header clear-filter">
            <div
              className="page-header-image"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/header.jpg") + ")",
              }}></div>
            <div className="content">
              <Container>
                <Row>
                  <Card className="card-signup" data-background-color="blue">
                    <Form onSubmit={handleSubmit(submitHandler)}>
                      <CardHeader className="text-center">
                        <CardTitle className="title-up" tag="h3">
                          Register
                        </CardTitle>
                        <div className="social-line">
                          <Button
                            className="btn-neutral btn-icon btn-round"
                            color="facebook"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            <i className="fab fa-facebook-square"></i>
                          </Button>
                          <Button
                            className="btn-neutral btn-icon btn-round"
                            color="twitter"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="lg">
                            <i className="fab fa-twitter"></i>
                          </Button>
                          <Button
                            className="btn-neutral btn-icon btn-round"
                            color="google"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}>
                            <i className="fab fa-google-plus"></i>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col md="6">
                            <InputGroup className={"no-border"}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons users_single-02"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                placeholder="First Name..."
                                className="form-control"
                                type="text"
                                name="fname"
                                {...register("fname", {
                                  required: "Please enter a valid name.",
                                })}></input>
                            </InputGroup>
                            {errors.fname && (
                              <h2
                                className="h1-seo"
                                style={{ color: "white", fontSize: "small" }}>
                                {errors.fname.message}
                              </h2>
                            )}
                          </Col>
                          <Col md="6">
                            <InputGroup className={"no-border"}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons users_single-02"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                placeholder="Last Name..."
                                className="form-control"
                                type="text"
                                name="lname"
                                {...register("lname", {
                                  required: "Please enter a valid name.",
                                })}></input>
                            </InputGroup>
                            {errors.lname && (
                              <h2
                                className="h1-seo"
                                style={{ color: "white", fontSize: "small" }}>
                                {errors.lname.message}
                              </h2>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <InputGroup className={"no-border"}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons tech_mobile"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                placeholder="Phone..."
                                className="form-control"
                                type="text"
                                name="phone"
                                {...register("phone", {
                                  required: "Please enter a valid phone no.",
                                })}></input>
                            </InputGroup>
                            {errors.phone && (
                              <h2
                                className="h1-seo"
                                style={{ color: "white", fontSize: "small" }}>
                                {errors.phone.message}
                              </h2>
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12">
                            <InputGroup className={"no-border"}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons ui-1_email-85"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                placeholder="Email..."
                                className="form-control"
                                name="email"
                                {...register("email", {
                                  required: "Email is required",
                                  pattern: {
                                    value:
                                      /^[a-zA-Z0-9_.+-]+@[a-zAZ0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                    message:
                                      "Entered email is in the wrong format",
                                  },
                                })}></input>
                            </InputGroup>
                            {errors.email && (
                              <div className="error">
                                {errors.email.type === "required" && (
                                  <h2
                                    className="h1-seo"
                                    style={{
                                      color: "white",
                                      fontSize: "small",
                                    }}>
                                    {errors.email.message}
                                  </h2>
                                )}
                                {errors.email.type === "pattern" && (
                                  <h2
                                    className="h1-seo"
                                    style={{
                                      color: "white",
                                      fontSize: "small",
                                    }}>
                                    {errors.email.message}
                                  </h2>
                                )}
                              </div>
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col md="12">
                            <InputGroup className={"no-border"}>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="now-ui-icons objects_key-25"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <input
                                placeholder="Password..."
                                className="form-control"
                                type="password"
                                name="password"
                                {...register("password", {
                                  required: "Password is required",
                                })}></input>
                            </InputGroup>
                            {errors.password && (
                              <h2
                                className="h1-seo"
                                style={{ color: "white", fontSize: "small" }}>
                                {errors.password.message}
                              </h2>
                            )}
                          </Col>
                        </Row>
                      </CardBody>

                      <CardFooter className="text-center">
                        <Button
                          className="btn-neutral btn-round"
                          color="info"
                          id="register_button"
                          type="submit"
                          size="lg">
                          Register
                        </Button>
                      </CardFooter>
                    </Form>
                  </Card>
                </Row>
              </Container>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default EmployeeRegistration;
