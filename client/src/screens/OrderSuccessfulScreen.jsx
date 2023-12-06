import { Link, useParams } from "react-router-dom";
import Container from "../components/Container";
import { FaCheckCircle } from "react-icons/fa";
import { clearCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const OrderSuccessfulScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, []);

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center rounded-2xl bg-secondary-500 text-center xs:w-full xs:p-8 sm:p-12 md:w-2/3 md:p-16 lg:w-1/2 lg:p-24">
        <div className="mb-6 flex items-center justify-center  rounded-full">
          <FaCheckCircle className="xs:text-5xl md:text-7xl text-green-500" />
        </div>
        <h1 className=" font-medium xs:text-xl md:text-3xl">
          Thank you for your order!
        </h1>
        <p className="md:text-md mt-2 pt-2 text-slate-300 xs:text-sm">
          Your order number is: <span className="text-bold">{id}</span>
        </p>
        <button className="mt-6 rounded-2xl bg-primary-600 font-medium transition-all duration-300 ease-in-out hover:bg-primary-700 xs:p-3 xs:py-3 md:px-4 md:py-4 lg:w-1/2 text-sm">
          <Link to={`/account/orders/${id}`}>Check order status</Link>
        </button>
      </div>
    </Container>
  );
};

export default OrderSuccessfulScreen;
