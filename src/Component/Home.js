import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";

import { Link, useNavigate } from "react-router-dom";
import CartTotal from "./CartTotal";

const Home = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    // Fetch products only if the products state is empty
    if (products.length === 0) {
      fetchProducts();
    }
  }, [token, products]);
  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add the new product to the cart
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }

    alert("Item Added Succesfully in Cart");
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleReset = () => {
    // Reset all filters to default values
    setSearchQuery("");
    setMinPrice(0);
    setMaxPrice(1000);

    // Fetch products again to reset the list
  };
  return (
    <div className="">
      <div className="container mt-4">
        <div className="d-flex align-items-center  justify-content-between">
          <h2 className="mb-4"> Listed Product </h2>

          <div className=" d-flex align-items-center gap-3 ">
            <div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                className="rounded-2 p-2 "
                style={{ height: "42px" }}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className="rounded-2 btn bg-warning fw-bold gap-2 d-flex align-items-center "
                style={{ width: "100px", fontSize: "20px" }}
              >
                Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>
              </button>
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5 d-flex align-items-center gap-3"
                        id="exampleModalLabel"
                      >
                        Shopping Cart
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="d-flex justify-content-center">
                        <CartTotal cart={cart} />
                      </div>
                      <div className="container mt-4">
                        {cart &&
                          cart.map((item) => (
                            <CartItem
                              key={item.id}
                              item={item}
                              removeFromCart={removeFromCart}
                              updateQuantity={updateQuantity}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5 mt-4 ">
          <div className="d-flex align-items-center gap-3 ">
            <div>
              <label className="fs-5 fw-bold" htmlFor="minPrice">
                Min Price:
              </label>
              <input
                type="number"
                id="minPrice"
                value={minPrice}
                onChange={(e) => setMinPrice(parseInt(e.target.value))}
                className="rounded-2 p-2 "
                style={{ height: "42px" }}
              />
            </div>
            <div>
              <label className="fs-5 fw-bold" htmlFor="maxPrice">
                Max Price:
              </label>
              <input
                type="number"
                id="maxPrice"
                className="rounded-2 p-2 "
                style={{ height: "42px" }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
            </div>
            <div className="">
              <button
                onClick={handleReset}
                className="rounded-2 btn bg-primary fw-bold text-white  "
                style={{ width: "100px", fontSize: "20px" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card rounded-4" style={{ height: "410px" }}>
                <img
                  src={product.thumbnail}
                  className="card-img-top rounded-top-4"
                  alt={product.title}
                  style={{ height: "200px", width: "100%", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    {activeProduct === product.id
                      ? product.description
                      : `${product.description.slice(0, 50)}...`}
                  </p>

                  <div className="d-flex gap-3 justify-content-between">
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Rating: {product.rating}</p>
                  </div>

                  <button
                    style={{ width: "100%", marginBottom: "0px" }}
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
