import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync, selectAuthError, selectLoggedInUser } from '../features/auth/authSlice';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectAuthError);
  const { register, handleSubmit } = useForm();

  // If user is already logged in, redirect to Home
  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please enter your details to sign in.</p>
          </div>

          <form 
            onSubmit={handleSubmit((data) => dispatch(loginUserAsync(data)))}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  {...register('password', { required: true })}
                  type="password"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-600 hover:shadow-indigo-200 transition-all transform active:scale-95"
            >
              Sign In
            </button>
            
            <div className="text-center mt-4">
              <span className="text-gray-500 text-sm">Don't have an account? </span>
              <Link to="/signup" className="text-indigo-600 font-bold text-sm hover:underline">
                Sign up for free
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Decoration (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-900/40 z-10" />
        <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" 
            alt="Technology"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-20 left-20 z-20 text-white max-w-md">
            <h3 className="text-4xl font-bold mb-4">Experience the future of technology.</h3>
            <p className="text-gray-300 text-lg">Join EliteHub today and get access to exclusive premium devices.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;