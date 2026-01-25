import React from 'react';
import { bookings } from '../../data/mockData';
import MobileBottomNav from '../../components/mobile/MobileBottomNav';
import { ArrowLeft, Clock, Calendar, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileBookingsPage = () => {
    const [activeStatus, setActiveStatus] = React.useState('Pending');
    
    // Filter bookings based on status
    const filteredBookings = bookings.filter(b => {
        if (activeStatus === 'Pending') return b.status === 'Pending';
        if (activeStatus === 'Assigned') return b.status === 'Assigned';
        if (activeStatus === 'Completed') return b.status === 'Completed';
        return true; 
    });

    // Counts for tabs
    const counts = {
        Pending: bookings.filter(b => b.status === 'Pending').length,
        Assigned: bookings.filter(b => b.status === 'Assigned').length,
        Completed: bookings.filter(b => b.status === 'Completed').length,
    };

    const tabs = ['Pending', 'Assigned', 'Completed'];

    return (
        <div className="min-h-screen bg-white pb-24 font-sans">
            {/* Header */}
            <div className="sticky top-0 bg-white z-40 px-4 py-3 shadow-none flex items-center gap-3">
                <Link to="/" className="p-1 -ml-1">
                    <ArrowLeft className="w-6 h-6 text-gray-700" />
                </Link>
                <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
            </div>

            {/* Header Content */}
            <div className="px-4 pt-6 pb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
                    Welcome, Sachin <span className="inline-block animate-wave">👋</span>
                </h1>
                <p className="text-slate-500 text-sm mb-6">Track your service requests and bookings.</p>
                
                <Link to="/services">
                    <button className="w-full py-3.5 bg-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-rose-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        + Book New Service
                    </button>
                </Link>
            </div>

            {/* Tabs */}
            <div className="px-4 mb-4">
                <div className="bg-slate-50 p-1.5 rounded-full flex items-center justify-between">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveStatus(tab)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeStatus === tab
                                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {tab}
                            <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] ${
                                activeStatus === tab
                                    ? 'bg-rose-500/30 text-white'
                                    : 'bg-slate-200 text-slate-500'
                            }`}>
                                {counts[tab]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 space-y-4">
                {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-3xl p-4 shadow-[0_2px_12px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4">
                            {/* Service Info */}
                            <div className="flex gap-4">
                                <div className="w-20 h-20 rounded-2xl bg-slate-100 shrink-0 overflow-hidden">
                                    <img src={booking.image} alt={booking.serviceName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-slate-900 line-clamp-1">{booking.serviceName}</h3>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide shrink-0
                                            ${booking.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                booking.status === 'Assigned' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                    booking.status === 'Canceled' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                        'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="text-slate-500 text-xs font-medium mb-3 flex items-center gap-2">
                                        <span>#{booking.id}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                        <span>{booking.date} at {booking.time}</span>
                                    </div>
                                    <div className="font-bold text-slate-900">
                                        ₹{booking.price}
                                    </div>
                                </div>
                            </div>

                            {/* Technician Info (if assigned) */}
                            {booking.technician && (
                                <div className="bg-slate-50 p-3 rounded-2xl flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <img src={booking.technician.image} alt={booking.technician.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">{booking.technician.name}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Verified Expert</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-green-600 shadow-sm border border-slate-100">
                                            <Phone className="w-4 h-4" />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-blue-600 shadow-sm border border-slate-100">
                                            <MessageSquare className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-50">
                                <button className="py-2.5 text-xs font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                                    Need Help?
                                </button>
                                <button className="py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Clock className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 font-bold mb-1">No {activeStatus.toLowerCase()} bookings</h3>
                        <p className="text-slate-400 text-sm">Your bookings list is empty.</p>
                    </div>
                )}
            </div>

            <MobileBottomNav />
        </div>
    );
};

export default MobileBookingsPage;
