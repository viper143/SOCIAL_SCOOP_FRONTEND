import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const ChatPanel = () => {

    const [user] = useContext(UserContext)
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        axios.get("/rooms").then(function (res) {
            setRooms(res.data.rooms)
        })
    }, [])

    const formatAMPM = (date)=> {

        var hours = date.getHours();
    
        var minutes = date.getMinutes();
    
        var ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
    
        hours = hours ? hours : 12; // the hour '0' should be '12'
    
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        var strTime = hours + ':' + minutes + ' ' + ampm;
    
        return strTime;
    
    }

    return (
        <>
            <div className='container mx-auto col-md-9 px-5 my-4'>
                <div className='border rounded' style={{ background: "#f1f1f1", height: '70ch' }}>
                    <div className='row h-100'>
                        <div className='col-md-4 my-4'>
                            <p className='text-xl fw-bold mx-3'>Chats</p>
                            <div className='d-flex'>
                            </div>

                            {
                                rooms.length > 0 ?
                                    <>
                                        {
                                            rooms.map((val, ind) => {
                                                return (
                                                    <div key={ind}>
                                                        <Link to={`/messaging/inbox/${val._id}`}>
                                                            <div className='d-flex mx-3 my-3 py-2 px-3 rounded hover' style={{ background: "#ffffff" }}>
                                                                <div className=''>
                                                                    <img className='rounded-circle' style={{ height: "4ch", width: "4ch", objectFit: "cover" }} src={`http://localhost:5000/home/${val?.user?.image}`} alt="pp" />
                                                                </div>
                                                                <div className='mx-2'>
                                                                    <small className='text-xs'>{val.user._id === user?._id ? val.creater.username : val.user.username}</small>
                                                                    <small className='d-block'></small>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </> :
                                    <>Loading...</>
                            }
                        </div>
                        <div className='col-md-8 d-flex'>
                            <div className='h-100' style={{ width: "1px", background: "#e0e0e0" }}></div>
                            <div className='d-flex w-100 align-items-center justify-content-center'>
                                <p className='d-block text-sm'>Select a conversation to chat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPanel