import React, { useState } from "react";

const ModalUpdate = ({ show, handleClose, handleSubmit, book }) => {
  const [formData, setFormData] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>Update Book</h2>
        <form onSubmit={onSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Author:
            <input type="text" name="author" value={formData.author} onChange={handleChange} />
          </label>
          <label>
            Editorial:
            <input type="text" name="editorial" value={formData.editorial} onChange={handleChange} />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
          </label>
          <label>
            Review:
            <input type="text" name="review" value={formData.review} onChange={handleChange} />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;