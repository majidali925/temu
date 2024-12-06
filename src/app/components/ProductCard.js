"use client";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import cardimage from "../../../public/img/productImage.jpg";
import { Toast } from "../shared/Toast";

export const ProductCard = () => {
  return (
    <Card style={{ borderRadius: "15px", overflow: "hidden" }}>
      <Image
        src={cardimage}
        width={150}
        height={145}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title style={{ fontSize: "14px" }}>Card Title</Card.Title>
        <Card.Text style={{ fontSize: "12px" }}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button
          style={{ float: "right" }}
          onClick={() => Toast({ message: "Product added to Cart" })}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};
