import React, { useState } from 'react';
import { Search, Mic, Tag, Star, Clock, ArrowRight } from 'lucide-react';
import { categories, services } from '../../data/mockData';
import MobileHeader from '../../components/mobile/MobileHeader';
import MobileBottomNav from '../../components/mobile/MobileBottomNav';
import MobileServiceDetail from '../../pages/Services/MobileServiceDetail';
import { Link } from 'react-router-dom';

const MobileHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  // Group categories for grid (limit to 8 for initial view)
  const displayCategories = categories.slice(0, 8);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* Service Detail Modal */}
      {selectedServiceId && (
        <MobileServiceDetail 
            serviceId={selectedServiceId} 
            onClose={() => setSelectedServiceId(null)} 
        />
      )}

      <MobileHeader />

      {/* Search Bar Section */}
      <div className="px-4 pt-4 pb-2 bg-white sticky top-[60px] z-40">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border-none rounded-xl bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all shadow-sm"
            placeholder="Search for 'AC Repair'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center border-l border-gray-200 ml-2 pl-2">
             <Mic className="h-5 w-5 text-rose-600" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Promotional Banner */}
        {/* Promotional Banner Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-rose-200">
          <div 
             className="flex transition-transform duration-500 ease-in-out" 
             style={{ transform: `translateX(-${currentBannerIndex * 100}%)` }}
          >
             {/* Banner 1 */}
             <div className="w-full flex-shrink-0 relative bg-gradient-to-r from-rose-900 to-rose-700 text-white p-5 h-44 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 block">
                    <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 border border-white/30">
                    LIMITED OFFER
                    </div>
                    <h3 className="text-xl font-bold mb-1">Get 50% OFF</h3>
                    <p className="text-rose-100 text-sm mb-4">On your first AC Service booking</p>
                    <button className="bg-white text-rose-900 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 transition-colors">
                    Book Now
                    </button>
                </div>
                <div className="absolute bottom-0 right-0 p-4 opacity-10">
                    <Tag size={60} />
                </div>
             </div>

             {/* Banner 2 */}
             <div className="w-full flex-shrink-0 relative bg-gradient-to-r from-purple-900 to-indigo-800 text-white p-5 h-44 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 block">
                    <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 border border-white/30">
                    NEW ARRIVAL
                    </div>
                    <h3 className="text-xl font-bold mb-1">Home Deep Cleaning</h3>
                    <p className="text-indigo-100 text-sm mb-4">Starting at just ₹999</p>
                    <button className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 transition-colors">
                    Explore
                    </button>
                </div>
                 <div className="absolute bottom-0 right-0 p-4 opacity-10">
                    <Star size={60} />
                </div>
             </div>

             {/* Banner 3 */}
             <div className="w-full flex-shrink-0 relative bg-gradient-to-r from-orange-600 to-red-600 text-white p-5 h-44 flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 block">
                    <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 border border-white/30">
                    EXPRESS SERVICE
                    </div>
                    <h3 className="text-xl font-bold mb-1">Plumbing Emergency?</h3>
                    <p className="text-orange-100 text-sm mb-4">Expert plumbers at your door in 30 mins</p>
                    <button className="bg-white text-orange-900 px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-gray-50 transition-colors">
                    Call Now
                    </button>
                </div>
                 <div className="absolute bottom-0 right-0 p-4 opacity-10">
                    <Clock size={60} />
                </div>
             </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {[0, 1, 2].map((i) => (
                <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentBannerIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                />
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-1">All Services</h2>
          <div className="grid grid-cols-4 gap-x-2 gap-y-6">
            {displayCategories.map((cat) => (
              <Link to="/services" key={cat.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 p-1 hover:border-rose-200 transition-colors overflow-hidden">
                   <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover rounded-xl"
                   />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center leading-tight truncate w-full px-1 group-hover:text-rose-600 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured / Most Booked */}
        <div>
          <div className="flex justify-between items-center mb-4 px-1">
             <h2 className="text-lg font-bold text-gray-900">Most Booked</h2>
             <Link to="/services" className="text-rose-600 text-xs font-bold flex items-center gap-1">
               See All <ArrowRight className="w-3 h-3" />
             </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 snap-x hide-scrollbar">
            {services.slice(0, 4).map((service) => (
              <div 
                key={service.id} 
                onClick={() => setSelectedServiceId(service.id)}
                className="min-w-[280px] bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm snap-center cursor-pointer active:scale-95 transition-transform"
              >
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-[10px] font-bold shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    {service.rating || "4.8"}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{service.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <Clock className="w-3 h-3" />
                    <span>45 mins</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>Starts at ₹{service.price}</span>
                  </div>
                  <button className="w-full py-2 rounded-lg border border-rose-100 text-rose-600 font-bold text-xs hover:bg-rose-50 transition-colors">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <MobileBottomNav />
    </div>
  );
};

export default MobileHomePage;
