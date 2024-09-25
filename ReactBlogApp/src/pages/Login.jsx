import React from 'react';
import { Login as LoginComponent } from '../components/index';

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
                <LoginComponent />
            </div>
        </div>
    );
};

export default Login;
