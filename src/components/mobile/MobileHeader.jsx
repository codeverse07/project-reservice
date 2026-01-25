import React from 'react';
import { MapPin, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileHeader = () => {
  return (
    <div className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm border-b border-gray-100 flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-rose-600 font-bold text-xs uppercase tracking-wider">
          <MapPin className="w-3 h-3" />
          <span>Home</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-bold text-slate-800 text-sm truncate max-w-[200px]">
            123, Green Park, New Delhi...
          </span>
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Link to="/notifications" className="relative p-2 rounded-full hover:bg-slate-50 text-slate-700">
           <Bell className="w-5 h-5" />
           <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </Link>
        <Link to="/profile" className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 border border-slate-200">
          <User className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default MobileHeader;
