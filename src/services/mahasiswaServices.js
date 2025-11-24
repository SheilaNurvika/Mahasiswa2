import axios from "axios";

const REST_API_BASE_URL = "https://asm.roniprsty.com/";

export const listMahasiswa = () =>
   axios.get(REST_API_BASE_URL + "mahasiswa/read.php");

export const addMahasiswa = (data) => {
   return axios.post(REST_API_BASE_URL + "mahasiswa/create.php", data);
};


// export const deleteAset = (id) => {
//    return axios.delete(`${REST_API_BASE_URL}aset/delete.php?id=${id}`);
// };

// export const getAsetById = (id) => {
//    return axios.delete(`${REST_API_BASE_URL}aset/detail.php?id=${id}`);
// };

export const deleteMahasiswa = (data) => {
   return axios.put(REST_API_BASE_URL + "mahasiswa/delete.php", data);
};

export const listSPP = () => axios.get(REST_API_BASE_URL + "spp/read.php");

export const addSPP = (data) => {
   return axios.post(REST_API_BASE_URL + "spp/create.php", data);
};

// export const updateStatusPeminjaman = (data) => {
//    return axios.post(REST_API_BASE_URL + "peminjaman/updatestatus.php", data);
// };
