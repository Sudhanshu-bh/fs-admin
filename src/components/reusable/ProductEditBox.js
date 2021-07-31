import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../firebase'
import LoaderButton from './LoaderButton'
import './ProductEditBox.scss'

function ProductEditBox({ product, setvisibility, settoast }) {

  const { id } = product
  const { title, mrp, sellprice, rating, imageUrl } = product.data

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: title,
      mrp: mrp,
      sellprice: sellprice,
      rating: rating,
      imageUrl: imageUrl
    }
  })

  const submit = data => {
    setIsLoading(true)

    db
      .collection("products")
      .doc(id)
      .update(data)
      .then(() => {
        setIsLoading(false)
        settoast({ text: "Product details updated successfully!", type: "success" })
        setvisibility("hidden")
      })
      .catch(err => {
        setIsLoading(false)
        settoast({ text: "Something went wrong!", type: "danger" })
        console.log("Document not updated in database. Error: ", err)
      })

  }

  return (
    <>

      <div className="productEditBox">

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
            <input type="number" className="rating" {...register("rating")} min={0} max={5} placeholder="Rating (1-5)" />
          </div>

          <div>
            <label htmlFor="imageUrl">Image URL : </label>
            <input type="text" className="imageUrl" {...register("imageUrl")} placeholder="Image URL" />
          </div>

          <LoaderButton type="submit" onClick={handleSubmit(submit)}
            isLoading={isLoading} className="am-orange-button">
            Done
          </LoaderButton>
        </form>

      </div>

    </>
  )
}

export default ProductEditBox
