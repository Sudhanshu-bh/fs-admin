import React from 'react'
import './AddProduct.scss'
import Header from './reusable/Header'

function AddProduct() {

  const submit = e => {
    e.preventDefault()

    // console.log()
  }

  return (
    <>
      <Header AddProduct />

      <div className="addProduct" id="main-content">
        <form>
          <div>
            <label htmlFor="pname">Name : </label>
            <input type="text" className="pname" name="pname" />
          </div>

          <div>
            <label htmlFor="mrp">MRP : </label>
            <input type="number" className="mrp" />
          </div>

          <div>
            <label htmlFor="sellprice">Selling Price :</label>
            <input type="number" className="sellprice" />
          </div>

          <div>
            <label htmlFor="rating">Rating : </label>
            <input type="number" className="rating" name="rating" />
          </div>

          <div>
            <label htmlFor="imageUrl">Image URL </label>
            <input type="text" className="imageUrl" />
          </div>

          <button onClick={submit} className="am-orange-button">Add Product</button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
