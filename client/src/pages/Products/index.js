import { useEffect, useState } from "react";
import CartProduct from "../../components/CardProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { getProductList } from "../../services/productService";

function Product() {
  
  const [dataListProduct, setDataListProduct] = useState("");
  useEffect(()=>{
    const fetchAPI = async ()=>{
      const response = await getProductList();
      if(response){
        setDataListProduct(response)
      }
    }
    fetchAPI();

  },[])

  return (
    <>
      <div className="container">
        <div style={{ paddingTop: "20px" }}>
          <h1>
            <span style={{ color: "#00a139" }}>DANH MỤC</span> SẢN PHẨM
          </h1>
          <hr style={{ color: "#00a139" }} />
        </div>
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {dataListProduct && (
            <>
              {dataListProduct.map((item) => (
                <CartProduct item={item} key={item._id}/>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
