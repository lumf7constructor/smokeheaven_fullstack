import React, { useEffect, useState } from 'react';
import './Cart.css';

function Cart() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the backend
    fetch('/api/orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);  // Assuming the response is an array of orders
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

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
            <th>Products</th> {/* Added Products column */}
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
                  {/* Render each product's details in the Products array */}
                  <ul>
                    {order.Products && Array.isArray(order.Products) && order.Products.map((product, index) => (
                      <li key={index}>
                        <strong>{product.name}</strong><br />
                        Price: ${product.price.toFixed(2)}<br />
                        Quantity: {product.quantity}
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
