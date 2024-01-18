import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { allStoreBranch } from "actions/storebranchActions";
import { MDBDataTable } from "mdbreact";

import Sidebar from "components/layout/admin/Sidebar";
import AdminNavbar from "components/layout/admin/AdminNavbar";

const StoreBranchList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, storeBranch } = useSelector(
    (state) => state.allStoreBranch
  );

  useEffect(() => {
    dispatch(allStoreBranch());
  }, [dispatch]);

  const setStoreBranch = () => {
    const data = {
      columns: [
        {
          label: "Store ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Branch No",
          field: "branchNo",
          sort: "asc",
        },
        {
          label: "Address",
          field: "address",
          sort: "asc",
        },
        {
          label: "Delivery Fee",
          field: "deliverFee",
          sort: "asc",
        },
      ],

      rows: [],
    };

    storeBranch.forEach((storeBranches) => {
      data.rows.push({
        id: storeBranches._id,
        branchNo: storeBranches.branchNo,
        address: `${storeBranches.houseNo}, ${storeBranches.purokNum}, ${storeBranches.streetName}, ${storeBranches.barangay}, ${storeBranches.city}`,
        deliverFee: storeBranches.deliverFee,
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
              <h2 className="title">List of Store Branch</h2>
              <button
                onClick={() => navigate("/storebranch")}
                className="btn btn-info btn-sm "
                style={{ marginBottom: "200px" }}>
                Register New Store Branch
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
                      data={setStoreBranch()}
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

export default StoreBranchList;
