"use client";
import Inputx from "@/app/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <div className="product-form-container">
      <div className="product-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Inputx
            name="productName"
            label={"Product Name"}
            required
            errors={errors}
            register={register}
          />
          <Inputx
            required
            type="number"
            name="price"
            label={"Price"}
            errors={errors}
            register={register}
            className="inputNumber"
          />
          <button type="submit" className="signin-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
