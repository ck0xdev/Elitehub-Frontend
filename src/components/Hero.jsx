import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-28 pb-10 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-indigo-50 to-transparent z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="space-y-8 flex flex-col justify-center"
        >
          <div className="w-fit"><span className="py-2 px-4 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold tracking-wide uppercase">New Arrival</span></div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]">Next Gen <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Performance</span></h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">Experience the future of mobile technology with the elite collection. Unmatched speed, crystal clear display, and premium design.</p>
          
          <div className="flex gap-4 pt-4">
            {/* FIXED: Added Link to Shop */}
            <Link to="/shop" className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1">
              Shop Now <ArrowRight size={20} />
            </Link>
            {/* FIXED: View Specs scrolls to New Arrivals */}
            <Link to="/new-arrivals" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-all">
              View Specs
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center h-full"
        >
            <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-indigo-100 rounded-full opacity-50 blur-3xl -z-10" />
            <motion.img 
              animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/uploads/1750504738284-Samsung-GalaxyS24-FE.png" 
              alt="Premium Phone" className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl z-10"
            />
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;