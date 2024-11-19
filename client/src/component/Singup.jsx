import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export const Singup = ({ show2, handleClose2 }) => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login) {
      // Login logic
      const data = { email, password };
      const res = await fetch("http://localhost:9090/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      sessionStorage.setItem("email", json.email);

      if (res.status === 401) {
        alert("Login error");
      } else {
        alert("Login Successful");
        window.location.reload();
      }
    } else {
      // Signup logic
      if (password !== cPass) {
        alert("Passwords do not match");
      } else {
        const data = { name, email, password };
        const res = await fetch("http://localhost:9090/api/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        sessionStorage.setItem("email", email);

        if (res.status === 400) {
          alert("Signup error");
        } else {
          alert("Signup Successful");
          window.location.reload();
        }
      }
    }
  };

  return (
    <Modal show={show2} onHide={handleClose2} centered>
      <Modal.Body className="bg-gray-900 text-gray-100  shadow-lg p-8">
        <div className="flex flex-col items-center space-y-6">
          <h4 className="text-2xl font-semibold text-gray-200">
            {login ? "Login" : "Sign Up"}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {!login && (
              <input
                type="text"
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={6}
                required
              />
            )}
            <input
              type="email"
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={6}
              required
            />
            <input
              type="password"
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={0}
              required
            />
            {!login && (
              <input
                type="password"
                className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
                value={cPass}
                onChange={(e) => setCPass(e.target.value)}
                minLength={6}
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-3 transition duration-300"
            >
              {login ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-sm text-gray-400">
            {login ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setLogin(!login)}
              className="text-blue-500 hover:text-blue-400 focus:outline-none transition duration-300"
            >
              {login ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
