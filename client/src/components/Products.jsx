import { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import SyncLoader from "react-spinners/SyncLoader";
import toast from "react-hot-toast";
import RatingFormula from "./RatingFormula";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    if (data && data.length > 0) {
      let imagesToLoad = data.length;

      const handleImageLoad = () => {
        imagesToLoad--;
        if (imagesToLoad === 0) {
          setLoading(false);
        }
      };

      data.forEach((product) => {
        const imageElement = new Image();
        imageElement.src = product.image.url;
        imageElement.addEventListener("load", handleImageLoad);
      });
    }
  }, [data]);

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      {isLoading || loading ? (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader color="#58B1FF" />
        </div>
      ) : (
        <div>
          <Grid container spacing={2.5} marginTop={"3.5rem"}>
            {data?.map((product) => {
              const averageRating = product.reviews.reduce(
                (acc, review) => acc + review.rating,
                0,
              );

              return (
                <Grid item xs={6} md={3} lg={2} key={product._id}>
                  <Card
                    sx={{
                      bgcolor: "#1E1E1E",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: "20px",
                    }}
                  >
                    <Link to={`/product/${product?._id}`}>
                      <CardMedia
                        component="img"
                        image={product?.image.url}
                        alt={product?.name}
                      />
                    </Link>

                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-400 duration-200 cursor-pointer transition-text hover:text-primary-600">
                          {product?.brand}
                        </p>
                        <Link to={`/product/${product?._id}`}>
                          <h3 className="text-lg font-medium text-white duration-200 cursor-pointer transition-text hover:text-primary-400">
                            {product?.name}
                          </h3>
                        </Link>
                      </div>
                      <div>
                        {averageRating ? (
                          <div className="flex gap-2 pt-1">
                            <RatingFormula rating={averageRating} />
                            <p className="text-white">
                              {averageRating.toFixed(1)}
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-2 pt-1">
                            <RatingFormula rating={averageRating} />
                            <p className="text-white">0</p>
                          </div>
                        )}
                        <p className="mt-4 text-2xl font-medium text-slate-50">
                          ${product?.price}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Products;
