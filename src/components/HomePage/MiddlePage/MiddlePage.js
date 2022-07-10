// import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $, { get } from "jquery";
import { Socket } from "socket.io-client";
import "../MiddlePage/MiddlePage.css";

const MiddlePage = (props) => {
  const socket = props.data.socket;

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

  // div as an input image picker
  const PhotoUploadButton = () => {
    document.getElementById("uploadPhoto").click();
  };

  // image preview in div
  const uploadImage = (e) => {
    var image = e.target.files[0];
    // console.log(e);
    var src = URL.createObjectURL(image);
    //
    document.getElementById("image-preview").style.background =
      "url('" + src + "')";
    document.getElementById("image-preview").style.backgroundSize = "cover";
    document.getElementById("image-preview").style.backgroundPosition =
      "center";
    document.getElementById("image-preview").style.backgroundRepeat =
      "no-repeat";
    document.getElementById("image-preview").style.height = "35vh";
    $(".blab").toggle();
    setPhoto(image);
  };

  // const date = new Date().toLocaleString();
  // photo quotes only
  const [photoquotes, setPhotoQuotes] = useState("");
  const [photo, setPhoto] = useState("");

  const postPhotoQuotes = (e) => {
    const form = new FormData();
    form.append("photoquotes", photoquotes);
    form.append("images", photo);

    axios.post("/both-photo-quotes/post-photo", form).then((result) => {
      if (result.data.type === "success") {
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/home');
      } else {
        toast.error(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };
  //  get all quotes
  const [quotedata, setquotedata] = useState([]);
  //  get all quotes
  useEffect(() => {
    function getQuotes() {
      axios.get("/post/show-posts-details").then((res) => {
        setquotedata(res.data);
        console.log(res.data);
      });
    }
    getQuotes();
  },[]);
  const userId = user.cusId;
  // console.log(userId);

  // const [getAllComments, setGetAllComments] = useState([]);
  // useEffect(()=>{
  //   function getComment(){
  //     axios.get(`/comments/get/${postid}`).then((result)=>{
  //       setGetAllComments(result.data);
  //     })
  //   }
  //   getComment();
  // });

  // get comment

  // console.log(data[1].id);
  const [getallcoments, setGetallcoments] = useState([]);
  // console.log(getallcoments);
  const getCmnt = (postid) => {
    console.log(postid);
    axios.get(`/comments/get/${postid}`).then((result) => {
      setGetallcoments(result.data.comment);
      console.log(result.data.comment);
    });
  };
  // console.log(setGetallcoments.comment);
  // useEffect(() => {
  //   getCmnt();
  // }, []);

  //saved post
  const SavedPost = (e, quoteId) => {
    e.preventDefault();
    axios.post("/post/save-to-favourite", { quoteId }).then((result) => {
      console.log(result);
    });
  };

  // delete quotes
  const deleteQuote = (deleteid) => {
    // e.preventDefault();
    axios.delete(`/both_quotes_photo/delete/${deleteid}`).then((result) => {
      toast.success(result.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  // comment
  const [commentText, setComment] = useState("");
  const commentFetch = async (postid) => {
    // e.preventDefault()
    const commentPost = await axios.post("/comment/postcomment", {
      comment,
      postid,
    });
    // console.log(commentPost);
  };

  const comment = (e, post) => {
    e.preventDefault();
    console.log(socket.id);
    socket.emit("comment", {
      user: props.data.user.cusId,
      post: post,
      comment: commentText,
    });
  };

  // const datacmnt = [
  //   {"id":1},
  //   {"id":2},
  //   {"id":3}
  // ]

  // upvote and downvote start here 
  const [upvote, setUpvote] = useState(0);
  const [ downvote, setDownvote] = useState("")
  
  const [upvoteActive, setUpvoteActive] = useState(false);
  const [downvoteActive, setDownvoteActive] = useState(false);

  function Upvote(){
    if(upvoteActive){
      setUpvoteActive(false);
      setUpvote(upvote-1);
    }else{
      setUpvoteActive(true);
      setUpvote(upvote+1);
      if(downvoteActive){
        setDownvoteActive(false);
        setUpvote(upvote+1);
        setDownvote(downvote-1);
      }
    }
  }
  
  function Downvote(){
    if(downvoteActive){
      setDownvoteActive(false);
      setDownvote(downvote-1);
    }else{
      setDownvoteActive(true);
      setDownvote(downvote+1);
      if(upvoteActive){
        setUpvoteActive(false);
        setDownvote(downvote+1);
        setUpvote(upvote-1);
      }
    }
  }
  // upvote and downvote end here 

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center w-100 mx-auto"
        style={{ maxWidth: 680, paddingTop: 65 }}
      >
        {/* =========================================================================== */}
        {/* story session start here */}
        {/* story session end here */}
        {/* =========================================================================== */}
        {/* create post session start here */}
        <div className="bg-white p-3 mt-3 rounded border shadow">
          {/* avatar start here */}
          <div className="d-flex" type="button">
            <div className="p-1">
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
                  src={user.image}
                  alt="A"
                  className="rounded-circle me-2"
                  style={{
                    width: 38,
                    height: 38,
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <input
              type="text"
              className="form-control rounded-pill border-0 bg-gray"
              placeholder={"What's on your mind, " + `${user.username}` + "?"}
              disabled
              data-bs-toggle="modal"
              data-bs-target="#createPhotoModal"
            />
          </div>
          {/* avatar end here */}
          {/* actions post photo and quotes code start here */}
          <div className="d-flex flex-column flex-lg-row mt-3">
            {/* first action start here  */}
            <div
              className="d-flex align-items-center py-2 justify-content-center rounded dropdown-item"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#createPhotoModal"
            >
              <i className="fas fa-images me-2 text-success" />
              <p className="m-0 text-muted">Photo</p>
            </div>
            {/* first action end here  */}

            {/* ===================================================================================================== */}
            {/* create modal for photo start here =================== */}
            <div
              className="modal fade"
              id="createPhotoModal"
              tabIndex={-1}
              aria-labelledby="createPhotoModalLabel"
              aria-hidden="true"
              data-bs-backdrop="false"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  {/* create modal header start here */}
                  <div className="modal-header align-items-center">
                    <h5
                      className="text-dark text-center w-100 m-0"
                      id="createPhotoModalLabel"
                    >
                      Create Post
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  {/* create modal header end here */}
                  {/* ============================================== */}
                  {/* create modal body start here */}
                  <div className="modal-body">
                    <div className="my-1 p-1">
                      <div className="d-flex flex-column">
                        {/* name start here  */}
                        <div className="d-flex align-items-center">
                          <div className="p-2">
                            {user.user?.image ? (
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
                                src={user.image}
                                alt="A"
                                className="rounded-circle me-2"
                                style={{
                                  width: 38,
                                  height: 38,
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <p className="m-0 fw-bold ">{user.username}</p>
                            <select className="border-0 bg-gray w-75 fs-6">
                              <option value="public">Public</option>
                              <option value="pin to top">Pin To Top</option>
                              <option value="hide">Hide</option>
                            </select>
                          </div>
                        </div>
                        {/* name end here  */}
                        {/* =========================================== */}
                        {/* text input start here */}
                        <div>
                          <textarea
                            id
                            cols={30}
                            rows={2}
                            className="form-control border-0"
                            placeholder={
                              "What's on your mind, " + `${user.username}` + "?"
                            }
                            value={photoquotes}
                            onChange={(e) => setPhotoQuotes(e.target.value)}
                          />
                        </div>
                        <input
                          type="file"
                          className="form-control"
                          hidden
                          id="uploadPhoto"
                          onChange={(e) => uploadImage(e)}
                          // onChange={}
                        />
                        {/* <img src={photo.url} className="img-fluid" alt="" /> */}
                        {/* add photo session start here  */}
                        <div className="my-2 rounded bbb">
                          <div className="p-1 rounded">
                            <div
                              className="align-items-center justify-content-center py-5 px-3 rounded"
                              id="image-preview"
                              // style={{height: "40vh", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
                              onClick={PhotoUploadButton}
                            >
                              <div className="blab">
                                <div className="icon-box d-flex align-items-center justify-content-center">
                                  {/* <input type="file" className="form-control" /> */}
                                  <i
                                    className="fas fa-images icons rounded-circle p-2 bg-light"
                                    style={{ fontSize: "1.5rem" }}
                                  ></i>
                                </div>
                                <div className="box">
                                  <h5 className="text text-center text-dark mb-0 pb-0">
                                    Add Funny Photo
                                  </h5>
                                  <span className="text d-flex align-items-center justify-content-center text-secondary mt-0 pt-0">
                                    to laugh
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* add photo session end here  */}
                        {/* text input end here */}
                        {/* =========================================== */}
                        {/* emoji start here  */}
                        <div className="d-flex align-items-center justify-content-between">
                          <img
                            src="https:/www.facebook.com/images/composer/SATP_Aa_square-2x.png"
                            alt="from fb"
                            type="button"
                            style={{
                              width: 30,
                              height: 30,
                              objectFit: "cover",
                            }}
                          />
                          <i
                            className="far fa-laugh-wink fs-5 text-muted"
                            type="button"
                          />
                        </div>
                        {/* emoji end here  */}
                        {/* =========================================== */}
                      </div>
                    </div>
                  </div>
                  {/* create modal body end here */}
                  {/* ===================================================== */}
                  {/* create modal footer start here */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={postPhotoQuotes}
                    >
                      Post
                    </button>
                  </div>
                  {/* create modal footer end here */}
                </div>
              </div>
            </div>
            {/* create modal for photo end here ================ */}
            {/* ===================================================================================================== */}

            {/* second action start here  */}
            {/* <div
              className="d-flex align-items-center py-2 justify-content-center rounded dropdown-item"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              <i className="fas fa-smile-wink me-2 text-warning" />
              <p className="m-0 text-muted">Quotes</p>
            </div> */}
            {/* second action end here  */}
          </div>
          {/* actions post photo and quotes code end here */}
        </div>
        {/* create post session end here */}
        {/* =========================================================================== */}
        {/* create individual posts session start here */}
        {/* first post start here  */}
        {quotedata.map((data, ind) => {
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
                          width: 40,
                          height: 40,
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
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  )}
                  <div>
                    <h6 className="m-0 fw-bold">{data.user.username}</h6>
                    <span className="text-muted fs-7">
                      {/* January 15 at 8:02am */}
                      {data.date}
                      {/* {data.user.date} */}
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
                  {userId === data.user._id ? (
                    <>
                      <li className="d-flex align-items-center">
                        <Link
                          to={`/home/post-update/${data._id}`}
                          className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                        >
                          <i className="fas fa-edit me-2"></i> Edit Post
                        </Link>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {userId === data.user._id ? (
                    <>
                      <li className="d-flex align-items-center">
                        <button
                          className="btn dropdown-item"
                          onClick={deleteQuote.bind(this, data._id)}
                          type="button"
                        >
                          <i className="fas fa-trash me-2"></i>Delete Post
                        </button>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                  {userId === data.user._id ? (
                    <>
                      <li className="d-flex align-items-center">
                        <button
                          className="btn dropdown-item disabled"
                          type="button"
                          // onClick={(e) => SavedPost(e, data._id)}
                        >
                          <i className="fas fa-heart me-2"></i>
                          Save to Favourite
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="d-flex align-items-center">
                        <button
                          className="btn dropdown-item"
                          type="button"
                          onClick={(e) => SavedPost(e, data._id)}
                        >
                          <i className="fas fa-heart me-2"></i>
                          Save to Favourite
                        </button>
                      </li>
                    </>
                  )}

                  <li className="d-flex align-items-center">
                    <button
                      className="btn dropdown-item"
                      onClick={deleteQuote.bind(this, data._id)}
                      type="button"
                    >
                      <i className="fas fa-window-close me-2"></i>Hide Post
                    </button>
                  </li>
                  {/* <li className="d-flex align-items-center">
                    <a
                      href="#"
                      className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                    >
                      <img
                        src="https://lh3.googleusercontent.com/Gk_0sMRw-DpSYBogYbQeLMRdU81mmot26-I8p5JGNym-zjHP-K5z8x3Pm30AAuUh1b1yDQ=s86"
                        alt="A"
                        className="me-2"
                        style={{ width: 20, height: 20, objectFit: "cover" }}
                      />
                      Unfollow {user.username}
                    </a>
                  </li> */}
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
                    {data.photo ? (
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
                    <p className="m-0 text-muted fs-7" style={{fontSize: 20}}>
                      {/* Mike, John and 256 others */} {upvote}
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
                          <p className="m-0 text-primary">Show Comments</p>
                        </div>
                      </h2>
                      {/* comment collapse end here  */}
                      {/* =============================================== */}
                      {/* comment and likes bar start here  */}
                      <div className="d-flex justify-content-around">
                        {/* likes session start here  */}
                        <div
                          className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1 upvote"
                          type="button" 
                          onClick={Upvote}
                          // onClick={Upvote} className={[upvoteActive ? 'active-like':null,'button'].join(' ')} 
                        >
                          <i className="fas fa-arrow-up upvote me-3" />
                          <p className="m-0 upvote">LIKE</p>
                          {/* <div className={[upvoteActive ? 'active-like':null,'button'].join(' '), 'd-flex'} >
                          </div> */}
                        </div>
                        {/* likes session end here  */}
                        {/* ============================================= */}
                        {/* comment session start here  */}
                        <div
                          className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                          type="button"
                          // onClick={() => getCmnt(data._id)}
                          onClick={() => $(`#${data._id}`).toggle()}
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
                          <p className="m-0">DISLIKE</p>
                        </div>
                        {/* downvote session end here  */}
                      </div>
                      {/* comment and likes bar end here  */}
                      {/* =============================================== */}
                      {/* comment expand start here  */}
                      <div
                        id={data._id}
                        className="collapsed-div"
                        // key={index + 1}
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {/* first comment start here  */}
                          {getallcoments.map((data, ind) => {
                            return (
                              <div className="d-flex align-items-center">
                                {/* avatar start here */}
                                {data.user.image ? (
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
                                )}
                                {/* avatar end here */}
                                {/* ====================================== */}
                                {/* comment text start here */}
                                <div className="p-3 rounded-pill w-100 commet__input">
                                  
                                  {/* ========================================= */}
                                  {/* comment or text start here */}
                                  <p className="fw-bold m-0">
                                    {data.user.username}
                                  </p>
                                  <p className="m-0 bg-gray p-2 rounded">
                                    {/* {data.comment} */}
                                   {data.comment}
                                  </p>
                                  {/* comment or text end here */}
                                </div>
                                {/* comment text end here */}
                              </div>
                            );
                          })}
                          {/* first comment end here  */}
                          {/* ====================================== */}

                          {/* {getallcoments.map((data, index) => {
                            return (
                              <>
                                <p>{data.comment}</p>
                              </>
                            );
                          })} */}
                          {/* Condition for comments get end here  */}
                          <button className="btn btn-link text-dark my-2 mx-3" onClick={() => getCmnt(data._id)}>View Comment</button>

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
                              {/* <img
                                    src="https://source.unsplash.com/collection/happy-people"
                                    alt="avatar"
                                    className="rounded-circle me-2"
                                    style={{
                                      width: 38,
                                      height: 38,
                                      objectFit: "cover",
                                    }}
                                  /> */}
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
                                onChange={(e) => setComment(e.target.value)}
                                className="form-control border-0 rounded-pill bg-gray"
                                placeholder="write a comment..."
                                // style={{ outline: "none" }}
                              />
                              {/* input box end here */}
                              <div
                                onClick={(e) => comment(e, data._id)}
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
        {/* create individual posts session end here */}
        {/* =========================================================================== */}
      </div>
    </>
  );
};

export default MiddlePage;
