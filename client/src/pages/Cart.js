import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in to access this page.');
      navigate('/login');
      return;
    }

    fetch('/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const parsedOrders = data.map((order) => ({
            ...order,
            Products:
              typeof order.Products === 'string'
                ? JSON.parse(order.Products)
                : [], // Parse Products only if it's a string
          }));
          setOrders(parsedOrders);
        } else {
          console.error('Unexpected API response:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    // Remove the token only if navigating away from the Cart page
    return () => {
      if (location.pathname !== '/cart') {
        localStorage.removeItem('token');
      }
    };
  }, [location]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="cart-container">
      <h2>Your Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Shipping Address</th>
            <th>Customer ID</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6">No orders placed yet.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{order.OrderDate}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.ShippingAddress}</td>
                <td>{order.CustomerID}</td>
                <td>
                  <ul>
                    {order.Products.map((product, index) => (
                      <li key={index}>
                        <strong>{product.name}</strong> - ${product.price.toFixed(2)} (x{product.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
