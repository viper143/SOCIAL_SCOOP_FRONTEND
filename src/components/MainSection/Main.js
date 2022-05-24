import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import SaveToFavourite from "../FavouritePost/SaveToFavourite";
import GetStarted from "../GetStarted/GetStarted";
import ChangePassword from "../Header/ChangePassword";
import Settings from "../Header/Settings";
import AdvertiseProduct from "../HomePage/AdvertiseProduct";
import FriendSuggestion from "../HomePage/FriendSuggestion";
import HomePage from "../HomePage/HomePage";
import UpdateHomePage from "../HomePage/UpdateHomePage";
import YourPostsDetails from "../HomePage/YourPostsDetails";
import UpdateProfile from "../ProfilePage/UpdateProfile";
import UserProfile from "../ProfilePage/UserProfile";
import io from 'socket.io-client';
import FriendsRequest from "../HomePage/LeftPage/FriendsRequest";
import Messenger from "../messenger/Messenger"
import ChatPanel from "../ChatPanel/ChatPanel"
import { UserProvider } from "../context/UserContext";
import Friends from "../ChatPanel/Friends";
import Inbox from "../ChatPanel/Inbox"
const socket = io("http://localhost:5000");

const Main = () => {
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  const token = localStorage.getItem('token');
  const user = parseJwt(token);

  socket.emit("addClient", ({ userId: user?.cusId, socketId: socket.id }));

  socket.on("notification", (data) => {
    console.log(data);
  })
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/" element={<GetStarted />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/userprofile/:userId/:socket" element={<UserProfile />}></Route>
          <Route path="/userprofileuser/:userId" element={<UserProfile socket={socket} />}></Route>
          <Route path="/profile/update-profile-details/:id" element={<UpdateProfile />}></Route>
          <Route path="/home/post-update/:id" element={<UpdateHomePage />}></Route>
          <Route path="/post/save-to-favourite-post" element={<SaveToFavourite />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/post/your-posts" element={<YourPostsDetails />}></Route>
          <Route path="/friends/friend-suggestion" element={<FriendSuggestion />}></Route>
          <Route path="/advertise/advertise-your-products" element={<AdvertiseProduct />}></Route>
          <Route path="/friends-request" element={<FriendsRequest />}></Route>
          <Route path="/messaging" element={<ChatPanel></ChatPanel>}></Route>
          <Route path="/friends" element={<Friends></Friends>}></Route>
          <Route path="/messaging/inbox/:roomId" element={<Inbox></Inbox>}></Route>
          {/* <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <messenger />}
        </Route> */}
          <Route path="/messenger" element={<Messenger />}></Route>
        </Routes>
      </UserProvider>
    </>
  );
};

export default Main;
