import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
            <div className="hidden md:block">
                <Navbar />
            </div>

            <main className="grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
