import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const handleRemoveClick = () => {
    removeFromCart(item.id);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="card  mb-3" style={{borderRadius:"10px"}}>
      <div className="row no-gutters">
        <div className="col-md-4 ">
          <img
            src={item.thumbnail}
            className="card-img "
            alt={item.title}
            style={{ height: '100%', objectFit: 'cover', borderRadius:"10px 0px 0px 10px" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h4 className="card-title text-capitalize">{item.title}</h4>
            <p className="card-text">${item.price.toFixed(2)}</p>
            <div className="form-group mb-2">
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                className="form-control"
                value={item.quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
            <button
              className="btn btn-danger"
              style={{width:"100%"}}
              onClick={handleRemoveClick}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
