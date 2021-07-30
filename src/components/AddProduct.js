import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase'
import './AddProduct.scss'
import Header from './reusable/Header'
import LoaderButton from './reusable/LoaderButton'
import Toast from './reusable/Toast'

function AddProduct() {

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const [toast, settoast] = useState({ text: "", type: "success" })  // type can be success, danger, or anything else.

  const submit = data => {
    setIsLoading(true)

    db
      .collection("products")
      .add({
        ...data,
        addedOn: new Date()
      })
      .then(() => {
        setIsLoading(false)
        settoast({ text: "Product added successfully!", type: "success" })
        reset()
      })
      .catch(err => {
        setIsLoading(false)
        settoast({ text: "Something went wrong!", type: "danger" })
        console.log("Error adding product to database: ", err)
      })
  }

  return (
    <>
      <Header AddProduct />

      <div className="addProduct" id="main-content">
        <form autoComplete="off" autoSave="off">
          <div>
            <label htmlFor="pname">Name : </label>
            <input type="text" className="pname" {...register("title")} placeholder="Product name" autoFocus />
          </div>

          <div>
            <label htmlFor="mrp">MRP : </label>
            <input type="number" className="mrp" {...register("mrp")} placeholder="MRP (₹)" />
          </div>

          <div>
            <label htmlFor="sellprice">Selling Price :</label>
            <input type="number" className="sellprice" {...register("sellprice")} placeholder="Selling price (₹)" />
          </div>

          <div>
            <label htmlFor="rating">Rating : </label>
            <input type="number" className="rating" {...register("rating")} placeholder="Rating (1-5)" />
          </div>

          <div>
            <label htmlFor="imageUrl">Image URL : </label>
            <input type="text" className="imageUrl" {...register("imageUrl")} placeholder="Image URL" />
          </div>

          <LoaderButton type="submit" onClick={handleSubmit(submit)}
            isLoading={isLoading} className="am-orange-button">
            Add Product
          </LoaderButton>
        </form>
      </div>

      <Toast toast={toast} settoast={settoast} />

    </>
  )
}

export default AddProduct
