import PropTypes from "prop-types";

const Card = ({
  children,
  onClick,
  bg = "bg-gray-100",
  hover = "bg-gray-200",
}) => {
  return (
    <div
      onClick={onClick}
      className={`${bg} hover:${hover} p-6 rounded-lg shadow-md`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.string,
  hover: PropTypes.string,
  onClick: PropTypes.func,
};

export default Card;
