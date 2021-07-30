import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import Header from './reusable/Header'
import Product from './reusable/Product'
import './ViewProducts.scss'

function ViewProducts() {

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
      <Header ViewProducts />

      <div className="viewProducts" id="main-content">
        {products?.map((product, i) => (
          <Product product={product} key={i} />
        ))}
      </div>
    </>
  )
}

export default ViewProducts
