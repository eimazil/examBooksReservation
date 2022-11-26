import { useState, useEffect, useContext } from "react";
import FourthContext from "../../Contexts/FourthContext";
import Line from "./Line";

function List() {
  const { books } = useContext(FourthContext);

  const [stats, setStats] = useState({ booksCount: null });

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
            {stats.booksCount > 0 ? (
              books?.map((b) => <Line key={b.id} book={b} />)
            ) : (
              <span className=" mt-2 mt-sm-4">
                You have no reserved books at the moment!
              </span>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
