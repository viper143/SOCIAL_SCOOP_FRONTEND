import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import Header from '../Header/Header'
import {useNavigate} from 'react-router-dom'

const Friends = () => {

    const [friends, setFriends] = useState([]);
    const [user, setUser] = useContext(UserContext)

    useEffect(() => {
        axios.get('/friends').then(function (res) {
            console.log(res.data)
            setFriends(res.data)
        })
    }, [])

    const navigate = useNavigate()

    const chat = (user) => {

        const data = { user: user }

        axios.post("/create-room", data).then(function (res) {

            console.log(user)

            if (res.data.success) {

                console.log(res.data)

                navigate(`/messaging/inbox/${res.data.roomId}`)

            }

        })

    }

    return (
        <div>
            <>
                <Header />
                <div className="container-fluid" style={{ paddingTop: "80px" }}>
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <p className="text text-secondary fs-5 text-start mb-0">Friends</p>
                            <a href="#" className="text-decoration-none">See All</a>
                        </div>
                        <hr className="mb-4 mt-0" />
                        <div className="userss">
                            <div className="row">
                                {friends?.map((val, ind) => {
                                    return (
                                        <div className="col-md-4">
                                            <div className="py-3 px-2 border rounded shadow-sm mb-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex justify-content-start align-items-center">
                                                        <img src={`http://localhost:5000/home/${val.user?.image}`} alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%" }} />
                                                        <div className="mx-2">
                                                            {
                                                                user?._id === val.sender._id ?
                                                                    <p className="text text-secondary fw-bold mb-0">{val.receiver.username}</p> :
                                                                    <p className="text text-secondary fw-bold mb-0">{val.sender.username}</p>
                                                            }
                                                            <small className="d-block text-secondary">3 mutual friends</small>
                                                        </div>
                                                    </div>
                                                    <div className="mx-2">
                                                        <button onClick={chat.bind(this, user?._id === val.sender._id ? val.receiver._id: val.sender._id)} className="btn btn-primary px-3 mx-2">Message</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Friends