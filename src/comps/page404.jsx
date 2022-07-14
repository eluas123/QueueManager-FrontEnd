import React from 'react'
import { Link} from 'react-router-dom'

export default function Page404() {
  return (
    <div>
        <h1>Page not found, Page 404</h1>
        <Link className='mt-5' to="/">Back to Home</Link>
    </div>
  )
}
