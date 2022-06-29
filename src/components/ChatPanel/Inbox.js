import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import io from 'socket.io-client'
import './style.css'
import $ from 'jquery'
import ScrollToBottom from 'react-scroll-to-bottom'


const socket = io.connect("http://localhost:5000")

const Inbox = () => {

    const roomId = useParams().roomId
    const [user] = useContext(UserContext)
    const [room, setRoom] = useState()
    const [rooms, setRooms] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [image, setImage] = useState()

    useEffect(() => {
        axios.get("/rooms").then(function (res) {
            setRooms(res.data.rooms)
        })
    }, [])

    useEffect(() => {
        axios.get(`/room/${roomId}`).then(function (res) {
            console.log(res.data.room)
            setRoom(res.data.room)
        })
    }, [roomId])

    useEffect(() => {
        socket.emit("joinRoom", { roomId: roomId })
    }, [roomId])

    useEffect(() => {
        axios.get(`/load-messages/${roomId}/${0}`).then(function (res) {
            setMessages(res.data.messages)
        })
    }, [roomId])

    useEffect(() => {
        console.log(user ? user : "No User")
    }, [])


    const formatAMPM = (date) => {

        var hours = date.getHours();

        var minutes = date.getMinutes();

        var ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;

        hours = hours ? hours : 12; // the hour '0' should be '12'

        minutes = minutes < 10 ? '0' + minutes : minutes;

        var strTime = hours + ':' + minutes + ' ' + ampm;

        return strTime;

    }


    const sendMessage = () => {
        const date = new Date(Date.now())
        const contact = user?._id === room.user._id ? room.creater._id : room.user._id
        const messageData = { sentBy: user?._id, sentTo: contact, message: message, room: room._id, date: date, time: formatAMPM(date) }
        if (image) {
            var fd = new FormData();
            fd.append('image', image)
            fd.append('sentBy', user?._id)
            fd.append('sentTo', contact)
            fd.append('message', message)
            fd.append('room', room._id)
            fd.append('date', date)
            fd.append('time', formatAMPM(date))

            axios.post("/send-image", fd)
            setImage()
            $('#img-preview').css({ visibility: "hidden", width: "0" })
            setMessage("")
        } else {
            socket.emit('sendMessage', (messageData))
            setMessage('')
        }
        // setMessages((list) => [...list, messageData])
        $(".message-container").scrollTop($(".message-container")[0].scrollHeight);

    }

    const selectImage = (file) => {
        file.url = URL.createObjectURL(file)
        setImage(file)
        $('#img-preview').css({ visibility: "visible", width: "4ch" })
    }

    useEffect(() => {
        socket.on("receiveMessage", (data) => {
            console.log(data)
            setMessages((list) => [...list, data])
            $(".message-container").scrollTop($(".message-container")[0].scrollHeight);

        })
    }, [roomId])


    return (
        <>
            <div className='container mx-auto col-md-9 px-5 my-4'>
                <div className='border rounded' style={{ background: "#f1f1f1", height: '70ch' }}>
                    <div className='row h-100'>
                        <div className='col-md-4 my-4'>
                            <p className='text-xl fw-bold mx-3'>Chats</p>
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
                                                                    <img className='rounded-circle' style={{ height: "4ch", width: "4ch", objectFit: "cover" }} src={`http://localhost:5000/home/${val.user._id === user?._id ? val.creater.image : val.user.image}`} alt="" />
                                                                </div>
                                                                <div className='mx-2'>
                                                                    <small className='text-xs'>{val.user._id === user?._id ? val.creater.username : val.user.username}</small>
                                                                    <small className='d-block'>{val.user._id === user?._id ? val.creater.email_address : val.user.email_address}</small>
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
                        <div className='col-md-5 d-flex'>
                            <div className='h-100' style={{ width: "1px", background: "#e0e0e0" }}></div>

                            <div className='w-100' style={{ position: "relative" }}>
                                {
                                    room ?
                                        <>
                                            <div className='d-flex pt-2 pb-2 px-3 bg-light' style={{ borderBottom: "2px solid #e0e0e0" }}>
                                                <div className='d-flex'>
                                                    <div>
                                                        <img className='rounded-circle' style={{ height: "5ch", width: "5ch", objectFit: "cover" }} src={`http://localhost:5000/home/${user?._id === room.user._id? room.creater.image: room.user.image}`} alt="" />
                                                    </div>
                                                    <div className='mx-2'>
                                                        {
                                                            user?._id === room.user._id ?
                                                                <small>{room.creater.username}</small> :
                                                                <small>{room.user.username}</small>
                                                        }
                                                        <small className='d-block text-xs'>1h ago</small>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='px-3'>
                                                <ScrollToBottom className='message-container'>
                                                    {
                                                        messages?.map((val, ind) => {
                                                            return (
                                                                <div key={ind}>
                                                                    {
                                                                        val.sentBy !== user?._id ?
                                                                            <div className='d-flex my-2'>
                                                                                <div className='rounded px-3 py-1' style={{ background: "#ffffff", maxWidth: "40ch" }}>
                                                                                    <small className='text-xs fw-bold d-block'>{user?._id === room.user._id ? room.creater.username : room.user.username}</small>
                                                                                    {
                                                                                        val.image ?
                                                                                            <img className='rounded' src={`http://localhost:5000/${val.image}`} style={{ height: "25ch", width: "100%", objectFit: "cover" }} alt="" /> :
                                                                                            <></>
                                                                                    }
                                                                                    <small className='text-sm'>{val.message}</small>
                                                                                    <small className='d-block text-end text-xs text-primary'>{val.time}</small>
                                                                                </div>
                                                                            </div> :
                                                                            <div className='d-flex my-2'>
                                                                                <div className='rounded px-3 py-1 ms-auto' style={{ background: "#78A0FF", maxWidth: "40ch" }}>
                                                                                    <small className='text-xs fw-bold d-block text-light'>You</small>
                                                                                    {
                                                                                        val.image ?
                                                                                            <img className='rounded' src={`http://localhost:5000/${val.image}`} style={{ height: "25ch", width: "100%", objectFit: "cover" }} alt="" /> :
                                                                                            <></>
                                                                                    }
                                                                                    <small className='text-sm text-light m-0'>{val.message}</small>
                                                                                    <small className='d-block text-end text-xs text-primary text-light'>{val.time}</small>
                                                                                </div>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </ScrollToBottom>
                                            </div>
                                        </> :
                                        <>
                                            <p>Loading...</p>
                                        </>
                                }
                                <div className='bg-dark w-100 p-0'>
                                    <div className='w-100' style={{ position: 'absolute', bottom: "0" }}>
                                        {/* <form> */}
                                        <div className='form-group my-3'>
                                            <div className='d-flex mx-3 border py-1 px-2 bg-light'>
                                                <input id='image-inp' onChange={(e) => selectImage(e.target.files[0])} type="file" accept='image/*' hidden />
                                                <div id="img-preview" className='me-2' style={{ visibility: "hidden", width: "0" }}>
                                                    <img className='rounded' src={image?.url} style={{ height: "4ch", width: "4ch", objectFit: "cover" }} alt="" />
                                                </div>
                                                <input onChange={(e) => { setMessage(e.target.value) }} className='w-100 text-sm' type="text" style={{ border: "none", outline: "none" }} placeholder="Type message here..." />
                                                <div>
                                                    <button className='btn' onClick={sendMessage} type="button" onKeyUp={sendMessage}><i className="fa fa-paper-plane"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Inbox