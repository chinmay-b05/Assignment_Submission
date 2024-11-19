import React, { useState, useEffect } from "react";
import "../index.css";
import { Addnote } from "../component/Addnote";

const Card = ({ id, title, desc, date }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [important, setImportant] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [assignmentLink, setAssignmentLink] = useState(""); // State for edit modal
  const data = { id, title, desc };
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [toEmail, setToEmail] = useState(""); // State for recipient's email
  const [emailSent, setEmailSent] = useState(false); // New state to track if email was sent

  useEffect(() => {
    const savedImportantStatus = localStorage.getItem(`important-${id}`);
    if (savedImportantStatus) {
      setImportant(JSON.parse(savedImportantStatus));
    }

    // Check local storage for email sent status
    const savedEmailStatus = localStorage.getItem(`emailSent-${id}`);
    if (savedEmailStatus) {
      setEmailSent(JSON.parse(savedEmailStatus));
    }
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:9090/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();
  };

  const toggleImportant = () => {
    const newImportantStatus = !important;
    setImportant(newImportantStatus);
    localStorage.setItem(`important-${id}`, JSON.stringify(newImportantStatus));
  };

  const handleSubmitAssignment = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Prepare mailto link with dynamic "To" address

  const handleEmailSend = () => {
    // Include assignment link in the email body
    const body = `Assignment Details: ${desc}\nAssignment Link: ${assignmentLink}`;

    // Prepare mailto link with dynamic "To" address and updated body
    const mailtoLink = `mailto:${toEmail}?subject=Assignment Submission: ${title}&body=${encodeURIComponent(
      body
    )}`;

    window.open(mailtoLink); // Open in new tab
    handlePopupClose(); // Close the modal
    setEmailSent(true); // Mark email as sent
    localStorage.setItem(`emailSent-${id}`, JSON.stringify(true)); // Save email sent status in local storage
    // Redirect back to the application (you can adjust this URL)
    window.location.href = "http://localhost:3000/"; // Change this to your desired path
  };

  // Function to truncate the description
  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return `${description.substring(0, length)}...`;
    }
    return description;
  };

  return (
    <>
      <div className="col-md-4 single-note-item all-category">
        <div className="card bg-gray-800 text-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="p-4">
            <h5 className="note-title text-truncate mb-1 font-bold text-purple-300">
              {title}
            </h5>
            <p className="note-date text-gray-400 mb-2">{date}</p>
            <div className="note-content mb-3">
              <p className="note-inner-content text-gray-300">
                {truncateDescription(desc, 25)} {/* Truncate the description */}
              </p>
            </div>
            <div className="flex items-center justify-start gap-3 ">
              <span
                className={`m-1 cursor-pointer transition-colors ${
                  important ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={toggleImportant}
                title={important ? "Marked as Important" : "Mark as Important"}
              >
                <i className="fa fa-star" />
              </span>
              <span
                className="m-1 text-red-600 cursor-pointer hover:text-red-400 transition-colors"
                onClick={handleDelete}
              >
                <i className="fa fa-trash remove-note" />
              </span>
              <span
                className="m-1 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
                onClick={handleShowEdit} // Show the edit modal
              >
                <i className="fa-solid fa-pen-to-square" />
              </span>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded ${
                emailSent ? "bg-gray-500" : "bg-green-600 hover:bg-green-500"
              } text-white transition`}
              onClick={emailSent ? null : handleSubmitAssignment}
              disabled={emailSent} // Disable button if email is sent
            >
              {emailSent ? "Submitted" : "Submit Assignment"}
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <Addnote
          handleClose={handleCloseEdit}
          show={showEdit}
          data={data}
          edit={true}
        />
      )}

      {showPopup && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-lg font-bold mb-4">Submit Assignment</h2>
            <label className="block mb-2">
              Recipient's Email:
              <input
                type="email"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                required
                className="bg-gray-700 p-2 rounded w-full mt-1"
              />
            </label>
            <label className="block mb-2">
              Assignment Link:
              <input
                type="url"
                value={assignmentLink}
                onChange={(e) => setAssignmentLink(e.target.value)}
                required
                className="bg-gray-700 p-2 rounded w-full mt-1"
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={handlePopupClose}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEmailSend}
                className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
