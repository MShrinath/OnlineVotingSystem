import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import F404 from "./pages/F404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vote from "./pages/Vote";
import Admin from "./pages/Admin";

function App() {
    return (
        <div>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/vote" element={<Vote />} />
                    <Route path="/admin" element={<Admin />} />

                    <Route path="*" element={<F404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
