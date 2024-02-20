import React from 'react';

const CartTotal = ({ cart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className=" p-1">
      <div className=" d-flex gap-3 align-items-center">
        <h4 className="">Total Price</h4>
        <h4 className="">${totalPrice.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CartTotal;
