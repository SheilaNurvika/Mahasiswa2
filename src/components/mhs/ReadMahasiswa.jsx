import React, { useEffect, useState } from "react";
import { deleteMahasiswa, listMahasiswa } from "../../services/mahasiswaServices";
import { Link } from "react-router-dom";

function ReadMahasiswa() {
   const [mahasiswaData, setMahasiswaData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   const fetchData = async () => {
      try {
         const response = await listMahasiswa();
         setMahasiswaData(response.data.data);
      } catch (error) {
         console.error("Error fetching mahasiswa data: ", error);
         setError("Gagal mengambil data mahasiswa.");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   function namaBeasiswa(kode) {
      switch (kode) {
         case "1":
            return "Beasiswa Full";
         case "2":
            return "Beasiswa Parsial";
         case "3":
            return "Non-Beasiswa";
         default:
            return "-";
      }
   }

   // Hapus produk dan auto-refresh list
   const handleDelete = async (item) => {
      if (window.confirm("Yakin ingin menghapus mahasiswa ini?")) {
         try {
            console.log("Menghapus mahasiswa dengan ID:", item);
            const response = await deleteMahasiswa(item);
            console.log("Respon dari server:", response.data);

            if (response.data && response.data.message) {
               const pesan = response.data.message.toLowerCase();

               if (pesan.includes("berhasil")) {
                  alert("Mahasiswa berhasil dihapus!");
               } else if (pesan.includes("tidak ditemukan")) {
                  alert("Mahasiswa tidak ditemukan di server!");
               } else {
                  alert("Respon dari server: " + response.data.message);
               }
            } else {
               alert("Tidak ada respon dari server.");
            }

            // Refresh data setelah delete
            fetchData();
         } catch (error) {
            console.error("Error deleting mahasiswa:", error);
            alert("Gagal menghapus mahasiswa. Periksa koneksi atau server API.");
         }
      }
   };

   if (loading) {
      return (
         <div className="text-center mt-5">
            <h4>Loading...</h4>
         </div>
      );
   }

   return (
      <div className="container mt-4">
         <h2 className="mb-4">List Mahasiswa</h2>
         <Link to="/create-mhs" className="btn btn-primary mb-3">
            + Tambah Mahasiswa
         </Link>
         {error && <div className="alert alert-danger">{error}</div>}
         <table border={1} className="table table-striped shadow">
            <thead>
               <tr>
                  <th className="text-center">NIM</th>
                  <th className="text-start">Nama Mahasiswa</th>
                  <th className="text-center">Program Studi</th>
                  <th className="text-center">Beasiswa</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Aksi</th>
               </tr>
            </thead>
            <tbody>
               {mahasiswaData.length > 0 ? (
                  mahasiswaData.map((item) => (
                     <tr key={item.mhs_nim}>
                        <td className="text-center">{item.mhs_nim}</td>
                        <td className="t">{item.mhs_nama}</td>
                        <td className="text-center">{item.mhs_prodi}</td>
                        <td className="text-center">{namaBeasiswa(item.mhs_beasiswa)}</td>
                        <td className="text-center">{item.mhs_status === "1" ? "Aktif" : "Tidak Aktif"}</td>
                        <td>
                           <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(item)}
                           >
                              Delete
                           </button>
                        </td>
                        
                     </tr>

                     
                  ))
               ) : (
                  <tr>
                     <td colSpan="8" className="text-center">
                        Tidak ada data ditemukan.
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
}
export default ReadMahasiswa;
