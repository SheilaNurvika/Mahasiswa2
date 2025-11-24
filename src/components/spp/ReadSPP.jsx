import React, { useEffect, useState } from "react";
import { listMahasiswa, listSPP } from "../../services/mahasiswaServices";
import { Link } from "react-router-dom";

function ReadSpp() {
   const [sppData, setSppData] = useState([]);
   const [mahasiswaData, setMahasiswaData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   //    const navigate = useNavigate();

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

   const fetchSppData = async () => {
      try {
         const response = await listSPP();
         setSppData(response.data);
      } catch (error) {
         console.error("Error fetching spp data: ", error);
         setError("Gagal mengambil data spp.");
      } finally {
         setLoading(false);
      }
   };

   const getMhsById = (id) => {
      const mhs = mahasiswaData.find((data) => data.mhs_nim === id);
      return mhs ? mhs.mhs_nim : id;
   };

   useEffect(() => {
      fetchData();
      fetchSppData();
   }, []);

   //    const handleDelete = async (id) => {
   //       Swal.fire({
   //          title: "Yakin ingin menghapus data ini ?",
   //          text: "Kamu tidak bisa mengulang kembali!",
   //          icon: "warning",
   //          showCancelButton: true,
   //          confirmButtonColor: "#3085d6",
   //          cancelButtonColor: "#d33",
   //          confirmButtonText: "Ya, Hapus!",
   //       }).then(async (result) => {
   //          if (result.isConfirmed) {
   //             try {
   //                await deleteAset(id);
   //                Swal.fire({
   //                   title: "Terhapus!",
   //                   text: "Data telah berhasil dihapus.",
   //                   icon: "success",
   //                   timer: 1500,
   //                   showConfirmButton: false,
   //                });

   //                fetchAsset();
   //             } catch (error) {
   //                console.error("Gagal menghapus aset:", error);
   //                Swal.fire({
   //                   title: "Gagal!",
   //                   text: "Terjadi kesalahan saat menghapus aset.",
   //                   icon: "error",
   //                });
   //             }
   //          }
   //       });
   //    };

   if (loading) {
      return (
         <div className="text-center mt-5">
            <h4>Loading...</h4>
         </div>
      );
   }

   return (
      <div className="container mt-4">
         <h2 className="mb-4">List Data SPP</h2>
         <Link to="/create-spp" className="btn btn-primary mb-3">
            + Tambah SPP
         </Link>
         {error && <div className="alert alert-danger">{error}</div>}
         <table border={1} className="table table-striped shadow">
            <thead>
               <tr>
                  <th className="text-center">No</th>
                  <th className="text-center">NIM</th>
                  <th className="text-center">Nama</th>
                  <th className="text-center">Program Studi</th>
                  <th className="text-center">SPP Semester</th>
                  <th className="text-center">Jumlah SPP</th>
               </tr>
            </thead>
            <tbody>
               {sppData.map((item, index) => (
                  <tr key={item.spp_id}>
                     <td className="text-center">{index + 1}</td>
                     <td className="text-center">{getMhsById(item.mhs_nim)}</td>
                     <td className="text-center">{item.mhs_nama}</td>
                     <td className="text-center">{item.mhs_prodi}</td>
                     <td className="text-start">{item.spp_semester}</td>
                     <td className="text-start">{item.spp_jumlah}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}
export default ReadSpp;
