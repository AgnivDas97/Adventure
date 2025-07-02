import  { useState } from 'react'
import '../style/registration.css'

const Register = () => {
  const [user , setUser] = useState({
    name: "",
    email: "",
    phone:"",
    password: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log(user);
    const { name, email, phone, password } = user;
    if (!name || !email || !phone || !password) {
      alert("Please fill all the fields");
    } else {
      const responce =await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      console.log(responce, "responce");
    }
  };

  console.log(user, "user");

  return (
    <>
      <section>
        <main>
            <div className="section-registration">
                <div className="container grid grid-two-cols">
                    <div className="registration-form">
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  placeholder='Enter your name'
                                  value={user.name}
                                  onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  placeholder='Enter your email'
                                  value={user.email}
                                  onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input
                                  type="tel"
                                  id="phone"
                                  placeholder='Enter your phone number'
                                  value={user.phone}
                                  onChange={handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="password">Password</label>
                                <input
                                  type="password"
                                  id="password"
                                  placeholder='Enter your password'
                                  value={user.password}
                                  onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className='btn'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
      </section>
    </>
  )
}

export default Register
