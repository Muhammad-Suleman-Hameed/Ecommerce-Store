import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Checkout = ({totalItems , totalPrice}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [sameAddress, setSameAddress] = useState(false);

  const handleShippingChange = (e) => {
    const value = e.target.value;
    setShippingAddress(value);
    if (sameAddress) {
      setBillingAddress(value);
    }
  };

  const handleBillingChange = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    } else {
      setBillingAddress('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity()) {
      setOrderConfirmed(true);
    } else {
      form.classList.add('was-validated');
    }
  };
  
  if (orderConfirmed) {
    return (
      <div className="container mt-5">
        <div className="text-center py-4">
          <h3>Your order is confirmed!</h3>
          <Link to="/" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center py-4">
        <h2>Checkout Form</h2>
      </div>
      <div className="row">
        <div className="col-md-8">
          <h4>Billing Address</h4>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="username" required />
              <div className="invalid-feedback">Your username is required.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" required />
              <div className="invalid-feedback">Enter a valid email for updates.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="shipping-address" className="form-label">
                Shipping Address
              </label>
              <input
                type="text"
                className="form-control"
                id="shipping-address"
                required
                value={shippingAddress}
                onChange={handleShippingChange}
              />
              <div className="invalid-feedback">Enter your shipping address.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="billing-address" className="form-label">
                Billing Address
              </label>
              <input
                type="text"
                className="form-control"
                id="billing-address"
                required
                value={billingAddress}
                onChange={handleBillingChange}
                disabled={sameAddress}
              />
              <div className="invalid-feedback">Enter your billing address.</div>
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="same-address"
                  checked={sameAddress}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
            </div>

            <h4>Payment</h4>
            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="credit"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="credit">
                  Credit Card
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="paymentMethod" id="debit" />
                <label className="form-check-label" htmlFor="debit">
                  Debit Card
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="paymentMethod" id="paypal" />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="paymentMethod" id="cod" />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name" className="form-label">
                  Name on Card
                </label>
                <input type="text" className="form-control" id="cc-name" required />
                <small className="text-muted">Full name as on card</small>
                <div className="invalid-feedback">Name is required.</div>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number" className="form-label">
                  Card Number
                </label>
                <input type="text" className="form-control" id="cc-number" required />
                <div className="invalid-feedback">Card number is required.</div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration" className="form-label">
                  Expiration
                </label>
                <input type="text" className="form-control" id="cc-expiration" required />
                <div className="invalid-feedback">Expiration date required.</div>
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="cc-cvv" className="form-label">
                  CVV
                </label>
                <input type="text" className="form-control" id="cc-cvv" required />
                <div className="invalid-feedback">CVV required.</div>
              </div>
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Continue to Checkout
            </button>
          </form>
        </div>

        <div className="col-md-4" id="summary">
          <h4 className="d-flex justify-content-between align-items-center">
            Your Cart <span className="badge bg-secondary">{totalItems}</span>
          </h4>
          <ul className="list-group mt-3">
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6>Total</h6>
                <small className="text-muted">Cart Items</small>
              </div>
              <span>${totalPrice}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${Math.floor(totalPrice)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;












