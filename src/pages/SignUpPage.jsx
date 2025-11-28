import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUserAsync, selectAuthError } from '../features/auth/authSlice';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // 1. Check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // 2. Dispatch Create User Action
    try {
        const resultAction = await dispatch(createUserAsync({ email: data.email, password: data.password }));
        if (createUserAsync.fulfilled.match(resultAction)) {
            // 3. Redirect to Login on success
            navigate('/login');
        }
    } catch (err) {
        console.error("Failed to sign up:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 to-black/40 z-10" />
        <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop" 
            alt="Futuristic Setup"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center text-white w-3/4">
            <h3 className="text-5xl font-black mb-6 tracking-tight">Join the Elite.</h3>
            <p className="text-gray-200 text-xl font-light">Create an account to unlock exclusive deals, order tracking, and faster checkout.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-gray-50">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-500">It's free and only takes a minute.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                {...register('email', { 
                    required: "Email is required",
                    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" }
                })}
                type="email"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                {...register('password', { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
                type="password"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <input
                {...register('confirmPassword', { required: "Confirm Password is required" })}
                type="password"
                className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all transform active:scale-95"
            >
              Sign Up
            </button>
            
            <div className="text-center mt-6">
              <span className="text-gray-500 text-sm">Already have an account? </span>
              <Link to="/login" className="text-indigo-600 font-bold text-sm hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;    