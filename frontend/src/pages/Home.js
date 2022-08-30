import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const [products, setProducts] = useState([]);

  const [searchProducts,setSearchProducts] = useState([])

  const isLoggedIn = useSelector((state) => state.auth.value.loggedIn);

  useEffect(() => {
    fetch("/api/product/getAll")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.allProducts)
        setProducts(data.allProducts);
        setSearchProducts(data.allProducts);
      });
  }, []);

  const handleSearch = (e) => {
    const searchedProducts = products.filter((value) => {
        if(value.name.toLowerCase().includes(e.target.value)){
            return value
        }
    })

    setSearchProducts(searchedProducts)
  }

  const handleCategory = (category) => {
    if(category == 'all'){
        setSearchProducts(products)
    }else{
        const searchedProducts = products.filter((value) => {
            if(value.category == category){
                return value
            }
        })

        setSearchProducts(searchedProducts)
    }
  }

  const handleSort = () => {

    console.log(searchProducts)

    searchProducts.sort((a,b) => {
        return a.price - b.price
    })

    console.log(searchProducts)

    setSearchProducts(searchProducts)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgb(233, 248, 255)",
      }}
    >
      <div
        style={{
          width: "25vw",
          height: "50vh",
          marginTop: "15vh",
          borderRight: "2px solid black",
        }}
      >
        <div
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            width: "70%",
            borderRadius: "5%",
          }}
          className="mx-auto"
        >
          <h3 style={{ textAlign: "center" }}>Filters</h3>
          <h4 style={{ textAlign: "left", padding: "3px" }}>Category</h4>
          <input className="mx-3" name="radio-input" type={'radio'} onClick={() => {handleCategory('all')}}/><label>All</label>
          <br/>
          <input className="mx-3" name="radio-input" type={'radio'} onClick={() => {handleCategory('Study-Material')}}/><label>Study-Material</label>
          <br/>
          <input className="mx-3" name="radio-input" type={'radio'} onClick={() => {handleCategory('Sports')}}/><label>Sports</label>
          <br/>
          <input className="mx-3" name="radio-input" type={'radio'} onClick={() => {handleCategory('Electronic Item')}}/><label>Electronics Items</label>
          <br/>
          <input className="mx-3" name="radio-input" type={'radio'} onClick={() => {handleCategory('Cloths')}}/><label>Cloths</label>
          <br/>
        </div>
      </div>
      <div style={{ width: "75vw", marginTop: "5vh" }}>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Search Using The Name Or Category"
          onChange={(e) => {handleSearch(e)}}
        />
        <div className="row">
        {searchProducts.map((product) => {
          return (
            <>
            <div className="col-sm-4">
              <div class="card bg-dark text-light">
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-text">{product.description}</p>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className="my-auto mx-auto">Rs {product.price}</p>
                    <p className="my-auto mx-auto">Published By {product.user.name}</p>
                  </div>
                  <Link href="#" class="btn btn-primary" to={isLoggedIn ? `/chat/${product.user._id}` : '/login'}>
                      Chat with Owner
                  </Link>
                </div>
              </div>
              </div>
            </>
          );
        })}
        </div>
      </div>
    </div>
  );
}
