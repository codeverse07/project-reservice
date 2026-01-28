import React from 'react';
import floatingImg from '../../assets/floating.png';
import restingImg from '../../assets/resting-on-card.png';

const WorkerCharacter = ({ pose = 'idle', className = '' }) => {
    return (
        <div className={`relative w-96 h-96 ${className}`}>
            {/* Floating State */}
            <img
                src={floatingImg}
                alt="Worker Floating"
                className={`absolute inset-0 w-full h-full object-contain object-bottom transition-all duration-300 ${pose === 'idle' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />

            {/* Resting/Holding State */}
            <img
                src={restingImg}
                alt="Worker Holding"
                className={`absolute inset-0 w-full h-full object-contain object-bottom transition-all duration-300 ${pose === 'holding' ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            />
        </div>
    );
};

export default WorkerCharacter;
