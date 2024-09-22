import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../redux/authSlice';
import { Button, Input, Logo } from '../components';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const login = async (data) => {
        setError('');
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
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
                <h2 className='text-2xl font-semibold text-center mb-2'>Sign in to your account</h2>
                <p className='text-center text-gray-500 mb-6'>
                    Don't have an account?&nbsp;
                    <Link to='/signup' className='text-blue-500 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && (
                    <p className='text-red-500 text-center mb-4'>{error}</p>
                )}

                <form onSubmit={handleSubmit(login)} className='space-y-5'>
                    <div className='space-y-4'>
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
                                    }
                                }
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
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
