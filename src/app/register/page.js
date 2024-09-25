"use client";

import { useForm } from "react-hook-form";
import Inputx from "../components/Input";
import axios from "axios";
import "dotenv/config";
import { signIn } from "next-auth/react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    try {
      const response = await axios.post("/api/register", {
        data: values,
      });
      console.log({ response });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Inputx
              name="first_name"
              label="First Name"
              required
              register={register}
              validation={{
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
              }}
              errors={errors}
            />
            <Inputx
              name="last_name"
              label="Last Name"
              register={register}
              errors={errors}
            />
            <Inputx
              name="email"
              label="Email address"
              type="email"
              required
              register={register}
              errors={errors}
              validation={{
                // message: "Email Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
            />
            <Inputx
              name="password"
              label="Password"
              type="password"
              required
              register={register}
              errors={errors}
              validation={{
                minLength: {
                  value: 8,
                  message: "Minimum length is 8 characters",
                },
              }}
            />

            <div>
              <button
                type="submit"
                className="flex w-full mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 pl-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register
              </button>
            </div>
          </form>

          <hr />
          <h2>Or sign in with Google</h2>
          <button
            onClick={() => signIn("google")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}>
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
