import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Admin() {
  const [products, setProducts] = useState([]);

const navigate = useNavigate()

  useEffect(() => {
    fetch("/api/product/getAll")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.allProducts);
        setProducts(data.allProducts);
      });
  }, []);

  const handleDelete = (id, index) => {
    fetch(`/api/product/deleteItem/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

      const newProducts = products.filter((value, i) => {
        if (i !== index) {
          return value;
        }
      });

      setProducts(newProducts);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate('/home')
  }

  return (
    <>
      <div>
        <button className="btn btn-danger my-0" style={{ float: "right" }} onClick={handleLogout}>
          Logout
        </button>
        <h1 style={{ textAlign: "center" }}>Admin Page</h1>
      </div>

      <div className="row">
        {products.map((product, index) => {
          return (
            <>
              <div className="col-sm-4">
                <div class="card bg-dark text-light">
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <p class="card-text">{product.description}</p>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <p className="my-auto mx-auto">Rs {product.price}</p>
                      <p className="my-auto mx-auto">
                        Published By {product.user.name}
                      </p>
                    </div>
                    <button
                      class="btn btn-danger"
                      onClick={() => {
                        handleDelete(product._id, index);
                      }}
                    >
                      Remove The Item
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
