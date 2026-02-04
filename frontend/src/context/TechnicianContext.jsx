import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';
import { useUser } from './UserContext';
import { toast } from 'react-hot-toast';

const TechnicianContext = createContext();

export const useTechnician = () => useContext(TechnicianContext);

export const TechnicianProvider = ({ children }) => {
    const { user, isAuthenticated } = useUser();
    const [technicianProfile, setTechnicianProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);

    // Fetch Technician Data (Profile, Stats, Jobs)
    const fetchTechnicianData = async () => {
        if (isAuthenticated && user?.role === 'TECHNICIAN') {
            try {
                setLoading(true);
                // 1. Fetch Profile
                const profileRes = await client.get(`/technicians?user=${user._id}`);
                if (profileRes.data.status === 'success' && profileRes.data.data.technicians.length > 0) {
                    setTechnicianProfile(profileRes.data.data.technicians[0]);
                } else {
                    setTechnicianProfile(null);
                }

                // 2. Fetch Stats
                try {
                    const statsRes = await client.get('/bookings/stats');
                    if (statsRes.data.status === 'success') {
                        setStats(statsRes.data.data.stats);
                    }
                } catch (statsErr) {
                    console.error("Error fetching stats:", statsErr);
                }

                // 3. Fetch Jobs (Bookings)
                try {
                    const bookingsRes = await client.get('/bookings');
                    if (bookingsRes.data.status === 'success') {
                        setJobs(bookingsRes.data.data.bookings);
                    }
                } catch (jobsErr) {
                    console.error("Error fetching jobs:", jobsErr);
                }

            } catch (error) {
                console.error("Error fetching technician data", error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTechnicianData();
    }, [isAuthenticated, user]);

    const createProfile = async (profileData) => {
        try {
            const formData = new FormData();
            formData.append('bio', profileData.bio);
            // Append skills as array or multiple fields?
            // Joi expects array. formData usually handles array by repeating keys or stringifying.
            // Backend validation: Joi.string().trim() inside array.
            // If I append 'skills' multiple times, multer handles it? 
            // `upload.single('profilePhoto')` is middleware. 
            // It parses body. 
            // For array in FormData: profileData.skills.forEach(skill => formData.append('skills[]', skill));

            profileData.skills.forEach(skill => formData.append('skills', skill));

            if (profileData.location) {
                formData.append('location[type]', 'Point');
                formData.append('location[coordinates][0]', profileData.location.coordinates[0]);
                formData.append('location[coordinates][1]', profileData.location.coordinates[1]);
                formData.append('location[address]', profileData.location.address);
            }

            if (profileData.profilePhoto) {
                formData.append('profilePhoto', profileData.profilePhoto);
            }

            // Append documents
            if (profileData.documents) {
                if (profileData.documents.aadharCard) formData.append('aadharCard', profileData.documents.aadharCard);
                if (profileData.documents.panCard) formData.append('panCard', profileData.documents.panCard);
                if (profileData.documents.drivingLicense) formData.append('drivingLicense', profileData.documents.drivingLicense);
                if (profileData.documents.certificates) formData.append('certificates', profileData.documents.certificates);
            }

            const res = await client.post('/technicians/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setTechnicianProfile(res.data.data.profile);
            toast.success("Profile created successfully!");
            return { success: true };
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create profile");
            return { success: false, message: error.response?.data?.message };
        }
    };

    const updateStatus = async (isOnline) => {
        try {
            const res = await client.patch('/technicians/profile', { isOnline });
            setTechnicianProfile(prev => ({ ...prev, isOnline: res.data.data.profile.isOnline }));
            toast.success(isOnline ? "You are now Online" : "You are now Offline");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const updateJobStatus = async (bookingId, status) => {
        try {
            await client.patch(`/bookings/${bookingId}/status`, { status });
            toast.success(`Job marked as ${status}`);
            // Refresh data
            fetchTechnicianData();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const subscribeToPush = async () => {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'BB40pUEc2e28ijP0qTRgDsAgxZufLdUNoPAfnGZHIYW6WgAXt0eWTNKBhEK9cZfkXnh7swDxQQjxbM_LKuLLWeo'
                });

                await client.post('/technicians/subscribe', subscription);
                console.log("Push subscription successful");
            } catch (error) {
                console.error("Push subscription failed", error);
            }
        }
    };

    const value = {
        technicianProfile,
        stats,
        jobs,
        loading,
        createProfile,
        updateStatus,
        updateJobStatus,
        subscribeToPush,
        refreshTechnicianData: fetchTechnicianData
    };

    return <TechnicianContext.Provider value={value}>{children}</TechnicianContext.Provider>;
};
