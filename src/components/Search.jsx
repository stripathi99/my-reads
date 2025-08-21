import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
import { search } from "../utils/BooksAPI";

const Search = ({ books, updateBookShelf }) => {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.length > 0) {
        try {
          const searchResults = await search(query, 10);
          if (searchResults.error) {
            setSearchResults([]);
            return;
          }

          searchResults.map((searchBook) => {
            const bookFound = books.find((book) => book.id === searchBook.id);
            searchBook.shelf = bookFound ? bookFound.shelf : "none";

            return searchBook;
          });

          setSearchResults(searchResults);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [query, books]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            id="searchBar"
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} updateBookShelf={updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

Search.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};

export default Search;
