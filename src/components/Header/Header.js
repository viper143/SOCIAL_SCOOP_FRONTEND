import axios from "axios";
import { data } from "jquery";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from 'socket.io-client';
import Logo from "../images/logo-social.png";

const socket = io("http://localhost:5000");

const Header = () => {
  const navigate = useNavigate();

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  const token = localStorage.getItem("token");
  const user = parseJwt(token);

  const [notifications, setNotifications] = useState([]);
  // console.log(notifications);
  // load notifications
  useEffect(() => {
    axios.get("/notification").then(function (result) {
      // console.log(result);
      // setNotifications([...notifications, result.data.notifications]);
      setNotifications(result.data.notifications);
      // console.log(result.data.notifications);
    });
  });

  // logout session
  function Logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    toast.success("Logged out sucessfully", {
      position: toast.POSITION.TOP_RIGHT,
    }, []);
    navigate("/login");
  }

  return (
    <>
      {/* ========== AppBar ================ */}
      <div
        className="bg-white d-flex align-items-center fixed-top shadow"
        style={{ minHeight: 62, zIndex: 9999 }}
      >
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* search */}
            <div className="col d-flex align-items-center">
              {/* logo */}
              <Link to="/home">
                {/* <i
                  className="fab fa-facebook text-primary"
                  style={{ fontSize: "3rem" }}
                /> */}
                <img src={Logo} alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} />

              </Link>
              {/* search bar */}
              <div className="input-group ms-2">
                {/* mobile */}
                <span
                  className="input-prepend d-lg-none"
                  id="searchMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                  data-bs-auto-close="outside"
                >
                  <div
                    className="input-group-text bg-gray border-0 rounded-circle"
                    style={{ minHeight: 40 }}
                  >
                    <i className="fas fa-search text-muted" />
                  </div>
                </span>
                {/* desktop */}
                <span
                  className="input-prepend d-none d-lg-block"
                  id="searchMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  type="button"
                  data-bs-auto-close="outside"
                >
                  <div
                    className="input-group-text bg-gray border-0 rounded-pill"
                    style={{ minHeight: 40, minWidth: 230 }}
                  >
                    <i className="fas fa-search me-2 text-muted" />
                    <p className="m-0">Search Here</p>
                  </div>
                </span>
                {/* search dropdown start */}
                <ul
                  className="dropdown-menu border-0 shadow p-3 overflow-auto"
                  aria-labelledby="searchMenu"
                  style={{ width: "20em", maxHeight: 600 }}
                >
                  {/* search input */}
                  <li>
                    <input
                      type="search"
                      className="rounded-pill border-0 bg-gray dropdown-item"
                      placeholder="Search history.."
                      autofocus
                    />
                  </li>
                  {/* search result */}
                  {/* result1 */}
                  <li className="my-2">
                    <div
                      className="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src="https://source.unsplash.com/random/1"
                          alt="avatar"
                          className="rounded-circle me-2"
                          style={{ width: 35, height: 35, objectFit: "cover" }}
                        />
                        <p className="m-0">Hari</p>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        style={{ fontSize: "1.2rem" }}
                      ></button>
                    </div>
                  </li>
                  {/* result2 */}
                  <li className="my-2">
                    <div
                      className="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src="https://source.unsplash.com/random/2"
                          alt="avatar"
                          className="rounded-circle me-2"
                          style={{ width: 35, height: 35, objectFit: "cover" }}
                        />
                        <p className="m-0">Lorem Ispum</p>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        style={{ fontSize: "1.2rem" }}
                      ></button>
                    </div>
                  </li>
                  {/* result3 */}
                  <li className="my-2">
                    <div
                      className="alert fade show dropdown-item p-1 m-0 d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src="https://source.unsplash.com/random/3"
                          alt="avatar"
                          className="rounded-circle me-2"
                          style={{ width: 35, height: 35, objectFit: "cover" }}
                        />
                        <p className="m-0">Lorem Ispum gghh</p>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        style={{ fontSize: "1.2rem" }}
                      ></button>
                    </div>
                  </li>
                </ul>
                {/* search dropdown end */}
              </div>
            </div>
            {/* nav */}
            <div className="col d-none d-lg-flex justify-content-center">
              {/* home */}
              <div className="mx-4 nav__btn nav__btn-active">
                <Link to="/home" className="btn px-4">
                  <i className="fas fa-home text-muted fs-4" />
                </Link>
                {/* <button className="btn px-4">
                </button> */}
              </div>
              {/* market */}
              <div className="mx-4 nav__btn">
                <Link to="#" className="btn px-4">
                  <i className="fas fa-store text-muted fs-4" />
                </Link>
              </div>
              {/* group */}
              <div className="mx-4 nav__btn mt-2">
                <a href="/friends-request" className="text-decoration-none">
                  <i className="fas fa-users position-relative text-muted fs-4">
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.5rem" }}
                    >
                      1
                      <span className="visually-hidden" />
                    </span>
                  </i>
                </a>
              </div>
              {/* gaming */}
              <div className="mx-4 nav__btn">
                <button className="btn px-4">
                  <i className="fas fa-gamepad text-muted fs-4" />
                </button>
              </div>
            </div>
            {/* menus */}
            <div className="col d-flex align-items-center justify-content-end me-4">
              {/* avatar  */}
              <div className="d-flex align-items-center justify-content-center">
                <a href={`/userprofile/${user.cusId}/${socket.id}`}>
                  {user.user.image ? (
                    <img
                      src={`http://localhost:5000/home/${user.user.image}`}
                      alt="A"
                      className="rounded-circle me-2"
                      style={{ width: 38, height: 38, objectFit: "cover" }}
                    />
                  ) : (
                    <>
                      <img
                        src={data.user.image}
                        alt="A"
                        className="rounded-circle me-2"
                        style={{ width: 38, height: 38, objectFit: "cover" }}
                      />
                    </>
                  )}
                </a>
                <p className="m-0">{user.username}</p>
              </div>
              {/* message section start here */}
              <div
                className="d-flex align-items-center justify-content-center p-1 mx-2 bg-gray rounded-circle position-relative"
                style={{ width: 38, height: 38, objectFit: "cover" }}
                type="button"
                data-bs-auto-close="outside"
              >
                <Link to={'/messaging'} className="text-decoration-none">
                  <i className="fas fa-comment" />
                </Link>
                {/* <i className="fas fa-comment" />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications?.length}
                  <span class="visually-hidden">unread messages</span>
                </span> */}
              </div>
              {/* message section end here */}
              {/* notifications start here */}
              <div
                className="d-flex align-items-center justify-content-center p-1 mx-2 bg-gray rounded-circle position-relative"
                style={{ width: 38, height: 38, objectFit: "cover" }}
                id="mainMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="button"
                data-bs-auto-close="outside"
              >
                <i className="fas fa-bell" />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications?.length}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </div>
              {/* notifications end here */}

              {/* dropdown arrow start here */}
              <div
                class="dropdown d-flex align-items-center justify-content-center p-1 mx-2 bg-gray rounded-circle position-relative"
                style={{ width: 38, height: 38, objectFit: "cover" }}
              >
                <div
                  class="btn"
                  type="button"
                  id="exatraFeatures"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ outline: "none" }}
                >
                  <i
                    className="fas fa-caret-down"
                    style={{ fontSize: "25px" }}
                  />
                </div>
                <ul
                  class="dropdown-menu border-0 shadow"
                  aria-labelledby="exatraFeatures"
                >
                  <li className="dropdown-item d-flex align-items-start justify-content-start">
                    <Link
                      className="align-items-start text-decoration-none"
                      to="#"
                    >
                      <div className="d-flex align-items-start justify-content-start px-1 py-0 my-0">
                        <a href="/userprofile">
                          {/* {console.log(user.user.image)} */}
                          {user.user.image ? (
                            <img
                              src={`http://localhost:5000/home/${user.user.image}`}
                              alt="A"
                              className="rounded-circle me-2"
                              style={{
                                width: 38,
                                height: 38,
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <img
                              src={data.image}
                              alt="A"
                              className="rounded-circle me-2"
                              style={{
                                width: 38,
                                height: 38,
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </a>
                        <p className="m-0 pt-1 text-dark">{user.username}</p>
                      </div>
                    </Link>
                  </li>
                  <hr className="m-0 p-0" />
                  {/* for mobile only start here */}
                  <li className="dropdown-item d-lg-none d-flex align-items-start mt-2 justify-content-start">
                    <img
                      src="https://source.unsplash.com/random/10"
                      alt="A"
                      className="rounded-circle me-2"
                      style={{
                        width: 25,
                        height: 25,
                        objectFit: "cover",
                      }}
                    />
                    <Link class="text-decoration-none text-dark" to="/post/your-posts">
                      Your Posts
                    </Link>
                  </li>
                  <li className="dropdown-item d-lg-none d-flex align-items-start justify-content-start">
                    <img
                      src="https://source.unsplash.com/random/11"
                      alt="A"
                      className="rounded-circle me-2"
                      style={{
                        width: 25,
                        height: 25,
                        objectFit: "cover",
                      }}
                    />
                    <Link class="text-decoration-none text-dark" to="/post/save-to-favourite-post">
                      Saved Posts
                    </Link>
                  </li>
                  <li className="dropdown-item d-lg-none d-flex align-items-start justify-content-start">
                    <img
                      src="https://source.unsplash.com/random/11"
                      alt="A"
                      className="rounded-circle me-2"
                      style={{
                        width: 25,
                        height: 25,
                        objectFit: "cover",
                      }}
                    />
                    <Link class="text-decoration-none text-dark" to="/advertise/advertise-your-products">
                      Advertisement
                    </Link>
                  </li>
                  {/* for mobile only end here */}
                  <li className="dropdown-item d-flex align-items-start mt-sm-2 mt-lg-none justify-content-start">
                    <Link class="text-decoration-none text-dark" to="/settings">
                      <i className="fas fa-cog me-2 pt-1"></i> Settings
                    </Link>
                  </li>
                  <li className="dropdown-item d-flex align-items-start justify-content-start">

                    <button className="btn" onClick={Logout}>
                      <i className="fas fa-sign-out-alt me-2 pt-1"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
              {/* dropdown arrow end here */}
              {/* main menu dropdown start */}
              <ul
                className="dropdown-menu border-0 shadow p-3 overflow-auto"
                data-bs-target="#mainMenu"
                aria-labelledby="mainMenu"
                style={{ width: "23em", maxHeight: 600 }}
              >
                {/* menu  */}
                <div>
                  {/* header  */}
                  <li className="p-1 mx-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <h2 className="text"></h2>
                      <i
                        className="fas fa-check-circle bg-dark rounded-circle p-1 text-light"
                        type="button"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Marked all as Read"
                      ></i>
                    </div>
                  </li>
                  {/* all and unread msg */}
                  <li className="p-1 mx-2">
                    <div className="d-flex align-items-center justify-content-start">
                      <p
                        className="text bg-primary rounded-pill px-3 mx-2 text-white"
                        type="button"
                      >
                        All
                      </p>
                      <p
                        className="text bg-secondary rounded-pill px-3 mx-2 text-white"
                        type="button"
                      >
                        Unread
                      </p>
                    </div>
                  </li>
                  {/* <hr /> */}
                  <li className="p-1">
                    <div className="d-flex align-items-center justify-content-end">
                      <a href="#" className="text-decoration-none">
                        See all
                      </a>
                    </div>
                  </li>
                  {/* notified user details start here */}
                  {notifications.map((data, ind) => {
                    return (
                      notifications ?
                        <>
                          <li className="p-1 mx-2 my-2">
                            <div className="d-flex align-items-center justify-content-between rounded noti_bg px-2 py-1">
                              <div className="d-flex align-items-center justify-content-start">
                                {/* {data.user.image ? (
                                  <img
                                    src={`http://localhost:5000/home/${data.user?.image}`}
                                    alt="A"
                                    className="rounded-circle me-2"
                                    style={{
                                      width: 38,
                                      height: 38,
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <>
                                    <img
                                      src={data.image}
                                      alt="A"
                                      className="rounded-circle me-2"
                                      style={{
                                        width: 38,
                                        height: 38,
                                        objectFit: "cover",
                                      }}
                                    />
                                  </>
                                )} */}
                                <div className="align-items-center justify-content-start mx-1 my-0">
                                  <p
                                    className="text pt-2 pb-0"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    {data.notification}
                                  </p>
                                </div>
                              </div>
                              <div class="dropdown">
                                <div
                                  class="btn btn-secondary rounded-circle bb px-1 py-0 dropdown"
                                  type="button"
                                  id="notificationDeleteButton"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-h text-white"></i>
                                </div>
                                <ul
                                  class="dropdown-menu remove_noti border-0 shadow-sm"
                                  aria-labelledby="notificationDeleteButton"
                                >
                                  <li>
                                    <button class="dropdown-item">
                                      <span>
                                        <i className="fas fa-trash me-2"></i>
                                      </span>
                                      Remove Notifications
                                    </button>
                                  </li>
                                  <li>
                                    <button class="dropdown-item">
                                      <span>
                                        <i className="fas fa-trash me-2"></i>
                                      </span>
                                      Mark All as Read
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </li>
                        </>
                        :
                        <>

                          <li className="p-1 mx-2 my-2">
                            <div className="rounded">
                              <div className="text-center align-items-center justify-content-center">
                                <i
                                  className="fas fa-bell"
                                  style={{ fontSize: "2.5rem" }}
                                ></i>
                              </div>
                              <div className="text text-center align-items-center justify-content-center">
                                <p
                                  className="text text-center text-muted fw-bold"
                                  style={{ fontSize: "1.4rem" }}
                                >
                                  You have no notifications
                                </p>
                              </div>
                            </div>
                          </li>
                        </>
                    )
                    {/* notified user details end here */ }
                    <hr />
                    {/* if user doen't have an any notifications */ }
                  })}
                </div>
              </ul>
              {/* main menu dropdown end */}
              {/* dropdown arrow menu start here */}
              {/* <ul
                className="dropdown-menu border-0 shadow p-3 overflow-auto"
                data-bs-target="#arrowDownHere"
                aria-labelledby="arrowDownHere"
                // style={{ width: "23em", maxHeight: 600 }}
              >
                <li className="link">hello</li>
              </ul> */}
              {/* dropdown arrow menu end here */}
            </div>
          </div>
        </div>
      </div>
      {/* AppBar code end here */}
    </>
  );
};

export default Header;
