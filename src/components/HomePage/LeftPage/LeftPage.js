import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Follow from "../LeftPage/follow.png";
import Saved from "../LeftPage/saved.png";
import Posts from "../LeftPage/posts.png";
import Advertise from "../LeftPage/ad.png"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const LeftPage = () => {
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
  console.log(user)


  const [advertisedata, setAdvertiseData] = useState([]);
  const advertise = advertisedata.slice(0, 2)


  useEffect(() => {
    function getAdvertise() {
      axios.get("/get/promote-product").then((result) => {
        console.log(result.data);
        setAdvertiseData(result.data);
      });
    }
    getAdvertise();
  }, []);


  return (
    <>
      <div
        className="d-none d-xl-block h-100 fixed-top overflow-hidden"
        style={{ maxWidth: 360, width: "100%", zIndex: 4 }}
      >
        <ul
          className="navbar-nav mt-4 ms-3 d-flex flex-column pb-2"
          style={{ paddingTop: 65 }}
        >
          {/* top session start here */}
          {/* avatar */}
          <li className="dropdown-item p-1 rounded">
            
          </li>
          <li className="dropdown-item p-1 rounded">
            <a
              href="#"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={`http://localhost:5000/home/${user.user.image}`}
                  // src="https://source.unsplash.com/random?girl"
                  alt="A"
                  className="rounded-circle me-2"
                  style={{ width: 38, height: 38, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0">{user.username}</p>
              </div>
            </a>
          </li>
                    {/* item 1 start here */}
                    <li className="dropdown-item p-1 rounded">
            <Link
              to="/post/your-posts"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={Posts}
                  alt="avatar"
                  className="rounded me-2"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0">Your Posts</p>
              </div>
            </Link>
          </li>
          {/* item 1 end here */}
          {/* item 2 start here */}
          <li className="dropdown-item p-1 rounded">
            <Link
              to="/friends"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={Follow}
                  alt="avatar"
                  className="rounded me-2"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0">Followings</p>
              </div>
            </Link>
          </li>
          {/* item 2 end here */}
          {/* item 3 start here */}
          {/* item 2 end here */}
          {/* item 3 start here */}
          <li className="dropdown-item p-1 rounded">
            <Link
              to="#"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={Follow}
                  alt="avatar"
                  className="rounded me-2"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0">Followers</p>
              </div>
            </Link>
          </li>
          {/* item 3 end here */}
          {/* item 4 start here*/}
          <li className="dropdown-item p-1 rounded">
            <Link
              to="/post/save-to-favourite-post"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={Saved}
                  alt="avatar"
                  className="rounded me-2"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0">Saved Posts</p>
              </div>
            </Link>
          </li>
          {/* item 4 end here*/}
          {/* item 5 start here*/}
          <li className="dropdown-item p-1 rounded">
            <Link
              to="/post/save-to-favourite-post"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={Saved}
                  alt="avatar"
                  className="rounded me-2"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0">Saved Posts</p>
              </div>
            </Link>
          </li>
          {/* item 4 end here*/}
          {/* item 5 start here*/}
          <li className="dropdown-item p-1 rounded">
            <Link
              to="/advertise/advertise-your-products"
              className="text-decoration-none text-dark d-flex align-items-center"
            >
              <div className="p-2">
                <img
                  src={Advertise}
                  alt="avatar"
                  className="rounded me-2"
                  style={{ width: 30, height: 30, objectFit: "cover" }}
                />
              </div>
              <div>
                <p className="m-0"> Share your Post</p>
              </div>
            </Link>
          </li>
          {/* item 5 end here*/}
        </ul>
        {/* term  */}
        <hr className="mx-2" />
        <div className="footer align-items-center justify-content-center mx-3">
          <h6 className="text text-start mx-3 mb-2 text-muted">
            Your Shortcuts
          </h6>
          <i
            class="fas fa-exclamation-triangle text-secondary d-flex align-items-center justify-content-center mt-4"
            style={{ fontSize: "4rem" }}
          ></i>
          <h5 className="text text-secondary text-center mx-3 mt-2">
            No Shortcuts at the moment.
          </h5>
        </div>
        <hr className="mx-2" />
        {/* footer session start here */}
        <div className="align-items-start justify-content-start mx-3">
          <div className="d-flex mx-3 mt-4">
            <Link to="#" className="text-decoration-none text-muted me-1">
              Privacy
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="#" className="text-decoration-none text-muted mx-1">
              Terms
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="#" className="text-decoration-none text-muted mx-1">
              Advetising
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="#" className="text-decoration-none text-muted mx-1">
              Setting
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="#" className="text-decoration-none text-muted mx-1">
              More
            </Link>
            <span aria-hidden="true"> · </span>
          </div>
          <p className="text text-secondary mx-3 mt-1">
            Social_Scoop &copy; 2022 By &nbsp;
            <span>
              <Link to="#" className="text-decoration-none text-secondary">
                SOCIAL SCOOP
              </Link>
            </span>
          </p>
        </div>
        {/* footer session end here */}
      </div>
    </>
  );
};

export default LeftPage;
