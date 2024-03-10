import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import formValidationChecker from "./ValidationCheckers/formValidationChecker"
export default function Signup() {
    let [show, setShow] = useState(false)
    let [errorMessages, setErrorMessage] = useState({
        name: "Name Must Required",
        username: "User Name Must Required",
        email: "Email Address Must Required",
        phone: "Phone Number Must Required",
        password: "Password Must Required"
    })
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    })
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidationChecker(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (data.password === data.cpassword) {
            if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
                let response = await fetch("/user", {
                    method: "get",
                    headers: {
                        "content-type": "application/json"
                    }
                })
                response = await response.json()
                let item = response.find((x) => x.username === data.username || x.email === data.email)
                if (item) {
                    setShow(true)
                    setErrorMessage((old) => {
                        return {
                            ...old,
                            'username': item.username === data.username ? "User Name already Taken!!!" : "",
                            'email': item.email === data.email ? "Email Address already Taken!!!" : ""
                        }
                    })
                }
                else {
                    item = {
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                    }
                    let response = await fetch("/user", {
                        method: "post",
                        headers: {
                            "content-type": "application/json"
                        },
                        body:JSON.stringify(item)
                    })
                    response = await response.json()
                    navigate("/login")
                }
            }
            else
                setShow(true)
        }
        else {
            setShow(true)
            setErrorMessage((old) => {
                return {
                    ...old,
                    'password': "Password and Confirm Password Doesn't Matched!!!"
                }
            })
        }
    }
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Create Account</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Signup</li>
                </ol>
            </div>
            <div className="container my-3">
                <div className='w-75 m-auto'>
                    <h5 className='bg-primary text-light text-center p-2'><strong>Create</strong> a New Account</h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.name}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>User Name*</label>
                                <input type="text" name="username" onChange={getInputData} placeholder='User Name' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.username}</p> : ""}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Email*</label>
                                <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.email}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Phone Number*</label>
                                <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.phone}</p> : ""}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Password*</label>
                                <input type="password" name="password" onChange={getInputData} placeholder='**********' className='form-control' />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.password}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Confirm Password*</label>
                                <input type="password" name="cpassword" onChange={getInputData} placeholder='**********' className='form-control' />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-primary text-light w-100'>SIgnup</button>
                        </div>
                    </form>
                    <Link to="/login">Already Have Account? Login</Link>
                </div>
            </div>
        </>
    )
}
