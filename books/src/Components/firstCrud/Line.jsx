import { useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";

function Line({ book }) {
  const { setReserveData } = useContext(FirstContext);

  const reserve = () => {
    setReserveData({
      id: book.id,
      user_id: localStorage.getItem("id"),
      return_date: Date.now() + 6.048e8,
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
        <div className="line__buttons">
          <button
            onClick={reserve}
            type="button"
            className="btn btn-outline-success"
          >
            Reserve
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
