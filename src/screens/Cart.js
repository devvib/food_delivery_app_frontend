import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  // Dark mode colors
  const darkModeStyles = {
    backgroundColor: '#1e1e1e', // Dark background
    color: '#f8f9fa',           // Light text
    minHeight: '100vh',
    padding: '20px'
  };

  const tableStyles = {
    backgroundColor: '#292929', // Darker table background
    color: '#f8f9fa',           // Light text
    borderColor: '#555555',     // Border color for the table
  };

  if (data.length === 0) {
    return (
      <div style={darkModeStyles}>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(`${apiUrl}/api/auth/orderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={darkModeStyles}>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover' style={tableStyles}>
          <thead className='text-light fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className='text-light'>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn btn-danger p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-light'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn btn-success mt-5' onClick={handleCheckOut}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
