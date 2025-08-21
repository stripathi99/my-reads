import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookShelf from "./BookShelf";
import shelves from "../utils/Shelves";

const Bookcase = ({ books, updateBookShelf }) => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {
            shelves
              .filter((shelf) => shelf.value !== "none")
              .map((shelf) => {
                const filteredBooks = books.filter(
                  (book) => book.shelf === shelf.value
                );
                return (
                  <BookShelf
                    key={shelf.id}
                    title={shelf.title}
                    books={filteredBooks}
                    updateBookShelf={updateBookShelf}
                  />
                );
              })
          }
        </div>
        <div className="open-search">
          <Link to="/search" className="open-search-link">
            Add a book
          </Link>
        </div>
      </div>
    </div>
  );
};

Bookcase.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Bookcase;
