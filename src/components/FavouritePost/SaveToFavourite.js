import Header from "../Header/Header";


const SaveToFavourite = () => {

  // getting save to favourite posts
  


  return (
    <>
      <Header />
      <div className="container col-12 col-lg-6 pb-5">
        <div
          className="d-flex flex-column justify-content-center w-100 mx-auto"
          style={{ maxWidth: 680, paddingTop: 75 }}
        >
          {/* first post start here  */}
          <div className="bg-white p-4 rounded shadow mt-3">
            {/* authors start here  */}
            <div className="d-flex justify-content-between ">
              {/* avatar start here */}
              <div className="d-flex">
                <img
                  src="https://source.unsplash.com/collection/happy-people"
                  alt="avatar"
                  className="rounded-circle me-2"
                  style={{ width: 38, height: 38, objectFit: "cover" }}
                />
                <div>
                  <p className="m-0 fw-bold">John</p>
                  <span className="text-muted fs-7 ">January 15 at 8:02pm</span>
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
                className="dropdown-menu border-0 shadow"
                aria-labelledby="firstPostMenu"
              >
                <li className="d-flex align-items-center">
                  <a
                    href="/home/post-update/16"
                    className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                  >
                    <i className="fas fa-edit me-2"></i> Edit Post
                  </a>
                </li>
                <li className="d-flex align-items-center">
                  <a
                    href="#"
                    className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                  >
                    <i className="fas fa-trash me-2"></i> Delete Post
                  </a>
                </li>
                <li className="d-flex align-items-center">
                  <a
                    href="/post/save-to-favourite-post"
                    className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                  >
                    <i className="fas fa-heart me-2"></i> Unsave to Favourite
                  </a>
                </li>
                <li className="d-flex align-items-center">
                  <a
                    href="#"
                    className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                  >
                    <i className="fas fa-window-close rounded me-2"></i> Hide
                    Post
                  </a>
                </li>
                <li className="d-flex align-items-center">
                  <a
                    href="#"
                    className="dropdown-item d-flex align-items-center justify-content-start fs-6"
                  >
                    <img
                      src="https://lh3.googleusercontent.com/Gk_0sMRw-DpSYBogYbQeLMRdU81mmot26-I8p5JGNym-zjHP-K5z8x3Pm30AAuUh1b1yDQ=s86"
                      alt="follow icon"
                      className="me-2 "
                      style={{ width: 20, height: 20, objectFit: "cover" }}
                    />{" "}
                    Unfollow John
                  </a>
                </li>
              </ul>
              {/* edit menu end here */}
            </div>
            {/* authors end here  */}
            {/* ================================================= */}
            {/* post content start here  */}
            <div className="mt-3">
              {/* content start here  */}
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Adipisci perspiciatis tempore aliquam quasi ullam sequi. Dicta
                  quis mollitia enim fugiat culpa reiciendis itaque ab tempore?
                </p>
                {/* <img
                        src="https://source.unsplash.com/random/12"
                        alt="post image"
                        className="img-fluid"
                        style={{ height: "100px" }}
                      /> */}
                <div
                  className="d-flex align-items-center rounded"
                  style={{
                    height: "450px",
                    width: "100%",
                    background: `url("https://source.unsplash.com/random/12")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "fill",
                  }}
                ></div>
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
                    {/* <i class="fab fa-gratipay text-danger"></i>
                                  <i class="fas fa-grin-squint text-warning"></i> */}
                  </div>
                  <p className="m-0 text-muted fs-7">
                    Mike, John and 256 others
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
                        className="accordion-button collapsed d-flex justify-content-end"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#postOne"
                        aria-expanded="true"
                        aria-controls="postOne"
                      >
                        <p className="m-0 text-primary">3 comments</p>
                      </div>
                    </h2>
                    {/* comment collapse end here  */}
                    {/* =============================================== */}
                    {/* comment and likes bar start here  */}
                    <div className="d-flex justify-content-around">
                      {/* likes session start here  */}
                      <div
                        className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                        type="button"
                      >
                        <i className="fas fa-arrow-up me-3" />
                        <p className="m-0">Like</p>
                      </div>
                      {/* likes session end here  */}
                      {/* ============================================= */}
                      {/* comment session start here  */}
                      <div
                        className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#postOne"
                        aria-expanded="true"
                        aria-controls="postOne"
                      >
                        <i className="fas fa-comment-alt me-3" />
                        <p className="m-0">Comment</p>
                      </div>
                      {/* comment session end here  */}
                      {/* ============================================= */}
                      {/* downvote session start here  */}
                      <div
                        className="d-flex align-items-center justify-content-center dropdown-item rounded text-muted p-1"
                        type="button"
                      >
                        <i className="fas fa-arrow-down me-3" />
                        <p className="m-0">Dislike</p>
                      </div>
                      {/* downvote session end here  */}
                    </div>
                    {/* comment and likes bar end here  */}
                    {/* =============================================== */}
                    {/* comment expand start here  */}
                    <div
                      id="postOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        {/* first comment start here  */}
                        <div className="d-flex align-items-center my-1">
                          {/* avatar start here */}
                          <img
                            src="https://source.unsplash.com/collection/happy-people"
                            alt="avatar"
                            className="rounded-circle me-2"
                            style={{
                              width: 38,
                              height: 38,
                              objectFit: "cover",
                            }}
                          />
                          {/* avatar end here */}
                          {/* ====================================== */}
                          {/* comment text start here */}
                          <div className="p-3 rounded-pill w-100 commet__input">
                            {/* menu icon start here */}
                            <div className="d-flex justify-content-end">
                              <i
                                className="fas fa-ellipsis-h"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                              {/* edit menu start here */}
                              <ul
                                className="dropdown-menu border-0 shadow"
                                aria-labelledby="post1Menu"
                              >
                                <li className="d-flex align-items-center">
                                  <a
                                    href="#"
                                    className="dropdown-item d-flex align-items-center justify-content-around fs-6"
                                  >
                                    Edit Comment
                                  </a>
                                </li>
                                <li className="d-flex align-items-center">
                                  <a
                                    href="#"
                                    className="dropdown-item d-flex align-items-center justify-content-around fs-6"
                                  >
                                    Delete Comment
                                  </a>
                                </li>
                              </ul>
                              {/* edit menu end here */}
                            </div>
                            {/* menu icon end here */}
                            {/* ========================================= */}
                            {/* comment or text start here */}
                            <p className="fw-bold m-0">John</p>
                            <p className="m-0 bg-gray p-2 rounded">
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit.
                            </p>
                            {/* comment or text end here */}
                          </div>
                          {/* comment text end here */}
                        </div>
                        {/* first comment end here  */}
                        {/* ====================================== */}
                        {/* second comment start here  */}
                        <div className="d-flex align-items-center my-1">
                          {/* avatar start here */}
                          <img
                            src="https://source.unsplash.com/random/1"
                            alt="avatar"
                            className="rounded-circle me-2"
                            style={{
                              width: 38,
                              height: 38,
                              objectFit: "cover",
                            }}
                          />
                          {/* avatar end here */}
                          {/* ====================================== */}
                          {/* comment text start here */}
                          <div className="p-3 rounded-pill w-100 commet__input">
                            {/* comment or text start here */}
                            <p className="fw-bold m-0">Mike</p>
                            <p className="m-0 bg-gray p-2 rounded">
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit.
                            </p>
                            {/* comment or text end here */}
                          </div>
                          {/* comment text end here */}
                        </div>
                        {/* second comment end here  */}
                        {/* ====================================== */}
                        {/* create comment session start here  */}
                        <form className="d-flex my-1 ">
                          {/* avatar start here */}
                          <div>
                            <img
                              src="https://source.unsplash.com/collection/happy-people"
                              alt="avatar"
                              className="rounded-circle me-2"
                              style={{
                                width: 38,
                                height: 38,
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          {/* avatar end here */}
                          {/* ============================================= */}
                          {/* input box start here */}
                          <input
                            type="text"
                            className="form-control border-0 rounded-pill bg-gray"
                            placeholder="write a comment..."
                          />
                          {/* input box end here */}
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
          {/* first post end here  */}
          {/* ====================================================== */}
        </div>
      </div>
    </>
  );
};

export default SaveToFavourite;
