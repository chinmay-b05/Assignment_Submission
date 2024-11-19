import React, { useEffect, useState } from "react";
import Card from "../component/Card";
import { Navbar } from "../component/Navbar";
import Spline from "@splinetool/react-spline";

export const Home = () => {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);

  const getData = async () => {
    const response = await fetch(
      `http://localhost:9090/api/notes/${sessionStorage.getItem("email")}`
    );
    const json = await response.json();
    setData(json);
    console.log(json);
  };

  useEffect(() => {
    getData();
    setFlag(sessionStorage.getItem("email"));
  }, []);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <Navbar />

        {/* Main Content */}
        <div className="relative z-10 page-content container note-has-grid pt-16">
          <br />
          <br />

          {flag != null ? (
            <div className="tab-content bg-transparent">
              <div id="note-full-container" className="note-has-grid row">
                {data?.map((note) => {
                  return (
                    <Card
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      date={note.date}
                      desc={note.description}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-white text-center h-full">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <Spline
                  scene="https://prod.spline.design/2Xo-uCMqJ3gXTSyG/scene.splinecode"
                  className="w-[80%] h-[80%] object-cover" // Adjust width and height as needed to better center it
                />
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome to the Assignment Submission App!
              </h1>
              <p className="text-lg mb-6">
                Please log in to add and submit your assignments.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
