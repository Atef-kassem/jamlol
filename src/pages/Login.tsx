import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
// استخدام خلفية ذهبية دافئة بدلاً من الصورة
import daglwaLogo from '/lovable-uploads/bef2a3fa-a60c-4284-b098-6961023455bc.png';

// Enhanced sandstorm effect
const SandStorm = () => {
  const sandParticles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 4,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  const windLines = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    width: Math.random() * 80 + 20,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sand particles */}
      {sandParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-amber-200/40 animate-pulse"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: particle.opacity,
            transform: `translateX(${Math.sin(particle.delay) * 50}px)`,
          }}
        />
      ))}
      
      {/* Wind lines */}
      {windLines.map((line) => (
        <div
          key={`wind-${line.id}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent animate-pulse"
          style={{
            width: `${line.width}px`,
            left: `${line.left}%`,
            top: `${line.top}%`,
            animationDelay: `${line.delay}s`,
            animationDuration: `${line.duration}s`,
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
          }}
        />
      ))}
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // للاختبار والتطوير - أي بيانات ستعمل
    if (!username.trim() || !password.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }

    setIsLoading(true);
    
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setIsLoading(false);
      // التوجه إلى لوحة التحكم
      window.location.href = '/dashboard';
    }, 1500);
  };

  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = (e.clientX * -1) / 100;
      const moveY = (e.clientY * -1) / 100;
      const bg = document.querySelector('.parallax-bg') as HTMLElement;
      if (bg) {
        bg.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Jamlool sidebar-inspired gradient background */}
      <div 
        className="parallax-bg absolute inset-0 scale-110 transition-transform duration-100 ease-out bg-gradient-to-br from-green-600 to-green-700"
      />
      
      {/* Enhanced green overlay matching sidebar */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-700/60 via-green-600/50 to-emerald-600/70" />
      
      {/* Animated elements */}
      <SandStorm />
      
      {/* Main login container */}
      <div className={`w-full max-w-md mx-auto animate-scale-in relative z-10 ${shake ? 'animate-pulse' : ''}`}>
        {/* Login card with enhanced glassmorphism */}
        <Card className="bg-white/20 backdrop-blur-xl border border-emerald-200/30 rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:bg-white/25">
          {/* Logo section */}
          <div className="text-center mb-8">
            {/* Company Logo */}
            <div className="mb-6">
              <img 
                src="/lovable-uploads/bef2a3fa-a60c-4284-b098-6961023455bc.png"
                alt="جملول" 
                className="w-56 h-auto mx-auto filter drop-shadow-xl"
              />
            </div>
            
            {/* Login Header */}
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              تسجيل الدخول
            </h2>
            <p className="text-white/80 text-sm mb-4">
              للاختبار: استخدم أي اسم مستخدم وكلمة مرور
            </p>
          </div>

          {/* Login form with enhanced interactions */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username field with floating label effect */}
            <div className="relative group">
              <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-green-600" />
              <Input
                type="text"
                placeholder="اسم المستخدم أو الجوال"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 pr-12 pl-4 bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300 transform focus:scale-105"
              />
            </div>

            {/* Password field with enhanced security visual */}
            <div className="relative group">
              <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-green-600" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 pr-12 pl-12 bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all duration-300 transform focus:scale-105"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Enhanced login button with ripple effect */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group mt-6"
            >
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </div>
              ) : (
                <span className="relative z-10">دخول</span>
              )}
            </Button>

            {/* Enhanced forgot password link */}
            <div className="text-center mt-6">
              <button
                type="button"
                className="text-white/90 hover:text-white transition-all duration-200 text-sm font-medium hover:underline transform hover:scale-105"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          </form>
        </Card>

        {/* Enhanced footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-white/80 drop-shadow-sm">
            © جميع الحقوق محفوظة دقلوة 2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;