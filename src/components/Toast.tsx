import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  data?: string;
  notifySuccess?: boolean;
}

export default function Toast(props: ToastProps): JSX.Element {
  // let notify;
  // if (props.notifySuccess) {
  //   notify = () => toast.success(props.data);
  // } else {
  //  const notify = () => toast.error(props.data);
  // }

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
