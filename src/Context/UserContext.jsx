import React, { createContext, useState } from "react";
import run from "../gemini";
export const datacontext = createContext();

// UseContext Section
const UserContext = ({ children }) => {
  let [speaking, setSpeaking] = useState(false);
  let [prompts, setPrompts] = useState("Listening...");
  let [response, setResponse] = useState(false);

  //  Speak Function
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  //   AI Response Section
  async function aiResponse(prompts) {
    let text = await run(prompts);
    let newText =
      text.split("**") &&
      text.split("*") &&
      text.replace("google", "Shivansh Agrawal") &&
      text.replace("Google", "Shivansh Agrawal");
    setPrompts(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  //   Speech Recognition Section
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  recognition.onresult = (e) => {
    // let currentIndex=e.resultIndex;
    // let transcript=e.result[currentIndex][0].transcript;
    // console.log(transcript);
    // console.log(e);

    const transcript = Array.from(e.results)
      .map((result) => result[0].transcript)
      .join("");
    //   console.log("Transcript:", transcript);
    setPrompts(transcript);
    takeCommand(transcript.toLowerCase());
  };

  //   Function to take user Command
  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening Youtube");
      setPrompts("Opening Youtube...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
      setResponse(true);
    } else if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("Opening Google");
      setPrompts("Opening Google...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
      setResponse(true);
    } else {
      aiResponse(command);
    }
  }
  let value = {
    recognition,
    speaking,
    setSpeaking,
    prompts,
    setPrompts,
    response,
    setResponse,
  };
  return (
    <div>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </div>
  );
};

export default UserContext;
