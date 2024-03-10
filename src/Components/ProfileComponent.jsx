import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileComponent({heading,user}) {
    return (
        <>
            <h5 className='bg-primary text-center p-2 text-light'>{heading}</h5>
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th>UserName</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{user.address}</td>
                    </tr>
                    <tr>
                        <th>Pin</th>
                        <td>{user.pin}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{user.city}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{user.state}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}><Link to="/profile/update" className='btn btn-primary text-light w-100'>Update Profile</Link></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
