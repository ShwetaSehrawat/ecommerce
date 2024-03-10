import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import formValidationChecker from "./ValidationCheckers/formValidationChecker"
export default function UpdateProfile() {
    let [show, setShow] = useState(false)
    let [errorMessages, setErrorMessage] = useState({
        name: "",
        phone: ""
    })
    let [data, setData] = useState({})
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
    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            let response = await fetch("/user/"+localStorage.getItem("userid"), {
                method: "put",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })
            response = await response.json()
            if (localStorage.getItem("role") === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            setShow(true)
    }
    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        if (response) {
            setData({ ...response })
        }
        else {
            navigate("/login")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Profile</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Update</li>
                </ol>
            </div>
            <div className="container my-3">
                <div className='w-75 m-auto'>
                    <h5 className='bg-primary text-light text-center p-2'><strong>Update</strong> Your Profile</h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Name*</label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className='form-control' value={data.name ?? ""} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.name}</p> : ""}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Phone Number*</label>
                                <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className='form-control' value={data.phone ?? ""} />
                                {show ? <p className='text-danger text-capitalize'>{errorMessages.phone}</p> : ""}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <textarea name="address" rows="3" onChange={getInputData} className='form-control' placeholder='Address...' value={data.address ?? ""}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>City</label>
                                <input type="text" name="city" onChange={getInputData} placeholder='City Name' className='form-control' value={data.city ?? ""} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>State</label>
                                <input type="text" name="state" onChange={getInputData} placeholder='State Name' className='form-control' value={data.state ?? ""} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Pin</label>
                                <input type="text" name="pin" onChange={getInputData} placeholder='Pin Code' className='form-control' value={data.pin ?? ""} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Pic</label>
                                <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-primary text-light w-100'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
