import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import "assets/css/now-ui-dashboard.css";
// import "assets/css/now-ui-dashboard.min.css";
// import "assets/js/now-ui-dashboard.js";

import "assets/css/now-ui-dashboard.css";

import Sidebar from "components/layout/admin/Sidebar";
import AdminNavbar from "components/layout/admin/AdminNavbar";
import { allUsers } from "../../actions/userActions";
import { allGallons } from "../../actions/gallonActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { gallons } = useSelector((state) => state.allGallons);

  useEffect(() => {
    dispatch(allUsers());
    dispatch(allGallons());
    console.log("users", users.length);
    // console.log("gallons", gallons.length);
  }, [dispatch]);

  return (
    <div className="wrapper ">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        <AdminNavbar />

        <div className="panel-header panel-header-lg">
          <canvas id="bigDashboardChart"></canvas>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-chart">
                <div className="card-header">
                  {/* <h5 className="card-category">Users</h5> */}
                  <h4 className="card-title">Number of Customers</h4>
                </div>
                <div className="card-body">
                  {/* <h4 className="card-title">{users && users.length}</h4> */}
                  <h4 className="card-title">
                    {users &&
                      users.filter((user) => user.role === "user").length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-chart">
                <div className="card-header">
                  {/* <h5 className="card-category">Users</h5> */}
                  <h4 className="card-title">Number of Employees</h4>
                </div>
                <div className="card-body">
                  {/* <h4 className="card-title">{users && users.length}</h4> */}
                  <h4 className="card-title">
                    {users &&
                      users.filter((user) => user.role === "employee").length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-chart">
                <div className="card-header">
                  {/* <h5 className="card-category">Users</h5> */}
                  <h4 className="card-title">Number of Riders</h4>
                </div>
                <div className="card-body">
                  {/* <h4 className="card-title">{users && users.length}</h4> */}
                  <h4 className="card-title">
                    {users &&
                      users.filter((user) => user.role === "rider").length}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card card-chart">
                <div className="card-header">
                  <h4 className="card-title">Number of Gallons</h4>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{gallons && gallons.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className=" container-fluid ">
            <nav>
              <ul>
                <li>
                  <a href="https://www.creative-tim.com">Creative Tim</a>
                </li>
                <li>
                  <a href="http://presentation.creative-tim.com">About Us</a>
                </li>
                <li>
                  <a href="http://blog.creative-tim.com">Blog</a>
                </li>
              </ul>
            </nav>
            <div className="copyright" id="copyright">
              &copy;{" "}
              <script>
                document.getElementById('copyright').appendChild(document.createTextNode(new
                Date().getFullYear()))
              </script>
              , Designed by{" "}
              <a href="https://www.invisionapp.com" target="_blank">
                Invision
              </a>
              . Coded by{" "}
              <a href="https://www.creative-tim.com" target="_blank">
                Creative Tim
              </a>
              .
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
