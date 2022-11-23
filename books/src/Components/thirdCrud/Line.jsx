import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";

function Line({ category }) {
  const { setDeleteData, setModalData } = useContext(ThirdContext);

  return (
    <li className="list-group-item">
      <div className="d-flex flex-column flex-sm-row justify-content-sm-between">
        <div className="line__content">
          <h4>{category.title}</h4>
        </div>
        <div className="align-self-start d-flex flex-row gap-1">
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
