import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios';
import { toast } from 'react-toastify';
const UserCard = (props) => {
    console.log(props)
    const [rating, setRating] = useState('1');
    const [reason, setReason] = useState();
    const starRate = (val) => {
        $('.fa-star').removeClass('text-warning')
        console.log(val)
        for (var i = 0; i <= val; i++) {
            $('.fa-star').eq(i).addClass('text-warning')
            setRating(val)
        }
    }
    const rateUser = async (userId) => {
        const res = await axios.put('/rate-user', { userId: userId, rating: rating })
        if (res.data.success) {
            $('#rateUserModal').hide()
        }
    }
    const reportUser = async (userId) =>{
        const res = await axios.post('/report-user', {userId: userId, report: reason})
        console.log(res)
        if(res.data.success){
            toast.success(res.data.message, {position:toast.POSITION.TOP_RIGHT})
        }else{
            toast.error("Something Went Wrong", {position:toast.POSITION.TOP_RIGHT})
        }
    }
    return (
        <>
            <div className='col-md-3 bg-light' style={{ border: '1.5px solid #e0e0e0', borderRadius: "0 3px 3px 0" }}>
                <div className='my-4 d-flex'>
                    <img className='rounded-crircle' src="https://www.pngitem.com/pimgs/m/334-3344170_user-vector-user-flat-png-transparent-png.png" style={{ height: "6ch", width: "6ch", objectFit: "cover" }} alt="" />
                    <div className='mx-2'>
                        <small className='text-sm fw-bold'>{props.user.username}</small>
                        <small className='text-sm d-block m-0'>{props.user.firstName} {props.user.lastName}</small>
                        <small><i className='fa-solid fa-star text-primary me-1'></i>{props.user.rating.toFixed(1)}</small>
                    </div>
                </div>
                <div>
                    <small className='text-xs d-block'>Contact</small>
                    <small className='text-sm d-block'><i className='fa-solid fa-phone me-1'></i>{props.user.phone}</small>
                    <hr />
                </div>
                <div>
                    <small className='text-xs d-block'>Email</small>
                    <small className='text-sm d-block'><i className='fa-solid fa-envelope me-1'></i>{props.user.email}</small>
                    <hr />
                </div>
                <div className=''>
                    <small data-bs-toggle="modal" data-bs-target="#rateUserModal" className='text-sm btn'><i className='fa-solid fa-thumbs-up me-1 fs-5 text-center'></i>Rate</small>
                    <div class="modal fade" id="rateUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content px-5" style={{ background: "none", border: "none" }}>
                                <div className="modal-body bg-dark rounded mx-3">
                                    <div className='mx-auto d-flex justify-content-center'>
                                        <div className=''>
                                            <small className='text-sm text-center d-block'>Your Rating</small>
                                            <div>
                                                <span className='me-1' onClick={starRate.bind(this, 1)}><i className='fas fa-star'></i></span>
                                                <span className='mx-1' onClick={starRate.bind(this, 2)}><i className='fas fa-star'></i></span>
                                                <span className='mx-1' onClick={starRate.bind(this, 3)}><i className='fas fa-star'></i></span>
                                                <span className='mx-1' onClick={starRate.bind(this, 4)}><i className='fas fa-star'></i></span>
                                                <span className='mx-1' onClick={starRate.bind(this, 5)}><i className='fas fa-star'></i></span>
                                            </div>
                                            <button onClick={rateUser.bind(this, props.user._id)} type="button" className="btn btn-sm btn-primary w-100 my-2 rounded">Rate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <small className='text-sm mx-3 btn' data-bs-toggle="modal" data-bs-target="#reportUserModal"><i className='fa-solid fa-circle-info me-1 fs-6 text-center'></i>Report</small>
                    <div className="modal fade property-modal" data-backdrop="false" id="reportUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <p className='m-0'><span><i className='fa-solid fa-info-circle me-1'></i></span>Report</p>                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <div className='py-2 px-2 d-flex' style={{ background: "#f1f1f1", borderLeft: "3px solid #707070" }}>
                                            <div>
                                                <img className='rounded' src={`https://www.pngitem.com/pimgs/m/334-3344170_user-vector-user-flat-png-transparent-png.png`} style={{ height: "6ch", width: "6ch", objectFit: "cover" }} alt="" />
                                            </div>
                                            <div className='mx-2'>
                                                <small className='text-xs fw-bold'>{props.user.username}</small>
                                                <small className='text-xs d-block'>{props.user.firstName} {props.user.lastName}</small>
                                            </div>
                                        </div>
                                        <div className='my-3'>
                                            <div className='form-check my-3'>
                                                <label className='form-check-label text-sm' htmlFor="res1">Trying to be someone else</label>
                                                <input onChange={(e)=>setReason(e.target.value)} className='form-check-input' id="res1" type="radio" value={"Trying to be someone else"} name="report" />
                                            </div>
                                            <div className='form-check my-3'>
                                                <label className='form-check-label text-sm' htmlFor="res2">Posting offensive content</label>
                                                <input onChange={(e)=>setReason(e.target.value)} className='form-check-input' id="res2" type="radio" value={"Posting offensive content"} name="report" />
                                            </div>
                                            <div className='form-check my-3'>
                                                <label className='form-check-label text-sm' htmlFor="res3">Violent Behavior with other/Bullying</label>
                                                <input onChange={(e)=>setReason(e.target.value)} className='form-check-input' id="res3" type="radio" name="report" value={"Violent Behavior with other/Bullying"} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button onClick={reportUser.bind(this, props.user._id)} type="button" className="btn btn-sm btn-info text-light">Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to={''} className="link-btn-sm d-block">See more listings</Link>
                </div>
            </div>
        </>
    )
}
export default UserCard