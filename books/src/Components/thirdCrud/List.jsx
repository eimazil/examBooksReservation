import { useContext } from "react";
import ThirdContext from "../../Contexts/ThirdContext";
import Line from "./Line";

function List() {
  const { categories } = useContext(ThirdContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Categories List</h5>
      <div className="card-body">
        <ul className="list-group">
          {categories?.map((c) => (
            <Line key={c.id} category={c} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
