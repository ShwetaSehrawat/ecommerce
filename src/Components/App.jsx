import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import Shop from './Shop'
import ProductDetails from './ProductDetails'
import Cart from './Cart'
import Checkout from './Checkout'
import Testimonial from './Testimonial'
import ContactUs from './ContactUs'
import Error from './Error'
import Login from './Login'
import Signup from './Signup'
import BuyerProfile from './BuyerProfile'

import AdminHome from './Admin/AdminHome'

import Maincategory from './Admin/Maincategory/Maincategory'
import CreateMaincategory from './Admin/Maincategory/CreateMaincategory'
import UpdateMaincategory from './Admin/Maincategory/UpdateMaincategory'

import Subcategory from './Admin/Subcategory/Subcategory'
import CreateSubcategory from './Admin/Subcategory/CreateSubcategory'
import UpdateSubcategory from './Admin/Subcategory/UpdateSubcategory'

import Brand from './Admin/Brand/Brand'
import CreateBrand from './Admin/Brand/CreateBrand'
import UpdateBrand from './Admin/Brand/UpdateBrand'

import Product from './Admin/Product/Product'
import CreateProduct from './Admin/Product/CreateProduct'
import UpdateProduct from './Admin/Product/UpdateProduct'
import AdminTestimonial from './Admin/Testimonial/Testimonial'
import CreateTestimonial from './Admin/Testimonial/CreateTestimonial'
import UpdateTestimonial from './Admin/Testimonial/UpdateTestimonial'
import UpdateProfile from './UpdateProfile'
import User from './Admin/User/User'
import Confirmation from './Confirmation'
import Newsletter from './Admin/Newsletter/Newsletter'
import AdminContactUs from './Admin/ContactUs/AdminContactUs'
import AdminContactUsShow from './Admin/ContactUs/AdminContactUsShow'
import AdminCheckout from './Admin/Checkout/AdminCheckout'
import AdminCheckoutShow from './Admin/Checkout/AdminCheckoutShow'

export default function App() {
  console.log(localStorage.getItem("login"),"jhkjhkjhkjh")
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/testimonial' element={<Testimonial />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {
          localStorage.getItem("login") ?
            <>
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/confirmation' element={<Confirmation />} />
              <Route path='/profile/update' element={<UpdateProfile />} />
              <Route path='/profile' element={<BuyerProfile />} />
            </> : ""
        }

        {
          localStorage.getItem("login") && localStorage.getItem("role") === "Admin" ?
            <>
              <Route path='/admin' element={<AdminHome />} />
              <Route path='/admin/maincategory' element={<Maincategory />} />
              <Route path='/admin/maincategory/create' element={<CreateMaincategory />} />
              <Route path='/admin/maincategory/update/:id' element={<UpdateMaincategory />} />

              <Route path='/admin/subcategory' element={<Subcategory />} />
              <Route path='/admin/subcategory/create' element={<CreateSubcategory />} />
              <Route path='/admin/subcategory/update/:id' element={<UpdateSubcategory />} />

              <Route path='/admin/brand' element={<Brand />} />
              <Route path='/admin/brand/create' element={<CreateBrand />} />
              <Route path='/admin/brand/update/:id' element={<UpdateBrand />} />

              <Route path='/admin/product' element={<Product />} />
              <Route path='/admin/product/create' element={<CreateProduct />} />
              <Route path='/admin/product/update/:id' element={<UpdateProduct />} />

              <Route path='/admin/testimonial' element={<AdminTestimonial />} />
              <Route path='/admin/testimonial/create' element={<CreateTestimonial />} />
              <Route path='/admin/testimonial/update/:id' element={<UpdateTestimonial />} />

              <Route path='/admin/users' element={<User />} />

              <Route path='/admin/newsletters' element={<Newsletter />} />

              <Route path='/admin/contactus' element={<AdminContactUs />} />
              <Route path='/admin/contactus/show/:id' element={<AdminContactUsShow />} />

              <Route path='/admin/checkouts' element={<AdminCheckout />} />
              <Route path='/admin/checkouts/show/:id' element={<AdminCheckoutShow />} />
            </> : ""
        }

        <Route path='/*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
