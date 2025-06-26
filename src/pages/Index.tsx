
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Brain, Users, Shield, Star, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('splash');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentPhase('welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
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
    <div className="min-h-screen wellness-gradient">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center text-white mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Brain className="w-16 h-16 text-white glow-effect" />
                <Heart className="w-8 h-8 text-pink-300 absolute -top-2 -right-2 animate-float" />
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              MindStream
            </h1>
            <p className="text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              Transform your mental wellness journey with AI-powered insights, personalized therapy, and a supportive community
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span>AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>Supportive Community</span>
              </div>
            </div>
          </div>

          {/* Auth Section */}
          <div className="max-w-4xl mx-auto animate-slide-up">
            <Card className="glass-card border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-white mb-2">Join MindStream Today</CardTitle>
                <CardDescription className="text-white/80 text-lg">
                  Start your personalized mental wellness journey in just minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md">
                    <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/20">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-white">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <Button 
                          onClick={handleGetStarted}
                          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-105"
                        >
                          Sign In <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center text-white/80 mb-4">Or continue with</div>
                        <Button 
                          onClick={handleGetStarted}
                          variant="outline" 
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Google
                        </Button>
                        <Button 
                          onClick={handleGetStarted}
                          variant="outline" 
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          Apple
                        </Button>
                        <Button 
                          onClick={handleGetStarted}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transition-all duration-300 hover:scale-105 glow-effect"
                        >
                          Continue as Guest <Sparkles className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white">Last Name</Label>
                            <Input
                              id="lastName"
                              placeholder="Doe"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signupEmail" className="text-white">Email</Label>
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signupPassword" className="text-white">Password</Label>
                          <Input
                            id="signupPassword"
                            type="password"
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        <Button 
                          onClick={handleGetStarted}
                          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white transition-all duration-300 hover:scale-105"
                        >
                          Create Account <Heart className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center text-white/80 mb-4">Quick Setup</div>
                        <div className="space-y-4">
                          <div className="glass-card p-4 border-emerald-300/20">
                            <h4 className="text-white font-semibold mb-2">🎯 Personalized Experience</h4>
                            <p className="text-white/80 text-sm">AI learns your patterns and provides tailored recommendations</p>
                          </div>
                          <div className="glass-card p-4 border-purple-300/20">
                            <h4 className="text-white font-semibold mb-2">🧠 Smart Insights</h4>
                            <p className="text-white/80 text-sm">Track mood patterns and get actionable mental health insights</p>
                          </div>
                          <div className="glass-card p-4 border-cyan-300/20">
                            <h4 className="text-white font-semibold mb-2">🤝 Community Support</h4>
                            <p className="text-white/80 text-sm">Connect with others on similar wellness journeys</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose MindStream?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 floating-element">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Therapy</h3>
              <p className="text-white/80">Get personalized therapeutic guidance with our advanced AI that understands your unique needs</p>
            </div>
            
            <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 floating-element" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Mood Tracking</h3>
              <p className="text-white/80">Visual mood tracking with intelligent insights to help you understand your emotional patterns</p>
            </div>
            
            <div className="glass-card p-8 text-center hover:scale-105 transition-all duration-300 floating-element" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Safe Community</h3>
              <p className="text-white/80">Connect with others in a moderated, supportive environment focused on mental wellness</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
