import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "../HomePage/Style.css";

const YourPostsDetails = () => {
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

    //  get all quotes
    const [quotedata, setquotedata] = useState([]);

    //  get all quotes
    // const [quotedata, setquotedata] = useState([]);
    useEffect(() => {
      function getQuotes() {
        axios.get("/post/show-posts-details").then((res) => {
          setquotedata(res.data);
          // console.log(res.data);
        });
      }
      getQuotes();
    });
    const userId = user.cusId;

  return (
    <>
      <Header />
      <div
        className="container col-12 col-lg-6 pb-5"
        style={{ paddingTop: 90 }}
      >
        <h2 className="text text-secondary text-center mb-0 shadow rounded p-2">
          You had posted only 1 Post
        </h2>
        <hr />
        {/* first post start here  */}

        { quotedata.map((data, ind) => {
          return (
            <div className="bg-white p-4 rounded shadow mt-3">
              {/* authors start here  */}
              <div className="d-flex justify-content-between dropdownEllipsis">
                {/* avatar start here */}
                <div className="d-flex">
                  {data.user.image ? (
                    <Link to={`/userprofileuser/${data.user._id}`}>
                      <img
                        src={`http://localhost:5000/home/${data.user.image}`}
                        alt="A"
                        className="rounded-circle me-2"
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  ) : (
                    <Link to="">
                      <img
                        src={data.image}
                        alt="A"
                        className="rounded-circle me-2"
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  )}
                  <div>
                    <p className="m-0 fw-bold">{data.user.username}</p>
                    <span className="text-muted fs-7 ">
                      {data.date}
                    </span>
                  </div>
                </div>
                {/* avatar end here */}
                {/* ====================================== */}
                {/* edit start here */}
                <i
                  className="fas fa-ellipsis-h"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="firstPostMenu"
                />
                {/* edit end here */}
                {/* ====================================== */}
                {/* edit menu start here */}
                <ul
                  className="dropdown-menu border-0 shadow menuEllipsis"
                  aria-labelledby="firstPostMenu"
                >
                  <li className="d-flex align-items-center">
                    <button
                      className="btn dropdown-item"
                      type="button"
                      // onClick={(e) => SavedPost(e, data._id)}
                    >
                      <i className="fas fa-heart me-2"></i>
                      Save to Favourite
                    </button>
                  </li>
                  <li className="d-flex align-items-center">
                    <button
                      className="btn dropdown-item"
                      // onClick={deleteQuote.bind(this, data._id)}
                      type="button"
                    >
                      <i className="fas fa-window-close me-2"></i>Hide Post
                    </button>
                  </li>
                </ul>
                {/* edit menu end here */}
              </div>
              {/* authors end here  */}
              {/* ================================================= */}
              {/* post content start here  */}
              <div className="mt-3">
                {/* content start here  */}
                <div>
                  <p>{data.photoquotes}</p>
                  <div className="img-prev position-relative" style={{}}>
                    {data.user.photo ? (
                      <>
                        <img
                          src={`http://localhost:5000/home/${data?.photo}`}
                          alt="follow icon"
                          className="me-2 "
                          height="100%"
                          style={{
                            objectFit: "cover",
                            height: "450px",
                            width: "100%",
                          }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {/* content end here  */}
                {/* ===================================== */}
                {/* like comment session start here */}
                <div className="position-relative mt-3 post__comment">
                  {/* likes start here  */}
                  <div
                    className="d-flex align-items-center position-absolute top-0 start-0"
                    style={{ height: 50, zIndex: 5 }}
                  >
                    <div className="me-2">
                      <i className="fas fa-arrow-up text-primary" />
                    </div>
                    <p className="m-0 text-muted fs-7">
                      Mike, John and 256 others
                    </p>
                  </div>
                  {/* likes end here  */}
                  {/* ========================================== */}
                  {/* comment start here  */}
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item border-0">
                      {/* comment collapse start here  */}
                      <h2 className="accordion-header" id="headingOne">
                        <div
                          className="accordion-button d-flex justify-content-end"
                          type="button"
                          onClick={() => $(`#${data._id}`).toggle()}
                        >
                          <p className="m-0 text-primary">3 comments</p>
                        </div>
                      </h2>
                      {/* comment collapse end here  */}
                      {/* =============================================== */}
                      {/* comment and likes bar start here  */}
                      <div className="d-flex justify-content-around">
                        {/* likes session start here  */}
                        <div
                          className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                          type="button"
                        >
                          <i className="fas fa-arrow-up me-3" />
                          <p className="m-0">Upvote</p>
                        </div>
                        {/* likes session end here  */}
                        {/* ============================================= */}
                        {/* comment session start here  */}
                        <div
                          className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                          type="button"
                          onClick={() => $(`#${data._id}`).toggle()}
                          // onClick={getCmnt(data._id)}
                        >
                          <i className="fas fa-comment-alt me-3" />
                          <p className="m-0 text-primary">comment</p>
                        </div>
                        {/* comment session end here  */}
                        {/* ============================================= */}
                        {/* downvote session start here  */}
                        <div
                          className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                          type="button"
                        >
                          <i className="fas fa-arrow-down me-3" />
                          <p className="m-0">Downvote</p>
                        </div>
                        {/* downvote session end here  */}
                      </div>
                      {/* comment and likes bar end here  */}
                      {/* =============================================== */}
                      {/* comment expand start here  */}
                      <div
                        id={data._id}
                        className="collapsed-div"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body bg-success">
                          {/* first comment start here  */}
                          <div className="d-flex align-items-center my-1">
                            {/* avatar start here */}
                            {data.user.image ? (
                              <img
                                src={`http://localhost:5000/home/${data.user.image}`}
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
                                  src={data.user.image}
                                  alt="A"
                                  className="rounded-circle me-2"
                                  style={{
                                    width: 38,
                                    height: 38,
                                    objectFit: "cover",
                                  }}
                                />
                              </>
                            )}
                            {/* avatar end here */}
                            {/* ====================================== */}
                            {/* comment text start here */}
                            <div className="p-3 rounded-pill w-100 commet__input">
                              {/* menu icon start here */}
                              <div className="d-flex justify-content-end">
                                <i
                                  className="fas fa-ellipsis-h"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                />
                                {/* edit menu start here */}
                                <ul
                                  className="dropdown-menu border-0 shadow"
                                  aria-labelledby="post1Menu"
                                >
                                  <li className="d-flex align-items-center">
                                    <a
                                      href="#"
                                      className="dropdown-item d-flex align-items-center justify-content-around fs-6"
                                    >
                                      Edit Comment
                                    </a>
                                  </li>
                                  <li className="d-flex align-items-center">
                                    <a
                                      href="#"
                                      className="dropdown-item d-flex align-items-center justify-content-around fs-6"
                                    >
                                      Delete Comment
                                    </a>
                                  </li>
                                </ul>
                                {/* edit menu end here */}
                              </div>
                              {/* menu icon end here */}
                              {/* ========================================= */}
                              {/* comment or text start here */}
                              <p className="fw-bold m-0">
                                {data.user.username}
                              </p>
                              <p className="m-0 bg-gray p-2 rounded">
                                {/* {data.postid.comment} */}
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit.
                              </p>
                              {/* comment or text end here */}
                            </div>
                            {/* comment text end here */}
                          </div>
                          {/* first comment end here  */}
                          {/* ====================================== */}
                          {/* create comment session start here  */}
                          <form className="d-flex my-1 ">
                            {/* avatar start here */}
                            <div>
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
                                <>
                                  <img
                                    src={data.user.image}
                                    alt="A"
                                    className="rounded-circle me-2"
                                    style={{
                                      width: 38,
                                      height: 38,
                                      objectFit: "cover",
                                    }}
                                  />
                                </>
                              )}
                            </div>
                            {/* avatar end here */}
                            {/* ============================================= */}
                            <div
                              className="d-flex w-100 rounded-pill bg-gray"
                              style={{ background: "#e3e6e4" }}
                            >
                              {/* input box start here */}
                              <input
                                type="text"
                                // onChange={(e) => setComment(e.target.value)}
                                className="form-control border-0 rounded-pill bg-gray"
                                placeholder="write a comment..."
                                // style={{ outline: "none" }}
                              />
                              {/* input box end here */}
                              <div
                                // onClick={(e) => comment(e, data._id)}
                                type="sumbit"
                                className="btn"
                              >
                                <i class="fas fa-paper-plane"></i>
                              </div>
                            </div>
                          </form>
                          {/* create comment session end here  */}
                        </div>
                      </div>
                      {/* comment expand end here  */}
                    </div>
                  </div>
                  {/* comment end here  */}
                </div>
                {/* like comment session end here */}
              </div>
              {/* post content end here  */}
            </div>
          );
        })}
        {/* first post end here  */}
        {/* ====================================================== */}
      </div>
    </>
  );
};

export default YourPostsDetails;
