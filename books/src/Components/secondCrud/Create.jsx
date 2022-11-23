import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import SecondContext from "../../Contexts/SecondContext";
import getBase64 from "../../Functions/getBase64";
import cities from "../../data/cities";
import { validName } from "../../Functions/regex";

function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const fileInput = useRef();

  const { setCreateData, categories } = useContext(SecondContext);
  const { makeMsg } = useContext(DataContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (title.length === 0) {
      makeMsg("Add title", "error");
      return;
    }
    if (title.length > 100) {
      makeMsg("Title should be up to 100 characters", "error");
      return;
    }
    if (author.length === 0) {
      makeMsg("Add author name", "error");
      return;
    }
    if (author.length > 50) {
      makeMsg("Author name be up to 50 characters", "error");
      return;
    }
    if (!validName.test(author)) {
      makeMsg("Invalid characters in author name", "error");
      return;
    }
    if (description.length === 0) {
      makeMsg("Add surname", "error");
      return;
    }
    if (description.length > 500) {
      makeMsg("Description should be up to 500 characters", "error");
      return;
    }
    if (category === 0) {
      makeMsg("Choose category", "error");
      return;
    }
    setCreateData({
      title,
      author,
      description,
      category_id: parseInt(category),
      image: photoPrint,
    });
    setTitle("");
    setDescription("");
    setAuthor("");
    setCategory(0);
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Book</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Book's description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Choose category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={0} disabled>
              Choose from list
            </option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Book's image</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={doPhoto}
          />
          {photoPrint ? (
            <div className="img-bin">
              <img src={photoPrint} alt="upload"></img>
            </div>
          ) : null}
        </div>
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
    </div>
  );
}

export default Create;
