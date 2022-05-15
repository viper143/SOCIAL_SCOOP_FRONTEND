import "../Auth/Login.css";
import Logo from "../images/1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

  const navigate = useNavigate();

  const [email_address, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault(); // stop the default behaviour i.e. refresh
    const registerData = {
      email_address,
      username,
      password,
    };

    axios
      .post("http://localhost:5000/user/registration", registerData)
      .then((result) => {
        console.log(result.data.type === "success");
        if (result.data.type === "success") {
          toast.success(result.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate('/login');
        } else {
          toast.error(result.data.message, {
            // position: toast.POSITION.TOP_CENTER,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }).catch((e)=>{
        console.log(e);
      });
  };
  return (
    <>
      <div className="container-fluid p-0">
        <div className="container col-md-7 align-items-center shadow-sm border justify-content-center py-1 py-md-3 py-lg-3 px-md-2 px-lg-2 my-md-5 my-lg-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 align-items-center justify-content-center pt-md-5 pt-lg-5">
              <div className="img-box p-2 pt-md-3 pt-lg-3">
                <img
                  src={Logo}
                  alt="images"
                  className="col-md-12 rounded img-fluid"
                />
              </div>
            </div>
            <div className="col-12 col-md-5 col-lg-5 align-items-center justify-content-center pt-md-5 pt-lg-5">
              <div className="py-md-3 py-lg-3 align-items-center justify-content-center">
                <h3 className="text text-start text-dark ">
                  Create an Account
                </h3>
                <span className="text text-start text-dark">
                  To keep connected with us please Create your account with your
                  personal information.
                </span>
                <div className="form-box my-md-1">
                  <form className="my-3">
                    <div className="d-flex jpt mb-4">
                      <i className="fas fa-envelope mt-2 me-2 icons"></i>
                      <input
                        type="email"
                        id="emailaddress"
                        placeholder="Enter your Email Address"
                        required
                        value={email_address}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                    </div>
                    <div className="d-flex jpt mb-4">
                      <i className="fas fa-fingerprint mt-2 me-2 icons"></i>
                      <input
                        type="text"
                        id="username"
                        placeholder="Enter your Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="d-flex jpt mb-4">
                      <i className="fas fa-lock mt-2 me-2 icons"></i>
                      <input
                        type="password"
                        id="password"
                        placeholder="Enter your Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="button mt-4">
                      <button
                        className="btn btn-outline-primary px-3 w-100 rounded-pill"
                        type="submit"
                        onClick={registerUser}
                        // navigator="/login"
                      >
                        Create Account
                      </button>
                      <ToastContainer />
                    </div>
                    <div className="my-3 align-items-center justify-content-center">
                      <div className="d-flex">
                        <hr className="container" />
                        <small className="mt-1 mx-2">
                          <small className="text-muted">OR</small>
                        </small>
                        <hr className="container" />
                      </div>
                      <Link
                        className="text-center d-block text-decoration-none"
                        to="/login"
                      >
                        Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
