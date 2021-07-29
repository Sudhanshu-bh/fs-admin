import { CircularProgress } from '@material-ui/core'
import React from 'react'
import './Loading.scss'

function Loading() {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  )
}

export default Loading
