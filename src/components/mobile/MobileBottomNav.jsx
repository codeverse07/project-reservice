import React from 'react';
import { Home, Search, Calendar, User, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/services' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: User, label: 'Account', path: '/profile' }, // Assuming /profile exists or will exist
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 pb-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex justify-between items-center md:hidden">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            className={`flex flex-col items-center gap-1 transition-all duration-200 py-1 px-3 rounded-xl ${isActive ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? 'fill-rose-600' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
