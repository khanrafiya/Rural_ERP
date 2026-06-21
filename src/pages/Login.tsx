import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Users, BookOpen, User, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const roles = [
  { value: 'admin', label: 'Admin', icon: Shield },
  { value: 'principal', label: 'Principal', icon: GraduationCap },
  { value: 'teacher', label: 'Teacher', icon: BookOpen },
  { value: 'student', label: 'Student', icon: User },
  { value: 'parent', label: 'Parent', icon: Users },
];

const floatingIcons = [
  { icon: '📚', x: 10, y: 20, delay: 0 },
  { icon: '🎓', x: 85, y: 15, delay: 0.5 },
  { icon: '✏️', x: 75, y: 70, delay: 1 },
  { icon: '🔬', x: 15, y: 75, delay: 1.5 },
  { icon: '🏫', x: 50, y: 5, delay: 2 },
  { icon: '📐', x: 90, y: 45, delay: 0.8 },
  { icon: '🌟', x: 5, y: 50, delay: 1.2 },
  { icon: '📝', x: 60, y: 85, delay: 0.3 },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !credentials.username || !credentials.password) {
      toast({
        title: "Login Failed",
        description: "Please fill in all fields and select a role.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('username', credentials.username);
      toast({
        title: "Login Successful",
        description: `Welcome to GrowLead ERP, ${credentials.username}!`,
      });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
      }}>

      {/* Animated background blobs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        animation: 'blob 7s infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        animation: 'blob 9s infinite 2s',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '60%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.06)',
        animation: 'blob 11s infinite 4s',
      }} />

      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${item.x}%`,
          top: `${item.y}%`,
          fontSize: '2rem',
          animation: `floatIcon 4s ease-in-out infinite`,
          animationDelay: `${item.delay}s`,
          opacity: 0.6,
          userSelect: 'none',
        }}>
          {item.icon}
        </div>
      ))}

      {/* CSS Animations */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .login-card {
          animation: fadeSlideUp 0.8s ease forwards;
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.95) !important;
          border: 1px solid rgba(255,255,255,0.5) !important;
          box-shadow: 0 25px 50px rgba(0,0,0,0.3) !important;
        }
        .logo-3d {
          animation: spin3d 3s ease-in-out infinite;
          transform-style: preserve-3d;
        }
        .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          border: 3px solid rgba(102, 126, 234, 0.6);
          animation: pulse-ring 2s ease-out infinite;
        }
        .login-btn {
          background: linear-gradient(135deg, #667eea, #764ba2) !important;
          transition: all 0.3s ease !important;
          position: relative;
          overflow: hidden;
        }
        .login-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 30px rgba(102,126,234,0.5) !important;
        }
        .login-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: rgba(255,255,255,0.1);
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.5s ease;
        }
        .login-btn:hover::after {
          transform: rotate(45deg) translateX(100%);
        }
        .input-field:focus {
          border-color: #667eea !important;
          box-shadow: 0 0 0 3px rgba(102,126,234,0.2) !important;
        }
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin3d 0.8s linear infinite;
          display: inline-block;
          margin-right: 8px;
        }
      `}</style>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-6" style={{ animation: 'fadeSlideUp 0.6s ease forwards' }}>
          {/* 3D Logo */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="pulse-ring" />
            <div className="pulse-ring" style={{ animationDelay: '0.5s' }} />
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-2xl logo-3d"
              style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-1" style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            letterSpacing: '-0.5px'
          }}>
            GrowLead ERP
          </h1>
          <p className="text-white/90 text-sm font-medium">
            Education Management System
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-8 h-0.5 bg-white/50 rounded" />
            <p className="text-white/75 text-xs">Empowering Education</p>
            <span className="w-8 h-0.5 bg-white/50 rounded" />
          </div>
        </div>

        {/* Login Card */}
        <Card className="login-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl text-center font-bold"
              style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Login to System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Select Your Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="input-field border-2 transition-all duration-300">
                    <SelectValue placeholder="Choose your role..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <role.icon className="w-4 h-4" />
                          {role.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="input-field border-2 transition-all duration-300"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input-field border-2 transition-all duration-300"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full login-btn text-white font-bold py-3 rounded-xl text-base"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner" />
                    Logging in...
                  </>
                ) : (
                  '🚀 Login to Dashboard'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 rounded-xl border-2 border-dashed"
              style={{ borderColor: '#667eea', background: 'rgba(102,126,234,0.05)' }}>
              <h4 className="font-bold text-xs mb-1" style={{ color: '#667eea' }}>
                🔑 Demo Credentials
              </h4>
              <div className="text-xs text-gray-500 space-y-0.5">
                <p>Username: <span className="font-semibold text-gray-700">demo</span> | Password: <span className="font-semibold text-gray-700">demo123</span></p>
                <p>Works with any role selection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-4">
          © 2025 GrowLead ERP • All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;