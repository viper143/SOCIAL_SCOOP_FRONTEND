import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../../Header/Header'


const FriendsRequest = () => {

    const [requests, setRequests] = useState()

    useEffect(() => {
        axios.get('/friend-requests').then(function (res) {
            console.log(res.data)
            setRequests(res.data)
        })
    }, [])

    const acceptRequest = async (userId) => {
        const res =await axios.put(`/accept-request/${userId}`)
        console.log(res.data)
        if (res.data.success) {
            toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER })
        } else {
            toast.error(res.data.message, { position: toast.POSITION.TOP_CENTER })
        }
    }

    return (
        <>
            <Header />
            <div className="container-fluid" style={{ paddingTop: "80px" }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <p className="text text-secondary fs-5 text-start mb-0">Frined Requests</p>
                        <a href="#" className="text-decoration-none">See All</a>
                    </div>
                    <hr className="mb-4 mt-0" />
                    <div className="userss">
                        <div className="row">
                            {requests?.map((val, ind) => {
                                return (
                                    <div className="col-md-4">
                                        <div className="py-3 px-2 border rounded shadow-sm mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <img src="https://cdn.pixabay.com/photo/2018/03/01/14/57/portrait-3190849__340.jpg" alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%" }} />
                                                    <div className="mx-2">
                                                        <p className="text text-secondary fw-bold mb-0">{val.sender.username}</p>
                                                        <small className="d-block text-secondary">3 mutual friends</small>
                                                    </div>
                                                </div>
                                                <div className="mx-2">
                                                    <button onClick={acceptRequest.bind(this, val.sender._id)} className="btn btn-primary px-3 mx-2">Confirm</button>
                                                    <button className="btn btn-danger px-3">Remove</button>
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
    )
}

export default FriendsRequest