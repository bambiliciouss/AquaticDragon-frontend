import React, { useState, useEffect } from "react";

import { resetPassword, clearErrors } from "../../actions/userActions";
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
import Navbar from "components/layout/Headers/IndexNavbar";
import Footer from "components/layout/Footers/TransparentFooter";
import MetaData from "components/layout/MetaData";
import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  let { token } = useParams();

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
      notifyError(error);
      console.log("error:", error);
      dispatch(clearErrors());
    }

    if (success) {
      notifySuccess("Password updated successfully");
      console.log("Password updated successfully");
      navigate("/login");
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
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, formData));
  };
  return (
    <>
      {loading ? (
        <Loader loadingTime={20} />
      ) : (
        <>
          <Navbar />
          <MetaData title={"Reset Password"} />

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
                    <Form onSubmit={submitHandler}>
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
                            (password ? " input-group-focus" : "")
                          }>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="New Password"
                            type="password"
                            name="password"
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }></Input>
                        </InputGroup>
                        <InputGroup
                          className={
                            "no-border input-lg" +
                            (confirmPassword ? " input-group-focus" : "")
                          }>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            onChange={(e) =>
                              setConfirmPassword(e.target.value)
                            }></Input>
                        </InputGroup>
                      </CardBody>

                      <CardFooter className="text-center">
                        <Button
                          block
                          className="btn-round"
                          color="info"
                          type="submit"
                          size="lg">
                          Set Password
                        </Button>
                      </CardFooter>
                    </Form>
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

export default NewPassword;
