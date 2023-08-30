import React from "react";
import { BrowserRouter , Route, Routes} from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import F404 from "./pages/F404";

function App() {
	return (
		<div>
            <Navbar/>
			<BrowserRouter> 
                <Routes>
                <Route path="/"  element={<Home />} />
                
                <Route path="*" element={<F404 />} /> 
                </Routes>
            </BrowserRouter>  
		</div>
	);
}

export default App;
