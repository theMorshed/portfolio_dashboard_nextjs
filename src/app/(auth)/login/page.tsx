"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from "next-auth/react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (session) {
                router.push("/blogs");
            }
        };

        checkSession();
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your login logic here (e.g., validation, API call)
        if (email === '' || password === '') {
            setError('Please fill in both fields');
        } else {
            setError('');
            // Your authentication logic here
            console.log(email, password);
        }

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res?.ok) {
            router.push("/blogs");
        } else {
            alert("Invalid credentials");
        }
        
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="https://i.ibb.co/rGSYKMm3/todays-photo-removebg-preview.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </div>

                <h2 className="text-center text-2xl font-bold text-sky-800 dark:text-sky-200">Login to Your Account</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-sky-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-sky-800 hover:text-sky-600">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-800 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;