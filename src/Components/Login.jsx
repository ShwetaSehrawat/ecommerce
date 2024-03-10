import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import formValidationChecker from "./ValidationCheckers/formValidationChecker"
export default function Login() {
    let [show, setShow] = useState(false)
    let [errorMessages, setErrorMessage] = useState({
        username: "User Name Must Required",
        password: "Password Must Required"
    })
    let [data, setData] = useState({
        username: "",
        password: ""
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
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            let response = await fetch("/user", {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find((x) => (x.username === data.username || x.email === data.username) && x.password === data.password)
            if (item) {
                localStorage.setItem("login", true)
                localStorage.setItem("name", item.name)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("role", item.role)
                if (item.role === "Admin")
                    navigate("/admin")
                else
                    navigate("/profile")
            }
            else {
                setShow(true)
                setErrorMessage((old) => {
                    return {
                        ...old,
                        'username': "Invalid Username or Password!!!"
                    }
                })
            }
        }
        else
            setShow(true)
    }
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Login</li>
                </ol>
            </div>
            <div className="container my-3">
                <div className='w-75 m-auto'>
                    <h5 className='bg-primary text-light text-center p-2'><strong>Login</strong> to Your Account</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label>User Name*</label>
                            <input type="text" name="username" onChange={getInputData} placeholder='User Name or Email Address' className='form-control' />
                            {show ? <p className='text-danger text-capitalize'>{errorMessages.username}</p> : ""}
                        </div>
                        <div className="mb-3">
                            <label>Password*</label>
                            <input type="password" name="password" onChange={getInputData} placeholder='**********' className='form-control' />
                            {show ? <p className='text-danger text-capitalize'>{errorMessages.password}</p> : ""}
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-primary text-light w-100'>Login</button>
                        </div>
                    </form>
                    <div className='d-flex justify-content-between'>
                        <Link to="#">Forget Password?</Link>
                        <Link to="/signup">New User? Create a Free Account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
