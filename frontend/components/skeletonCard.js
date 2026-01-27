export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4 animate-pulse">
      {/* Kotak Gambar */}
      <div className="aspect-square w-full bg-gray-200 rounded-xl"></div>
      
      {/* Garis Judul */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      {/* Garis Harga */}
      <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
      
      {/* Tombol */}
      <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
    </div>
  );
}