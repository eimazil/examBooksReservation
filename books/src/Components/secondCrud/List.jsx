import { useContext, useState, useEffect } from "react";
import SecondContext from "../../Contexts/SecondContext";
import Line from "./Line";

function List() {
  const { books, setBooks, categories } = useContext(SecondContext);

  const [titleFilter, setTitleFilter] = useState("");
  const [stats, setStats] = useState({ clothesCount: null });

  useEffect(() => {
    if (null === books) {
      return;
    }
    setStats((s) => ({
      ...s,
      booksCount: books?.filter(
        (s) => s.showCategory === true && s.showTitle === true
      ).length,
    }));
  }, [books]);

  const search = () => {
    if (titleFilter.length === 0) {
      setBooks((b) => b?.map((book) => ({ ...book, showTitle: true })));
    }

    if (titleFilter.length !== 0) {
      setBooks((b) =>
        b?.map((book) =>
          book.title
            .toLocaleLowerCase()
            .includes(titleFilter.toLocaleLowerCase())
            ? { ...book, showTitle: true }
            : { ...book, showTitle: false }
        )
      );
    }
    setTitleFilter("");
  };

  const clear = () => {
    setBooks((b) => b?.map((book) => ({ ...book, showTitle: true })));
  };

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Books ({stats.booksCount})</h5>
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row gap-2"></div>
          <div>
            <label className="form-label">Book title</label>
            <input
              type="text"
              className="form-control"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
            />
            <div className="d-flex gap-2 mt-2">
              <button
                onClick={search}
                type="button"
                className="btn btn-outline-success"
              >
                Search
              </button>
              <button
                onClick={clear}
                type="button"
                className="btn btn-outline-warning"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {books?.map((b) =>
                b.showCategory === true && b.showTitle === true ? (
                  <Line key={b.id} book={b} />
                ) : null
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
