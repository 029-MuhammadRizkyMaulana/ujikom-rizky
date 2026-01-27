/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import CategoryFilter from '../../components/categoryFilter';
import ProductCard from '../../components/productCard';
import SkeletonCard from '../../components/skeletonCard';

export default function UserPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [lastOrdered, setLastOrdered] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const categories = ["Semua", "Elektronik", "Pakaian", "Makanan", "Lainnya"];
  const [isLoading, setIsLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null);
  
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('http://localhost:5000/api/admin/products');
        setProducts(res.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const removeFromCart = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
    setCartCount(newItems.length);
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name.toLowerCase();
    const search = searchQuery.toLowerCase();
    const matchSearch = name.includes(search);
    let matchCategory = true;
    if (selectedCategory === "Elektronik") {
      matchCategory = name.includes("wireless") || name.includes("earbuds") || name.includes("laptop");
    } else if (selectedCategory === "Pakaian") {
      matchCategory = name.includes("sepatu") || name.includes("celana") || name.includes("jaket");
    } else if (selectedCategory === "Makanan") {
      matchCategory = name.includes("snack") || name.includes("kopi") || name.includes("makanan");
    } else if (selectedCategory === "Lainnya") {
      const isElectronic = name.includes("wireless") || name.includes("earbuds") || name.includes("laptop");
      const isClothing = name.includes("sepatu") || name.includes("celana") || name.includes("jaket");
      matchCategory = !isElectronic && !isClothing;
    }
    return matchSearch && matchCategory;
  });

  const handleCheckout = async (productId, productName) => {
    try {
      await axios.post('http://localhost:5000/api/user/checkout', {
        product_id: productId,
        quantity: 1
      });
      const itemDetail = products.find(p => p.id === productId);
      setCartItems(prev => [...prev, itemDetail]);
      setCartCount(prev => prev + 1);
      setLastOrdered(productName);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartCount={cartCount} 
        onLogoClick={() => setSelectedCategory("Semua")}
        onCartClick={() => setIsCartOpen(true)}
        onHelpClick={() => setIsHelpOpen(true)}
      />

      <main className="p-4 md:p-8 max-w-7xl mx-auto flex-grow w-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">
              {searchQuery ? `Hasil: "${searchQuery}"` : "Rekomendasi Produk"}
            </h2>
            <div className="h-1.5 w-10 bg-blue-600 mt-2 rounded-full"></div>
          </div>
        </div>

        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />

        <div className="w-full">
  {isLoading ? (
    // Tampilan Loading (Skeleton)
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  ) : filteredProducts.length > 0 ? (
    // Tampilan Jika Produk Ada
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {filteredProducts.map(p => (
        <ProductCard key={p.id} p={p} onBuy={handleCheckout} onImageClick={(imgUrl) => setZoomedImage(imgUrl)}/>
      ))}
    </div>
  ) : (
    // Tampilan Jika Produk TIDAK Ditemukan
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
      <div className="bg-gray-50 p-6 rounded-full mb-4 text-gray-300">
     <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="48" 
      height="48" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
     </svg>
    </div>
      <h3 className="text-xl font-semibold text-gray-800">
        Produk <span className="text-blue-600">{searchQuery}</span> tidak ditemukan
      </h3>
      <p className="text-gray-500 mt-2">Coba cari dengan kata kunci lain atau cek kategori berbeda.</p>
     </div>
    )}
    </div>
      </main>

      {/* Footer Sederhana */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                © {new Date().getFullYear()} <span>Maul Shop</span>. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">Privacy Policy</span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">About Us</span>
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest cursor-pointer hover:text-blue-600 transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-[130] overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 leading-none">Keranjang</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{cartItems.length} Items</p>
          </div>
        </div>
        <button onClick={() => setIsCartOpen(false)} className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-all text-gray-400">✕</button>
      </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-24 px-6 flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-4"></div>
                    <p className="text-gray-900 font-bold mb-1">Keranjangmu kosong</p>
                    <p className="text-gray-400 text-sm">Ayo isi dengan barang impianmu!</p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2">
                    <div className="h-20 w-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 shadow-sm">
                        <img 
                          src={item.image && item.image.startsWith('http') ? item.image : `https://picsum.photos/seed/${item.id + 100}/150/150`} 
                          alt={item.name} 
                          className="h-full w-full object-cover" 
                          onError={(e) => {
                          e.target.src = `https://source.unsplash.com/featured/?${encodeURIComponent(item.name)}`;
                         }}
                        />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                        <p className="text-blue-600 font-black mt-1">Rp {Number(item.price).toLocaleString('id-ID')}</p>
                      </div>

                     <button 
                       onClick={() => removeFromCart(index)}
                       className="flex items-center gap-1.5 text-red-400 hover:text-red-600 transition-colors group/delete"
                     >

                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M3 6h18"></path>
                       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                     </svg>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Hapus</span>
                     </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t bg-gray-50/50 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-gray-500">Total Pembayaran:</span>
                <span className="text-2xl font-black text-orange-600">
                  Rp {cartItems.reduce((t, i) => t + Number(i.price), 0).toLocaleString('id-ID')}
                </span>
              </div>
              <button 
                disabled={cartItems.length === 0}
                onClick={() => { setIsCartOpen(false); setIsSnapOpen(true); }}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 transition-all shadow-xl shadow-blue-100"
              >
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 font-black">Berhasil!</h3>
            <p className="text-gray-600 mb-6 text-sm">
              <span className="font-bold text-blue-600">{lastOrdered}</span> berhasil masuk keranjang. Terima kasih sudah belanja!
            </p>
            <button onClick={() => setShowModal(false)} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">Oke</button>
          </div>
        </div>
      )}

      {isSnapOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300">
            <div className="bg-blue-600 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="font-black italic text-xs bg-white text-blue-600 px-1 rounded">midtrans</span><span className="text-xs font-bold uppercase tracking-widest">Payment</span></div>
              <button onClick={() => setIsSnapOpen(false)}>✕</button>
            </div>
            <div className="p-8">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Bayar</p>
              <h2 className="text-3xl font-black text-blue-700 mb-8">Rp {cartItems.reduce((t, i) => t + Number(i.price), 0).toLocaleString('id-ID')}</h2>
              <div className="space-y-3">
                {['BCA Virtual Account', 'GoPay / QRIS', 'Indomaret'].map(m => (
                  <button key={m} onClick={() => { setIsSnapOpen(false); setCartItems([]); setCartCount(0); setShowModal(true); }} className="w-full p-4 border-2 border-gray-50 rounded-2xl flex justify-between font-bold text-gray-700 hover:border-blue-600 hover:bg-blue-50 transition-all group">
                    {m} <span className="group-hover:translate-x-1 transition-transform">❯</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isHelpOpen && (
  <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300">
      <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
        <h3 className="text-xl font-black">Pusat Bantuan</h3>
        <button onClick={() => setIsHelpOpen(false)} className="hover:rotate-90 transition-transform">✕</button>
      </div>
      <div className="p-8 space-y-6">
        <div className="flex gap-4">
          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 h-fit">📦</div>
          <div>
            <h4 className="font-bold text-gray-800">Cara Belanja</h4>
            <p className="text-sm text-gray-500">Pilih produk favoritmu, masukkan keranjang, dan lakukan pembayaran melalui sistem Midtrans kami.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-orange-50 p-3 rounded-2xl text-orange-600 h-fit">🚚</div>
          <div>
            <h4 className="font-bold text-gray-800">Pengiriman</h4>
            <p className="text-sm text-gray-500">Estimasi pengiriman adalah 1-3 hari kerja tergantung lokasi tujuan Anda.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-green-50 p-3 rounded-2xl text-green-600 h-fit">📧</div>
          <div>
            <h4 className="font-bold text-gray-800">Kontak Kami</h4>
            <p className="text-sm text-gray-500">Ada kendala? Hubungi tim support kami di <span className="font-bold">support@maulshop.com</span></p>
          </div>
        </div>
        <button 
          onClick={() => setIsHelpOpen(false)}
          className="w-full bg-gray-100 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-all"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
)}

  {/* Modal Preview Gambar Utuh */}
{zoomedImage && (
  <div 
    className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    onClick={() => setZoomedImage(null)}
  >
    {/* Tombol Tutup */}
    <button className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
      <img 
        src={zoomedImage} 
        alt="Preview Produk" 
        className="max-w-full max-h-full object-contain rounded-lg animate-in zoom-in-95 duration-300 shadow-2xl"
      />
    </div>
  </div>
)}
    </div>
  );
}