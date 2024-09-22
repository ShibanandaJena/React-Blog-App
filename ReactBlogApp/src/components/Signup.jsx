import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { Button, Input, Logo } from '../components';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');

        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md bg-white p-8 shadow-lg rounded-lg'>
                <div className='text-center mb-6'>
                    <Logo width='100%' />
                </div>
                <h2 className='text-2xl font-semibold text-center mb-2'>
                    Sign up to create account
                </h2>
                <p className='text-center text-gray-500 mb-6'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='text-blue-500 hover:underline'>
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className='text-red-500 text-center mb-4'>{error}</p>
                )}

                <form onSubmit={handleSubmit(create)} className='space-y-5'>
                    <div className='space-y-4'>
                        <Input
                            label='Full Name:'
                            placeholder='Enter your full name'
                            {...register('name', {
                                required: true,
                            })}
                            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />

                        <Input
                            label='Email:'
                            placeholder='Enter your email'
                            type='email'
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => {
                                        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                        return emailPattern.test(value) || 'Email address must be valid';
                                    },
                                },
                            })}
                            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />

                        <Input
                            label='Password:'
                            type='password'
                            placeholder='Enter your password'
                            {...register('password', {
                                required: true,
                            })}
                            className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <Button
                        type='submit'
                        className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
