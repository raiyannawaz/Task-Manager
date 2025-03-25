import { useContext } from "react";
import Context from "../ContextAPI/Context";

const Spinner = () => {

    let { isLoading } = useContext(Context)

    return (
      isLoading && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Spinner;