import Header from "../Header/Header";
import MiddlePage from "./MiddlePage/MiddlePage";
import LeftPage from "./LeftPage/LeftPage";
import RightPage from "./RightPage/RightPage";
import io from 'socket.io-client';
import { parseJwt } from "../Auth/config";

const socket = io("http://localhost:5000");


const HomePage = () => {
  const token = localStorage.getItem('token');
  const user = parseJwt(token);

  socket.emit("addClient", ({userId: user.cusId, socketId: socket.id}));

  socket.on("notification", (data)=>{
    console.log(data);
  })
  
  
  return (
    <>
      {/* code has been deleted but the appbar code is in inside index.html */}
      {/* ========== AppBar code start here ================ */}
      <Header />
      {/* ========== Main Page start from here ================ */}
      <div className="container-fluid">
        <div className="row justify-content-evenly">
          {/* ========== Left sidebar start from here ================ */}
          <div className="col-12 col-lg-3">
            <LeftPage />
          </div>
          {/* ========== Left sidebar end to here ================ */}
          {/* ====================================================================================================== */}
          {/* ========== between bar or Timeline start from here ================ */}
          <div className="col-12 col-lg-6 pb-5">
            <MiddlePage data = {{socket: socket, user:user}} />
          </div>
          {/* ========== Left sidebar end to here ================ */}
          {/* ====================================================================================================== */}
          {/* ========== Right sidebar start from here ================ */}
          <div className="col-12 col-lg-3">
            <RightPage />
          </div>
          {/* ========== Right sidebar end to here ================ */}
        </div>
      </div>
      ;{/* ========== Main Page end to here ================ */}
    </>
  );
};

export default HomePage;
