import React from "react";
import Authentication from "./components/Authentication";
import Movies from "./components/Movies";
import Storage from "./components/Storage";

export default function App() {
  return (
    <>
      <Authentication />
      <Movies />
      <Storage />
    </>
  );
}
