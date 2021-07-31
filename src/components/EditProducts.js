import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import './EditProducts.scss'
import Header from './reusable/Header'
import Product from './reusable/Product'

function EditProducts() {

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
      <Header EditProducts />

      <div className="editProducts" id="main-content">
        {products?.map((product, i) => (
          <Product editButton product={product} key={i} />
        ))}
      </div>
    </>
  )
}

export default EditProducts
