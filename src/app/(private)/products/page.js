import { routeNames } from "@/app/constants";
import Link from "next/link";
import React from "react";

export default function Products() {
  return (
    <div className="products-container">
      <div>Product List</div>
      <Link
        className="tp-btn-border tp-btn-hover alt-color-black"
        href={routeNames.ADD_PRODUCT}
      >
        <span>Add Product</span>
        <b></b>
      </Link>
    </div>
  );
}
