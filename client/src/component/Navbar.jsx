import React, { useState } from "react";
import { Addnote } from "../component/Addnote";
import { Singup } from "./Singup";

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const data = { id: "", title: "", desc: "" };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    window.location.reload();
  };

  const isLoggedIn = Boolean(sessionStorage.getItem("email"));

  return (
    <>
      <nav className="bg-gray-900 text-white p-3 shadow-md w-full">
        <ul className="flex flex-wrap items-center justify-between">
          {isLoggedIn ? (
            <>
              {/* Links visible only when logged in */}
              <li className="mr-3">
                <a
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <i className="icon-layers mr-2" />
                  Submit Assignments
                </a>
              </li>

              {/* Add assignments button for logged-in users */}
              <li className="ml-auto">
                <button
                  className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
                  onClick={handleShow}
                >
                  <i className="icon-note mr-2" />
                  Add your assignments
                </button>
              </li>
              {/* Logout button */}
              <li className="ml-3">
                <button
                  className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt mr-2" />
                  Logout
                </button>
              </li>
            </>
          ) : (
            // Login button when not logged in
            <li className="ml-auto">
              <button
                className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700"
                onClick={handleShow2}
              >
                <i className="fas fa-sign-in-alt mr-2" />
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Modals for Adding Note and Signup/Login */}
      {show && (
        <Addnote
          handleClose={handleClose}
          show={show}
          data={data}
          edit={false}
        />
      )}
      {show2 && <Singup handleClose2={handleClose2} show2={show2} />}
    </>
  );
};
