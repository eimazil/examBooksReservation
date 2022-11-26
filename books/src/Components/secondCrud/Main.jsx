import { useState, useEffect } from "react";
import SecondContext from "../../Contexts/SecondContext";
import Create from "./Create";
import List from "./List";
import axios from "axios";
import Edit from "./Edit";
import { authConfig } from "../../Functions/auth";
import Delete from "./Delete";

function Main() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalDelData, setModalDelData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [returnedData, setReturnedData] = useState(null);

  // READ for list
  useEffect(() => {
    axios.get("http://localhost:3003/categories", authConfig()).then((res) => {
      setCategories(res.data);
    });
  }, [lastUpdate]);

  useEffect(() => {
    axios.get("http://localhost:3003/books", authConfig()).then((res) => {
      setBooks(
        res.data.map((b) => ({
          ...b,
          showTitle: true,
        }))
      );
    });
  }, [lastUpdate]);

  useEffect(() => {
    if (null === createData) {
      return;
    }
    axios
      .post("http://localhost:3003/books", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  useEffect(() => {
    if (null === deleteData) {
      return;
    }
    axios
      .delete("http://localhost:3003/books/" + deleteData.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  useEffect(() => {
    if (null === editData) {
      return;
    }
    axios
      .put("http://localhost:3003/books/" + editData.id, editData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  useEffect(() => {
    if (null === returnedData) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/return/books/" + parseInt(returnedData.id),
        returnedData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [returnedData]);

  return (
    <SecondContext.Provider
      value={{
        setCreateData,
        books,
        categories,
        setDeleteData,
        setReturnedData,
        setModalDelData,
        modalDelData,
        modalData,
        setModalData,
        setBooks,
        setEditData,
      }}
    >
      <div className="container">
        <div className="row">
          <div className=" col-lg-4">{<Create />}</div>
          <div className=" col-lg-8">{<List />}</div>
        </div>
      </div>
      <Edit />
      <Delete />
    </SecondContext.Provider>
  );
}
export default Main;
