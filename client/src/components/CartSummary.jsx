import { Divider } from "@mui/material";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Link, useNavigate } from "react-router-dom";
import { addOrderToUser } from "../slices/userSlice";
import { setStep } from "../slices/checkoutSlice";
import { useUpdateCountInStockMutation } from "../slices/productsApiSlice";
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import SyncLoader from "react-spinners/SyncLoader";
import Button from "./Button";

const CartSummary = ({ onClickFunction, totalPrice, buttonCta }) => {
  const cartLength = useSelector((state) => state.cart.cartItems.length);
  const checkoutStep = useSelector((state) => state.checkout.step);
  const userData = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.cart.cartItems);
  const userId = useSelector((state) => state.user.userData._id);
  const shippingAddress = useSelector(
    (state) => state.user.userData.shippingAddress,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateCountInStock, { isLoading }] = useUpdateCountInStockMutation();
  const [postOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  // paypal config
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

  const onApprove = async () => {
    try {
      const response = await postOrder({
        userId,
        products: cart,
        shippingAddress,
        fullPayerName: `${userData.firstName} ${userData.lastName}`,
      }).unwrap();

      console.log(response);
      console.log("response");

      if (response) {
        await Promise.all(
          cart.map(async (item) => {
            try {
              const response = updateCountInStock({
                productId: item._id,
                quantity: item.qty,
              });

              console.log(response.data);
            } catch (error) {
              console.error("Error updating stock:", error);
            }
          }),
        );

        dispatch(addOrderToUser(response.data));
        dispatch(setStep("/checkout/successful"));
        navigate(`/checkout/successful/${response}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <SyncLoader color="#58B1FF" />
        </div>
      ) : (
        <div
          className={`flex flex-col gap-5 rounded-sm bg-secondary-500  px-3 py-5 shadow-md`}
        >
          <h2 className="font-medium xs:text-xl md:text-3xl">
            Pricing Summary
          </h2>
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

              {isCreatingOrder ? (
                <div>
                  <SyncLoader color="#58B1FF" />
                </div>
              ) : (
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              )}
            </>
          ) : (
            <Link to="/checkout/address">
              <Button
                disabled={cartLength === 0}
                text={buttonCta}
                onClick={onClickFunction}
              />
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
      )}
    </>
  );
};

CartSummary.propTypes = {
  onClickFunction: PropTypes.func,
  totalPrice: PropTypes.number,
  buttonCta: PropTypes.string,
};

export default CartSummary;
