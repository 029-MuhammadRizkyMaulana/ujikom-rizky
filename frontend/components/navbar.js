export default function Navbar({ searchQuery, setSearchQuery, cartCount, onLogoClick, onCartClick, onHelpClick, handleImageSearch }) {
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        <div className="flex-shrink-0">
          <h1 
            className="text-2xl font-black bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent cursor-pointer" 
            onClick={onLogoClick}
          >
            Maul Shop
          </h1>
        </div>

        <div className="flex flex-grow max-w-2xl">
          <div className="relative w-full flex items-center">
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
            <label className="absolute right-3 cursor-pointer text-gray-400 hover:text-blue-500">
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => handleImageSearch(e.target.files[0])}
      />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
    </label>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
           
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

            <button 
              onClick={onHelpClick}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition-all text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Bantuan
             </button>
        </div>
      </div>
    </nav>
  );
}

  <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-100 shadow-sm">ZH</div>
           