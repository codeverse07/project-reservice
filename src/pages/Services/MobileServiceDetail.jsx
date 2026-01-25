import React from 'react';
import { ArrowLeft, Star, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; // In real app use useParams to fetch data
import { services } from '../../data/mockData';

const MobileServiceDetail = ({ serviceId, onClose }) => {
    // For demo, we might just find the first service or pass it in. 
    // In a real route, we'd use useParams(). Here we'll default to the first one if no prop.
    const service = services.find(s => s.id === (serviceId || 1)) || services[0];
    
    return (
        <div className="fixed inset-0 bg-white z-[60] overflow-y-auto animate-in slide-in-from-bottom-full duration-300">
            {/* Header Image */}
            <div className="relative h-64 bg-gray-200">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <button 
                  onClick={onClose}
                  className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md text-gray-800"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
            </div>

            <div className="px-5 py-6 -mt-6 bg-white rounded-t-3xl relative z-10 min-h-screen">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight w-3/4">{service.title}</h1>
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-rose-600">₹{service.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{service.price + 200}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1 font-bold text-gray-800">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        {service.rating}
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="text-gray-500">{service.reviews} reviews</div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        45 mins
                    </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-gray-900 mb-2">About the Service</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {service.description}. Our verified experts ensure high-quality service with a 30-day warranty on all parts and labor. Safe, secure, and fully insured.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-3">What's Included</h3>
                        <ul className="space-y-2">
                            {['Diagnosis and troubleshooting', 'Minor parts replacement (if needed)', 'Post-service cleanup', '30-day service warranty'].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-gray-600">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex gap-3">
                         <ShieldCheck className="w-6 h-6 text-rose-600 shrink-0" />
                         <div>
                             <h4 className="font-bold text-rose-900 text-sm">Review Guarantee</h4>
                             <p className="text-xs text-rose-700 mt-1">If you aren't satisfied, we will redo the service for free. No questions asked.</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Action Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-8 z-20">
                <button className="w-full bg-rose-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 active:scale-[0.98] transition-all flex justify-between px-6">
                    <span>Add to Cart</span>
                    <span>₹{service.price}</span>
                </button>
            </div>
        </div>
    );
};

export default MobileServiceDetail;
