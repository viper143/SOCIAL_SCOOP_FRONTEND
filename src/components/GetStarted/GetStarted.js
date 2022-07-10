import Logo from "../images/intro.png";
import {Link} from 'react-router-dom';

const GetStarted = () => {
  return (
    <>
      <div className="container col-md-5 shadow-sm my-5 py-5">
        <div className="container col-md-11">
          <div className="box mb-3">
            <img src={Logo} alt="image" className="col-md-12" style={{ maxWidth: "100%" }} />
          </div>
          <div className="container pt-2 pb-3">
            <h2 className="text-center pt-2">
              Welcome To the Social Scoop.
            </h2>
            <h5 className="text-center text-dark pb-5 fs-2">
            The Social Scoop’s mission is to give people the power to build community 
            and bring the world closer together.
            </h5>
          </div>
          <div className="button">
            <Link
              className="btn btn-outline-danger text-center mx-auto w-100 getstartedbtn rounded-pill"
              to="/login" style={{fontSize:"1.2rem"}}
            >
              Get Started &#187;
            </Link>
          </div>
        </div>
      </div>
    </>
  );

};

export default GetStarted;
