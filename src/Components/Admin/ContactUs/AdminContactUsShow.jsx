import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContactUs, getContactUs, updateContactUs } from "../../../Store/ActionCreators/ContactUsActionCreators"
export default function AdminContactUsShow() {
    let [data, setData] = useState({})
    let {id} = useParams()
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let ContactUsStateData = useSelector((state) => state.ContactUsStateData)
    function deleteItem() {
        if (window.confirm("Are Your Sure You Want to  Delete that Item : ")) {
            dispatch(deleteContactUs({ id: id }))
            navigate("/admin/contactus")
        }
    }
    function updateItem(){
        dispatch(updateContactUs({...data,active:false}))
        setData((old)=>{
            return{
                ...old,
                'active':false
            }
        })
    }
    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length)
            setData(ContactUsStateData.find((x)=>x.id===id))
    }
    useEffect(() => {
        getAPIData()
    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">ContactUs</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>ContactUs </h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Email Address</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Subject</th>
                                    <td>{data.subject}</td>
                                </tr>
                                <tr>
                                    <th>Message</th>
                                    <td>{data.message}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(data.date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{data.active?"Active":"Inactive"}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                    {data.active?
                                    <button className='btn btn-primary text-light w-100' onClick={updateItem}>Update Status to Done</button>:
                                    <button className='btn btn-danger text-light w-100' onClick={deleteItem}>Delete</button>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
