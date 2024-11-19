import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Addnote = ({ show, handleClose, edit, data }) => {
  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.desc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title or Description cannot be blank");
    } else {
      const apiEndpoint = edit
        ? `http://localhost:9090/api/notes/${data.id}`
        : `http://localhost:9090/api/notes/${sessionStorage.getItem("email")}`;

      const res = await fetch(apiEndpoint, {
        method: edit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      setDescription("");
      setTitle("");
      window.location.reload();
      handleClose();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className="bg-gray-800 text-white border-b border-gray-700"
        >
          <Modal.Title className="text-lg font-semibold">
            Add Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-900 text-gray-300">
          <form id="addnotesmodalTitle">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="note-title">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    id="note-has-title"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-indigo-500"
                    minLength={25}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="note-description">
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Assignment Description
                  </label>
                  <textarea
                    id="note-has-description"
                    className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-indigo-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-gray-800 border-t border-gray-700">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="bg-gray-700 text-gray-300 hover:bg-gray-600"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="bg-indigo-600 text-white hover:bg-indigo-500"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
