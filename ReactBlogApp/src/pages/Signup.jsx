import React from 'react';
import { Signup as SignupComponent } from '../components/index';

const Signup = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
                <SignupComponent />
            </div>
        </div>
    );
};

export default Signup;
