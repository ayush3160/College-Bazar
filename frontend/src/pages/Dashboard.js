import React, { useState } from "react";
import ItemsPostedByUser from "../components/ItemsPostedByUser";
import PostItem from "../components/PostItem";
import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const isLoggedIn = useSelector((state) => state.auth.value.loggedIn);

  const [element, setElement] = useState(<ItemsPostedByUser />);

  const handleClick = (key) => {
    switch (key) {
      case "Post":
        setElement(<PostItem />);
        break;

      case "Cart":
        setElement(<Cart />);
        break;

      default:
        setElement(<ItemsPostedByUser />);
        break;
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Welcome To Your DashBoard ! 👋</h1>
      <br />
      <p style={{ textAlign: "center", fontStyle: "italic" }}>
        From here you can post item,see your posted items,delete items,also can
        see your cart
      </p>
      {isLoggedIn ? (<>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button
            className="btn btn-primary mx-auto"
            onClick={() => {
              handleClick("");
            }}
          >
            {" "}
            Get Your Posted Items
          </button>
          <button
            className="btn btn-primary mx-auto"
            onClick={() => {
              handleClick("Cart");
            }}
          >
            See Your Cart
          </button>
          <button
            className="btn btn-primary mx-auto"
            onClick={() => {
              handleClick("Post");
            }}
          >
            Post New Item
          </button>
        </div>
        {element}
        </>) : (<>
        <h4 style={{textAlign : "center",marginTop : "50px",color : "red",fontStyle : "italic"}}>You cannot access the Dashboard If You Are Not Logged In</h4>
        <Link to = "/login" className="btn btn-primary" style={{marginLeft : '40vw'}}>Click here to go to Login Page</Link>
        </>)}
    </div>
  );
}
