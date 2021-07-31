import React from 'react'
import './Page404.scss'
import { Link, useHistory } from 'react-router-dom'

function Page404() {
  const history = useHistory()

  return (
    <div className="page404">
      <Link to="/"><img onClick={() => history.replace('/')} class="logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo" /></Link>
      <div class="mainContainer">
        <h2>404</h2>
        <h2>There's NOTHING here!</h2>
        <span>Maybe the page you're looking for is not found or never existed.</span>
        <Link to='/' className="homeButtonLink"><button class="homeButton" onClick={() => history.replace('/')}>HOME</button></Link>
      </div>

      <div class="copyright">&copy; 2021 | Amazon Clone by Sudhanshu Bhardwaj</div>

    </div>
  )
}

export default Page404
