"use client";
import { Inputx } from "@/app/components";
import ApiClient from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CategorySelector from "./CategorySelector";
import { Toast } from "@/app/shared/Toast";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [categoryTree, setCategoryTree] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchCategories = () => {
    ApiClient.get("/categorey")
      .then((res) => {
        res && setCategories(res?.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = (values) => {
    console.log("values", values);
    values = {
      ...values,
      categoryTree,
      categoryId: selectedCategory.categoryId,
    };
    ApiClient.post("/product/create", values).then((res) => {
      res && Toast("Product Added Successfully");
    });
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

          <CategorySelector
            name="category"
            categories={categories}
            finalSelectCategory={setCategoryTree}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <button type="submit" className="signin-btn">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
