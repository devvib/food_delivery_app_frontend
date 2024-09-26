/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';  // Using react-icons for shopping cart icon
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    localStorage.setItem('temp', "first");
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }

    const loadCart = () => {
        setCartView(true);
    }

    const items = useCart();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-sticky" 
            style={{
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.7)", 
                position: "fixed", 
                zIndex: "10", 
                width: "100%", 
                backdropFilter: 'blur(8px)' // Adds a nice blur effect for the dark mode
            }}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fst-italic text-light" to="/">JustFood</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 mx-3 active text-light" aria-current="page" to="/">Home</Link>
                        </li>
                        {localStorage.getItem("token") &&
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 text-light" aria-current="page" to="/myorder">My Orders</Link>
                            </li>
                        }
                    </ul>
                    {!localStorage.getItem("token") ?
                        <form className="d-flex">
                            <Link className="btn btn-outline-light mx-1" to="/login">Login</Link>
                            <Link className="btn btn-outline-light mx-1" to="/signup">Signup</Link>
                        </form> :
                        <div className="d-flex align-items-center">
                            <div className="btn btn-outline-light mx-2" onClick={loadCart}>
                                <Badge bg="secondary" pill>{items.length}</Badge>
                                <FaShoppingCart className="ms-2" />
                                Cart
                            </div>

                            {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

                            <button onClick={handleLogout} className="btn btn-outline-light ms-2">Logout</button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
