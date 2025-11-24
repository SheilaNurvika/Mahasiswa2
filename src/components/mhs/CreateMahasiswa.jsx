import React, { useState } from "react";
import { addMahasiswa } from "../../services/mahasiswaServices";
import { Link } from "react-router-dom";

function CreateMahasiswa() {
   const [mhsNim, setMhsNim] = useState("");
   const [mhsNama, setMhsNama] = useState("");
   const [mhsProdi, setMhsProdi] = useState("");
   const [mhsBeasiswa, setMhsBeasiswa] = useState("");
   const [mhsStatus, setMhsStatus] = useState("1");
   const [error, setError] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);
      console.log(mhsNim);
      console.log(mhsNama);
      console.log(mhsProdi);
      console.log(mhsBeasiswa);
      console.log(mhsStatus);

      try {
         const newMahasiswa = {
            mhs_nim: mhsNim,
            mhs_nama: mhsNama,
            mhs_prodi: mhsProdi,
            mhs_beasiswa: mhsBeasiswa,
            mhs_status: mhsStatus,
         };

         if (
            mhsNim === "" &&
            mhsNama === "" &&
            mhsProdi === "" &&
            mhsBeasiswa === "" &&
            mhsStatus === ""
         ) {
            setError("Form wajib diisi!");
            return;
         }
         const response = await addMahasiswa(newMahasiswa);
         if (response.data.status === "error") {
            setError(response.data.message);
            return;
         }else{
            setSuccessMessage("Mahasiswa berhasil ditambahkan!");
         }

         // Reset form
         setMhsNim("");
         setMhsNama("");
         setMhsProdi("");
         setMhsBeasiswa("");
         setMhsStatus("1");
      } catch (error) {
         // console.error("Error adding mhs:", error);
         setError("Gagal menambahkan mahasiswa. Silahkan coba lagi.");
      }
   };

   return (
      <div className="container mt-4 ">
         <div className="col-md-6">
            <h2 className="mb-4">Tambah Mahasiswa</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && (
               <div className="alert alert-success">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label htmlFor="mhsNim" className="form-label">
                     NIM
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="mhsNim"
                     value={mhsNim}
                     onChange={(e) => setMhsNim(e.target.value)}
                     required
                  />
               </div>

               <div className="mb-3">
                  <label htmlFor="mhsNama" className="form-label">
                     Nama Mahasiswa
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="mhsNama"
                     value={mhsNama}
                     onChange={(e) => setMhsNama(e.target.value)}
                     required
                  />
               </div>

               <div className="mb-3">
                  <label htmlFor="mhsProdi" className="form-label">
                     Program Studi
                  </label>
                  <select
                     className="form-select"
                     id="mhsProdi"
                     required
                     value={mhsProdi}
                     onChange={(e) => setMhsProdi(e.target.value)}
                  >
                     <option> --Pilih Program Studi-- </option>
                     <option value="MI">MI</option>
                     <option value="MK">MK</option>
                     <option value="TPM">TPM</option>
                  </select>
               </div>

               <div className="mb-3">
                  <label htmlFor="mhsBeasiswa" className="form-label">
                     Beasiswa
                  </label>

                  <div className="form-check">
                     <input
                        className="form-check-input"
                        type="radio"
                        name="mhsBeasiswa"
                        id="Beasiswa Full"
                        value="1"
                        onChange={(e) => setMhsBeasiswa(e.target.value)}
                     />
                     <label className="form-check-label" htmlFor="1">
                        Beasiswa Full
                     </label>
                  </div>

                  <div className="form-check">
                     <input
                        className="form-check-input"
                        type="radio"
                        name="mhsBeasiswa"
                        id="2"
                        value="2"
                        onChange={(e) => setMhsBeasiswa(e.target.value)}
                     />
                     <label className="form-check-label" htmlFor="2">
                        Beasiswa Parsial
                     </label>
                  </div>

                  <div className="form-check">
                     <input
                        className="form-check-input"
                        type="radio"
                        name="mhsBeasiswa"
                        id="3"
                        value="3"
                        onChange={(e) => setMhsBeasiswa(e.target.value)}
                     />
                     <label className="form-check-label" htmlFor="3">
                        Non-Beasiswa
                     </label>
                  </div>
               </div>

               {/* <div className="mb-3">
                  <label htmlFor="mhsStatus" className="form-label">
                     Status
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="mhsStatus"
                     value={mhsStatus}
                     onChange={(e) => setMhsStatus(e.target.value)}
                     required
                  />
               </div> */}

               <button type="submit" className="btn btn-primary">
                  Submit
               </button>

               <Link to="/read-mhs" className="btn btn-secondary ms-2">
                  Kembali
               </Link>
            </form>
         </div>
      </div>
   );
}

export default CreateMahasiswa;

{
   /* <div className="mb-3">
   <label className="form-label">Kondisi</label>

   <div className="form-check">
      <input
         className="form-check-input"
         type="checkbox"
         id="baik"
         checked={kondisi === "Baik"}
         onChange={() => setKondisi("Baik")}
      />
      <label className="form-check-label" htmlFor="baik">
         Baik
      </label>
   </div>

   <div className="form-check">
      <input
         className="form-check-input"
         type="checkbox"
         id="rusak"
         checked={kondisi === "Rusak"}
         onChange={() => setKondisi("Rusak")}
      />
      <label className="form-check-label" htmlFor="rusak">
         Rusak
      </label>
   </div>

   <div className="form-check">
      <input
         className="form-check-input"
         type="checkbox"
         id="rusak-ringan"
         checked={kondisi === "Rusak-Ringan"}
         onChange={() => setKondisi("Rusak-Ringan")}
      />
      <label className="form-check-label" htmlFor="rusak-ringan">
         Rusak-Ringan
      </label>
   </div>
</div>; */
}

{
   /* <div className="mb-3">
   <label className="form-label">Status</label>

   <div className="form-check">
      <input
         className="form-check-input"
         type="radio"
         name="statusAset"
         id="maintenance"
         value="Maintenance"
         checked={statusAset === "Maintenance"}
         onChange={(e) => setStatusAset(e.target.value)}
      />
      <label className="form-check-label" htmlFor="maintenance">
         Maintenance
      </label>
   </div>

   <div className="form-check">
      <input
         className="form-check-input"
         type="radio"
         name="statusAset"
         id="tersedia"
         value="Tersedia"
         checked={statusAset === "Tersedia"}
         onChange={(e) => setStatusAset(e.target.value)}
      />
      <label className="form-check-label" htmlFor="tersedia">
         Tersedia
      </label>
   </div>

   <div className="form-check">
      <input
         className="form-check-input"
         type="radio"
         name="statusAset"
         id="dipinjam"
         value="Dipinjam"
         checked={statusAset === "Dipinjam"}
         onChange={(e) => setStatusAset(e.target.value)}
      />
      <label className="form-check-label" htmlFor="dipinjam">
         Dipinjam
      </label>
   </div>

   <div className="form-check">
      <input
         className="form-check-input"
         type="radio"
         name="statusAset"
         id="tidak-tersedia"
         value="Tidak Tersedia"
         checked={statusAset === "Tidak Tersedia"}
         onChange={(e) => setStatusAset(e.target.value)}
      />
      <label className="form-check-label" htmlFor="tidak-tersedia">
         Tidak Tersedia
      </label>
   </div>
</div>; */
}
