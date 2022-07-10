import React from "react";
import Header from "../Header/Header";
import { parseJwt } from "../Auth/config";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $, { data } from "jquery";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

const UserProfile = ({ socket }) => {
  // const socket = useParams()?.socket;
  const userId = useParams().userId;

  const [user, setUser] = useState({});

  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  const token = localStorage.getItem("token");
  const userd = parseJwt(token);
  const userIdOfToken = userd.cusId;
  // console.log(user._id, userIdOfToken);
  // console.log(userId);

  useEffect(() => {
    axios.get(`/user/get_users/${userId}`).then(function (data) {
      // console.log("data",data.data.user)
      setUser(data.data.user);
      // console.log(user)
    });
  }, []);
  // const data = parseJwt(token);

  // comment
  //  const [followUser, setFollow] = useState("");
  //  const followData = async (cusId) => {
  //    // e.preventDefault()
  //    const followPost = await axios.post("/user/follow-friends", {
  //      following,
  //      cusId,
  //    });
  //    // console.log(commentPost);
  //  };

  const follow = (e) => {
    e.preventDefault();
    // console.log(socket.id);
    socket.emit("follow", {
      follower: userIdOfToken,
      following: userId,
    });
  };

  // unfollow user
  const unFollow = (e) => {
    e.preventDefault();
    socket.emit("unfollow", {
      follower: userIdOfToken,
      following: userId,
    });
  };

  // filter follower
  const [follower, setfollower] = useState({});
  // console.log("hello follower " + follower);
  const getFollower = () => {
    axios
      .get(`/follower/${userId}`, {
        following: userId,
      })
      .then(function (result) {
        setfollower(result.data);
        // console.log("hello mugi follower" + result.follower)
      });
  };
  useEffect(() => {
    getFollower();
  });

  return (
    <>
      <Header />
      {/* profile page  */}
      <div className="main mt-5 mb-3 pb-1 container-fluid">
        {/*  border-bottom border-muted */}
        {/* Profile and cover photo details page code start here */}
        <div className="container col-12 col-md-8 col-lg-8 border-0">
          {/* background image code start here */}
          <div
            className="cover-image rounded"
            style={{
              background: `linear-gradient(to right, rgba(0,0,0,0.67), rgba(0,0,0,0.70), rgba(0,0,0,0.75), rgba(0,0,0,0.70), rgba(0,0,0,0.68)), url("https://source.unsplash.com/random/4")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "350px",
            }}
          >
            <div className="position-relative" style={{ paddingTop: "60px" }}>
              <div className="position-absolute top-100 start-50 translate-middle-x">
                {user?.image ? (
                  <img
                    src={`http://localhost:5000/home/${user?.image}`}
                    alt="A"
                    className="rounded-circle me-2"
                    style={{ width: 170, height: 170, objectFit: "cover" }}
                  />
                ) : (
                  <>
                    {/* <img
                        src= {data.user.image}
                        // "https://source.unsplash.com/random/4"
                        alt="A"
                        className="rounded-circle me-2"
                        style={{ width: 170, height: 170, objectFit: "cover" }}
                      /> */}
                  </>
                )}
                <h4 className="text py-0 my-0  text-center text-light align-items-center justify-content-center">
                  {user.firstname + " " + user.lastname}
                </h4>
                <p className="text pt-0 mt-0 text-center text-muted align-items-center justify-content-center">
                  @{user.username}
                </p>
                {userIdOfToken === user?._id ? (
                  <>
                    <a
                      className="btn btn-outline-secondary text-light px-5 edit-btn py-2 mb-2"
                      href={`/profile/update-profile-details/${user?._id}`}
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit
                      {/* Follow */}
                    </a>
                  </>
                ) : (
                  <>
                  {
                    console.log("follower "+ getFollower.follower)
                    // console.log("follower "+ follower.follower)

                  }
                  {
                    console.log("UserIdOfToken " + userIdOfToken)
                  }
                    {userIdOfToken !== getFollower?.follower ? (
                      <button
                        onClick={follow}
                        className="btn btn-outline-secondary text-light px-5 edit-btn py-2 mb-2"
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        onClick={unFollow}
                        className="btn btn-outline-secondary text-light px-5 edit-btn py-2 mb-2"
                      >
                        Unfollow
                      </button>
                    )}
                  </>
                )}
                {/* <div className="d-flex align-items-center justify-content-center">
                  <a
                    className="btn btn-outline-secondary text-light px-5 edit-btn py-2 mb-2"
                    href={`/profile/update-profile-details/${user.cusId}`}
                  >
                    <i className="fas fa-edit me-2"></i>
                    Edit
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          {/* background image code end here */}
        </div>
        {/* Profile and cover photo details page code end here */}
      </div>
      <div className="container col-11 col-md-7 col-lg-7 border-0 shadow-sm rounded pb-3">
        {/* introduction section code start here */}
        <div className=" align-items-center justify-content-center">
          <h4 className="text text-center text-dark">Introduction</h4>
          <p className="text text-center text-muted">
            "The Powerful People Come From Powerful Places, Powerful People Make
            Places POWERFUL💪."
          </p>
          <div className="d-flex align-items-center justify-content-center">
            <a className="btn btn-primary px-4 edit-btn py-2 mb-2">
              Edit Intro
            </a>
            {/* <button className="btn btn-primary px-4 edit-btn py-2 mb-2">
              Edit Intro
            </button> */}
          </div>
        </div>
        {/* introduction section code end here */}
        {/* followers, following, posts details code start here */}
        <div className="d-flex align-items-center justify-content-center py-3">
          <div className="d-flex justify-content-between col-12 col-md-8 col-lg-8">
            {/* count post details code start here */}
            <div className="align-items-center justify-content-center">
              <h5 className="text text-center text-dark">2</h5>
              <h5 className="text text-center text-dark fw-bold">Posts</h5>
            </div>
            {/* count post details code end here */}
            {/* count post details code start here */}
            <div className="align-items-center justify-content-center">
              <h5 className="text text-center text-dark">{data.length}</h5>
              <h5 className="text text-center text-dark fw-bold">Followers</h5>
            </div>
            {/* count post details code end here */}
            {/* count post details code start here */}
            <div className="align-items-center justify-content-center">
              <h5 className="text text-center text-dark">{data.length}</h5>
              <h5 className="text text-center text-dark fw-bold">Following</h5>
            </div>
            {/* count post details code end here */}
          </div>
        </div>
        {/* followers, following, posts details code end here */}
        {/* profile activity section code start here */}
        <div className="align-items-start justify-content-start">
          <div className="d-flex align-items-start justify-content-start rounded activity-bg px-2 pt-1">
            <h4 className="text text-start text-dark">Profile Activity</h4>
          </div>
          <div className="align-items-start justify-content-start rounded px-2">
            <div>
              <span className="text text-start text-dark px-2">Online</span>
            </div>
            <div>
              <span className="text text-start text-dark px-2">
                Join Date: 2022-01-22
              </span>
            </div>
          </div>
        </div>
        {/* profile activity section code end here */}
        {/* Profile Information section code start here */}
        <div className="align-items-start justify-content-start pt-3">
          <div className="d-flex align-items-start justify-content-start rounded activity-bg px-2 pt-1">
            <h4 className="text text-start text-dark">Profile Information</h4>
          </div>
          <div className="align-items-start justify-content-start rounded px-2">
            <div className="align-items-start justify-content-evently">
              <span className="text text-start text-dark px-2">Location</span>
              <span className="text text-start text-dark px-2">Janakpur</span>
            </div>
          </div>
        </div>
        {/* Profile Information section code end here */}
      </div>
      {/* profile page  */}
    </>
  );
};

export default UserProfile;
