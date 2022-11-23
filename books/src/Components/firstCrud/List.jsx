import { useState, useEffect, useContext } from "react";
import FirstContext from "../../Contexts/FirstContext";
import cities from "../../data/cities";
import Line from "./Line";

function List() {
  const [categoryFilter, setCategoryFilter] = useState(0);
  const [titleFilter, setTitleFilter] = useState("");

  const { categories, books, setBooks } = useContext(FirstContext);

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

  useEffect(() => {
    if (categoryFilter == 0) {
      setBooks((b) => b?.map((book) => ({ ...book, showCategory: true })));
    } else {
      setBooks((b) =>
        b?.map((book) =>
          book.category_id == categoryFilter
            ? { ...book, showCategory: true }
            : { ...book, showCategory: false }
        )
      );
    }
  }, [categoryFilter, setBooks]);

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
          <div className="d-flex flex-column flex-md-row gap-2">
            <div className="d-flex flex-column flex-md-row gap-2">
              <div>
                <label className="form-label">Filter by Category</label>
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(Number(e.target.value))}
                >
                  <option value={0}>Show all</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
