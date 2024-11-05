import { Col, Row, Tag } from "antd";
import CartProduct from "../../components/CardProduct";
import nofindproduct from "../../assets/images/nofindproduct.png";
import "./index.scss"
function SearchProductList(props) {
  const { dataProduct } = props;
  return (
    <>
      {dataProduct.length > 0 ? (
        <Row gutter={[45, 45]}>
          {dataProduct.map((item, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                flexWrap: "wrap",
                marginRight: "20px",
              }}
            >
              <CartProduct item={item} key={item._id} />
            </div>
          ))}
        </Row>
      ) : (
        <>
          <div className="FormSearchNoFind">
            <div className="FormSearchNoFind__content">
              <img
                src={nofindproduct}
                alt="no find product"
                style={{ height: "150px" }}
              />
              <div className="FormSearchNoFind__content_title">
                <div>Không tìm thấy kết quả nào</div>
                <div>Hãy sử dụng mã productCode đúng hơn</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default SearchProductList;
