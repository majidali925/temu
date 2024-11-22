import toast from "react-hot-toast";

export function Toast({ message, type = "success" }) {
  switch (type) {
    case "error":
      return toast.error(message);
    case "info":
      return toast.info(message);
    case "warning":
      return toast.warning(message);
    default:
      return toast.success(message); // Default toast if no valid type is provided
  }
}
