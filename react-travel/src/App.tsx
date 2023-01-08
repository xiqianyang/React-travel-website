import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage } from "./pages";



function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='*' element={<h2>404 not found !</h2>} />

        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;

