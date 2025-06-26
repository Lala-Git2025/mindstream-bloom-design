
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEnterApp = () => {
    navigate('/dashboard');
  };

  const handleTakeQuiz = () => {
    // TODO: Navigate to quiz page when implemented
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center wellness-gradient">
        <div className="text-center text-white animate-fade-in">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md animate-breathe">
              <Brain className="w-12 h-12 text-white animate-glow" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-float" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 animate-slide-up">MindStream</h1>
          <p className="text-xl opacity-90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Your journey to mental wellness begins here...
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center wellness-gradient">
      <div className="text-center text-white max-w-md mx-auto px-6 animate-fade-in">
        {/* App Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          MindStream
        </h1>

        {/* Welcome Message */}
        <p className="text-xl opacity-90 mb-12">
          Welcome back!
        </p>

        {/* Profile Section */}
        <div className="mb-8">
          <p className="text-lg text-yellow-200 mb-6">
            Complete Your Profile
          </p>
        </div>

        {/* Main Action Button */}
        <Button 
          onClick={handleEnterApp}
          className="w-full mb-4 h-14 text-lg bg-white/90 hover:bg-white text-purple-600 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          Enter App
        </Button>

        {/* Sign Out Button */}
        <Button 
          variant="outline" 
          className="w-full mb-8 h-12 bg-transparent border-white/30 text-white hover:bg-white/10 rounded-full transition-all duration-300"
        >
          Sign Out
        </Button>

        {/* Bottom Section */}
        <div className="space-y-4">
          <p className="text-white/70">
            New to wellness tracking?
          </p>
          <button 
            onClick={handleTakeQuiz}
            className="text-white/90 underline underline-offset-4 hover:text-white transition-colors duration-300"
          >
            Take our 2-minute quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
