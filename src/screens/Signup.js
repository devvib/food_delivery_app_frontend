import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  // console.log("first_one ",credentials.geolocation);
  // let [address, setAddress] = useState("");
  let navigate = useNavigate()

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   let navLocation = () => {
  //     return new Promise((res, rej) => {
  //       navigator.geolocation.getCurrentPosition(res, rej);
  //     });
  //   }
  //   let latlong = await navLocation().then(res => {
  //     let latitude = res.coords.latitude;
  //     let longitude = res.coords.longitude;
  //     return [latitude, longitude]
  //   })
  //   // console.log(latlong)
  //   let [lat, long] = latlong
  //   // console.log(lat, long)
  //   const response = await fetch("http://localhost:5000/api/auth/getlocation", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ latlong: { lat, long } })

  //   });
  //   const { location } = await response.json()
  //   // console.log(location);
  //   // setAddress(location);
  //   setCredentials({ ...credentials, [e.target.name]: location })
  // }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    
    console.log(credentials);
    const response = await fetch(`${apiUrl}/api/auth/createuser`, {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token to local storage and redirect
      localStorage.setItem('token', json.authToken)
      navigate("/login")

    }
    else {
      // console.log(json);
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
      <div>
      <Navbar />
      </div>

        <div className='container' >
          <div className='w-50 m-auto mt-5 border bg-dark border-success rounded' >

            <div className="m-3">
              <div  className="form-label">Name</div>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>

            <div className="m-3">
              <div className="form-label">Email address</div>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>

            <div className="m-3">
              <div  className="form-label">Address</div>
              <input type="text" className="form-control" name='geolocation' placeholder='"Current address"' value={credentials.geolocation} onChange={onChange} aria-describedby="emailHelp" />
            </div>

            {/* <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
            </div> */}
            
            <div className="m-3">
              <div  className="form-label">Password</div>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>

            <button type="submit" className="m-3 btn btn-success" onClick={handleSubmit}>Submit</button>

            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>

          </div>
        </div>
      </div>
  )
}