import { useContext, useEffect, useState, useRef } from "react";
import SecondContext from "../../Contexts/SecondContext";
import getBase64 from "../../Functions/getBase64";
import DataContext from "../../Contexts/DataContext";
import { validName } from "../../Functions/regex";

function Edit() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const fileInput = useRef();
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const { setEditData, modalData, setModalData, categories } =
    useContext(SecondContext);
  const { makeMsg } = useContext(DataContext);

  const edit = () => {
    if (title.length === 0) {
      makeMsg("Add title", "error");
      return;
    }
    if (title.length > 100) {
      makeMsg("Title should be up to 100 characters", "error");
      return;
    }
    if (title.length === 0) {
      makeMsg("Add title", "error");
      return;
    }
    if (title.length > 50) {
      makeMsg("Author name should be up to 50 characters", "error");
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

    setEditData({
      title,
      author,
      description,
      category_id: parseInt(category),
      id: modalData.id,
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (null === modalData) {
      return;
    }
    setTitle(modalData.title);
    setAuthor(modalData.author);
    setDescription(modalData.description);
    setCategory(modalData.category_id);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (null === modalData) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit book</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
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
              <label className="form-label">Description</label>
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
              <label className="form-label">Books's image</label>
              <input
                ref={fileInput}
                type="file"
                className="form-control"
                onChange={doPhoto}
              />
              {photoPrint ? (
                <div className="img-bin">
                  <label htmlFor="image-delete">X</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
            </div>
            <button
              onClick={edit}
              type="button"
              className="btn btn-outline-success"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
