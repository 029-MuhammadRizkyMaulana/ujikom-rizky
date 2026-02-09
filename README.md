1. Modul Halaman User
Modul ini intinya buat manjain pembeli. Fokusnya di Pengalaman Belanja.
Katalog Otomatis: Daftar produk itu gak ditulis manual di kode (hardcode), tapi narik data asli dari database. Jadi kalo barang di gudang/admin nambah, di sini langsung update.
Manajemen Keranjang: User bisa masukin barang ke "kantong" belanja sementara. Ada logika buat nambahin item dan yang paling penting ada fitur Hapus kalo user berubah pikiran sebelum bayar.
Detail & Checkout: Pas gambar diklik, muncul info lengkap. Terus ada proses kirim data belanjaan ke sistem pembayaran (Midtrans) biar bisa dapet kode bayar.

2. Alur Frontend → Backend → Database
Frontend (Pelayan): User klik sesuatu, pelayan (Axios/React) catat pesanan terus lari ke dapur.
Backend (Koki): Koki (Node.js) terima catatan tadi, terus ngecek stok ke lemari penyimpanan.
Database (Lemari Stok): Di sini semua data produk disimpen. Koki ambil datanya dari sini.

3. Loading state & Error handling
Gak ada web yang sempurna, makanya saya pasang "pelampung":
Loading State: Saya pake state isLoading. Intinya, pas data lagi dijalan, saya tampilin Skeleton (kotak bayangan). Ini penting biar user tau kalo aplikasi lagi kerja, bukan nge-lag atau mati. Begitu data siap, baru deh produk aslinya muncul.
Error Handling: Saya pake Try-Catch. Fungsinya buat jaga-jaga kalau server mendadak mati atau internet user putus. Bukannya webnya langsung hilang/error merah. tapi kita tangkep errornya di catch biar aplikasi tetep jalan.

4. Fungsi GET, POST, PUT, DELETE:
GET: Buat ngintip atau ambil data. Contohnya pas nampilin deretan sepatu atau baju di halaman utama.
POST: Buat nambahin sesuatu yang baru. Pas user klik checkout, kita kirim data pesanan baru ke server buat diproses.
PUT: Buat nyari dan ganti. Biasanya dipake di sisi admin kalau ada harga barang yang mau dinaikin atau deskripsi yang mau diperbaiki.
DELETE: Buat buang. Di bagian keranjang, ini dipake pas user ngeklik tombol "Hapus" biar barangnya ilang dari daftar belanjaan.
