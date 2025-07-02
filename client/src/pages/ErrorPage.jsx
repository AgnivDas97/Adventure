import React from 'react'
import "../style/errorPage.css"

const ErrorPage = () => {
  return (
    <div className="error-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go to Home</a>
        <a href="/contact">Contact Us</a>
    </div>
  )
}

export default ErrorPage
