import { Card, Image } from "antd";
import "./CartProduct.scss"
import { Link, NavLink } from "react-router-dom";

function CartProduct(props) {
  const { item } = props;

  return (
    <>
      <Card
        hoverable
        style={{
          width: 240,
          position: "relative",
          alignContent: "center",
          padding: "0px",
        }}
        cover={
          <Image
            alt="quả"
            src={`/${item.imageUrl}`}
            style={{
              width: "240px",
              height: "240px",
              alignContent: "center",
              display: "flex",
              borderRadius: "5% 5% 0% 0%",
            }}
          />
        }
      >
        <div className="product">
          <Link
            to={"/product/product-detail/" + item._id}
            style={{
              color: "black",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <div className="product__name">{item.name}</div>
            <div className="product__price">{item.productCode}</div>
          </Link>
        </div>
      </Card>
    </>
  );
}
export default CartProduct;
