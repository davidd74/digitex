import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const RatingFormula = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} fontSize={"1.25rem"} color="#FFD700" />
      ))}
      {halfStar && <FaStarHalfAlt fontSize={"1.25rem"} color="#FFD700" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i} fontSize={"1.25rem"} color="#FFD700" />
      ))}
    </div>
  );
};

RatingFormula.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default RatingFormula;
