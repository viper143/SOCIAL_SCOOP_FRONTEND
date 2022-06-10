import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";



const RightPage = () => {

  // getting advertise product data
  // const AdvertiseProduct = () =>{


  // }

  const [alluser, setAlluser] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/all-user').then(res => {
      setAlluser(res.data)
      console.log(res.data)
    })
  }, [])





  const addfrend = async (e, user2) => {
    console.log(user2)
    const res = await axios.post(`/add-friend/${user2}`)
    console.log(res.data)
    if (res.data.success) {
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER })
    } else {
      toast.error(res.data.message, { position: toast.POSITION.TOP_CENTER })
    }
  }
  return (
    <>
      <div
        className="d-none d-xl-block h-100 position-fixed end-0 overflow-hidden scrollbar"
        style={{
          maxWidth: 360,
          width: "100%",
          zIndex: 4,
          paddingTop: 65,
          left: "initial !important",
        }}
      >
        
        {/* next page start here */}
        <hr />
        <div className="d-flex justify-content-between align-items-center px-4">
          <div className="nav__btn">
            <i className="fas fa-user position-relative text-muted fs-4">
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.5rem" }}
              >
                1
                <span className="visually-hidden" />
              </span>
            </i>
            {/* <i class="fa-solid fa-user-group"></i> */}
            <span className="text text-secondary fw-bold mx-2">Friend Request</span>
          </div>
          <a href="/friends-request" className="text-decoration-none">See All</a>
        </div>

        {
          alluser.map(data => {
            return (
              <div className="my-3 bg-light px-3 py-2 rounded">
                <p className="m-0">{data.username}</p>
                <button onClick={e => addfrend(e, data._id)} type="button" method='post' className='btn btn-outline-primary d-block w-100'>
                  Add friend
                </button>
              </div>
            )
          })
        }
        <div className="d-flex align-items-between justify-content-between px-2 mx-2 mb-2">
          <h6 className="text text-start text-secondary mt-2">
            Suggestions For You.
          </h6>
          <Link
            to="/friends/friend-suggestion"
            className="btn btn-link text-decoration-none"
          >
            See all
          </Link>
        </div>
        {/* first friend suggestion start here */}
        <div className="d-flex align-items-between p-1 mx-1 mb-2 justify-content-between">
          <div className="d-flex align-items-start justify-content-start">
            <Link to="/userprofile">
              <img
                src="https://source.unsplash.com/random/9"
                alt="avatar"
                className="rounded-circle me-2"
                style={{
                  width: 45,
                  height: 45,
                  objectFit: "cover",
                }}
              />
            </Link>
            <div className="wow d-flex flex-column">
              <Link to="#" className="text-dark text-decoration-none fw-bold">
                roman5678
              </Link>
              <span className="text-muted">Roman Reings</span>
            </div>
          </div>
          <div className="mt-1">
            <Link to="#" className="btn btn-link text-decoration-none px-4">
              Follow
            </Link>
          </div>
        </div>
        {/* first friend suggestion end here */}
        {/* second friend suggestion start here */}
        <div className="d-flex align-items-between p-1 mx-1 mb-2 justify-content-between">
          <div className="d-flex align-items-start justify-content-start">
            <Link to="/userprofile">
              <img
                src="https://source.unsplash.com/random/6"
                alt="avatar"
                className="rounded-circle me-2"
                style={{
                  width: 45,
                  height: 45,
                  objectFit: "cover",
                }}
              />
            </Link>
            <div className="wow d-flex flex-column">
              <Link to="#" className="text-dark text-decoration-none fw-bold">
                justin9878
              </Link>
              <span className="text-muted">Justin</span>
            </div>
          </div>
          <div className="mt-1">
            <Link to="#" className="btn btn-link text-decoration-none px-4">
              Follow
            </Link>
          </div>
        </div>
        {/* second friend suggestion end here */}
        {/* third friend suggestion start here */}
        <div className="d-flex align-items-between p-1 mx-1 mb-2 justify-content-between">
          <div className="d-flex align-items-start justify-content-start">
            <Link to="/userprofile">
              <img
                src="https://source.unsplash.com/random/7"
                alt="avatar"
                className="rounded-circle me-2"
                style={{
                  width: 45,
                  height: 45,
                  objectFit: "cover",
                }}
              />
            </Link>
            <div className="wow d-flex flex-column">
              <Link to="#" className="text-dark text-decoration-none fw-bold">
                alex3567
              </Link>
              <span className="text-muted">Alex</span>
            </div>
          </div>
          <div className="mt-1">
            <Link to="#" className="btn btn-link text-decoration-none px-4">
              Follow
            </Link>
          </div>
        </div>
        {/* third friend suggestion end here */}
        {/* fourth friend suggestion start here */}
        <div className="d-flex align-items-between p-1 mx-1 mb-2 justify-content-between">
          <div className="d-flex align-items-start justify-content-start">
            <Link to="/userprofile">
              <img
                src="https://source.unsplash.com/random/8"
                alt="avatar"
                className="rounded-circle me-2"
                style={{
                  width: 45,
                  height: 45,
                  objectFit: "cover",
                }}
              />
            </Link>
            <div className="wow d-flex flex-column">
              <Link to="#" className="text-dark text-decoration-none fw-bold">
                mike2898
              </Link>
              <span className="text-muted">Mike</span>
            </div>
          </div>
          <div className="mt-1">
            <Link to="#" className="btn btn-link text-decoration-none px-4">
              Follow
            </Link>
          </div>
        </div>
        {/* fourth friend suggestion end here */}
        {/* fifth friend suggestion start here */}
        <div className="d-flex align-items-between p-1 mx-1 mb-2 justify-content-between">
          <div className="d-flex align-items-start justify-content-start">
            <Link to="/userprofile">
              <img
                src="https://source.unsplash.com/random/5"
                alt="avatar"
                className="rounded-circle me-2"
                style={{
                  width: 45,
                  height: 45,
                  objectFit: "cover",
                }}
              />
            </Link>
            <div className="wow d-flex flex-column">
              <Link to="#" className="text-dark text-decoration-none fw-bold">
                john5656
              </Link>
              <span className="text-muted">John</span>
            </div>
          </div>
          <div className="mt-1">
            <Link to="#" className="btn btn-link text-decoration-none px-4">
              Follow
            </Link>
          </div>
        </div>
        {/* fifth friend suggestion end here */}
        {/* next page end here */}
      </div>
    </>
  );
};

export default RightPage;
