// import "./../../../assets/css/now-ui-dashboard.css";
// import "./../../../assets/css/bootstrap.min.css";
// import "./../../../assets/css/now-ui-dashboard.css?v=1.5.0";
// import "./../../../assets/demo/demo.css";
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button type="button" className="navbar-toggler">
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
          {/* <a className="navbar-brand" href="/dashboard">
            Dashboard
          </a> */}
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-bar navbar-kebab"></span>
          <span className="navbar-toggler-bar navbar-kebab"></span>
          <span className="navbar-toggler-bar navbar-kebab"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navigation">
          <form>
            <div className="input-group no-border">
              <input
                type="text"
                value=""
                className="form-control"
                placeholder="Search..."
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <i className="now-ui-icons ui-1_zoom-bold"></i>
                </div>
              </div>
            </div>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#pablo">
                <i className="now-ui-icons media-2_sound-wave"></i>
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                <i className="now-ui-icons users_single-02"></i>
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#pablo">
                <i className="now-ui-icons users_single-02"></i>
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
