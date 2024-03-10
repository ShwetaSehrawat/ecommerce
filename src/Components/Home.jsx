import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux'
import Testimonial from './Testimonial';
import ProductSlider from './ProductSlider';
export default function Home() {
    let [allProducts, setAllProducts] = useState([])
    let [maleProducts, setMaleProducts] = useState([])
    let [femaleProducts, setFemaleProducts] = useState([])
    let [kidsProducts, setKidsProducts] = useState([])

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            setAllProducts(ProductStateData.slice(0, 12))
            setMaleProducts(ProductStateData.filter((x) => x.maincategory === "Male").slice(0, 12))
            setFemaleProducts(ProductStateData.filter((x) => x.maincategory === "Female").slice(0, 12))
            setKidsProducts(ProductStateData.filter((x) => x.maincategory === "Kids").slice(0, 12))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length])
    return (
        <>


            {/* <!-- Hero Start --> */}
            <div className="container-fluid py-5 mb-5 hero-header">
                <div className="container py-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-12 col-lg-7">
                            <h4 className="mb-3 text-primary">Get Upto 90% Discount on Latest  International Fashion</h4>
                            <h1 className="mb-5 display-3 text-primary">Tops Brands Products</h1>
                            <div className="position-relative mx-auto">
                                <input className="form-control border-2 border-primary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                                <button type="submit" className="btn btn-primary border-2 border-primary py-3 px-4 position-down rounded-pill text-white h-100" style={{ top: 0, right: "25%" }}>Submit Now</button>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-5">
                            <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active rounded">
                                        <img src="/img/banner1.jpg.jpg" className="img-fluid w-100 h-100 bg-primary rounded" alt="First slide" />
                                        <Link to="/shop?mc=Male" className="btn px-4 py-2 btn-primary text-white rounded">Shop</Link>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src="/img/banner2.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <Link to="/shop/?mc=Female" className="btn px-4 py-2 btn-primary text-white rounded">Shop</Link>
                                    </div>
                                    <div className="carousel-item rounded">
                                        <img src="/img/banner4.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <Link to="/shop?mc=Kids" className="btn px-4 py-2 btn-primary text-white rounded">Shop</Link>
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Hero End --> */}


            {/* <!-- Featurs Section Start --> */}
            <div className="container-fluid featurs">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-primary mb-5 mx-auto">
                                    <i className="fas fa-car-side fa-3x text-white"></i>
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>Free Shipping</h5>
                                    <p className="mb-0">Free on order over &#8377;1000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-primary mb-5 mx-auto">
                                    <i className="fas fa-user-shield fa-3x text-white"></i>
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>Security Payment</h5>
                                    <p className="mb-0">100% security payment</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-primary mb-5 mx-auto">
                                    <i className="fas fa-exchange-alt fa-3x text-white"></i>
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>7 Day Return</h5>
                                    <p className="mb-0">7 day money guarantee</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="featurs-item text-center rounded bg-light p-4">
                                <div className="featurs-icon btn-square rounded-circle bg-primary mb-5 mx-auto">
                                    <i className="fa fa-phone-alt fa-3x text-white"></i>
                                </div>
                                <div className="featurs-content text-center">
                                    <h5>24/7 Support</h5>
                                    <p className="mb-0">Support every time fast</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Featurs Section End --> */}


            {/* <!-- Fruits Shop Start--> */}
            <div className="container-fluid fruite py-3">
                <div className="container">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h2>Our Latest Products</h2>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                            <span className="text-dark" style={{ width: "130px" }}>All</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{ width: "130px" }}>Male</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                            <span className="text-dark" style={{ width: "130px" }}>Female</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                            <span className="text-dark" style={{ width: "130px" }}>Kids</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    {
                                        allProducts.map((item, index) => {
                                            return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item card">
                                                    <div className="fruite-img">
                                                        <img src={`/product-images/${item.pic1}`} style={{ height: 250, width: "100%" }} className="img-fluid w-100 rounded-top" alt="" />
                                                    </div>
                                                    <div className="text-white bg-primary px-3 py-1 rounded position-down" style={{ top: "10px", left: "10px" }}>{item.maincategory}/{item.subcategory}/{item.brand}</div>
                                                    <div className="p-4">
                                                        <h6 style={{ height: 30 }}>{item.name}</h6>
                                                        <p>Color : {item.color} Size = {item.size}</p>
                                                        <p className="text-dark fs-5 fw-bold mb-0 text-center"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                                        <Link to={`/product/${item.id}`} className="btn border border-primary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div id="tab-2" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {
                                        maleProducts.map((item, index) => {
                                            return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item card">
                                                    <div className="fruite-img">
                                                        <img src={`/product-images/${item.pic1}`} style={{ height: 250, width: "100%" }} className="img-fluid w-100 rounded-top" alt="" />
                                                    </div>
                                                    <div className="text-white bg-primary px-3 py-1 rounded position-down" style={{ top: "10px", left: "10px" }}>{item.maincategory}/{item.subcategory}/{item.brand}</div>
                                                    <div className="p-4">
                                                        <h6 style={{ height: 30 }}>{item.name}</h6>
                                                        <p>Color : {item.color} Size = {item.size}</p>
                                                        <p className="text-dark fs-5 fw-bold mb-0 text-center"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                                        <Link to={`/product/${item.id}`} className="btn border border-primary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div id="tab-3" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {
                                        femaleProducts.map((item, index) => {
                                            return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item card">
                                                    <div className="fruite-img">
                                                        <img src={`/product-images/${item.pic1}`} style={{ height: 250, width: "100%" }} className="img-fluid w-100 rounded-top" alt="" />
                                                    </div>
                                                    <div className="text-white bg-primary px-3 py-1 rounded position-down" style={{ top: "10px", left: "10px" }}>{item.maincategory}/{item.subcategory}/{item.brand}</div>
                                                    <div className="p-4">
                                                        <h6 style={{ height: 30 }}>{item.name}</h6>
                                                        <p>Color : {item.color} Size = {item.size}</p>
                                                        <p className="text-dark fs-5 fw-bold mb-0 text-center"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                                        <Link to={`/product/${item.id}`} className="btn border border-primary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            <div id="tab-4" className="tab-pane fade show p-0">
                                <div className="row g-4">
                                    {
                                        kidsProducts.map((item, index) => {
                                            return <div key={index} className="col-md-6 col-lg-4 col-xl-3">
                                                <div className="rounded position-relative fruite-item card">
                                                    <div className="fruite-img">
                                                        <img src={`/product-images/${item.pic1}`} style={{ height: 250, width: "100%" }} className="img-fluid w-100 rounded-top" alt="" />
                                                    </div>
                                                    <div className="text-white bg-primary px-3 py-1 rounded position-down" style={{ top: "10px", left: "10px" }}>{item.maincategory}/{item.subcategory}/{item.brand}</div>
                                                    <div className="p-4">
                                                        <h6 style={{ height: 30 }}>{item.name}</h6>
                                                        <p>Color : {item.color} Size = {item.size}</p>
                                                        <p className="text-dark fs-5 fw-bold mb-0 text-center"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></p>
                                                        <Link to={`/product/${item.id}`} className="btn border border-primary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fruits Shop End--> */}


            {/* <!-- Featurs Start --> */}
            <div className="container-fluid service py-5">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-primary rounded">
                                    <img src="/img/banner8.jpg" className="img-fluid rounded-top w-100" alt="" />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-light text-center p-4 rounded">
                                            <h5 className="text-dark">Best Deals</h5>
                                            <h3 className="mb-0 text-dark">Upto 90% OFF</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-dark rounded">
                                    <img src="/img/banner4.jpg" className="img-fluid rounded-top w-100" alt="" />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-light text-center p-4 rounded">
                                            <h5 className="text-primary">Latest Products</h5>
                                            <h3 className="mb-0">Free delivery</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <a href="#">
                                <div className="service-item bg-primary rounded">
                                    <img src="/img/banner8.jpg" className="img-fluid rounded-top w-100" alt="" />
                                    <div className="px-4 rounded-bottom">
                                        <div className="service-content bg-light text-center p-4 rounded">
                                            <h5 className="text-dark">Top Brands</h5>
                                            <h3 className="mb-0 text-dark">7 Days Return</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Featurs End --> */}

            <ProductSlider data={allProducts} title="Our Popular Products" />
            <ProductSlider data={maleProducts} title="Our Popular Male Products" />
            <ProductSlider data={femaleProducts} title="Our Popular Female Products" />
            <ProductSlider data={kidsProducts} title="Our Popular Kids Products" />

            {/* <!-- Banner Section Start--> */}
            <div className="container-fluid banner bg-primary">
                <div className="container py-5">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-6">
                            <div className="py-4">
                                <h1 className="display-3 text-white">Tops Brands Products</h1>
                                <p className="fw-normal display-3 text-light mb-4">in Our Store</p>
                                {/* <p className="mb-4 text-light">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p> */}
                                <Link to="/shop" className="w-75 banner-btn btn border-2 border-white rounded-pill text-light py-3 px-5">Shop Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative">
                                <img src="/img/banner8.jpg" className="img-fluid w-100 rounded" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Banner Section End --> */}


            {/* <!-- Fact Start --> */}
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="bg-light p-5 rounded">
                        <div className="row g-4 justify-content-center">
                            <div className="col-lg-3 col-md-6">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fs-1 fa fa-users text-primary"></i>
                                    <h5>Satisfied Customers</h5>
                                    <h4>10K+</h4>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fs-1 fa fa-users text-primary"></i>
                                    <h5>Quality of Service</h5>
                                    <h4>100%</h4>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fs-1 fa fa-users text-primary"></i>
                                    <h5>Quality Certificates</h5>
                                    <h4>50+</h4>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="counter bg-white rounded p-5">
                                    <i className="fs-1 fa fa-users text-primary"></i>
                                    <h5>Available Products</h5>
                                    <h4>1k+</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fact Start --> */}


            <Testimonial breadcrumb={false} />
        </>
    )
}
