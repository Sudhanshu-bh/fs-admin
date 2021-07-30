import React from 'react'
import './Home.scss'
import Header from './reusable/Header'
import { useStateValue } from '../StateProvider'

function Home() {
  const [{ user }] = useStateValue()

  return (
    <>
      <Header Home />
      <div className="home" id="main-content">

        <h4>Hi, {user?.displayName}!</h4>
        <h4>Welcome to the Admin Panel.</h4>

      </div>

    </>
  )
}

export default Home
