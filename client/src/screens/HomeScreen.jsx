import Products from "../components/Products";
import Container from "../components/Container";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  var settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <FaChevronRight color="white" />,
    prevArrow: <FaChevronLeft color="white" />,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
    lazyLoad: "ondemand",
  };

  return (
    <Container>
      <div className="mt-[100px] w-full px-2.5">
        <Slider {...settings}>
          <div
            className="bg-start w-full rounded-[0.65rem] bg-samsung_banner bg-cover bg-no-repeat xs:h-[225px] sm:h-[300px] md:h-[350px] lg:h-[500px]  xl:bg-center 2xl:h-[530px]"
            onClick={() => navigate(`/product/64d4b10c0fdb05e93626b4b2`)}
          ></div>
          <div
            className="bg-start h-[225px] w-full rounded-[0.65rem] bg-apple_banner bg-cover bg-no-repeat sm:h-[300px] md:h-[350px] lg:h-[500px]  xl:bg-center 2xl:h-[530px]"
            onClick={() => navigate(`/product/64e5f3f795851c5c5ea9ca55`)}
          ></div>
          <div
            className="bg-start h-[225px] w-full rounded-[0.65rem] bg-xiaomi_banner bg-cover bg-no-repeat sm:h-[300px] md:h-[350px] lg:h-[500px]  xl:bg-center 2xl:h-[530px]"
            onClick={() => navigate(`/product/658c8bd97f5374a178cdf460`)}
          ></div>
        </Slider>
      </div>
      <Products />
    </Container>
  );
};

export default HomeScreen;
