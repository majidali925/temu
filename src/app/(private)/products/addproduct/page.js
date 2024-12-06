"use client";
import { Selectx, Inputx } from "@/app/components";
import ApiClient from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CategorySelector from "./CategorySelector";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchCategories = () => {
    ApiClient.get("/categorey")
      .then((res) => {
        console.log({ res });
        setCategories(res?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
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
          {/* <Selectx
            required
            errors={errors}
            label={"Category"}
            name="categoreyId"
            control={control}
            register={register}
            options={categories}
            getOptionValue={(option) => option?.categoreyId}
            getOptionLabel={(option) => option?.categoreyName}
          /> */}

          <CategorySelector categories={categories} />
          <button type="submit" className="signin-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
