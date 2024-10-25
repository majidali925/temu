import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleLoginButton = () => {
  return (
    <>
      <hr className="my-6" />

      <h2 className="text-center text-sm text-gray-500 mb-4">
        Or continue with Google
      </h2>

      <div className="flex justify-center">
        <button
          onClick={() => signIn("google")}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
          <Image
            src="/google.png"
            alt="Google logo"
            className="w-5 h-5 mr-2"
            width={20}
            height={20}
          />
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default GoogleLoginButton;
