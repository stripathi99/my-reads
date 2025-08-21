import "./App.css";
import { useState, useEffect } from "react";
import { getAll, update } from "./utils/BooksAPI";
import { Route, Routes } from "react-router-dom";
import Bookcase from "./components/Bookcase";
import Search from "./components/Search";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const books = await getAll();
      setBooks(books);
    };

    getAllBooks();
  }, []);

  // Update the shelf of a book and update the state with the new book.
  const updateBookShelf = async (book, shelf) => {
    try {
      // Update the book shelf in the state.
      book.shelf = shelf;
      setBooks((prevBooks) => {
        const existingBook = prevBooks.find((b) => b.id === book.id);
        if (existingBook) {
          return prevBooks.map((b) => (b.id === book.id ? { ...b, shelf } : b));
        } else {
          return [...prevBooks, book];
        }
      });
      await update(book, shelf);
    } catch (error) {
      console.error("Error updating book shelf:", error);
    }
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Bookcase books={books} updateBookShelf={updateBookShelf} />}
      />
      <Route
        path="/search"
        element={<Search books={books} updateBookShelf={updateBookShelf} />}
      />
    </Routes>
  );
}

export default App;
