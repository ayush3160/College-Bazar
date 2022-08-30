import React from "react";
import Carousel from "../components/carousel";

export default function Welcome() {
  return (
    <>
      <Carousel />
      <div style={{ width: "100%",backgroundColor : 'white' }}>
        <h1 style={{ textAlign: "center",color : 'red',fontFamily : 'sans-serif'}}>Why College-Bazar ?</h1>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
        >
          <div style={{ width: "25%",display : 'flex',flexDirection : 'column' }} className = "mx-auto">
          <img src="undraw_Gift_re_qr17.png" alt="image" width={"100%"} />
            <p>
              College Bazar is web application which is trying to build a
              student community-based marketplace for all the needs of students.
              <br />
              <br />
              Using college bazar students of the college can connect with each
              other to sell and buy the products.
            </p>
          </div>
          <div style={{ width: "25%",display : 'flex',flexDirection : 'column' }} className = "mx-auto">
          <img src="undraw_Chatting_re_j55r.png" alt="image" width={"100%"} />
            <p>
              College Bazar enables you to directly chat with owner and can get more clearity of the product 
              <br />
              <br />
            </p>
          </div>
          <div style={{ width: "25%",display : 'flex',flexDirection : 'column' }} className = "mx-auto">
          <img src="undraw_Accept_terms_re_lj38.png" alt="image" width={"100%"} />
            <p>
              Since only the students of your college can use the college bazar. It makes it more safe and trustworthy
              <br />
              <br />
              Admin can view all the products and can remove any product if it does not fit in the rules and regulation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
