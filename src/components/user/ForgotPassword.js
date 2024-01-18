import React, { useState, useEffect } from "react";
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

import { forgotPassword, clearErrors } from "../../actions/userActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
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
    if (error) {
      notifyError(error);
      console.log("error ito");
      dispatch(clearErrors());
    }

    if (message) {
      notifySuccess("Reset Password link sent to your email");
      console.log("success ito");
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
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };

  return (
    <>
      {loading ? (
        <Loader loadingTime={20} /> // Display the loader for 3 seconds
      ) : (
        <>
          <Navbar />
          <MetaData title={"Forgot Password"} />
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
                            (email ? " input-group-focus" : "")
                          }>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}></Input>
                        </InputGroup>
                      </CardBody>

                      <CardFooter className="text-center">
                        <Button
                          block
                          className="btn-round"
                          color="info"
                          type="submit"
                          size="lg">
                          Send Email
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

export default ForgotPassword;
