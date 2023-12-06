import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/formatDate";
import { BiCopy } from "react-icons/bi";
import toast from "react-hot-toast";

const OrderScreen = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      // getOrder controller
      const response = await axios.get(`${BASE_URL}/orders/${id}`);
      setOrderDetails(response.data);
    };

    fetchOrders();
  }, []);

  const formattedDate = formatDate(orderDetails.createdAt);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderDetails._id);
    toast.success("Order number copied to clipboard!");
  };

  return (
    <div>
      <h3 className="text-center text-3xl font-semibold">ORDER DETAILS</h3>
      <div className="mt-8 flex justify-between">
        {/* generate p tag and make it underlined with tailwind css */}

        <p className="flex font-medium">
          Order number
          <BiCopy
            className="ml-2 cursor-pointer"
            onClick={copyOrderId}
            size={20}
          />
        </p>
        <p className="font-medium">Order date</p>
      </div>
      <div className="mt-3 flex justify-between">
        <p className="text-sm">{orderDetails._id}</p>
        <p className="text-sm">{formattedDate}</p>
      </div>

      {orderDetails.hasShipped ? (
        <p className="mt-4 rounded-md bg-green-500 p-5 font-medium text-green-950">
          Your order is on the way!
        </p>
      ) : (
        <p className="mt-4 rounded-md bg-yellow-500 p-5 font-medium text-yellow-950">
          Your order is being packed!
        </p>
      )}
      <div className="mt-6 rounded-md bg-secondary-500 p-4">
        <h4 className="text-center text-2xl font-medium">ORDER SUMMARY</h4>
        <div className="mt-8 flex flex-col gap-8">
          {orderDetails.products?.map((product) => (
            <div key={product._id}>
              <div className="flex overflow-x-visible xs:flex-col md:flex-row">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    className="pr-4 xs:w-24 ms:block sm:w-24"
                    alt={product.productTitle}
                  />
                </div>
                <div className="mt-2 flex flex-col text-sm font-medium">
                  <div className="space-y-1">
                    <p>{product.productTitle}</p>
                    <p>${product.price}</p>
                  </div>
                  <div className="space-y-1 text-xs xs:mt-3 md:mt-6">
                    <div className="flex justify-between gap-6">
                      <p className="text-slate-300">Art.no:</p>
                      <p className="truncate transition-all duration-300 ease-in-out hover:text-primary-400 xs:w-36 sm:w-auto">
                        <Link to={`/product/${product.productId}`}>
                          {product.productId}
                        </Link>
                      </p>
                    </div>
                    <div className="flex justify-between gap-6">
                      <p className="text-slate-300">Quantity:</p>
                      <p>{product.quantity}</p>
                    </div>
                    <div className="flex justify-between gap-6">
                      <p className="text-slate-300">Total:</p>
                      <p>${product.price * product.quantity}</p>
                    </div>
                    <div className="flex justify-between gap-6"></div>
                    <div className="flex justify-between gap-6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="space-y-1 text-xs">
            <p className="mb-3 text-sm font-semibold">Delivery address:</p>

            <p>{orderDetails.fullPayerName}</p>
            <p>{orderDetails.shippingAddress?.streetAddress}</p>
            <p>{orderDetails.shippingAddress?.city}</p>
            <p>
              {orderDetails.shippingAddress?.zip}{" "}
              {orderDetails.shippingAddress?.state}
            </p>
            <p>{orderDetails.shippingAddress?.country}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-secondary-500 p-4">
        <div className="flex justify-between text-sm font-medium">
          <div className="space-y-1">
            <p>Total:</p>
            <p>Delivery:</p>
            <p className="pt-4 text-lg font-semibold">Total:</p>
          </div>
          <div className="space-y-1">
            <p>${orderDetails.orderTotal}</p>
            <p>FREE</p>

            <p className="pt-4 text-lg font-semibold">
              ${orderDetails.orderTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
