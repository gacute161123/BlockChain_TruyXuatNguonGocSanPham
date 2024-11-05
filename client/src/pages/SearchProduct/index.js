import { useEffect, useState } from "react";
import { Col, Row, Tag } from "antd";
import { useSearchParams } from "react-router-dom";
import { getProductList } from "../../services/productService";
import SearchProductList from "./SearchProductList";
function SearchProduct() {
  const [dataProduct, setDataProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordSearch = searchParams.get("keyword") || "";
  useEffect(() => {
    const fetchApi = async () => {
      const DataProduct = await getProductList();
      if (DataProduct) {
        const newDataProduct = DataProduct.filter((item) => {
          const keyword = keywordSearch
            ? item.productCode?.includes(keywordSearch)
            : true;
          return keyword;
        });
        setDataProduct(newDataProduct);
      }
    };
    fetchApi();
  }, []);
  console.log(dataProduct);
  return (
    <>
      <div className="container">
        <div style={{ padding: "10px 0px" }}>
          <strong>Kết quả tìm kiếm theo productCode: </strong>
          {keywordSearch && <Tag color="#00a139">{keywordSearch}</Tag>}
        </div>
        <SearchProductList dataProduct={dataProduct} />
      </div>
    </>
  );
}
export default SearchProduct;
