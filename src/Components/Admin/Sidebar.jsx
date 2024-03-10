import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active" aria-current="true">
                    <i className='fs-5 fa fa-home'></i><span className='float-end'>Home</span>
                </Link>
                <Link to="/admin/users" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-users'></i><span className='float-end'>Users</span></Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-list'></i><span className='float-end'>Maincategory</span></Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-list'></i><span className='float-end'>Subcategory</span></Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-list'></i><span className='float-end'>Brand</span></Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-list'></i><span className='float-end'>Products</span></Link>
                <Link to="/admin/testimonial" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-star'></i><span className='float-end'>Testimonials</span></Link>
                <Link to="/admin/checkouts" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-shopping-bag'></i><span className='float-end'>Checkouts</span></Link>
                <Link to="/admin/contactus" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-phone'></i><span className='float-end'>ContcatUs</span></Link>
                <Link to="/admin/newsletters" className="list-group-item list-group-item-action"><i className='fs-5 text-primary fa fa-envelope'></i><span className='float-end'>Newsletters</span></Link>
            </div>
        </>
    )
}
