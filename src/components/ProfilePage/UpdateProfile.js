import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useParams  } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateProfile = () => {

  // function parseJwt(token) {
  //   if (!token) {
  //     return;
  //   }
  //   const base64Url = token.split(".")[1];
  //   const base64 = base64Url.replace("-", "+").replace("_", "/");
  //   return JSON.parse(window.atob(base64));
  // }
  // const token = localStorage.getItem("token");
  // const user = parseJwt(token);


  const id = useParams().id
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");

// console.log(id);
  const updateProfileDetails = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("userId", id)
    form.append("firstname", firstname);
    form.append("lastname", lastname);
    form.append("address", address);
    form.append("username", username);
    form.append("image", image);
    axios.put(`/user/update/${id}`,form).then((result) => {
      // console.log(result);
      if (result.data.type === "success") {
        console.log(result );
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.error(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  };

  const userId = id;
  useEffect(()=>{
    axios.get(`/user/get_users/${userId}`).then((result)=>{
      setFirstname(result.data.firstname);
      setLastname(result.data.lastname);
      setAddress(result.data.address);
      setUsername(result.data.username);
      setImage(result.data.image);
      // console.log(result.data.firstname);
    })
  }, [userId])

  return (
    <>
      <Header /> 
      <div className="container col-12 col-md-6 my-3" style={{ paddingTop: 100 }}>
        <div className="row col-md-12 rounded p-3 shadow-sm">
          <h2 className="text text-center text-dark pb-4">
            Update your Profile Details
          </h2>
          <div className="imag-box">
            <img src={"http://localhost:5000/"+image} className="img-fluid" alt="jbvjjhh" />
          </div>
          {/* {firstname} <br />
          {lastname} <br />
          {address} <br />
          {username} <br />
          {image} <br /> */}
          {/* profile preview start here */}
          
          {/* profile preview end here */}
          <form method="POST">
          <div className="input-field align-items-center justify-content-center px-5 py-1 mt-4">
            <div className="px-2 pt-1 align-items-center justify-content-center">
              <div class="mb-3 row">
                <label for="firstname" class="col-sm-3 col-form-label">
                  <h5 className="text text-dark">Firstname</h5>
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="firstname"
                    placeholder="Enter your firstname"
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="lastname" class="col-sm-3 col-form-label">
                  <h5 className="text text-dark">Lastname</h5>
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="lastname"
                    placeholder="Enter your lastname"
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                  />
                </div>
              </div>
              {/* <div class="mb-3 row">
                <label for="address" class="col-sm-3 col-form-label">
                  <h5 className="text text-dark">Gender</h5>
                </label>
                <div class="col-sm-9">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Choose your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div> */}
              <div class="mb-3 row">
                <label for="address" class="col-sm-3 col-form-label">
                  <h5 className="text text-dark">Address</h5>
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="profile-picture" class="col-sm-3 col-form-label">
                  <h5 className="text text-dark">Profile Picture</h5>
                </label>
                <div class="col-sm-9">
                  <input
                    type="file"
                    class="form-control"
                    id="profile-picture"
                    // value={image}
                    onChange={(e)=>setImage(e.target.files[0])}
                  />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="username" class="col-sm-3 col-form-label">
                  <h5 className="text text-dark">Username</h5>
                </label>
                <div class="col-sm-9">
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center">
                  <button
                    className="btn btn-primary w-100 rounded"
                    type="submit"
                    onClick={updateProfileDetails}
                  >
                    <h4 className="text text-center">Update Profile</h4>
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
