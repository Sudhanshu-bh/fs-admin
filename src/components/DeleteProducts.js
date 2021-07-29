import React from 'react'
import './DeleteProducts.scss'
import Header from './reusable/Header'

function DeleteProducts() {
  return (
    <>
      <Header DeleteProducts />

      <div className="deleteProducts" id="main-content">
        Delete products
      </div>
    </>
  )
}

export default DeleteProducts
