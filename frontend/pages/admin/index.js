import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();

  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }, []);

  const getProducts = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/admin/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router]);

  const addProduct = async () => {
    if (!name || !price || !image) return alert("Isi semua data!");
    
    try {
      await axios.post('http://localhost:5000/api/admin/products', 
        { name, price, image }, 
        getAuthHeader()
      );
      setName(''); setPrice(''); setImage('');
      getProducts();
    } catch (error) {
      console.error("Add error:", error);
      alert("Gagal tambah produk. Pastikan login valid.");
    }
  };

  const deleteProduct = async (id) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`, getAuthHeader());
        getProducts();
      } catch (error) {
        console.error("Delete error:", error);
        alert("Gagal menghapus produk");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const initFetch = async () => {
      await getProducts();
    };
    initFetch();
  }, [getProducts]);

  return (
    <div className="p-10 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500">Kelola katalog produk tokomu di sini.</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Form Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">URL Gambar</label>
            <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" placeholder="/images/produk.jpg" value={image} onChange={e => setImage(e.target.value)} />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nama Produk</label>
            <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Contoh: Sepatu" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="md:col-span-1">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Harga (Rp)</label>
            <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" placeholder="150000" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div className="flex items-end">
            <button onClick={addProduct} className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
              Tambah Produk
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-4 font-semibold">Nama Produk</th>
                <th className="p-4 font-semibold text-right">Harga</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length > 0 ? products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-700">{p.name}</td>
                  <td className="p-4 text-right text-blue-600 font-bold">
                    Rp {Number(p.price).toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => deleteProduct(p.id)} 
                      className="text-red-500 font-bold hover:text-red-700 transition px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-gray-400 italic">Belum ada produk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}