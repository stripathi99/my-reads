import PropTypes from "prop-types";
import shelves from "../utils/Shelves";

const BookShelfPicker = ({ book, updateBookShelf }) => {
  const handleChangeShelf = (newBookShelf) => {
    updateBookShelf(book, newBookShelf);
  };

  return (
    <div className="book-shelf-changer">
      <select
        id={`${book.id}-shelfPicker`}
        name="shelfPicker"
        value={book.shelf}
        onChange={(e) => handleChangeShelf(e.target.value)}
      >
        <option value="moveTo" disabled>
          Move to...
        </option>
        {shelves.map((shelf) => {
          return (
            <option key={shelf.id} value={shelf.value}>
              {shelf.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

BookShelfPicker.propTypes = {
  book: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default BookShelfPicker;
