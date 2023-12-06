import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { BASE_URL } from "../../utils/constants";

const AdminProductsScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <Container>
      <div className="mt-[200px] flex flex-col justify-between gap-4 md:flex-row md:gap-0">
        <h1 className="text-4xl">Products</h1>
        <button className="rounded-2xl bg-primary-600 p-2.5 font-medium transition-all duration-200 ease-linear hover:bg-primary-700 xs:w-1/2 md:w-auto md:p-3.5">
          Create Product
        </button>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="flex justify-between gap-3 p-4 font-semibold">
          <p className="w-1/4">ID</p>
          <p className="w-1/4">NAME</p>
          <p className="w-1/4">PRICE</p>
          <p className="w-1/4">BRAND</p>
        </div>
        <Divider
          sx={{
            background: "gray",
            height: "2px",
          }}
        />
        <div className="mt-4 flex flex-col gap-6 overflow-x-hidden">
          {products.map((product) => (
            <div
              className="flex items-center justify-around gap-3 overflow-x-auto rounded-md bg-secondary-500 xs:p-4 md:p-6"
              key={product._id}
            >
              <p className="w-1/4 overflow-hidden text-ellipsis">
                {product._id}
              </p>
              <p className="w-1/4 overflow-hidden text-ellipsis">
                {product.name}
              </p>
              <p className="w-1/4 overflow-hidden text-ellipsis">
                ${product.price}
              </p>
              <p className="flex w-1/4 flex-col items-center gap-2 md:flex-row">
                <span className="w-1/2">{product.brand}</span>

                <div className="flex w-1/2 gap-4">
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 px-1 transition-all duration-200 ease-linear hover:bg-primary-700 md:px-0">
                    <Link to={`/admin/products/${product._id}`}>
                      <FaRegEdit className="text-xl font-semibold" />
                    </Link>
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 px-1 transition-all duration-200 ease-linear hover:bg-red-700 md:px-0">
                    <BsTrash3 className="text-xl font-semibold" />
                  </button>
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AdminProductsScreen;
