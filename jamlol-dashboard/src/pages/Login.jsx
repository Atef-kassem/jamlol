import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, Loader2 } from "lucide-react"; // ✅ إضافة Loader2
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/Slices/auth";
import { jwtDecode } from "jwt-decode";
import loginSchema from "../validation/loginSchema";

// ✅ CSS Animation للـ shake
const shakeStyle = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
.shake {
  animation: shake 0.4s ease-in-out;
}
`;



// ✅ SandStorm component (زي ما هو)
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
          }}
        />
      ))}
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
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false); // ✅ حالة اهتزاز الفورم
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginSchema.validate(credentials, { abortEarly: false });
      const response = await login(credentials).unwrap();
       // Check user type
       const decoded = jwtDecode(response.token);
    if (decoded.person_type !== 'admin') { 
      setErrors({ general: "غير مسموح لك بالدخول للوحة التحكم" });
      return;
    }

      localStorage.setItem("token", response.token);
      navigate("/", { replace: true });
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else if (err.status === 400) {
        setErrors({ general: "من فضلك تحقق من صحة البيانات المدخلة" });
      } else if (err.status === 401) {
        setErrors({ general: "اسم المستخدم أو كلمة المرور غير صحيحة" });
      } else if (err.status === 500) {
        setErrors({ general: "حدث خطأ في السيرفر، حاول لاحقًا" });
      } else {
        setErrors({ general: "حدث خطأ غير متوقع" });
      }

      // ✅ تشغيل الاهتزاز
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* ✅ إضافة الـ CSS للـ shake */}
      <style>{shakeStyle}</style>

      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/loginBg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-800/30 to-emerald-900/30" />
      <SandStorm />

      <div className="w-full max-w-md mx-auto animate-scale-in relative z-10">
        <Card
          className={`bg-white/20 backdrop-blur-xl border border-emerald-200/30 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/25 ${shake ? "shake" : ""}`}
        >
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="جملول"
              className="w-40 h-auto mx-auto filter drop-shadow-xl mb-6"
            />
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              تسجيل الدخول
            </h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* البريد الإلكتروني */}
            <div className="relative group">
              <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-green-600" />
              <Input
                name="email"
                type="text"
                placeholder="البريد الإلكتروني"
                value={credentials.email}
                onChange={handleChange}
                className="w-full h-12 pr-12 pl-4 bg-white/95 rounded-2xl text-gray-700"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* كلمة المرور */}
            <div className="relative group">
              <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-green-600" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={credentials.password}
                onChange={handleChange}
                className="w-full h-12 pr-12 pl-12 bg-white/95 rounded-2xl text-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* رسالة خطأ عامة */}
            {errors.general && (
              <p className="text-red-500 text-center text-sm mt-2">{errors.general}</p>
            )}

            {/* زر الدخول مع Loading */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> جاري تسجيل الدخول...
                </>
              ) : (
                "دخول"
              )}
            </Button>

            {/* نسيت كلمة المرور */}
            <div className="text-center mt-6">
              <button
                type="button"
                className="text-white/90 hover:text-white text-sm font-medium hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
