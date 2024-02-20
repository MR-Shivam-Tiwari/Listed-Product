import React from 'react';
import CartItem from './CartItem';

const ShoppingCart = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart && cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
};

export default ShoppingCart;
