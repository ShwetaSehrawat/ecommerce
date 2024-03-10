import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout, updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"
export default function AdminCheckoutShow() {
    let [data, setData] = useState({})
    let [user, setUser] = useState({})
    let [orderstatus, setOrderstatus] = useState("")
    let [paymentstatus, setPaymentstatus] = useState("")

    let { id } = useParams()
    let navigate = useNavigate()

    let dispatch = useDispatch()
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    function updateItem() {
        dispatch(updateCheckout({ ...data, orderstatus:orderstatus,paymentstatus:paymentstatus }))
        setData((old) => {
            return {
                ...old,
                'orderstatus': orderstatus,
                'paymentstatus': paymentstatus,
            }
        })
    }
    async function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find((x) => x.id === id)
            setData(item)
            setOrderstatus(item.orderstatus)
            setPaymentstatus(item.paymentstatus)

            let response = await fetch("/user/" + item.userid, {
                method: "get",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setUser(response)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Checkout</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>Checkout </h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>User</th>
                                    <td>
                                        Buyer           : {user.name}<br />
                                        Contact Details : {user.phone},{user.email}<br />
                                        Address Details : {user.address}<br />
                                        {user.pin},{user.city},{user.state}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Order Status</th>
                                    <td>{data.orderstatus}
                                        {data.orderstatus !== "Delivered" ?
                                            <>
                                                <br />
                                                <select name="orderstatus" onChange={(e) => setOrderstatus(e.target.value)} className='form-control' value={orderstatus}>
                                                    <option>Order is Placed</option>
                                                    <option>Ready to Ship</option>
                                                    <option>Shipped</option>
                                                    <option>Order is Reached to the Final Delivery Station</option>
                                                    <option>Out for Delivery</option>
                                                    <option>Delivered</option>
                                                </select>
                                            </> : ""}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Payment Mode</th>
                                    <td>{data.paymentmode}</td>
                                </tr>
                                <tr>
                                    <th>Payment Status</th>
                                    <td>{data.paymentstatus}
                                        {data.paymentstatus !== "Done" ?
                                            <>
                                                <br />
                                                <select name="paymentstatus" onChange={(e) => setPaymentstatus(e.target.value)} className='form-control' value={paymentstatus}>
                                                    <option>Pending</option>
                                                    <option>Done</option>
                                                </select>
                                            </> : ""}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Subtotal</th>
                                    <td>&#8377;{data.subtotal}</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>&#8377;{data.shipping}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>&#8377;{data.total}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(data.date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {data.orderstatus !== "Delivered" && data.paymentstatus === "Pending" ?
                                            <button className='btn btn-primary text-light w-100' onClick={updateItem}>Update</button> :
                                            ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Pic</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.products?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <a href={`/product-images/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`/product-images/${item.pic}`} height={50} width={50} className='rounded' alt="" />
                                                    </a>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td>{item.qty}</td>
                                                <td>&#8377;{item.total}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
