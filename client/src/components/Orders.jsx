import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { Pagination, PaginationItem } from "@mui/material";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import SyncLoader from "react-spinners/SyncLoader";

const Orders = () => {
  const [maxVisibleProducts, setMaxVisibleProducts] = useState(3);
  // Add a state variable for the current page
  const [page, setPage] = useState(1);
  // Add a state variable for the total number of orders
  const [count, setCount] = useState(0);

  const limit = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const { data, isLoading, refetch } = useGetUserOrdersQuery({
    page,
    limit: limit,
  });

  const showPagination = Math.ceil(count / limit) > 1;

  useEffect(() => {
    if (data) {
      setCount(data.count);
    } else {
      setCount(0);
    }
  }, [data]); // Only re-run the effect if data changes

  useEffect(() => {
    function handleWindowResize() {
      const currentWidth = window.innerWidth;
      const breakpoints = [768, 600, 320];
      let maxVisibleProducts = 1;

      for (const breakpoint of breakpoints) {
        if (currentWidth >= breakpoint) {
          maxVisibleProducts = breakpoints.indexOf(breakpoint) + 1;
        } else {
          break;
        }
      }

      setMaxVisibleProducts(maxVisibleProducts);
    }

    window.addEventListener("resize", handleWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    refetch({ page, limit: limit });
  }, [page]);

  return (
    <>
      {isLoading ? (
        <p className="flex h-full items-center justify-center">
          <SyncLoader color="#58B1FF" />
        </p>
      ) : (
        <div>
          <h4 className="mb-3 text-xl font-semibold">All purchases</h4>
          <div className="flex flex-col gap-3">
            {data?.items?.length === 0 ? (
              <p className="text-sm text-slate-300">
                {"You haven't made any purchases so far!"}
              </p>
            ) : (
              data.items?.map((order) => {
                let formattedDate = formatDate(order.createdAt);

                return (
                  <Link
                    to={`/account/orders/${order._id}`}
                    className="flex justify-between bg-secondary-500 p-4 text-sm"
                    key={order._id}
                  >
                    <div className="flex w-1/3 flex-col justify-center">
                      <div className="flex space-x-2">
                        {order.products
                          .slice(0, maxVisibleProducts)
                          .map((product) => (
                            <div key={product._id} className="">
                              <img
                                src={product.image}
                                className="w-12"
                                alt={product.title}
                              />
                            </div>
                          ))}
                        {order.products.length > maxVisibleProducts && (
                          <p className="items- center flex">
                            + {order.products.length - maxVisibleProducts} more
                          </p>
                        )}
                      </div>
                      <p className="mt-3">Items: {order.products.length}</p>
                    </div>

                    <div className="flex w-1/3 flex-col items-center justify-center gap-2">
                      <p>${order.orderTotal}</p>
                      <p>{formattedDate}</p>
                    </div>

                    <div className="flex w-1/3 items-center justify-end">
                      <AiOutlineRight className="text-xl" />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
          {showPagination && (
            <Pagination
              count={Math.ceil(count / limit)}
              page={page}
              onChange={handlePageChange}
              size="large"
              color="primary"
              sx={{ mt: 4 }}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#0E8BFF",
                    },
                    "& .MuiPaginationItem-icon": {
                      color: "white",
                    },
                    color: "white",
                  }}
                />
              )}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
