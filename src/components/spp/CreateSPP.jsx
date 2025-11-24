import React, { use, useEffect, useState } from "react";
import { addSPP, listMahasiswa } from "../../services/mahasiswaServices";
import { data, Link, useParams } from "react-router-dom";

function AddSpp() {
   const [mhsNim, setMhsNim] = useState("");
   const [sppID, setSppID] = useState("");
   const [sppSemester, setSppSemester] = useState("");
   const [sppJumlah, setSppJumlah] = useState("");
   const [mahasiswaData, setMahasiswaData] = useState([]);
   const [error, setError] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);

   const fetchMhsData = async () => {
      try {
         const response = await listMahasiswa();
         setMahasiswaData(response.data.data);
      } catch (error) {
         console.error("Error fetching mahasiswa data: ", error);
         setError("Gagal mengambil data mahasiswa.");
      }
   };

   useEffect(() => {
      fetchMhsData();
   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      try {
         const newData = {
            mhs_nim: mhsNim,
            spp_semester: sppSemester,
            spp_jumlah: sppJumlah,
         };

         //validasi spp sudah dibayar
         const response = await addSPP(newData);
         if (response.data.status === "error") {
            setError(response.data.message);
            return;
         }
         setSuccessMessage("Data SPP berhasil ditambahkan!");
         setMhsNim("");
         setSppID("");
         setSppSemester("");
         setSppJumlah("");
      } catch (error) {
         console.error("Error adding spp:", error);
         setError("Gagal menyimpan data spp. Silahkan coba lagi.");
      }
   };

   const jumlahSPP = (beasiswa) => {
      if (beasiswa === "1") return 0;
      if (beasiswa === "2") return 500000;
      if (beasiswa === "3") return 10000000;
   }

   const handleChangeNim = (e) => {
         setMhsNim(e.target.value);

         const selectedMhs = mahasiswaData.find((mhs) => mhs.mhs_nim === e.target.value);
         setSppJumlah(jumlahSPP(selectedMhs.mhs_beasiswa));
      }

   return (
      <div className="container mt-4">
         <h2>Tambah Data SPP</h2>
         {error && <div className="alert alert-danger">{error}</div>}
         {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
         )}
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label htmlFor="mhsNim" className="form-label">
                  NIM Mahasiswa
               </label>
               <select
                  className="form-select"
                  id="mhsNim"
                  value={mhsNim}
                  onChange={(e) => handleChangeNim(e)}
               >
                  {mahasiswaData.map((item) => (
                     <option key={item.mhs_nim} value={item.mhs_nim}>
                        {item.mhs_nama} - {item.mhs_nim}
                     </option>
                  ))}
               </select>
            </div>
            <div className="mb-3">
               <label htmlFor="sppSemester" className="form-label">
                  Semester
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="sppSemester"
                  value={sppSemester}
                  onChange={(e) => setSppSemester(e.target.value)}
                  required
               />
            </div>

            <div className="mb-3">
               <label htmlFor="sppJumlah" className="form-label">
                  Jumlah SPP
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="sppJumlah"
                  value={sppJumlah}
                  onChange={(e) => setSppJumlah(e.target.value)}
                  required
               />
            </div>
            <div className="mt-3">
               <button className="btn btn-primary" type="submit">
                  Simpan
               </button>
               <Link to="/read-spp" className="btn btn-secondary ms-2">
                  Kembali
               </Link>
            </div>
         </form>
      </div>
   );
}

export default AddSpp;
