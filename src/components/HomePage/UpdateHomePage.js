import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useNavigate, useParams  } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateHomePage = () => {

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


  const id = useParams().id
  const [photoquotes, setPhotoQuotes] = useState("");
  const [photo, setPhoto] = useState("");
  const update = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("photoquotes", photoquotes);
    form.append("images", photo);
    axios.put(`/both_photo_quotes/update/${id}`, form).then((result) => {
      if (result.data.type === "success") {
        console.log(result);
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/home");
      } else {
        toast.error(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  // get data
  useEffect(() => {
    function getData(){
      axios.get(`/post/details/${id}`).then((res)=>{
        setPhotoQuotes(res.data.photoquotes)
        setPhoto(res.data.photo)
      })
    }
    getData()
  }, []);
  
  //
  const PhotoUpload = () => {
    document.getElementById("uploadPhoto").click();
  };

  return (
    <>
      <Header />
      {/* create modal for photo start here =================== */}
      <div
        className="container col-12 col-md-5 my-3 rounded shadow-sm"
        style={{ paddingTop: 100 }}
      >
        <div className="align-items-center">
          <h4 className="text-dark text-center w-100 m-0">Update Post</h4>
        </div>
        {/* create body start here */}
        <div className="box">
          <div className="my-1 p-1">
            <div className="d-flex flex-column">
              {/* name start here  */}
              <div className="d-flex align-items-center">
                <div className="p-2">
                  <img
                    src={`http://localhost:5000/home/${user.user?.image}`}
                    alt="avatar"
                    className="rounded-circle"
                    style={{
                      width: 38,
                      height: 38,
                      objectFit: "cover",
                    }}
                  />
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
                  value={photoquotes}
                  onChange={e=>setPhotoQuotes(e.target.value)}
                />
              </div>
              <input
                type="file"
                className="form-control"
                hidden
                id="uploadPhoto"
                // value={photo}
                onChange={e=>setPhoto(e.target.files[0])}
              />
              {/* add photo session start here  */}
              <div
                className="my-2 rounded bbb"
                type="button"
                onClick={PhotoUpload}
              >
                <div className="p-1 rounded">
                  <div className="align-items-center justify-content-center py-5 px-3 rounded bg-gray">
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
        <hr />
        {/* create body end here */}
        <div className="box py-3">
          <div className="box">
            <button onClick={update} type="submit" className="btn btn-primary w-100">
              Update Post
            </button>
          </div>
          {/* create modal footer end here */}
        </div>
      </div>
    </>
  );
};

export default UpdateHomePage;
