import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { BASE_URL } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";

import Container from "../components/Container";
import RatingFormula from "../components/RatingFormula";
import ProductSpecs from "../components/ProductSpecs";
import QuantityInput from "../components/QuanitityInput";
import { Grid } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

const MAX_DESCRIPTION_LENGTH = 400;
const MINIMUM_REVIEW_LENGTH = 200;

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [expandedTexts, setExpandedTexts] = useState({});
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { id } = useParams();

  const reviews = product?.reviews || [];
  const totalReviews = reviews.length;
  const ratings = Array(5).fill(0);

  if (totalReviews > 0) {
    reviews.forEach((review) => {
      ratings[review.rating - 1]++;
    });
  }

  const percentages = ratings.map((rating) => {
    return totalReviews > 0 ? (rating / totalReviews) * 100 : 0;
  });

  const averageRating = totalReviews
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
    : 0;

  const averageRatingFixed = totalReviews ? averageRating.toFixed(1) : 0;

  const readMoreHandler = (id) => {
    setExpandedTexts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleValueChange = (newValue) => {
    setQuantity(newValue);
  };

  const addToCartHandler = () => {
    const itemInCart = cartItems.find((item) => item._id === product._id);
    if (itemInCart) {
      toast.error("You already added this item to the cart!");
    } else {
      dispatch(addToCart({ ...product, qty: quantity }));
      toast.success("Added to cart");
      setQuantity(1);
    }
  };

  const isProductOutOfStock = product.countInStock === 0;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <Container style={{ paddingTop: "8rem" }}>
        <Link
          className="flex items-center gap-2 pb-7 text-lg hover:underline"
          to={"/"}
        >
          <BsArrowLeft color="white" />
          Go back
        </Link>
        <Grid container>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              height: "max-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1e1e1e",
              borderRadius: "1rem",
            }}
          >
            <div className="flex w-5/6 items-center justify-center rounded-xl bg-secondary-500 py-12">
              <img src={product.image?.url} alt={product.name} className="" />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="xs:mt-8 md:mt-0 md:px-5 md:py-2 lg:px-10 lg:py-4">
              <p className="mb- text-md transition-text cursor-pointer font-medium text-gray-400 duration-200 hover:text-gray-200">
                {product.brand}
              </p>
              <h1 className="xs:text-3xl md:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center">
                {averageRating ? (
                  <RatingFormula rating={averageRating} />
                ) : (
                  <div>No reviews.</div>
                )}
                <span className="ml-4 text-gray-400 hover:underline">
                  <a href="#reviews">
                    ({totalReviews}
                    {totalReviews === 1 ? " review" : " reviews"})
                  </a>
                </span>
              </div>
              <ProductSpecs product={product} />
              <h3 className="xs:mt-8 xs:text-4xl lg:mt-8 lg:text-5xl">
                ${product.price}
              </h3>
              <div className="flex flex-wrap items-center gap-4 xs:mt-4 md:mt-6 lg:mt-6">
                <button
                  className={`flex items-center gap-2 rounded-2xl px-4 font-medium xs:w-2/3 xs:py-3 ms:w-1/2 sm:w-1/3 md:w-1/2 lg:py-4 xl:w-1/3 ${
                    isProductOutOfStock
                      ? "cursor-not-allowed bg-red-400"
                      : "bg-primary-600 hover:bg-primary-700"
                  } transition-background duration-300`}
                  onClick={addToCartHandler}
                  disabled={isProductOutOfStock}
                >
                  <FaShoppingCart className="md:text-2xl lg:text-2xl" />
                  <p className="lg:text-md flex-1 text-center md:text-sm">
                    Add to cart
                  </p>
                </button>
                <div className="flex gap-2 text-lg font-semibold">
                  <QuantityInput
                    initialValue={1}
                    countInStock={product.countInStock}
                    onValueChange={handleValueChange}
                  />
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-lg text-red-600">
                {isProductOutOfStock ? (
                  <div className="flex items-center gap-2">
                    <MdCancel className="text-2xl font-semibold" />
                    Product out of stock
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-400">
                    <AiFillCheckCircle className="text-2xl font-semibold" />
                    {product.countInStock}{" "}
                    {product.countInStock === 1 ? "item" : "items"} in stock
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container className="mb-12 mt-12">
        <h1 className="xs:text-4xl">Product details</h1>
        <div className="text-md mt-6 text-gray-300">
          <div className="mt-2 font-light xs:w-full lg:w-2/3">
            {expandedTexts.productDescription ||
            product.description?.length <= MAX_DESCRIPTION_LENGTH
              ? product.description
              : `${product.description?.substring(
                  0,
                  MAX_DESCRIPTION_LENGTH,
                )}...`}
          </div>
          {product.description?.length > MAX_DESCRIPTION_LENGTH && (
            <button
              className="mt-2 text-sm text-primary-400 transition-colors duration-200 hover:text-primary-600 hover:underline"
              onClick={() => readMoreHandler("productDescription")}
            >
              {expandedTexts.productDescription ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      </Container>

      <Container className="ms:mt-10 md:mt-0">
        <h1 className="pt-8  xs:text-4xl" id="reviews">
          Product reviews
        </h1>

        <Grid container spacing={0} marginTop="2rem">
          <Grid item xs={12} md={4}>
            <div className="rounded-md bg-secondary-500 py-4 shadow-sm xs:px-6 md:px-4 lg:px-6">
              <div className="xs:text-4xl lg:text-5xl ">
                {averageRatingFixed} out of 5
              </div>
              <div className="mt-6 flex">
                {averageRating ? (
                  <RatingFormula rating={averageRating} />
                ) : (
                  <div>No reviews.</div>
                )}
                <span className="ml-4 text-gray-400 hover:underline">
                  ({totalReviews}
                  {totalReviews === 1 ? " review" : " reviews"})
                </span>
              </div>

              {percentages.reverse().map((percentage, index) => (
                <div key={index} className="mt-4 flex items-center gap-2">
                  <div className="w-14">
                    {percentages.length - index}
                    {percentages.length - index === 1 ? " star" : " stars"}
                  </div>

                  <div className="h-2 w-full flex-1 rounded-xl bg-secondary-400 shadow-xl">
                    <div
                      className="z-10 h-full rounded-xl bg-primary-600"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              <Link to={`/product/${product._id}/review`}>
                <button className="md:text-md transition-background mt-6 gap-2 rounded-2xl bg-primary-600 px-4 py-4 text-sm font-medium duration-300 hover:bg-primary-700 xs:w-full lg:w-1/2 xl:w-1/2">
                  Add a review
                </button>
              </Link>
            </div>
          </Grid>

          <Grid item xs={12} md={8}>
            <div className="flex flex-col gap-8 xs:mt-6 xs:px-0 md:mt-0 md:px-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-md bg-secondary-500 p-6 shadow-sm"
                >
                  <p className="flex items-center gap-2 text-xl">
                    <BiSolidUserCircle className="text-3xl" />
                    {review.user?.firstName}
                  </p>
                  <div
                    key={review._id}
                    className="mt-3 flex gap-2 text-lg xs:flex-col-reverse md:flex-row md:items-center"
                  >
                    <RatingFormula rating={review.rating} />
                    <p className="font-medium">{review.reviewTitle}</p>
                  </div>

                  <div className="mt-2 font-light">
                    {expandedTexts[review._id] ||
                    review.reviewDescription?.length <= MINIMUM_REVIEW_LENGTH
                      ? review.reviewDescription
                      : `${review.reviewDescription?.substring(
                          0,
                          MINIMUM_REVIEW_LENGTH,
                        )}...`}
                  </div>

                  {review.reviewDescription.length > MINIMUM_REVIEW_LENGTH && (
                    <button
                      className="mt-2 text-sm text-primary-400 transition-colors duration-200 hover:text-primary-600 hover:underline"
                      onClick={() => readMoreHandler(review._id)}
                    >
                      {expandedTexts[review._id] ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductScreen;
