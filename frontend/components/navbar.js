export default function Navbar({ searchQuery, setSearchQuery, cartCount, onLogoClick, onCartClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <h1 
            className="text-2xl font-black bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer" 
            onClick={onLogoClick}
          >
            Maul Shop
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="flex flex-grow max-w-2xl">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Cari produk impianmu di sini..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-lg py-2 px-4 pl-10 transition-all outline-none text-sm"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT MENU (CART & PROFILE) */}
        <div className="flex items-center gap-4 text-gray-600">
           
           {/* ICON KERANJANG - SEKARANG BISA DIKLIK */}
           <div 
             onClick={onCartClick} 
             className="relative cursor-pointer hover:text-blue-600 transition p-1"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
             </svg>
             {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-bounce shadow-sm">
                 {cartCount}
               </span>
             )}
           </div>

           <div className="hidden sm:block text-sm font-medium hover:text-blue-600 cursor-pointer">Bantuan</div>
           <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-100 shadow-sm">M</div>
        </div>

      </div>
    </nav>
  );
}