/* eslint-disable @next/next/no-img-element */
export default function ProductCard({ p, onBuy, onImageClick }) {
  
  const getProductImage = () => {
 
    if (p.image && p.image.startsWith('http')) {
      return p.image;
    }

    if (p.image && p.image.includes('.')) {
      return `/images/${p.image}`;
    }

    const keyword = p.name ? p.name.split(' ')[0].toLowerCase() : "product";
    return `https://loremflickr.com/400/400/${keyword}?lock=${p.id}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
      <div className="relative aspect-square w-full bg-gray-50">
        <img
          src={getProductImage()} 
          onClick={() => onImageClick(getProductImage())} // GANTI BAGIAN INI
          alt={p.name}
          className="cursor-zoom-in object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const keyword = p.name ? p.name.split(' ')[0].toLowerCase() : "product";
            e.target.src = `https://loremflickr.com/400/400/${keyword}?lock=${p.id}`;
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{p.name}</h3>
        <p className="text-blue-600 font-black text-lg mb-4">
          Rp {Number(p.price).toLocaleString('id-ID')}
        </p>

        <button 
          onClick={() => onBuy(p.id, p.name)}
          className="w-full bg-gray-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}