import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myGallons, clearErrors } from "../../actions/gallonActions";
import Navbar from "components/layout/Headers/IndexNavbar";
import MetaData from "components/layout/MetaData";
import QRCode from "react-qr-code";

const MyGallon = () => {
  const dispatch = useDispatch();
  const { loading, error, gallon } = useSelector((state) => state.myGallon);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // The code below will only be executed if there is no error
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myGallons());
    // Cleanup previous body classes and scroll positions
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    // Cleanup function
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [dispatch, error]);

  // Check if gallon is undefined before slicing
  const itemsToDisplay = gallon
    ? gallon.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];

  const totalPages = gallon ? Math.ceil(gallon.length / itemsPerPage) : 1;
  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
        <a className="page-link" href="#" onClick={() => setCurrentPage(i)}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <>
      <Navbar />
      <MetaData title={"My Gallon/s"} />

      <div
        className="user-profile-container"
        style={{
          minHeight: "700px",
          marginTop: "90px",
          marginLeft: "20%",
          marginRight: "20%",
        }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div>
              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons users_single-02"
                  style={{ marginRight: "5px" }}></i>
                My Account
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link" href="/my-profile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/password/update">
                    Change Password
                  </a>
                </li>
              </ul>

              <h5
                className="title"
                style={{
                  marginBottom: "10px",
                  paddingTop: "10px",
                }}>
                <i
                  className="now-ui-icons ui-1_simple-add"
                  style={{ marginRight: "5px" }}></i>
                My Gallons
              </h5>

              <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
                <li>
                  <a className="nav-link active" href="/my-gallon">
                    List of my Gallon/s
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/register-gallon">
                    Register New Gallon
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header-profile ">
                      <h5
                        className="title"
                        style={{
                          marginBottom: "0px",
                          padding: "10px",
                          textAlign: "center",
                        }}>
                        List of my Gallon/s
                      </h5>

                      <h5
                        className="title"
                        style={{
                          fontsize: "small",
                          marginBottom: "0px",
                          padding: "10px",
                        }}>
                        No. of Gallon/s: {itemsToDisplay.length}
                      </h5>
                    </div>
                    <div className="card-body">
                      {itemsToDisplay.length === 0 ? (
                        <p>No gallons to display</p>
                      ) : (
                        <>
                          <div className="table-responsive">
                            <table className="table text-center">
                              <thead className="text-primary">
                                <th>QR Code</th>
                                <th>Type of Gallon</th>
                                <th>Gallon Age</th>
                                <th>Gallon Image</th>
                              </thead>
                              <tbody>
                                {itemsToDisplay.map((gallons) => (
                                  <tr key={gallons._id}>
                                    {/* <td>{gallons._id}</td> */}
                                    <td>
                                      <QRCode
                                        value={gallons._id}
                                        style={{
                                          width: "100px",
                                          height: "100px",
                                        }}
                                      />
                                    </td>
                                    <td>{gallons.type}</td>
                                    <td>{gallons.gallonAge}</td>
                                    <td>
                                      {gallons.gallonImage && (
                                        <img
                                          src={gallons.gallonImage.url}
                                          alt={gallons.type}
                                          style={{ width: "100px" }}
                                        />
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <nav
                            aria-label="Page navigation example"
                            className="d-flex justify-content-center">
                            <ul className="pagination">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}>
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                  }>
                                  Previous
                                </a>
                              </li>
                              {paginationItems}
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}>
                                <a
                                  className="page-link"
                                  href="#"
                                  onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                  }>
                                  Next
                                </a>
                              </li>
                            </ul>
                          </nav>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGallon;
