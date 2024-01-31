// MAHASISWA

// METHOD PUT
const mahasiswaNim = "119"; // Ganti dengan NIM yang akan di edit
const updatedData = {
  nama: "Ronaldo",
  gender: "L",
  prodi: "TE",
  alamat: "Jl. Cibolang Kaler",
};

fetch(`http://localhost:3000/mahasiswa/${mahasiswaNim}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedData),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// METHOD POST
const newData = {
  nim: "121",
  nama: "Callie",
  gender: "P",
  prodi: "TE",
  alamat: "Serpong",
};

fetch("http://localhost:3000/mahasiswa", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// METHOD DELETE
const nimToDelete = "116";

fetch(`http://localhost:3000/mahasiswa/${nimToDelete}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// DOSEN
// METHOD PUT
const dosenNip = "222";
const updatedDosenData = {
  nama: "Bella Harimurti",
  gender: "P",
  alamat: "Pondok Indah",
};

fetch(`http://localhost:3000/dosen/${dosenNip}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updatedDosenData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// METHOD POST
const newDosenData = {
  nip: "223",
  nama: "Windah",
  gender: "L",
  alamat: "Tebet",
};

fetch("http://localhost:3000/dosen", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newDosenData),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// METHOD DELETE
const nipToDelete = "221";

fetch(`http://localhost:3000/dosen/${nipToDelete}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));