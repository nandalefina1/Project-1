document.getElementById('hitung-btn').addEventListener('click', hitungBiaya);

function cleanInput(value) {
    // Ganti semua koma (,) menjadi titik (.) untuk kompatibilitas parseFloat
    if (typeof value === 'string') {
        return value.replace(',', '.');
    }
    return String(value).replace(',', '.');
}

function hitungBiaya() {
    // Ambil nilai dari input, pastikan menggunakan cleanInput
    const dayaWattRaw = document.getElementById('daya').value;
    const jamPenggunaanRaw = document.getElementById('jam').value;
    const tarifPerKWHRaw = document.getElementById('tarif').value;

    const dayaWatt = parseFloat(cleanInput(dayaWattRaw));
    const jamPenggunaan = parseFloat(cleanInput(jamPenggunaanRaw));
    const tarifPerKWH = parseFloat(cleanInput(tarifPerKWHRaw));
    
    const resultDiv = document.getElementById('result');

    // Validasi input
    if (isNaN(dayaWatt) || isNaN(jamPenggunaan) || isNaN(tarifPerKWH) || dayaWatt <= 0 || jamPenggunaan < 0 || tarifPerKWH < 0) {
        resultDiv.innerHTML = '<p style="color: red;">⚠️ Mohon masukkan semua nilai dengan benar (Daya harus lebih dari 0 dan hanya gunakan titik atau koma untuk desimal).</p>';
        return;
    }

    // --- LOGIKA PERHITUNGAN ---
    
    // 1. Hitung Pemakaian Energi Harian (kWh)
    const pemakaianKWH = (dayaWatt * jamPenggunaan) / 1000;

    // 2. Hitung Biaya Harian (Rp)
    const biayaHarian = pemakaianKWH * tarifPerKWH;

    // 3. Hitung Perkiraan Biaya Bulanan (30 hari) dan Tahunan (365 hari)
    const biayaBulanan = biayaHarian * 30;
    const biayaTahunan = biayaHarian * 365;

    // --- FORMAT DAN TAMPILKAN HASIL ---

    // Fungsi untuk memformat angka menjadi format mata uang Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        }).format(angka);
    };

    const hasilHTML = `
        <p class="pemakaian">Pemakaian Harian: <strong>${pemakaianKWH.toFixed(3)} kWh</strong></p>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 10px 0;">
        
        <p>Perkiraan Biaya Harian:</p>
        <p class="biaya">${formatRupiah(biayaHarian)}</p>

        <p>Perkiraan Biaya Bulanan:</p>
        <p class="biaya">${formatRupiah(biayaBulanan)}</p>
        
        <p>Perkiraan Biaya Tahunan:</p>
        <p class="biaya">${formatRupiah(biayaTahunan)}</p>
    `;

    resultDiv.innerHTML = hasilHTML;
}
