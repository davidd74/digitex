import { Grid } from "@mui/material";
import Container from "../components/Container";
import CartSummary from "../components/CartSummary";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentScreen = () => {
  const totalPrice = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.shippingAddress._id) {
      navigate("/checkout/address");
    }
  });

  return (
    <Container
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="mt-[200px]">
        <div>
          <h1 className="pb-8 text-center font-medium xs:text-3xl md:text-4xl">
            Checkout
          </h1>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} lg={9}>
            <div>
              <div className="mb-6 flex justify-between bg-secondary-500 px-4 py-3 font-medium shadow-sm">
                <div className="w-1/3">Product Name</div>
                <div className="w-1/3">Quantity</div>
                <div className="w-1/3">Price</div>
              </div>
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="my-4 flex justify-between rounded-sm bg-secondary-500 px-2 py-4 shadow-sm xs:items-center md:items-start"
                >
                  <div className="flex gap-2 xs:w-1/2 xs:flex-col md:w-1/3 lg:flex-row">
                    <img
                      src={item.image}
                      className="xs:h-12 xs:w-12 md:h-20 md:w-20"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="product-name pr-2 xs:w-2/3 md:w-2/3">
                        <Link
                          to={`/product/${item._id}`}
                          className="block transition-all duration-300 ease-in-out hover:text-primary-400 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </p>
                      <p className="pb-2 font-medium">${item.price}</p>
                    </div>
                  </div>
                  <div className="w-1/3">{item.qty}</div>
                  <div className="w-1/3">
                    <p className="font-semibold">${item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} lg={3}>
            <CartSummary totalPrice={totalPrice} buttonCta="Place Order" />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default PaymentScreen;
