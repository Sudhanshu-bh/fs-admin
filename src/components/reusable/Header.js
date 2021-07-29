import React, { useState, useEffect } from 'react'
import './Header.scss'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../firebase'
import { useStateValue } from '../../StateProvider'
import Toast from './Toast'

function Header({ heading = "Admin Panel", ...props }) {

  const history = useHistory()
  const [{ user }] = useStateValue()
  const [toast, settoast] = useState({ text: "", type: "success" })

  const signOut = () => {
    if (user) {
      auth.signOut()
        .then(() => history.push('/login'))
        .catch(error => {
          settoast({ text: "Something went wrong. Please try again!", type: "danger" })
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (document.getElementById("header")
      && document.getElementById("sidebar")
      && document.getElementById("main-content")) {
      const headerHeight = document.getElementById("header").offsetHeight
      const sidebarWidth = document.getElementById("sidebar").offsetWidth
      document.getElementById("sidebar").style.height = `${window.innerHeight - headerHeight}px`
      document.getElementById("sidebar").style.top = `${headerHeight}px`
      document.getElementById("main-content").style.width = `${window.innerWidth - sidebarWidth}px`
      document.getElementById("main-content").style.top = `${headerHeight}px`
      document.getElementById("main-content").style.left = `${sidebarWidth}px`
      document.getElementById("main-content").style.height = `${window.innerHeight - headerHeight}px`
    }
  }, [])

  return (
    <>
      <div className="header" id="header">
        <div className="upper">
          <img className="logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" />

          <div className="header__right">
            Hi, {auth.currentUser?.displayName}

            <div onClick={signOut} className="logout">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                <path d="M7.5 1v7h1V1h-1z" />
                <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="lower">
          <h1 className="heading">{heading}</h1>
        </div>
      </div>

      <div className="sidebar" id="sidebar">
        <Link to="/" className={`dashboard ${props.Home}`}>Dashboard</Link>
        <Link to="/addproduct" className={`addProduct ${props.AddProduct}`}>Add Product</Link>
        <Link className={`viewProducts ${props.ViewProducts}`}>View Products</Link>
        <Link to="/deleteproducts" className={`deleteProducts ${props.DeleteProducts}`}>Delete Products</Link>
      </div>

      <Toast toast={toast} settoast={settoast} />
    </>
  )
}

export default Header
