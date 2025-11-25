import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function FooterComponent() {
   return (
      <footer className="bg-light- text-center text-lg-start mt-auto">
         <div className="container p-4">
            <div className="text-center">
               <h6 className="text-uppercase fw-bold mb-4">Mahasiwa</h6>
               <p>{new Date().getFullYear()} Mahasiswa . All right reserved</p>
            </div>
            s
            <div className="d-flex justify-content-center">
               <a href="/" className="me-4 text-reset">
                  Home
               </a>
               <a href="/read-mhs" className="me-4 text-reset">
                  Mahasiswa
               </a>
               <a href="/read-spp" className="me-4 text-reset">
                  SPP
               </a>
               <a href="/about" className="me-4 text-reset">
                  Tentang
               </a>
               <a href="/contact" className="me-4 text-reset">
                  Kontak
               </a>
            </div>
         </div>
      </footer>
   );
}

export default FooterComponent;
