import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@mui/x-data-grid';

import { deleteProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators"
export default function Product() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'maincategory', headerName: 'Maincategory', width: 100 },
        { field: 'subcategory', headerName: 'Subcategory', width: 100 },
        { field: 'brand', headerName: 'Brand', width: 100 },
        { field: 'color', headerName: 'Color', width: 100 },
        { field: 'size', headerName: 'Size', width: 100 },
        { field: 'baseprice', headerName: 'Base Price', width: 100, renderCell: ({ row }) => <p>&#8377;{row.baseprice}</p> },
        { field: 'discount', headerName: 'Discount', width: 100, renderCell: ({ row }) => <p>{row.discount}% Off</p> },
        { field: 'finalprice', headerName: 'Final Price', width: 100, renderCell: ({ row }) => <p>&#8377;{row.finalprice}</p> },
        { field: 'stock', headerName: 'Stock', width: 100 },
        {
            field: 'pic1', headerName: 'Pic1', width: 100, renderCell: ({ row }) => <a href={`/product-images/${row.pic1}`} target='_blank' rel='noreferrer'>
                <img src={`/product-images/${row.pic1}`} height="80px" width="80px" alt="" />
            </a>
        },
        {
            field: 'pic2', headerName: 'Pic2', width: 100, renderCell: ({ row }) => <a href={`/product-images/${row.pic2}`} target='_blank' rel='noreferrer'>
                <img src={`/product-images/${row.pic2}`} height="80px" width="80px" alt="" />
            </a>
        },
        {
            field: 'pic3', headerName: 'Pic3', width: 100, renderCell: ({ row }) => <a href={`/product-images/${row.pic3}`} target='_blank' rel='noreferrer'>
                <img src={`/product-images/${row.pic3}`} height="80px" width="80px" alt="" />
            </a>
        },
        {
            field: 'pic4', headerName: 'Pic4', width: 100, renderCell: ({ row }) => <a href={`/product-images/${row.pic4}`} target='_blank' rel='noreferrer'>
                <img src={`/product-images/${row.pic4}`} height="80px" width="80px" alt="" />
            </a>
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            renderCell: ({ row }) => <Link to={`/admin/product/update/${row.id}`}><i className='fa fa-edit text-primary'></i></Link>
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            description: "",
            width: 100,
            renderCell: ({ row }) => <button onClick={() => deleteItem(row.id)} className='btn text-danger'><i className='fa fa-trash'></i></button>
        },
    ]
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    function deleteItem(id) {
        if (window.confirm("Are Your Sure You Want to  Delete that Item : ")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length)
            setData(ProductStateData)
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length])
    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Admin</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Product</li>
                </ol>
            </div>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center text-light p-2'>Product <Link to="/admin/product/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            {/* <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Category (MC/SC/BR)</th>
                                        <th>Price</th>
                                        <th>Color/Size</th>
                                        <th>Stock</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.maincategory}/ {item.subcategory}/ {item.brand}</td>
                                                <td><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></td>
                                                <td>{item.color}/ {item.size}</td>
                                                <td>{item.stock}</td>
                                                <td>
                                                    <a href={`/product-images/${item.pic1}`} target='_blank' rel='noreferrer'>
                                                        <img src={`/product-images/${item.pic1}`} height="80px" width="80px" alt="" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={`/product-images/${item.pic2}`} target='_blank' rel='noreferrer'>
                                                        <img src={`/product-images/${item.pic2}`} height="80px" width="80px" alt="" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={`/product-images/${item.pic3}`} target='_blank' rel='noreferrer'>
                                                        <img src={`/product-images/${item.pic3}`} height="80px" width="80px" alt="" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href={`/product-images/${item.pic4}`} target='_blank' rel='noreferrer'>
                                                        <img src={`/product-images/${item.pic4}`} height="80px" width="80px" alt="" />
                                                    </a>
                                                </td>
                                                <td><Link to={`/admin/product/update/${item.id}`} className='btn text-secondary'><i className='fa fa-edit text-primary'></i></Link></td>
                                                <td><button onClick={() => deleteItem(item.id)} className='btn text-danger'><i className='fa fa-trash'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table> */}
                            <DataGrid
                                rows={data}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 20, 50]}
                                checkboxSelection={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
