import React, { useState } from 'react'
import { db } from '../../firebase'
import LoaderButton from './LoaderButton'
import './Product.scss'
import Toast from './Toast'

function Product({ product, deleteButton }) {

  const { id } = product
  const { title, mrp, sellprice, imageUrl } = product.data
  const [toast, settoast] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = e => {
    setIsLoading(true)

    db
      .collection("products")
      .doc(id)
      .delete()
      .then(() => {
        setIsLoading(false)
        settoast({ text: `"${title.slice(0, 20)}..." product removed!`, type: "success" })
      })
      .catch(err => {
        setIsLoading(false)
        settoast({ text: "Something went wrong!", type: "danger" })
        console.log("Something went wrong", err)
      })
  }

  return (
    <>

      <div className="product">
        <div className="productDetails">
          <div className="imageContainer">
            <img src={imageUrl} alt="product" />
          </div>

          <div className="title">{title}</div>

          <div className="right">
            <div className="mrp">₹{mrp}</div>
            <div className="sellprice">₹{sellprice}</div>
          </div>
        </div>

        {deleteButton &&
          <LoaderButton onClick={handleDelete}
            isLoading={isLoading} className="am-button">
            Delete
          </LoaderButton>
        }
      </div>

      <Toast toast={toast} settoast={settoast} />

    </>
  )
}

export default Product
