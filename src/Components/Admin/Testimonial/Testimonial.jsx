import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@mui/x-data-grid';

import { deleteTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
export default function Testimonial() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'profession', headerName: 'Profession', width: 150 },
        { field: 'star', headerName: 'star', width: 50 },
        { field: 'message', headerName: 'message', width: 500 },
        {
            field: 'pic', headerName: 'Pic', width: 100, renderCell: ({ row }) => <a href={`/product-images/${row.pic}`} target='_blank' rel='noreferrer'>
                <img src={`/product-images/${row.pic}`} height="80px" width="80px" alt="" />
            </a>
        },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            renderCell: ({ row }) => <Link to={`/admin/testimonial/update/${row.id}`}><i className='fa fa-edit text-primary'></i></Link>
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
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    function deleteItem(id) {
        if (window.confirm("Are Your Sure You Want to  Delete that Item : ")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length)
            setData(TestimonialStateData)
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
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
                        <h5 className='bg-primary text-center text-light p-2'>Testimonial <Link to="/admin/testimonial/create"><i className='fa fa-plus text-light float-end'></i></Link></h5>
                        {/* <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
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
                                            <td><Link to={`/admin/testimonial/update/${item.id}`}><i className='fa fa-edit text-primary'></i></Link></td>
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
                            pageSizeOptions={[5, 10]}
                            checkboxSelection={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
