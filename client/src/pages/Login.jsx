import React from 'react'
import '../style/login.css'

const Login = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(user);
  }

  return (
    <>
    <section className="login">
        <div className="container">
            <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required onChange={handleChange} />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required onChange={handleChange} />
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login
