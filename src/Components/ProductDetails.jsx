import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import ProductSlider from "./ProductSlider"

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { addCart, getCart } from "../Store/ActionCreators/CartActionCreators"
import { addWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
export default function ProductDetails() {
    let [qty, setQty] = useState(1)
    let [product, setProduct] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let { id } = useParams()

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    function addToCart() {
        var item = CartStateData.find((x) => x.productid === id && x.userid === localStorage.getItem("userid"))
        if (!item) {
            item = {
                productid: id,
                userid: localStorage.getItem("userid"),
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalprice,
                qty: qty,
                total: product.finalprice * qty,
                pic: product.pic1,
            }
            dispatch(addCart(item))
        }
        navigate("/cart")
    }
    function addToWishlist() {
        var item = WishlistStateData.find((x) => x.productid === id && x.userid === localStorage.getItem("userid"))
        console.log(item)
        if (!item) {
            item = {
                productid: id,
                userid: localStorage.getItem("userid"),
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalprice,
                pic: product.pic1,
            }
            dispatch(addWishlist(item))
        }
        navigate("/profile")
    }
    function getAPIData() {
        dispatch(getCart())
        dispatch(getWishlist())
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find((x) => x.id === id)
            if (item) {
                setProduct(item)
                setRelatedProducts(ProductStateData.filter((x) => x.maincategory === item.maincategory))
            }
        }
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length, CartStateData.length, WishlistStateData.length])
    return (
        <>

            {/* <!-- Single Page Header start --> */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop Detail</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><Link to="/" className='text-light'>Home</Link></li>
                    <li className="breadcrumb-item active text-white">Product Details</li>
                </ol>
            </div>
            {/* <!-- Single Page Header End --> */}


            {/* <!-- Single Product Start --> */}
            <div className="container-fluid py-5 mt-2">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div id="carouselExampleIndicators" className="carousel slide">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={`/product-images/${product.pic1}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product-images/${product.pic2}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product-images/${product.pic3}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={`/product-images/${product.pic4}`} height="450px" className="d-block w-100" alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className='d-flex my-1'>
                                <img src={`/product-images/${product.pic1}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" height={100} className='w-100' alt="" />
                                <img src={`/product-images/${product.pic2}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" height={100} className='w-100' alt="" />
                                <img src={`/product-images/${product.pic3}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" height={100} className='w-100' alt="" />
                                <img src={`/product-images/${product.pic4}`} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" height={100} className='w-100' alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h4 className="fw-bold mb-3">{product.name}</h4>
                            <p className="mb-3">Category: {product.maincategory}\{product.subcategory}\{product.brand}</p>
                            <h5 className="fw-bold mb-3"><del className='text-danger'>&#8377;{product.baseprice}</del> &#8377;{product.finalprice} <sup className='text-success'>{product.discount}% Off</sup></h5>
                            <div className="d-flex mb-4">
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star text-secondary"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <p>Color : {product.color}</p>
                            <p>Size : {product.size}</p>
                            <p>Stock : {product.stock === "In Stock" ? "Available" : "Not Available"}</p>
                            {
                                product.stock === "In Stock" ?
                                    <>
                                        <div className="input-group quantity mb-2" style={{ width: "200px" }}>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => qty > 1 ? setQty(qty - 1) : ""}>
                                                    <i className="fa fa-minus"></i>
                                                </button>
                                            </div>
                                            <p className='mx-3'>{qty}</p>
                                            <div className="input-group-btn">
                                                <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => setQty(qty + 1)}>
                                                    <i className="fa fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <button className="btn border border-primary rounded-pill px-4 py-2 mb-4 text-primary" onClick={addToCart}><i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</button>
                                    </>
                                    : ""
                            }
                            <button className="btn border border-primary rounded-pill px-4 py-2 mb-4 text-primary" onClick={addToWishlist}><i className="fa fa-heart me-2 text-primary"></i> Add to Wishlist</button>
                            <div className="mb-4">
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            </div>
                        </div>
                    </div>
                    <h4 className="fw-bold mb-0 text-center mt-3">Related products</h4>
                    <ProductSlider data={relatedProducts} />
                </div>
            </div >
            {/* <!-- Single Product End --> */}
        </>
    )
}
