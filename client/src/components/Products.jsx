import Container from "../components/Container";
import { Card, CardMedia, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import SyncLoader from "react-spinners/SyncLoader";
import toast from "react-hot-toast";
const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <SyncLoader color="#58B1FF" />
        </div>
      ) : (
        <Container>
          <Grid container spacing={2.5} marginTop={"7.5rem"}>
            {data?.map((product) => (
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
                  <CardMedia
                    component="img"
                    image={product.image.url}
                    alt={product.name}
                  />

                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <p className="transition-text cursor-pointer text-sm font-medium text-gray-400 duration-200 hover:text-gray-200">
                        {product.brand}
                      </p>
                      <Link to={`/product/${product._id}`}>
                        <h3 className="transition-text text-lg font-medium text-white duration-200 hover:text-primary-400">
                          {product.name}
                        </h3>
                      </Link>
                    </div>

                    <div>
                      <p className="mt-4 text-2xl font-medium text-slate-50">
                        ${product.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Products;
