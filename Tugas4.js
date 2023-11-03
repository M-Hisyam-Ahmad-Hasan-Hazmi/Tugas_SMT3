//Menggunakan if-else
console.log ("Menggunakan if-else")

var pendapatan = 600000;

var uangJasa, uangKomisi;

if (pendapatan <= 200000) {
    uangJasa = 10000;
    uangKomisi = 0.1 * pendapatan;
} else if (pendapatan <= 500000) {
    uangJasa = 20000;
    uangKomisi = 0.15 * pendapatan;
} else {
    uangJasa = 30000;
    uangKomisi = 0.2 * pendapatan;
}
var totalPembayaran = uangJasa + uangKomisi;

console.log("Uang Jasa: Rp. " + uangJasa);
console.log("Uang Komisi: Rp. " + uangKomisi);
console.log("Total Pembayaran: Rp. " + totalPembayaran);

//Switch-case 

console.log("Menggunakan Switch-case")

var pendapatan = 600000;

var uangJasa, uangKomisi;

switch (true) {
    case pendapatan <= 200000:
        uangJasa = 10000;
        uangKomisi = 0.1 * pendapatan;
        break;
    case pendapatan <= 500000:
        uangJasa = 20000;
        uangKomisi = 0.15 * pendapatan;
        break;
    default:
        uangJasa = 30000;
        uangKomisi = 0.2 * pendapatan;
}

var totalPembayaran = uangJasa + uangKomisi;

console.log("Uang Jasa: Rp. " + uangJasa);
console.log("Uang Komisi: Rp. " + uangKomisi);
console.log("Total Pembayaran: Rp. " + totalPembayaran);
