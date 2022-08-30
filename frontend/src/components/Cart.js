import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";

export default function Cart(){
    const [products, setAllProducts] = useState([]);

  const userId = useSelector((state) => state.auth.value.userId);

  useEffect(() => {
    fetch(`/api/products/cart/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllProducts(data.cart);
      });
  }, []);

  const handleDelete = (id,index) => {
    fetch(`/api/products/deleteCartItem/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="container-fluid">
        <h4 style={{textAlign : "center",marginTop : '30px'}}>Items In Your Cart</h4>
      <div className="row">
        {products.length == 0 ? <h1 style={{textAlign : "center",marginTop : '30px',color : "red",fontStyle : "italic"}}>No Items In your cart</h1> : products.map((product,index) => {return (
          <div className="col-sm-3">
            <div class="card bg-dark text-light">
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">{product.description}</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p className="my-auto">Rs {product.price}</p>
                  <button class="btn btn-danger" onClick={() => {handleDelete(product._id,index)}}>
                    Remove From Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
