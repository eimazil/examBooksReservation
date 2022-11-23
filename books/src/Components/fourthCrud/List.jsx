import { useState, useEffect, useContext } from "react";
import FourthContext from "../../Contexts/FourthContext";
import Line from "./Line";

function List() {
  const { books } = useContext(FourthContext);

  const [stats, setStats] = useState({ clothesCount: null });

  useEffect(() => {
    if (null === books) {
      return;
    }
    setStats((s) => ({
      ...s,
      booksCount: books.length,
    }));
  }, [books]);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Books ({stats.booksCount})</h5>
        <div className="card-body">
          <ul className="list-group">
            {books?.map((b) => (
              <Line key={b.id} book={b} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
