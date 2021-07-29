import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import { useStateValue } from '../StateProvider'
import Toast from './reusable/Toast'

function Home() {

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

  return (
    <>
      <div className="home">
        <h2>This is homeppage.</h2>

        {auth.currentUser?.displayName}

        {auth.currentUser !== null &&
          (<button onClick={signOut} className="am-button">Sign Out</button>)
        }
      </div>

      <Toast toast={toast} settoast={settoast} />

    </>
  )
}

export default Home
