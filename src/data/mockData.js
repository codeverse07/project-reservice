import result from 'postcss/lib/result';

// Using Unsplash images for reliability and better aesthetics
// High reliability images selected for stability
const carpentryImg = 'https://images.unsplash.com/photo-1530124566582-72291b726cd5?auto=format&fit=crop&q=80&w=600';
const plumbingImg = 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=600';
const electricalImg = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600';
const acImg = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600';
const fridgeImg = 'https://images.unsplash.com/photo-1571175443880-49e1d58b794a?auto=format&fit=crop&q=80&w=600';
const washingMachineImg = 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80&w=600';
const transportImg = 'https://images.unsplash.com/photo-1586191582116-8923d0c619be?auto=format&fit=crop&q=80&w=600';

export const categories = [
    { id: 'carpentry', name: 'Carpentry', icon: 'Hammer', color: 'bg-orange-100 text-orange-600', description: 'Expert furniture crafting, repairs, and custom woodwork solutions.', image: carpentryImg },
    { id: 'electrical', name: 'Electrical', icon: 'Zap', color: 'bg-yellow-100 text-yellow-600', description: 'Safe and reliable electrical repairs, installations, and maintenance.', image: electricalImg },
    { id: 'homeappliance', name: 'Home Appliance', icon: 'Refrigerator', color: 'bg-blue-100 text-blue-600', description: 'Professional repair and servicing for all your home appliances.', image: washingMachineImg }, // Using washing machine as generic home appliance
    { id: 'plumber', name: 'Plumber', icon: 'Droplets', color: 'bg-cyan-100 text-cyan-600', description: 'Fast and efficient plumbing solutions for leaks and installations.', image: plumbingImg },
    { id: 'transport', name: 'Transport', icon: 'Truck', color: 'bg-green-100 text-green-600', description: 'Secure and timely transport services for shifting or delivery.', image: transportImg },
];

export const services = [
    {
        id: 1,
        title: 'Expert Carpentry',
        category: 'carpentry',
        rating: 4.8,
        reviews: 124,
        price: 499,
        image: carpentryImg,
        description: 'Furniture repair, assembly, and custom woodwork. Professional carpenters.',
    },
    {
        id: 2,
        title: 'Washing Machine Repair',
        category: 'homeappliance',
        rating: 4.7,
        reviews: 89,
        price: 399,
        image: washingMachineImg,
        description: 'Diagnosis and repair of all washing machine brands (LG, Samsung, IFB, etc).',
    },
    {
        id: 3,
        title: 'General Plumbing',
        category: 'plumber',
        rating: 4.9,
        reviews: 215,
        price: 599,
        image: plumbingImg,
        description: 'Leak repair, pipe fitting, and bathroom general plumbing.',
    },
    {
        id: 4,
        title: 'Electrician - General',
        category: 'electrical',
        rating: 4.6,
        reviews: 56,
        price: 199,
        image: electricalImg,
        description: 'Fan repair, light installation, socket replacement, and more.',
    },
    {
        id: 5,
        title: 'Refrigerator Repair',
        category: 'homeappliance',
        rating: 4.8,
        reviews: 92,
        price: 449,
        image: fridgeImg,
        description: 'Expert repair for single and double door refrigerators.',
    },
    {
        id: 6,
        title: 'House Shifting / Transport',
        category: 'transport',
        rating: 4.9,
        reviews: 45,
        price: 1999,
        image: transportImg,
        description: 'Safe and local goods transport and house shifting services.',
    },
];

export const bookings = [
    {
        id: 101,
        serviceId: 1,
        serviceName: 'Expert Carpentry',
        status: 'Pending',
        date: 'Oct 24, 2023',
        time: '10:00 AM',
        price: 499,
        technician: null,
        image: carpentryImg
    },
    {
        id: 102,
        serviceId: 3,
        serviceName: 'General Plumbing',
        status: 'Assigned',
        date: 'Oct 22, 2023',
        time: '2:30 PM',
        price: 599,
        technician: {
            name: 'Rajesh Kumar',
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop'
        },
        image: plumbingImg
    },
    {
        id: 103,
        serviceId: 2,
        serviceName: 'Washing Machine Repair',
        status: 'Completed',
        date: 'Oct 15, 2023',
        time: '11:00 AM',
        price: 399,
        technician: {
            name: 'Priya Sharma',
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'
        },
        image: washingMachineImg
    },
    {
        id: 104,
        serviceId: 4,
        serviceName: 'Electrician - General',
        status: 'Completed',
        date: 'Sep 28, 2023',
        time: '4:00 PM',
        price: 199,
        technician: {
            name: 'Amit Singh',
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop'
        },
        image: electricalImg
    },
    {
        id: 105,
        serviceId: 5,
        serviceName: 'Refrigerator Repair',
        status: 'Canceled',
        date: 'Aug 10, 2023',
        time: '12:00 PM',
        price: 449,
        technician: null,
        image: fridgeImg
    }
];
