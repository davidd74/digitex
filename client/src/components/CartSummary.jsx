import { Divider } from "@mui/material";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addOrderToUser } from "../slices/userSlice";
import { setStep } from "../slices/checkoutSlice";

const CartSummary = ({ onClickFunction, totalPrice, buttonCta }) => {
  const length = useSelector((state) => state.cart.cartItems.length);
  const checkoutStep = useSelector((state) => state.checkout.step);
  const userData = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toString(),
          },
        },
      ],
    });
  };

  const userId = useSelector((state) => state.user.userData._id);
  const shippingAddress = useSelector(
    (state) => state.user.userData.shippingAddress,
  );

  const onApprove = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order`,
        {
          userId,
          products: cart,
          shippingAddress,
          fullPayerName: `${userData.firstName} ${userData.lastName}`,
        },
        { withCredentials: true },
      );

      console.log(response.data);

      if (response.data) {
        await Promise.all(
          cart.map(async (item) => {
            try {
              const stockResponse = await axios.put(
                `${BASE_URL}/products/countinstock`,
                {
                  productId: item._id,
                  quantity: item.qty,
                },
              );
              console.log(stockResponse.data);
            } catch (error) {
              console.error("Error updating stock:", error);
            }
          }),
        );

        // Clear the cart from local storage
        dispatch(addOrderToUser(response.data));
        dispatch(setStep("/checkout/successful"));

        // Navigate to the success route before clearing the cart, and then in that route the cart will get cleared!
        navigate(`/checkout/successful/${response.data}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex flex-col gap-5 rounded-sm bg-secondary-500  px-6 py-5 shadow-md`}
    >
      <h2 className="font-medium xs:text-xl md:text-3xl">Pricing Summary</h2>
      <Divider
        sx={{
          background: "gray",
          height: "2px",
        }}
      />
      <div className="flex justify-between">
        <div className="space-y-2 text-gray-300">
          <p>Shipping:</p>
          <p>Subtotal:</p>
        </div>
        <div className="space-y-2 font-semibold">
          <p>{totalPrice > 200 ? "Free" : "$5.00"}</p>
          <p>${totalPrice}</p>
        </div>
      </div>
      {checkoutStep === "/checkout/payment" ? (
        <>
          <h2 className="mt-4 font-medium xs:text-2xl md:text-3xl">
            Shipping Address:
          </h2>
          <Divider
            sx={{
              background: "gray",
              height: "2px",
            }}
          />
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              Full Name:{" "}
              <span className="text-white">
                {userData.firstName} {userData.lastName}
              </span>
            </p>
            <p>
              Street Address:{" "}
              <span className="text-white">
                {userData.shippingAddress.streetAddress}
              </span>
            </p>
            <p>
              City:{" "}
              <span className="text-white">
                {userData.shippingAddress.city}
              </span>
            </p>
            <p>
              State/Region:{" "}
              <span className="text-white">
                {userData.shippingAddress.state}
              </span>
            </p>
            <p>
              Country:{" "}
              <span className="text-white">
                {userData.shippingAddress.country}
              </span>
            </p>
          </div>
          <h2 className="mt-2 xs:text-xl md:text-2xl">Pay with paypal:</h2>

          <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </>
      ) : (
        <Link to="/checkout/address">
          <button
            className="text-md transition-bg md:text-md mt-2 rounded-lg bg-primary-600 px-2 py-3 font-medium duration-300 hover:bg-primary-700 xs:w-full xs:text-sm md:w-1/3 lg:w-full"
            disabled={length === 0}
            onClick={onClickFunction}
          >
            {buttonCta}
          </button>
        </Link>
      )}

      {checkoutStep !== "/checkout/payment" && (
        <>
          <p>Pay with paypal!</p>
          <div className="payments flex w-full">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              }
              alt="mastercard"
              className="object-contain xs:w-1/6 md:w-1/12 lg:w-1/3"
            />
          </div>
        </>
      )}
    </div>
  );
};

CartSummary.propTypes = {
  onClickFunction: PropTypes.func,
  totalPrice: PropTypes.number,
  buttonCta: PropTypes.string,
};

export default CartSummary;
