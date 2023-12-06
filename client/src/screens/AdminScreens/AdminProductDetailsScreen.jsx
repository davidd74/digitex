import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import InputField from "../../components/InputField";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { validateProductForm } from "../../utils/validate";
import toast from "react-hot-toast";

const AdminProductDetailsScreen = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const updateProduct = async (e) => {
    e.preventDefault();
    const erorrs = validateForm();

    if (Object.keys(erorrs).length !== 0) {
      Object.values(erorrs).forEach((error) => {
        toast.error(error, {});
      });
      return;
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data);
    };

    formData.productName = product.name ? product?.name : "";
    formData.productDescription = product.description
      ? product?.description
      : "";
    formData.countInStock = product.countInStock ? product?.countInStock : "";
    formData.productPrice = product.price || "";
    formData.productImage = product?.image?.url || "";
    formData.screenSize = product?.screenSize || "";
    formData.storageSize = product?.storage || "";
    formData.cameraPixels = product?.cameraPixels || "";
    formData.batteryMah = product?.batteryMah || "";

    fetchProduct();
  }, [id, product]);

  const { formData, handleInputChange, validateForm, formErrors } =
    useFormValidation(
      {
        productName: product.name ? product?.name : "",
        productDescription: product.description ? product?.description : "",
        countInStock: product.countInStock ? product?.countInStock : "",
        productPrice: product.price || "",
        productImage: product?.image?.url || "",
        screenSize: product?.screenSize || "",
        storageSize: product?.storage || "",
        cameraPixels: product?.cameraPixels || "",
        batteryMah: product?.batteryMah || "",
      },
      () => validateProductForm(formData),
    );

  return (
    <Container>
      <form className="mt-[200px] flex flex-col gap-4" onSubmit={updateProduct}>
        <InputField
          label="Product Name"
          type="text"
          name="productName"
          onChange={handleInputChange}
          value={formData.productName}
          error={!!formErrors.productName}
        />
        <InputField
          label="Product Description"
          type="text"
          name="productDescription"
          onChange={handleInputChange}
          value={formData.productDescription}
          error={!!formErrors.productDescription}
        />
        <InputField
          label="Count in Stock"
          type="number"
          name="countInStock"
          onChange={handleInputChange}
          value={formData.countInStock}
          error={!!formErrors.countInStock}
        />
        <InputField
          label="Product Price"
          type="number"
          name="productPrice"
          onChange={handleInputChange}
          value={formData.productPrice}
          error={!!formErrors.productPrice}
        />
        <InputField
          label="Product Image"
          type="text"
          name="productImage"
          onChange={handleInputChange}
          value={formData.productImage}
          error={!!formErrors.productImage}
        />
        <InputField
          label="Screen Size"
          type="text"
          name="screenSize"
          onChange={handleInputChange}
          value={formData.screenSize}
          error={!!formErrors.screenSize}
        />
        <InputField
          label="Storage Size"
          type="text"
          name="storageSize"
          onChange={handleInputChange}
          value={formData.storageSize}
          error={!!formErrors.storageSize}
        />

        <button
          type="submit"
          className="
        rounded-xl
        bg-primary-600 p-3 font-medium transition-all duration-200 ease-linear hover:bg-primary-700"
        >
          Update
        </button>
      </form>
    </Container>
  );
};

export default AdminProductDetailsScreen;
