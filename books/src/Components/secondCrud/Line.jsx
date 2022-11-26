import { useContext } from "react";
import SecondContext from "../../Contexts/SecondContext";

function Line({ book }) {
  const { setModalDelData, setModalData, setReturnedData } =
    useContext(SecondContext);

  const returned = () => {
    setReturnedData({
      id: parseInt(book.id),
      user_id: 1,
      return_date: null,
      extensions: 0,
    });
  };

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__info">
            {book.image ? (
              <div className="img-bin">
                <img src={book.image} alt={book.title}></img>
              </div>
            ) : (
              <span className="red-image">No image</span>
            )}
          </div>
          <div className="d-flex flex-column gap-2">
            <h4>{book.title}</h4>
            <h6>{book.author}</h6>
            <span>Category: {book.category_title}</span>
            <p>{book.description}</p>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <span>
            Taken by: {book.user_id === 1 ? "Not taken" : book.user_name}
          </span>
          <span>
            Taken till:{" "}
            {book.return_date === null
              ? "Not taken"
              : new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(book.return_date)}
          </span>

          <div className="d-flex flex-column flex-md-row gap-2">
            <button
              onClick={() => setModalData(book)}
              type="button"
              className="btn btn-outline-success"
            >
              Edit
            </button>
            <button
              onClick={() => setModalDelData(book)}
              type="button"
              className="btn btn-outline-danger"
            >
              Delete
            </button>
            <button
              onClick={returned}
              type="button"
              className="btn btn-outline-warning"
            >
              Returned
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Line;
