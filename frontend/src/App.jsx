import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import EditImage from "./pages/edit/EditImage";
import Gallery from "./pages/gallery/Gallery";
import NotFound from "./pages/NotFound";
import "./index.css";
import { useEffect, useState } from "react";
import { memesContext } from "./contexts/memesProvider";
import { Session } from "./utils";

function App() {
  const [memes, setMemes] = useState([]);
   useEffect(() => {
     setMemes(Session.get("memes"));
   }, [setMemes]);
  return (
    <>
      <memesContext.Provider value={{ memes, setMemes }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:ext" element={<EditImage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </memesContext.Provider>
    </>
  );
}

export default App;
