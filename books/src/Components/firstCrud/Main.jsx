import FirstContext from "../../Contexts/FirstContext";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [books, setBooks] = useState(null);
  const [reserveData, setReserveData] = useState(null);
  const [categories, setCategories] = useState(null);

  console.log(reserveData);

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/categories", authConfig()).then((res) => {
      setCategories(res.data);
    });
  }, [lastUpdate]);

  // Mechanics GET

  useEffect(() => {
    axios.get("http://localhost:3003/home/books", authConfig()).then((res) => {
      setBooks(
        res.data.map((b) => ({
          ...b,
          showCategory: true,
          showTitle: true,
        }))
      );
    });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === reserveData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/reserve/books/" + reserveData.id,
        reserveData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [reserveData]);

  return (
    <FirstContext.Provider
      value={{
        books,
        categories,
        setReserveData,
        setBooks,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FirstContext.Provider>
  );
}

export default Main;
