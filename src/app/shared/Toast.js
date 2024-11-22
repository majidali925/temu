import { toast } from "react-toastify";

export function Toast(message) {
  return toast.success(message, {
    position: "top-center",
  });
}
