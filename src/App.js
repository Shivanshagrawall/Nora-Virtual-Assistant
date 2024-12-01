import React, { useContext, useState } from "react";
import "./App.css";
import ai from "./Assests/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from "./Context/UserContext";
import speak from "./Assests/speak.gif";
import aispeak from "./Assests/aiVoice.gif";
const App = () => {
  // UseContext
  let {
    recognition,
    speaking,
    setSpeaking,
    prompts,
    setPrompts,
    response,
    setResponse,
  } = useContext(datacontext);
  return (
    <div className="main">
      {/* Image of AI Assistant */}
      <img src={ai} alt="ai" />
      <span>I'm Nova, Your Advanced Virtual Assistant</span>

      {/* Button Click Here */}
      {/* Response Image */}
      {!speaking ? (
        <button
          onClick={() => {
            setResponse(false);
            setPrompts("Listening...");
            recognition.start();
            setSpeaking(true);
          }}
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="speaking">
          {!response ? (
            <img src={speak} alt="speaking" className="humanSpeak" />
          ) : (
            <img src={aispeak} alt="speaking" className="aispeak" />
          )}
          <p>{prompts}</p>
        </div>
      )}
    </div>
  );
};

export default App;
