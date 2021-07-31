import React, { useState } from 'react'
import { db } from '../../firebase'
import LoaderButton from './LoaderButton'
import './Product.scss'
import ProductEditBox from './ProductEditBox'
import Toast from './Toast'

function Product({ product, editButton, deleteButton }) {

  const { id } = product
  const { title, mrp, sellprice, imageUrl } = product.data
  const [toast, settoast] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [visibility, setvisibility] = useState("hidden")

  const handleEdit = e => {
    if (visibility === "hidden") {
      setvisibility("visible")

      setTimeout(() => {
        const editProducts = document.getElementById("main-content")
        editProducts.scrollTo({
          top: document.getElementById(`scrollTarget${id}`).offsetTop - 15,
          behavior: 'smooth'
        })
      }, 1);
    } else
      setvisibility("hidden");
  }

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

      <div className="product" id={`scrollTarget${id}`}>
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

        {editButton &&
          <LoaderButton onClick={handleEdit}
            isLoading={isLoading} className="am-button">
            Edit
          </LoaderButton>
        }

        {deleteButton &&
          <LoaderButton onClick={handleDelete}
            isLoading={isLoading} className="am-button">
            Delete
          </LoaderButton>
        }

      </div>

      <div className={`editContainer ${visibility}`}>
        <ProductEditBox product={product} setvisibility={setvisibility} settoast={settoast} />
      </div>

      <Toast toast={toast} settoast={settoast} />

    </>
  )
}

export default Product
