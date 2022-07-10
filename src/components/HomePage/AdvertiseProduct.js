import Header from "../Header/Header";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdvertiseProduct = () => {
  const [advphoto, setADVPhoto] = useState("");
  const [pname, setPName] = useState("");
  const [plink, setPLink] = useState("");

  const postAdvertise = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("advertise_image", advphoto);
    form.append("pname", pname);
    form.append("plink", plink);

    axios.post("http://localhost:5000/add/promote-product", form).then((result) => {
      // console.log(result);
      if (result.data.type === "success") {
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

  return (
    <>
      <Header />
      <div className="container col-12 col-md-10 col-lg-7">
        <div className="container col-12 col-md-10 col-lg-8"  style={{ paddingTop: 120 }}>
          <h6 className="text text-start ms-2 text-secondary">
            Advertise Your Products.
          </h6>
          <div className="shadow-sm border rounded mb-3">
            {/* first friend suggestion start here */}
            <div className="d-flex align-items-between p-md-2 p-1 mx-1 mx-md-3 mb-2 justify-content-between">
              <div className="create-add w-100">
                <form className="my-3">
                  <div className="mb-3">
                    <label className="mb-2">Product Image</label>
                    <input
                      type="file"
                      className="form-control"
                      placeholder="Product Photo"
                      required
                      // value={advphoto}
                      onChange={(e) => {
                        setADVPhoto(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="mb-2">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      required
                      value={pname}
                      onChange={(e) => setPName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="mb-2">Product Link</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Eg. http://product.com"
                      required
                      value={plink}
                      onChange={(e) => setPLink(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    onClick={postAdvertise}
                  >
                    Promote Product
                  </button>
                </form>
              </div>
              {/* <div className="d-flex align-items-start justify-content-start">
                <a href="/userprofile">
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
                </a>
                <div className="wow d-flex flex-column">
                  <a
                    href="#"
                    className="text-dark text-decoration-none fw-bold"
                  >
                    username
                  </a>
                  <span className="text-muted">John</span>
                </div>
              </div>
              <div className="mt-1">
                <a href="#" className="btn btn-outline-primary px-md-4">
                  Follow
                </a>
              </div> */}
            </div>
            {/* first friend suggestion end here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseProduct;
