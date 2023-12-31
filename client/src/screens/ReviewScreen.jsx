import Container from "../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

import InputField from "../components/InputField";
import { useFormValidation } from "../hooks/useFormValidation";
import { validateReviewForm } from "../utils/validate";
import toast from "react-hot-toast";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";
import SyncLoader from "react-spinners/SyncLoader";

const ReviewScreen = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const navigate = useNavigate();

  // fetch product details
  const { data, isLoading } = useGetProductDetailsQuery(id);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const response = await axios.get(`${BASE_URL}/products/${id}`);
  //     setProductDetails(response.data);
  //   };

  //   fetchProduct();
  // }, [id]);

  const handleClick = (ratingValue) => {
    if (rating === ratingValue) {
      setRating(0);
    } else {
      setRating(ratingValue);
    }
  };

  const { formData, formErrors, handleInputChange, validateForm } =
    useFormValidation(
      {
        reviewTitle: "",
        reviewDescription: "",
        rating: rating || 0,
      },
      () => validateReviewForm(formData),
    );

  const [createReview, { isLoading: isLoadingProductDetails }] =
    useCreateReviewMutation();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length !== 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error, {});
      });
      return;
    } else {
      try {
        const response = await createReview({
          productId: id,
          rating,
          reviewTitle: formData.reviewTitle,
          reviewDescription: formData.reviewDescription,
        }).unwrap();

        if (!response.success) {
          toast.error(response.message);
          return;
        }

        toast.success("Review submitted");
        navigate(`/product/${id}`, { replace: true });
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {isLoading || isLoadingProductDetails ? (
        <p className="flex  h-screen items-center justify-center">
          <SyncLoader color="#58B1FF" />
        </p>
      ) : (
        <Container
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="mt-[100px] flex flex-col items-center">
            <img src={data.image?.url} alt={data?.name} className="w-1/4" />
            <h2 className="mb-8 mt-6 text-center font-medium xs:text-lg md:text-2xl">
              {data.name}
            </h2>

            <form
              className="flex w-full flex-col items-center rounded-md bg-secondary-500 shadow-sm xs:p-2 md:p-6"
              onSubmit={handleReviewSubmit}
            >
              <p className="pb-2">Select a rating (required)</p>
              <div
                className="flex gap-3 text-2xl"
                onMouseLeave={() => setHover(0)}
              >
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;

                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onChange={handleInputChange}
                        onClick={() => handleClick(ratingValue)}
                        style={{ display: "none" }}
                      />
                      {ratingValue <= (hover || rating) ? (
                        <FaStar
                          color="#FFD700"
                          onMouseEnter={() => setHover(ratingValue)}
                        />
                      ) : (
                        <FaRegStar
                          color="#FFD700"
                          onMouseEnter={() => setHover(ratingValue)}
                        />
                      )}
                    </label>
                  );
                })}
              </div>

              <div className="mt-8 w-full space-y-5">
                <InputField
                  label="Review Title"
                  type="text"
                  name="reviewTitle"
                  value={formData.reviewTitle}
                  error={!!formErrors.reviewTitle}
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
                <InputField
                  label="Review Description"
                  type="text"
                  name="reviewDescription"
                  value={formData.reviewDescription}
                  error={!!formErrors.reviewDescription}
                  onChange={handleInputChange}
                  autoComplete={"off"}
                />
                <button
                  type="submit"
                  className="md:text-md rounded-lg bg-primary-600 py-3.5 transition-all duration-300 hover:bg-primary-700 xs:w-1/2 xs:text-sm sm:w-1/3 sm:px-2 md:w-1/4 "
                >
                  Submit review
                </button>
              </div>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default ReviewScreen;
