import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch } from 'react-redux'


import formValidationChecker from "../../ValidationCheckers/formValidationChecker"
import { addTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
export default function CreateTestimonial() {
    let [data, setData] = useState({
        name: "",
        profession: "",
        star: "",
        pic: "",
        message: ""
    })
    let [errorMessages, setErrorMessage] = useState({
        name: "Name Field Must Required",
        profession: "Profession Field Must Required",
        star: "Star Field Must Required",
        pic: "Pic Must Required",
        message: "Message Field Must Required"
    })
    let [show, setShow] = useState(false)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function getInputData(e) {
        var { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidationChecker(e)
            }
        })
        setShow(false)
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        if (name === "pic") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: ""
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: files[0] && files[0].name //remove this line when connect with real server
                // [name]: files[0]   //add this line when connect with real server
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            // let formData = new FormData()
            // formData.append("name",data.name)
            // formData.append("profession",data.profession)
            // formData.append("star",data.star)
            // formData.append("message",data.message)
            // formData.append("pic",data.pic)

            let formData = {
                name: data.name,
                profession: data.profession,
                star: data.star,
                message: data.message,
                pic: data.pic
            }
            dispatch(addTestimonial(formData))
            navigate("/admin/testimonial")
        }
        else
            setShow(true)
    }
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Testimonial</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>Testimonial</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name<span className='text-danger'>*</span></label>
                                    <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Person Name' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.name}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Profession<span className='text-danger'>*</span></label>
                                    <input type="text" name="profession" onChange={getInputData} className='form-control' placeholder='Profession' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.profession}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Star<span className='text-danger'>*</span></label>
                                    <input  type="number" min={1} max={5} name="star" onChange={getInputData} className='form-control' placeholder='Star' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.star}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic<span className='text-danger'>*</span></label>
                                    <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.pic}</p> : ""}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Message<span className='text-danger'>*</span></label>
                                <textarea name="message" rows="5" onChange={getInputData} placeholder='Message...' className='form-control'></textarea>
                                {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.message}</p> : ""}
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
