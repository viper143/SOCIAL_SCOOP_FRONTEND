import "../Auth/Login.css";
import Logo from "../images/so.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    const loginData = {
      email, password
    }

    axios.post("http://localhost:5000/user/login_form", loginData).then((result)=>{
      console.log(result);
      if(result.data.type === "success"){
        localStorage.setItem("token", result.data.token);
        console.log(result.data.token);
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/home');
      } else{
        toast.error(result.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  }
  return (
    <>
      <div className="row mx-auto col-md-8 col-sm-12 my-5 pb-5 border shadow-sm rounded">
        <div className="col-md-6 col-sm-12 mt-5 pt-5">
          <img src={Logo} alt="image" className="col-12" />
        </div>
        <form className="py-2 col-md-4 col-sm-12 offset-2 mx-auto">
          <div className="mt-5 px-0 mb-4">
            <h2 className="fw-bolder py-2 px-0">Login</h2>
          </div>
          <div className="mb-3 d-flex jpt mt-2 px-2">
            <i className="fas fa-user mt-1 mr-2 icons"></i>
            <input
              type="text"
              class="rounded"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex jpt mt-2 px-2">
            <i className="fas fa-lock mt-1 mr-2 icons"></i>
            <input
              type="password"
              class=""
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="button mt-2">
            <Link
              className="btn btn-primary w-100 btn-lg rounded"
              to="#"
              onClick={loginUser}
            >
              Login
            </Link>
            <ToastContainer />
          </div>
          <div className="d-flex">
            <hr className="container" />
            <small className="mt-1 mx-2">
              <small className="text-muted">OR</small>
            </small>
            <hr className="container" />
          </div>
          <Link
            className="text-center d-block text-decoration-none"
            to="/register"
          >
            Create Account
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
