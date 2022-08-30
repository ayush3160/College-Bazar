import React,{useState} from "react";
import { useSelector } from "react-redux";

export default function PostItem() {

    const userId = useSelector((state) => state.auth.value.userId);

    const [category,setCategory] = useState("")

    const [product,setProduct] = useState({})

    const handleChange = (e) => {
        if(e.target.name == 'name'){
            product.name = e.target.value
        }else if(e.target.name == 'description'){
            product.description = e.target.value
        }else if(e.target.name == 'price'){
            product.price = e.target.value
        }
    }

    const handlePost = () => {
        product.category = category;

        product.user = userId

        fetch('/api/product/createProduct',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(product)
        }).then((res) => {
            return res.json
        }).then((data) => {
            console.log(data)
        })
    }

  return (
    <div className="container-fluid">
      <h4 style={{ textAlign: "center", marginTop: "30px" }}>
        Post A New Product
      </h4>
      <div class="card bg-light text-dark mx-auto" style={{ width: "50%" }}>
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label for="name" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Ex :- English Book"
                  name = "name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div class="form-group row my-3">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Description
              </label>
              <div class="col-sm-10">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name = "description"
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
            </div>
            <div class="form-group row my-3">
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Price
              </label>
              <div class="col-sm-10">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Ex :- 100"
                  name = "price"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <fieldset class="form-group">
              <div class="row">
                <legend class="col-form-label col-sm-2 pt-0">Category</legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="Study Material"
                      onClick={(e) => setCategory(e.target.value)}
                    />
                    <label class="form-check-label" for="gridRadios1">
                      Study Material
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="Electronics Item"
                      onClick={(e) => setCategory(e.target.value)}
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Electronics Item
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios3"
                      value="Sports Item"
                      onClick={(e) => setCategory(e.target.value)}
                    />
                    <label class="form-check-label" for="gridRadios3">
                        Sports Item
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios4"
                      value="Cloths"
                      onClick={(e) => setCategory(e.target.value)}
                    />
                    <label class="form-check-label" for="gridRadios3">
                        Cloths
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            className="mx-auto"
          >
            <button class="btn btn-secondary mx-auto" onClick={handlePost}>Post The Item</button>
          </div>
        </div>
      </div>
    </div>
  );
}
