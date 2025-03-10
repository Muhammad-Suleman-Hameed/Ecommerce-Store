import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeItemFromCart }) => {
  const navigate = useNavigate();

  const increaseQty = (id, currentQty) => {
    updateQuantity(id, currentQty + 1);
  };

  const decreaseQty = (id, currentQty) => {
    if (currentQty > 1) {
      updateQuantity(id, currentQty - 1);
    } else {
      removeItemFromCart(id);
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container container my-4">
      <table className="cart-table table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                Your cart is empty.
              </td>
            </tr>
          ) : (
            cart.map((item) => {
              const price = Number(item.price);
              const quantity = Number(item.quantity);
              const itemTotal = price * quantity;

              return (
                <tr key={item.id}>
                  <td className="product-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="35"
                      className="rounded shadow me-2"
                    />
                    <span className="product-name">{item.name}</span>
                    <button
                      className="remove-btn btn btn-link text-danger"
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                  <td className="price-cell">USD {price.toFixed(2)}</td>
                  <td className="quantity-cell">
                    <button
                      className="btn btn-outline-secondary btn-sm decrease-qty"
                      onClick={() => decreaseQty(item.id, quantity)}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="btn btn-outline-primary btn-sm increase-qty"
                      onClick={() => increaseQty(item.id, quantity)}
                    >
                      +
                    </button>
                  </td>
                  <td className="total-cell">USD {itemTotal.toFixed(2)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="cart-summary">
        <p>
          <strong>
            SUBTOTAL: <span id="subtotal">USD {subtotal.toFixed(2)}</span>
          </strong>
        </p>
        <p className="checkout-info text-muted">
          Taxes and shipping calculated at checkout
        </p>
        <button className="checkout-btn btn btn-primary" onClick={handleCheckout}>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;





