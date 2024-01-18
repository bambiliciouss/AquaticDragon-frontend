import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { allUsers } from "actions/userActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/layout/admin/Sidebar";
import AdminNavbar from "components/layout/admin/AdminNavbar";
const RiderList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  const setUsers = () => {
    const filter = user
      ? users.filter((x) => x._id !== user._id && x.role === "rider")
      : users;
    const data = {
      columns: [
        {
          label: "Customer ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Profile",
          field: "image",
          sort: "asc",
        },

        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Phone",
          field: "phone",
          sort: "asc",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },

        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
      ],

      rows: [],
    };

    filter.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: `${user.fname} ${user.lname}`,
        phone: user.phone,
        address: `${user.houseNo}, ${user.purokNum}, ${user.streetName}, ${user.barangay}, ${user.city}`,
        email: user.email,
        image: (
          <img
            className="d-block w-100"
            src={user.avatar.url}
            alt={user.title}
            img
            style={{ width: 50, height: 50 }}
          />
        ),
      });
    });

    return data;
  };

  return (
    <>
      <div className="wrapper ">
        <Sidebar />
        <div className="main-panel" id="main-panel">
          <AdminNavbar />
          <div className="panel-header">
            <div className="header text-center">
              <h2 className="title">List of Riders</h2>
              <button
                onClick={() => navigate("/rider")}
                className="btn btn-info btn-sm "
                style={{ marginBottom: "200px" }}>
                Register New Rider
              </button>
            </div>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  {/* <div className="card-header">
                      <h4 className="card-title"> All User</h4>
                    </div> */}
                  <div className="card-body">
                    <MDBDataTable
                      data={setUsers()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      noBottomColumns
                    />
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
    </>
  );
};
export default RiderList;
