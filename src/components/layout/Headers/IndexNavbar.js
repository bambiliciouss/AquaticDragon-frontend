import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userActions";
import { useNavigate } from "react-router-dom";

const IndexNavbar = () => {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const logoutHandler = () => {
    dispatch(logout());
  };

  const Avatar = ({ src, alt, size }) => {
    const avatarStyle = {
      width: "25px",
      height: "25px",
      borderRadius: "50%", // Makes the avatar circular
      overflow: "hidden", // Hide overflow in case the image is not a perfect square
    };

    const imgStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover", // Maintain aspect ratio and cover the entire container
    };

    return (
      <div style={avatarStyle}>
        <img src={src} alt={alt} style={imgStyle} />
      </div>
    );
  };

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="fixed-top blue-navbar" expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="/">Aquatic Dragon</NavbarBrand>
            {/* <UncontrolledTooltip target="#navbar-brand">
              Designed by Invision. Coded by Creative Tim
            </UncontrolledTooltip> */}
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button">
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar>
            <Nav navbar>
              {user ? (
                <>
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      nav
                      className="d-flex align-items-center">
                      <Avatar src={user.avatar && user.avatar.url} size="sm" />
                      {/* <span className="ml-2">Profile</span> */}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/my-profile">
                        <i className="now-ui-icons users_single-02"></i>
                        Profile
                      </DropdownItem>
                      {user && user.role === "admin" && (
                        <DropdownItem href="/dashboard">
                          <i className="now-ui-icons business_chart-bar-32"></i>
                          Dashboard
                        </DropdownItem>
                      )}
                      <DropdownItem href="/" onClick={logoutHandler}>
                        <i className="now-ui-icons media-1_button-power"></i>
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              ) : (
                <>
                  <NavItem>
                    <NavLink href="/login">
                      <i className="now-ui-icons users_circle-08"></i>
                      <p>Login</p>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default IndexNavbar;
