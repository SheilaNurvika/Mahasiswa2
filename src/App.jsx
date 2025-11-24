import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CreateMahasiswa from "./components/mhs/createMahasiswa";
import ReadMahasiswa from "./components/mhs/ReadMahasiswa";
import CreateSPP from "./components/spp/CreateSPP";
import ReadSPP from "./components/spp/ReadSPP";
import HeaderComponent from "./components/desain/HeaderComponents";
import FooterComponent from "./components/desain/FooterComponents";

function App() {
   return (
      <Router>
         <div className="d-flex flex-column min-vh-100">
            <HeaderComponent />
            <div className="flex-grow-1">
               <Routes>
                  <Route path="/read-mhs" element={<ReadMahasiswa />} />
                  <Route path="/create-mhs" element={<CreateMahasiswa />} />

                  <Route path="/read-spp" element={<ReadSPP />} />
                  <Route path="/create-spp" element={<CreateSPP />} />
               </Routes>
            </div>
            <FooterComponent />
         </div>
      </Router>
   );
}

export default App;
