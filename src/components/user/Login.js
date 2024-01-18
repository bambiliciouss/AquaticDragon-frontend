import React, { useState, useEffect } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

// core components
import Navbar from "components/layout/Headers/IndexNavbar";
import Footer from "components/layout/Footers/TransparentFooter";
import MetaData from "components/layout/MetaData";
import { login } from "../../actions/userActions";

import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const {user, isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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

  const submitHandler = (e) => {
    dispatch(login(e.email, e.password));
  };

  let location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      notifySuccess("Login Successfully");

      if (user && user.role === "admin") {
        navigate("/dashboard"); 
      } else {
        navigate("/");
      }
    } else if (error) {
      notifyError(error);
      console.log(error);
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
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  return (
    <>
      {loading ? (
        <Loader loadingTime={20} /> // Display the loader for 3 seconds
      ) : (
        <>
          <Navbar />
          <MetaData title={"Login"} />
          {/* <form className="shadow-lg" onSubmit={submitHandler}> */}
          <div className="page-header clear-filter" filter-color="blue">
            <div
              className="page-header-image"
              style={{
                backgroundImage:
                  "url(" + require("assets/img/header.jpg") + ")",
              }}></div>
            <div className="content">
              <Container>
                <Col className="ml-auto mr-auto" md="4">
                  <Card className="card-login card-plain">
                    <Form onSubmit={handleSubmit(submitHandler)}>
                      <CardHeader className="text-center">
                        <div className="logo-container">
                          <img
                            alt="..."
                            src={require("assets/img/logo2.0.png")}></img>
                        </div>
                        <h2 className="h1-seo">Aquatic Dragon </h2>
                      </CardHeader>
                      <CardBody>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (email ? " input-group-focus" : "")
                          }>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <input
                            id="email_field"
                            className="form-control"
                            placeholder="Email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9_.+-]+@[a-zAZ0-9-]+\.[a-zA-Z0-9-.]+$/i,
                                message: "Entered email is in the wrong format",
                              },
                            })}
                          />
                        </InputGroup>

                        {errors.email && (
                          <div className="error">
                            {errors.email.type === "required" && (
                              <h2
                                className="h1-seo"
                                style={{ color: "red", fontSize: "small" }}>
                                {errors.email.message}
                              </h2>
                            )}
                            {errors.email.type === "pattern" && (
                              <h2
                                className="h1-seo"
                                style={{ color: "red", fontSize: "small" }}>
                                {errors.email.message}
                              </h2>
                            )}
                          </div>
                        )}

                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (password ? " input-group-focus" : "")
                          }>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons objects_key-25"></i>
                            </InputGroupText>
                          </InputGroupAddon>

                          <input
                            type="password"
                            id="password_field"
                            placeholder="Password"
                            className="form-control"
                            {...register("password", {
                              required: "Password is required",
                            })}
                          />
                        </InputGroup>

                        {errors.password && (
                          <h2
                            className="h1-seo"
                            style={{ color: "red", fontSize: "small" }}>
                            {errors.password.message}
                          </h2>
                        )}
                      </CardBody>

                      <CardFooter className="text-center">
                        <Button
                          block
                          className="btn-round"
                          color="info"
                          type="submit"
                          size="lg">
                          Login
                        </Button>

                        <div className="pull-left">
                          <h6>
                            <a className="link" href="/register">
                              Don't have an account?
                            </a>
                          </h6>
                        </div>
                        <div className="pull-right">
                          <h6>
                            <a className="link" href="/password/forgot">
                              Forgot Password?
                            </a>
                          </h6>
                        </div>
                      </CardFooter>
                    </Form>
                    <div className="d-flex justify-content-center">
                      <div className="p-5">
                        <h6>
                          <a className="link" href="/admin">
                            Join as Supplier
                          </a>
                        </h6>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Container>
            </div>

            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Login;
