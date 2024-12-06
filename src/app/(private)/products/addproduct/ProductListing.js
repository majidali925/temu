import { ProductCard } from "@/app/components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const ProductListing = () => {
  return (
    <Container>
      <Row style={{ justifyContent: "flex-start" }} fluid>
        <Col>
          <ProductCard />
        </Col>
        <Col>
          <ProductCard />
        </Col>
        <Col>
          <ProductCard />
        </Col>
        <Col>
          <ProductCard />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListing;
