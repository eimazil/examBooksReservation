import { useContext } from "react";
import FourthContext from "../../Contexts/FourthContext";

function Line({ book }) {
  const { setExtendReservation } = useContext(FourthContext);

  const extendReservation = () => {
    setExtendReservation({
      id: parseInt(book.id),
      return_date: book.return_date + 6.048e8,
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
            Return by:{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(book.return_date)}
          </span>
          <span>
            {book.extensions > 1
              ? "You cannot extend any more, please return the book!"
              : "Would you like to extend?"}
          </span>
          {book.extensions > 1 ? (
            <button
              disabled
              onClick={extendReservation}
              type="button"
              className="btn btn-outline-success align-self-start"
            >
              Extend reservation
            </button>
          ) : (
            <button
              onClick={extendReservation}
              type="button"
              className="btn btn-outline-success"
            >
              Extend reservation
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Line;
