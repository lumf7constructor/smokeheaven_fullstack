import React, { useState, useEffect } from 'react';
import './MyCart.css';

function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [customerId, setCustomerId] = useState(1);  // Set Customer ID manually or fetch it dynamically (e.g., from session)

  useEffect(() => {
    // Get the cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    // Calculate the total amount
    const total = storedCart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
    setTotalAmount(total);
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (!address) {
      alert('Please enter your address.');
      return;
    }

    const orderData = {
        customerID: customerId,
        orderDate: new Date().toISOString().slice(0, 19).replace('T', ' '), // Correct date format
        products: cartItems,
        totalAmount,
        address,
      };
    
      
      
      

    try {
      const response = await fetch('/api/submitorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order submitted successfully!');
        // Clear the cart after submission
        localStorage.setItem('cart', JSON.stringify([]));
        setCartItems([]);
      } else {
        alert('Failed to submit order.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('An error occurred while submitting your order.');
    }
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>${Number(item.price).toFixed(2) || 'N/A'}</td> {/* Ensure price is a valid number */}
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeItemFromCart(item.productId)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <div>
              <label htmlFor="address">Shipping Address:</label>
              <textarea
                id="address"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter your shipping address"
              />
            </div>
            {/* Customer ID - Hardcoded or dynamic */}
            <div>
              <label htmlFor="customerId">Customer ID:</label>
              <input
                type="number"
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter your customer ID"
              />
            </div>
            <button onClick={handleSubmitOrder}>Submit Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyCart;
