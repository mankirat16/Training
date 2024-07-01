import { useEffect, useState } from "react";
import { UpdateContext } from "../ContextProvider";
import { useContext } from "react";
import axios from "axios";
export function AllBooks() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState(null);
  const { currBook, setCurrBook } = useContext(UpdateContext);
  const handleView = (id, index) => {
    axios
      .post("http://localhost:5000/book/get-author", { id: id })
      .then((res) => {
        console.log(res);
        setAuthor({ index: index, author: res.data.author.name });
        setTimeout(() => {
          setAuthor(null);
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
        setAuthor({ index: index, author: "error while fetching author" });
        setTimeout(() => {
          setAuthor(null);
        }, 3000);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/book/all-books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      {books &&
        books.map((book, index) => {
          return (
            <p>
              {index + 1}. Name : {book.name}
              <button
                style={{ marginLeft: 5 }}
                onClick={() => {
                  handleView(book.AuthorId, index);
                }}
              >
                view author
              </button>
              {author && index === author.index && (
                <p>author : {author.author}</p>
              )}
            </p>
          );
        })}
    </div>
  );
}
