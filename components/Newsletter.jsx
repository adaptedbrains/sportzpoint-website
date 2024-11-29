"use client";

import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement newsletter subscription logic
        console.log('Newsletter subscription for:', email);
        setEmail('');
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-start">
                <h2 className="text-xl font-bold text-[#006356] mb-2">Subscribe Newsletter</h2>
                <div className="w-10 h-[1px] bg-[#006356] mb-4"></div>
                
                <p className="text-sm text-gray-600 mb-4">
                    Get the latest sports updates and news delivered directly to your inbox.
                </p>
                
                <form onSubmit={handleSubmit} className="w-full space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#006356]"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#006356] text-white py-2 px-4 rounded-lg hover:bg-[#005347] transition-colors"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
