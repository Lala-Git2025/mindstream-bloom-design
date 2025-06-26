import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Users, Plus, TrendingUp, Calendar, Star, Sparkles, Timer, Book, MessageCircle, LogOut } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const [currentMood, setCurrentMood] = useState(7);
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Mock data for charts
  const moodData = [
    { day: 'Mon', mood: 6, energy: 7 },
    { day: 'Tue', mood: 7, energy: 6 },
    { day: 'Wed', mood: 5, energy: 5 },
    { day: 'Thu', mood: 8, energy: 8 },
    { day: 'Fri', mood: 9, energy: 9 },
    { day: 'Sat', mood: 8, energy: 7 },
    { day: 'Sun', mood: 7, energy: 8 },
  ];

  const aiSuggestions = [
    {
      title: "Morning Meditation",
      description: "Start your day with a 10-minute mindfulness session",
      type: "meditation",
      duration: "10 min",
      icon: Brain,
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Gratitude Journal",
      description: "Reflect on three things you're grateful for today",
      type: "journaling",
      duration: "5 min",
      icon: Heart,
      color: "from-emerald-400 to-cyan-400"
    },
    {
      title: "Breathing Exercise",
      description: "Box breathing technique for stress relief",
      type: "breathing",
      duration: "7 min",
      icon: Timer,
      color: "from-indigo-400 to-purple-400"
    }
  ];

  const recentActivities = [
    { activity: "Completed morning meditation", time: "2 hours ago", type: "meditation" },
    { activity: "Logged mood entry", time: "4 hours ago", type: "mood" },
    { activity: "Shared in community", time: "1 day ago", type: "community" },
    { activity: "Finished breathing exercise", time: "2 days ago", type: "breathing" }
  ];

  const handleMoodLog = () => {
    // Mock mood logging animation
    setIsRecording(true);
    setTimeout(() => setIsRecording(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center wellness-gradient">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

  const displayName = profile?.full_name || profile?.username || 'Friend';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-purple-400" />
                <h1 className="text-2xl font-bold text-white">MindStream</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/20">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{initials}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-2">Good morning, {displayName}! 🌅</h2>
          <p className="text-white/70 text-lg">How are you feeling today? Let's check in with yourself.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Mood Check */}
            <Card className="glass-card border-white/20 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-400" />
                  Quick Mood Check
                </CardTitle>
                <CardDescription className="text-white/70">
                  How are you feeling right now? (1-10)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">😔 Low</span>
                    <span className="text-white/70 text-2xl">😊 High</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={currentMood}
                      onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                      className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-white/50 mt-2">
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <span key={num}>{num}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">
                      {currentMood >= 8 ? '😊' : currentMood >= 6 ? '🙂' : currentMood >= 4 ? '😐' : '😔'}
                    </div>
                    <Button 
                      onClick={handleMoodLog}
                      className={`${isRecording ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'} hover:scale-105 transition-all duration-300`}
                      disabled={isRecording}
                    >
                      {isRecording ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Recording...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Log Mood
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mood Chart */}
            <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Your Wellness Journey
                </CardTitle>
                <CardDescription className="text-white/70">
                  Track your mood and energy levels over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moodData}>
                      <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" />
                      <YAxis stroke="rgba(255,255,255,0.7)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '0.5rem',
                          color: 'white'
                        }} 
                      />
                      <Area type="monotone" dataKey="mood" stroke="#8b5cf6" fillOpacity={1} fill="url(#moodGradient)" strokeWidth={2} />
                      <Area type="monotone" dataKey="energy" stroke="#06b6d4" fillOpacity={1} fill="url(#energyGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-white/70 text-sm">Mood</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-white/70 text-sm">Energy</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  AI Recommendations
                </CardTitle>
                <CardDescription className="text-white/70">
                  Personalized activities based on your current mood and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className={`glass-card p-4 border-white/20 hover:scale-105 transition-all duration-300 bg-gradient-to-br ${suggestion.color} bg-opacity-20 hover:bg-opacity-30`}>
                        <div className="flex items-center justify-between mb-3">
                          <suggestion.icon className="w-6 h-6 text-white" />
                          <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                            {suggestion.duration}
                          </Badge>
                        </div>
                        <h4 className="text-white font-semibold mb-2">{suggestion.title}</h4>
                        <p className="text-white/80 text-sm">{suggestion.description}</p>
                        <Button 
                          className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white border-none"
                          size="sm"
                        >
                          Start Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Today's Stats */}
            <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Mindfulness Goal</span>
                    <span className="text-white">15/20 min</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Mood Entries</span>
                    <span className="text-white">3/3</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Journal Words</span>
                    <span className="text-white">150/200</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Book className="w-5 h-5 text-purple-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'meditation' ? 'bg-purple-400' :
                        activity.type === 'mood' ? 'bg-pink-400' :
                        activity.type === 'community' ? 'bg-cyan-400' : 'bg-emerald-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.activity}</p>
                        <p className="text-white/50 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Journal Entry
                </Button>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Therapy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg animate-float glow-effect"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
