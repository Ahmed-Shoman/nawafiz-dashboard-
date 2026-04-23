import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d2233] py-12 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default LoginLayout;
