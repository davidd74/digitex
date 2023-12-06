import { Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../slices/cartSlice";
import QuantityInput from "../components/QuanitityInput";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { updateCart } from "../actions/cartActions";
import CartSummary from "../components/CartSummary";

import { setStep } from "../slices/checkoutSlice";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cartItems);
  const cartLength = cart.length;

  useEffect(() => {
    dispatch(updateCart(cart));
  }, [dispatch, cart]);

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
    toast.success("Removed from cart");
  };

  const totalPrice = useSelector((state) => state.cart.total);

  const checkoutStepHandler = () => {
    dispatch(setStep("/checkout/address"));
  };

  return (
    <Container
      style={{
        paddingTop: "200px",
      }}
    >
      <div className="flex items-center justify-between p-2">
        <div>
          <h1 className="text-xl font-medium md:text-3xl">Shopping Cart</h1>
        </div>
        <div>
          <h2 className="text-xl font-medium md:text-3xl">
            {cartLength} items
          </h2>
        </div>
      </div>
      <Divider
        sx={{
          margin: "1rem 0",
          background: "gray",
          height: "2px",
          width: "100%",
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <div>
            {/* cart items here */}
            {cartLength === 0 ? (
              <div className="space-y-2 rounded-sm bg-secondary-500 p-12 shadow-sm">
                <h2 className="text-2xl font-medium">
                  Your shopping cart is empty!
                </h2>
                <div className="text-primary-400 hover:text-primary-600 hover:underline">
                  <Link to="/">Continue shopping</Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="mb-6 hidden justify-between bg-secondary-500 px-4 py-3 font-medium shadow-sm md:flex">
                  <div className="w-1/3">Product Name</div>
                  <div className="w-1/3">Quantity</div>
                  <div className="w-1/3">Price</div>
                </div>
                <div className="flex flex-col gap-6">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between rounded-sm bg-secondary-500 px-2 py-4 shadow-sm xs:items-center md:items-start"
                    >
                      <div className="flex gap-2 xs:w-1/2 xs:flex-col md:w-1/3 lg:flex-row">
                        <img
                          src={item.image}
                          className="xs:h-12 xs:w-12 md:h-20 md:w-20"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="product-name pr-2 xs:w-full md:w-2/3">
                            <Link
                              to={`/product/${item._id}`}
                              className="block transition-all duration-300 ease-in-out hover:text-primary-400 hover:underline"
                            >
                              {item.name}
                            </Link>
                          </p>
                          <p className="pb-2 font-medium">${item.price}</p>
                          <button
                            className="flex items-center gap-2 text-red-500 hover:underline"
                            onClick={() => removeItem(item)}
                          >
                            <LiaTimesSolid className="text-xl" />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="xs:w-1/2 md:w-1/3">
                        <QuantityInput
                          initialValue={item.qty || 0}
                          countInStock={item.countInStock}
                          onValueChange={(newQty) => {
                            dispatch(
                              updateQuantity({
                                _id: item._id,
                                qty: newQty,
                                quantity: item.countInStock,
                              }),
                            );
                          }}
                        />
                      </div>
                      <div className="hidden xs:w-1/2 md:block md:w-1/3">
                        <p className="font-semibold">
                          ${item.price * item.qty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} lg={3}>
          <CartSummary
            totalPrice={totalPrice}
            onClickFunction={checkoutStepHandler}
            buttonCta="Proceed to checkout"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartScreen;
