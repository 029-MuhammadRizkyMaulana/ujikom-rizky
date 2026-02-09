import { useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
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

  const saveProduct = async () => {
  if (!name || !price || !image) return alert("Isi semua data!");

  const productData = { 
    name, 
    price, 
    image, 
    description,
    category
  };

  try {
    if (editId) {
      await axios.put(`http://localhost:5000/api/admin/products/${editId}`, 
        productData,
        getAuthHeader()
      );
      alert("Produk berhasil diupdate!");
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/admin/products', 
        productData,
        getAuthHeader()
      );
      alert("Produk berhasil ditambah!");
    }

    setName(''); setPrice(''); setImage(''); setDescription('');
    getProducts();
  } catch (error) {
    console.error("Save error:", error);
    alert("Gagal memproses produk."); 
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

  const handleEditClick = (p) => {
  setEditId(p.id);
  setName(p.name);
  setPrice(p.price);
  setImage(p.image);
  setDescription(p.description)
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <div className="md:col-span-4 mt-2">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Deskripsi Produk</label>
            <textarea 
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none" 
              placeholder="Masukkan penjelasan produk..." 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              rows="3"
            />
           </div>
           <select 
             value={category} 
             onChange={(e) => setCategory(e.target.value)} 
             className="border p-2 w-full mb-2 bg-white"
           >
             <option value="">-- Pilih Kategori --</option>
             <option value="Elektronik">Elektronik</option>
             <option value="Pakaian">Pakaian</option>
             <option value="Makanan">Makanan</option>
             <option value="Mainan">Mainan</option>
             <option value="Kecantikan">Kecantikan</option>
            </select>
          <div className="flex items-end">
            <button onClick={saveProduct} className={`w-full p-3 rounded-xl font-bold transition shadow-lg text-white ${editId ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {editId ? 'Update Produk' : 'Tambah Produk'}
            </button>
            {editId && (
              <button onClick={() => {setEditId(null); setName(''); setPrice(''); setImage('');}} className="p-3 bg-gray-200 rounded-xl font-bold hover:bg-gray-300 transition">Batal</button>
            )}
          </div>
        </div>

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
                      onClick={() => handleEditClick(p)} 
                      className="text-blue-500 font-bold hover:text-blue-700 transition px-3 py-1 rounded-lg border border-blue-200 hover:bg-blue-50 mr-2"
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-500 font-bold hover:text-red-700 transition px-3 py-1 rounded-lg border border-red-200 hover:bg-red-50">
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