import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";

function Line({ category }) {
  const { setDeleteData, setModalData } = useContext(ThirdContext);

  return (
    <li className="list-group-item">
      <div className="line scopes_line">
        <div className="line__content">
          <div className="line__content__title">{category.title}</div>
        </div>
        <div className="line__buttons">
          <button
            onClick={() => setModalData(category)}
            type="button"
            className="btn btn-outline-success"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteData(category)}
            type="button"
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Line;
