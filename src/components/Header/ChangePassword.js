import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  return (
    <>
      <Header />
      <div className="container col-12 col-md-6">
        <div className="col-12 col-md-12" style={{ paddingTop: 150 }}>
          <div className="border col-12 col-md-10 rounded shadow-sm p-2">
            <form>
              <div className="p-2">
                <h2 className="text-dark border-bottom border-muted mb-4">
                  Change Password
                </h2>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Enter Current Password"
                  />
                  <label for="floatingInput">Current Password</label>
                  <button
                    type="button"
                    class="btn btn-link text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Don't know your password?
                  </button>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Enter New Password"
                  />
                  <label for="floatingPassword">New Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Confirm your New Password"
                  />
                  <label for="floatingPassword">Confirm New Password</label>
                </div>

                {/* modal body start here */}
                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Reset Password
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <h5 className="text text-secondary text-center border-bottom border-muted">
                        The verification link will be sent to your mailbox. <br />
                          <span className="text d-flex align-items-center justify-content-center text-primary">
                            Check your email address.
                          </span>
                        </h5>
                        <div className="mt-3">
                          <label htmlFor="resetEmail" className="mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-primary w-100">
                            Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* modal body end here */}
              </div>
            </form>
            <div className="d-flex align-items-center justify-content-center mb-4">
              <button className="btn btn-primary d-flex align-items-center px-5 justify-content-center">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
