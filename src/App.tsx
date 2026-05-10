/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Smartphone, Zap, ArrowRight, Wifi, Battery, SignalHigh } from 'lucide-react';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Load remembered credentials
  useEffect(() => {
    const savedUsername = localStorage.getItem('remembered_username');
    const savedPassword = localStorage.getItem('remembered_password');
    const savedRemember = localStorage.getItem('remember_me') === 'true';

    if (savedRemember) {
      if (savedUsername) setUsername(savedUsername);
      if (savedPassword) setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleLogin = () => {
    setLoginStatus('loading');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      // Simple validation for simulation
      if (username === 'admin' && password === '123456') {
        setLoginStatus('success');
        if (remember) {
          localStorage.setItem('remembered_username', username);
          localStorage.setItem('remembered_password', password);
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remembered_username');
          localStorage.removeItem('remembered_password');
          localStorage.setItem('remember_me', 'false');
        }
      } else {
        setLoginStatus('failed');
        setErrorMessage('Tài khoản hoặc mật khẩu không đúng!');
      }
    }, 1500);
  };

  const resetLogin = () => {
    setLoginStatus('idle');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      {/* Container simulating a mobile device screen */}
      <div className="w-[360px] h-[720px] bg-white shadow-2xl flex flex-col relative overflow-hidden border-[8px] border-slate-900 rounded-[3rem]">
        
        {/* Screen Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-20"></div>

        {/* Status Bar */}
        <div className="flex justify-between items-center px-8 pt-6 pb-2 text-[10px] font-bold text-slate-800 z-10">
          <span>9:41</span>
          <div className="flex gap-1.5">
            <SignalHigh className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <div className="w-5 h-2.5 border border-slate-800 rounded-sm relative">
              <div className="absolute left-0 top-0 h-full w-4 bg-slate-800"></div>
            </div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col px-8 py-6 overflow-y-auto">
          
          {/* Brand Header */}
          <div className="mt-4 mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 mt-2 font-medium">Log in to your account</p>
          </div>

          {/* Form Content */}
          <div className="space-y-5">
            
            {/* User Name Field */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">User Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tài khoản"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
                id="username-input"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all text-slate-700 font-medium placeholder:text-slate-300"
                id="password-input"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center group cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="sr-only"
                    id="remember-checkbox"
                  />
                  <div className={`w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all ${remember ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200 group-hover:bg-slate-50'}`}>
                    {remember && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>
                </div>
                <span className="ml-3 text-sm font-semibold text-slate-600 select-none">Remember me</span>
              </label>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot?</button>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleLogin}
              disabled={loginStatus === 'loading'}
              className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 transition-all active:scale-95"
              id="login-button"
            >
              <span>{loginStatus === 'loading' ? 'LOGGING IN...' : 'LOG IN'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1"></div>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 font-medium mb-4">
            Don't have an account? <span className="text-indigo-600 font-bold cursor-pointer">Sign Up</span>
          </p>

          {/* Home Indicator */}
          <div className="w-32 h-1.5 bg-slate-200 rounded-full mx-auto mt-2"></div>
        </div>

        {/* Feedback Messages (Theme Styled) */}
        <AnimatePresence>
          {loginStatus !== 'idle' && loginStatus !== 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm p-8"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className={`w-full p-6 rounded-[2rem] shadow-2xl border flex flex-col items-center text-center gap-4 ${
                  loginStatus === 'success' 
                    ? 'bg-emerald-50 border-emerald-100' 
                    : 'bg-red-50 border-red-100'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
                  loginStatus === 'success' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-red-500 shadow-red-200'
                }`}>
                  {loginStatus === 'success' ? <Check className="text-white w-10 h-10" /> : <X className="text-white w-10 h-10" />}
                </div>
                
                <div>
                  <h2 className={`text-xl font-bold ${loginStatus === 'success' ? 'text-emerald-900' : 'text-red-900'}`}>
                    {loginStatus === 'success' ? 'Success!' : 'Failed'}
                  </h2>
                  <p className={`mt-1 text-sm font-medium ${loginStatus === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {loginStatus === 'success' 
                      ? 'Login simulated successfully. Welcome back!' 
                      : errorMessage}
                  </p>
                </div>

                <button
                  onClick={resetLogin}
                  className={`mt-4 w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                    loginStatus === 'success' 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  OK
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Design Note (from theme) */}
      <div className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-md p-5 rounded-[2rem] shadow-xl border border-slate-200 text-xs text-slate-500 max-w-[240px] hidden lg:block">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          <p className="font-bold text-slate-700 uppercase tracking-widest text-[10px]">Vibrant Palette</p>
        </div>
        <p className="font-medium leading-relaxed">
          This interface is now powered by the <span className="text-indigo-600 font-bold">Vibrant Palette</span> theme. 
          Enjoy the high-contrast Indigo accents and smooth rounded edges.
        </p>
        <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Account</p>
            <p className="text-slate-700 font-mono">admin</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Secret</p>
            <p className="text-slate-700 font-mono">123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
