
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Heart, TrendingUp } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index page loaded - user:', user, 'loading:', loading);
    
    // If user is authenticated and not loading, redirect to dashboard
    if (!loading && user) {
      console.log('User authenticated, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-400 flex items-center justify-center">
        <div className="text-center text-white">
          <Brain className="h-16 w-16 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold mb-2">MindStream</h1>
          <p className="text-xl opacity-90">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, this shouldn't render due to redirect above
  // But add a fallback just in case
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-400 flex items-center justify-center">
        <div className="text-center text-white">
          <Brain className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">MindStream</h1>
          <p className="text-xl opacity-90 mb-4">Redirecting to dashboard...</p>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-400">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-12 w-12 text-white mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">MindStream</h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Your journey to mental wellness begins here. Track your mood, connect with AI therapy, and build healthy habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 text-lg"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center text-white">
            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
            <p className="text-white/80">Monitor your emotional well-being with intuitive mood tracking tools.</p>
          </div>
          
          <div className="text-center text-white">
            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Therapy</h3>
            <p className="text-white/80">Get personalized guidance from our AI-powered therapy sessions.</p>
          </div>
          
          <div className="text-center text-white">
            <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
            <p className="text-white/80">Visualize your mental health journey with detailed analytics.</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to start your wellness journey?</h2>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3"
          >
            Join MindStream Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
