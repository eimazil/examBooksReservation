import FourthContext from "../../Contexts/FourthContext";
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [books, setBooks] = useState(null);
  const [extendReservation, setExtendReservation] = useState(null);

  useEffect(() => {
    axios
      .get(
        "http://localhost:3003/myBooks/" + localStorage.getItem("id"),
        authConfig()
      )
      .then((res) => {
        setBooks(res.data);
      });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === extendReservation) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/extendReservation/" + extendReservation.id,
        extendReservation,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [extendReservation]);

  return (
    <FourthContext.Provider
      value={{
        books,
        setExtendReservation,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <List />
          </div>
        </div>
      </div>
    </FourthContext.Provider>
  );
}

export default Main;
