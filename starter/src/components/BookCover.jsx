import PropTypes from "prop-types";

const BookCover = ({ imageLinks }) => {
  const thumbnail = imageLinks?.thumbnail ?? "";

  const coverStyle = {
    width: 128,
    height: 190,
  };

  return (
    <img
      className="book-cover"
      src={thumbnail}
      style={coverStyle}
      alt={thumbnail}
    />
  );
};

BookCover.propTypes = {
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string,
  }),
};

export default BookCover;
