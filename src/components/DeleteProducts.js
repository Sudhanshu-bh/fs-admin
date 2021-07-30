import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import './DeleteProducts.scss'
import Header from './reusable/Header'
import Product from './reusable/Product'

function DeleteProducts() {

  const [products, setproducts] = useState([])

  useEffect(() => {
    db
      .collection('products')
      .orderBy('addedOn', 'desc')
      .onSnapshot(snapshot => (
        setproducts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
  }, [])

  return (
    <>
      <Header DeleteProducts />

      <div className="deleteProducts" id="main-content">
        {products?.map((product, i) => (
          <Product product={product} deleteButton key={i} />
        ))}
      </div>
    </>
  )
}

export default DeleteProducts
