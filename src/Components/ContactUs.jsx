import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import formValidation from "./ValidationCheckers/formValidationChecker"
import { addContactUs } from "../Store/ActionCreators/ContactUsActionCreators"
import { useDispatch } from 'react-redux'
export default function ContactUs() {
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Filed is Mendatory",
        email: "Email Filed is Mendatory",
        phone: "Phone Filed is Mendatory",
        subject: "Subject Filed is Mendatory",
        message: "Messsage Filed is Mendatory",
    })
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    let dispatch = useDispatch()
    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidation(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessage).find((x) => errorMessage[x] && errorMessage[x] !== ""))) {
            dispatch(addContactUs({ ...data, date: new Date(), active: true }))
            setMessage("Thanks to Share Your Query With Us!!! Our Team Will Contact You Soon!!!")
            setData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            })
        }
        else
            setShow(true)
    }
    return (
        <>
            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Contact</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Contact</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Contact Start --> */}
            <div className="container-fluid contact py-2">
                <div className="container">
                    <div className="p-5 bg-light rounded">
                        <div className="row g-4">
                            <div className="col-12">
                                <div className="text-center mx-auto" style={{ maxWidth: "700px" }}>
                                    <h1 className="text-primary">Get in touch</h1>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <p className='text-success text-center'>{message}</p>
                                <form onSubmit={postData}>
                                    <div className="mb-3">
                                        <input type="text" name="name" onChange={getInputData} value={data.name} className='form-control' placeholder='Full Name' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.name}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" name="email" onChange={getInputData} value={data.email} className='form-control' placeholder='Email Address' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.email}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="phone" onChange={getInputData} value={data.phone} className='form-control' placeholder='Phone Number' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.phone}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" name="subject" onChange={getInputData} value={data.subject} className='form-control' placeholder='Subject' />
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.subject}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <textarea name="message" value={data.message} className='form-control' placeholder='Message...' onChange={getInputData} rows="3"></textarea>
                                        {show ? <p className='text-danger text-capitalize p-2'>{errorMessage.message}</p> : ""}
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Address</h4>
                                        <p className="mb-2">A-43, Sector 16, Noida, India</p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded mb-4 bg-white">
                                    <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Mail Us</h4>
                                        <p className="mb-2"><a href="mailto:anishsingh77177@gmail.com">anishsingh77177@gmail.com</a></p>
                                    </div>
                                </div>
                                <div className="d-flex p-4 rounded bg-white">
                                    <i className="fa fa-phone fa-2x text-primary me-4"></i>
                                    <div>
                                        <h4>Telephone</h4>
                                        <p className="mb-2"><a href="tel:7717761569">7717761569</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="400" id="gmap_canvas" src="https://maps.google.com/maps?q=A-43%20Sector%2016%20noida&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Contact End --> */}

        </>
    )
}
