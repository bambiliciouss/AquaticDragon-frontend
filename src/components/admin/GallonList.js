import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { allGallons } from "actions/gallonActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/layout/admin/Sidebar";
import AdminNavbar from "components/layout/admin/AdminNavbar";
import QRCode from "react-qr-code";
const GallonList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, gallons } = useSelector((state) => state.allGallons);

  useEffect(() => {
    dispatch(allGallons());
  }, [dispatch]);

  const setGallons = () => {
    const data = {
      columns: [
        {
          label: "Gallon ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "QR Code",
          field: "qr",
          sort: "asc",
        },


        {
          label: "Type",
          field: "type",
          sort: "asc",
        },
        {
          label: "Age",
          field: "age",
          sort: "asc",
        },
      ],

      rows: [],
    };

    gallons.forEach((gallon) => {
      data.rows.push({
        id: gallon._id,
        type: gallon.type,
        age: gallon.gallonAge,
        qr: (
          <QRCode
          value={gallon._id}
          style={{
            width: "100px",
            height: "100px",
          }}
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
              <h2 className="title">List of Gallons</h2>
             
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
                      data={setGallons()}
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
export default GallonList;
