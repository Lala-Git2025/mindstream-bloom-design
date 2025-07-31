
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Users, 
  MessageCircle,
  BarChart3,
  User,
  Home,
  Activity,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import WellnessChat from '@/components/WellnessChat';
import DailyWellnessWidget from '@/components/DailyWellnessWidget';
import WellnessActivities from '@/components/WellnessActivities';
import WellnessJourney from '@/components/WellnessJourney';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSubmittingMood, setIsSubmittingMood] = useState(false);

  const moods = [
    { emoji: '😢', label: 'Sad', value: 'sad' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😄', label: 'Excited', value: 'excited' },
    { emoji: '🤩', label: 'Amazing', value: 'amazing' },
  ];

  const progressData = [
    { label: 'Mood tracking', percentage: 75, color: 'bg-green-500' },
    { label: 'Meditation', percentage: 60, color: 'bg-purple-500' },
    { label: 'Journaling', percentage: 70, color: 'bg-orange-500' },
  ];

  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    { icon: Home, label: 'Home', value: 'home' },
    { icon: MessageCircle, label: 'Chat', value: 'chat' },
    { icon: Activity, label: 'Activities', value: 'activities' },
    { icon: Calendar, label: 'Journey', value: 'journey' },
    { icon: BarChart3, label: 'Analytics', value: 'analytics' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleMoodSubmit = async (moodValue: string) => {
    if (!user || isSubmittingMood) return;
    
    setIsSubmittingMood(true);
    try {
      const moodScore = { sad: 1, neutral: 2, happy: 3, excited: 4, amazing: 5 }[moodValue] || 3;
      
      const { error } = await supabase
        .from('wellness_analytics')
        .upsert({
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          mood_score: moodScore
        });

      if (error) throw error;

      toast({
        title: "Mood logged!",
        description: `Thanks for sharing how you're feeling today.`,
      });
      setSelectedMood(moodValue);
    } catch (error) {
      console.error('Error saving mood:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save your mood. Please try again.",
      });
    } finally {
      setIsSubmittingMood(false);
    }
  };

  const handleWellnessInsight = () => {
    toast({
      title: "Mindfulness Moment",
      description: "Take 3 deep breaths: In through your nose for 4 counts, hold for 4, out through your mouth for 6. You've got this! 🌟",
    });
  };

  const handleJournalClick = () => {
    toast({
      title: "Journal Entry",
      description: "Start writing your thoughts for today. What's on your mind?",
    });
  };

  const handleTherapyClick = () => {
    toast({
      title: "AI Therapy Session",
      description: "Welcome to your therapy session. How can I help you today?",
    });
  };

  const handleNavigation = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">MindStream</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {profile?.full_name || profile?.username || 'User'}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}, {profile?.full_name?.split(' ')[0] || profile?.username || 'there'}!
          </h2>
          <p className="text-gray-600 text-lg">Welcome to your wellness sanctuary</p>
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {navigationItems.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Daily Wellness Widget */}
            <DailyWellnessWidget />

            {/* Quick Mood Check */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Quick mood check</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center space-x-4">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => handleMoodSubmit(mood.value)}
                      disabled={isSubmittingMood}
                      className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                        selectedMood === mood.value ? 'bg-purple-50 ring-2 ring-purple-200' : ''
                      } ${isSubmittingMood ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <span className="text-sm font-medium text-gray-700">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                onClick={handleJournalClick}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Wellness Journal</h3>
                      <p className="text-gray-600">Record your thoughts and reflections</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                onClick={() => setActiveTab('chat')}
                className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-500 p-3 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">AI Wellness Coach</h3>
                      <p className="text-gray-600">Get personalized guidance and support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <WellnessChat />
          </TabsContent>

          <TabsContent value="activities">
            <WellnessActivities />
          </TabsContent>

          <TabsContent value="journey">
            <WellnessJourney />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">Wellness Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {progressData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="transform -rotate-90 w-24 h-24">
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            className="text-gray-200"
                            transform="translate(36, 36)"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray={`${item.percentage * 0.628} 62.8`}
                            className={item.color.replace('bg-', 'text-')}
                            transform="translate(36, 36)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-900">{item.percentage}%</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-700">{item.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-around items-center">
            {navigationItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavigation(item.value)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  activeTab === item.value
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
