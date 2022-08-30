import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ItemsPostedByUser() {
  const [products, setAllProducts] = useState([]);

  const userId = useSelector((state) => state.auth.value.userId);

  useEffect(() => {
    fetch(`/api/product/getAllItemsOfUser/${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllProducts(data.products);
      });
  }, []);

  const handleDelete = (id,index) => {
    fetch(`/api/product/deleteItem/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if(data.msg == "Item Deleted"){
            products = products.filter((value,i) => {
                if(i !== index){
                    return value
                }
            })

            setAllProducts(products)
        }
      });
  }

  return (
    <div className="container-fluid">
        <h4 style={{textAlign : "center",marginTop : '30px'}}>Your Posted Items</h4>
      <div className="row">
        {products.length == 0 ? <h1 style={{textAlign : "center",marginTop : '30px',color : "red",fontStyle : "italic"}}>You Have Not posted any Items</h1> : products.map((product,index) => {return (
          <div className="col-sm-3">
            <div class="card bg-dark text-light">
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">{product.description}</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <p className="my-auto">Rs {product.price}</p>
                  <button class="btn btn-danger" onClick={() => {handleDelete(product._id,index)}}>
                    Remove The Item
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
