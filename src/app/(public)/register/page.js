"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import GoogleLoginButton from "../../components/googlelogin";
import { useRouter } from "next/navigation";
import { Toast } from "../../shared/Toast";
import { Inputx } from "@/app/components";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        values
      );
      if (response.data.success) {
        Toast({ message: response.data.message });
        router.push("/login");
      }
    } catch ({ response }) {
      Toast({ message: response.data.message, type: "error" });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            src="./logo.svg"
            className="mx-auto h-12"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Inputx
              name="firstName"
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
              name="lastName"
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
                className="flex w-full mt-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 pl-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <GoogleLoginButton />
        </div>
      </div>
    </>
  );
};

export default Register;
