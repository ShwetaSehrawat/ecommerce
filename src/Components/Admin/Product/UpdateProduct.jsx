import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react';


import formValidationChecker from "../../ValidationCheckers/formValidationChecker"
import { updateProduct, getProduct } from "../../../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function UpdateProduct() {
    const editorRef = useRef(null)
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let { id } = useParams()
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
        finalprice: "",
        stock: "",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: ""
    })
    let [errorMessages, setErrorMessage] = useState({
        name: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
    })
    let [show, setShow] = useState(false)
    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let navigate = useNavigate()

    function getInputData(e) {
        setErrorMessage((old) => {
            return {
                ...old,
                [name]: formValidationChecker(e)
            }
        })
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        if (name === "pic1") {
            setErrorMessage((old) => {
                return {
                    ...old,
                    [name]: ""
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name //remove this line when connect with real server
                // [name]: files[0]   //add this line when connect with real server
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        if (!(Object.keys(errorMessages).find((x) => errorMessages[x] && errorMessages[x] !== ""))) {
            let fp = data.baseprice - data.baseprice * data.discount / 100
            console.log("image: ",data.pic1,data.pic2,data.pic3,data.pic4)
            let formData = {
                id: id,
                name: data.name,
                maincategory: data.maincategory,
                subcategory: data.subcategory,
                brand: data.brand,
                color: data.color,
                size: data.size,
                baseprice: parseInt(data.baseprice),
                discount: parseInt(data.discount),
                finalprice: fp,
                stock: data.stock,
                description: editorRef.current.getContent(),
                pic1: data.pic1,
                pic2: data.pic2,
                pic3: data.pic3,
                pic4: data.pic4
            }
            // let formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("maincategory", data.maincategory)
            // formData.append("subcategory", data.subcategory)
            // formData.append("brand", data.brand)
            // formData.append("color", data.color)
            // formData.append("size", data.size)
            // formData.append("baseprice", parseInt(data.baseprice))
            // formData.append("discount", parseInt(data.discount))
            // formData.append("finalprice", fp)
            // formData.append("stock", data.stock)
            // formData.append("description", editorRef.current.getContent())
            // formData.append("pic1", data.pic1)
            // formData.append("pic2", data.pic2)
            // formData.append("pic3", data.pic3)
            // formData.append("pic4", data.pic4)

            dispatch(updateProduct(formData))
            navigate("/admin/product")
        }
        else
            setShow(true)
    }
    function getAPIData() {
        dispatch(getProduct())
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if (MaincategoryStateData.length)
            setMaincategory(MaincategoryStateData)
        if (SubcategoryStateData.length)
            setSubcategory(SubcategoryStateData)
        if (BrandStateData.length)
            setBrand(BrandStateData)
        if (ProductStateData.length) {
            let item = ProductStateData.find((x) => x.id === id)
            console.log(item)
            if (item)
                setData({ ...item })
        }
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
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
                        <h5 className='bg-primary text-center text-light p-2'>Product</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name<span className='text-danger'>*</span></label>
                                <input type="text" name="name" onChange={getInputData} className='form-control' placeholder='Product Name' value={data.name} />
                                {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.name}</p> : ""}
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Maincategory<span className='text-danger'>*</span></label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select'>
                                        {
                                            maincategory.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Subcategory<span className='text-danger'>*</span></label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select'>
                                        {
                                            subcategory.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Brand<span className='text-danger'>*</span></label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select'>
                                        {
                                            brand.map((item, index) => {
                                                return <option key={index}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12 mb-3">
                                    <label>Stock<span className='text-danger'>*</span></label>
                                    <select name="stock" value={data.stock} onChange={getInputData} className='form-select'>
                                        <option>In Stock</option>
                                        <option>Out Of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Color<span className='text-danger'>*</span></label>
                                    <input type="text" name="color" onChange={getInputData} className='form-control' placeholder='Product Color' value={data.color} />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.color}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Size<span className='text-danger'>*</span></label>
                                    <input type="text" name="size" onChange={getInputData} className='form-control' placeholder='Product Size' value={data.size} />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.size}</p> : ""}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Base Price<span className='text-danger'>*</span></label>
                                    <input type="number" name="baseprice" onChange={getInputData} className='form-control' placeholder='Base Price' value={data.baseprice} />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.baseprice}</p> : ""}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Discount<span className='text-danger'>*</span></label>
                                    <input type="number" name="discount" onChange={getInputData} className='form-control' placeholder='Discount' value={data.discount} />
                                    {show ? <p className='text-danger text-capitalize my-2'>{errorMessages.discount}</p> : ""}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Descriptiion</label>
                                {/* <textarea name="description" rows="5" className='form-control' placeholder='Description...' onChange={getInputData}></textarea> */}
                                <Editor
                                    apiKey='3ylsu9t3t5tu7hs1klb00umyughev31fhays6eq0abvhj242'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={data.description}
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic1</label>
                                    <input type="file" name="pic1" className='form-control' onChange={getInputFile} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic2</label>
                                    <input type="file" name="pic2" className='form-control' onChange={getInputFile} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic3</label>
                                    <input type="file" name="pic3" className='form-control' onChange={getInputFile} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic4</label>
                                    <input type="file" name="pic4" className='form-control' onChange={getInputFile} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary text-light w-100'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
