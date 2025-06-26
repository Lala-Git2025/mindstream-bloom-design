
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Mic, MicOff, Play, Pause, Timer, Sparkles, Heart, Star } from 'lucide-react';

const AITherapy = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const therapySessions = [
    {
      id: 'anxiety-relief',
      title: 'Anxiety Relief Meditation',
      description: 'Guided breathing and visualization to calm your mind',
      duration: '12 min',
      type: 'meditation',
      color: 'from-blue-400 to-cyan-400',
      icon: Brain,
      difficulty: 'Beginner'
    },
    {
      id: 'stress-management',
      title: 'Stress Management Therapy',
      description: 'CBT techniques for managing daily stress and overwhelm',
      duration: '15 min',
      type: 'therapy',
      color: 'from-purple-400 to-indigo-400',
      icon: Heart,
      difficulty: 'Intermediate'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Practice',
      description: 'Present-moment awareness and acceptance meditation',
      duration: '10 min',
      type: 'mindfulness',
      color: 'from-emerald-400 to-green-400',
      icon: Sparkles,
      difficulty: 'Beginner'
    },
    {
      id: 'sleep-therapy',
      title: 'Sleep Preparation',
      description: 'Progressive muscle relaxation for better sleep',
      duration: '20 min',
      type: 'sleep',
      color: 'from-indigo-400 to-purple-400',
      icon: Timer,
      difficulty: 'All Levels'
    }
  ];

  const currentSessionData = therapySessions.find(s => s.id === currentSession);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && currentSession) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, currentSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = (sessionId: string) => {
    setCurrentSession(sessionId);
    setIsActive(true);
    setSessionTime(0);
  };

  const toggleSession = () => {
    setIsActive(!isActive);
  };

  const endSession = () => {
    setIsActive(false);
    setCurrentSession(null);
    setSessionTime(0);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  if (currentSession) {
    return (
      <div className="space-y-6">
        {/* Active Session */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  {currentSessionData?.icon && <currentSessionData.icon className="w-5 h-5 text-cyan-400" />}
                  {currentSessionData?.title}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {currentSessionData?.description}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/20">
                {currentSessionData?.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Session Visualization */}
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto relative">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentSessionData?.color} opacity-20 animate-breathe`}></div>
                <div className={`absolute inset-4 rounded-full bg-gradient-to-r ${currentSessionData?.color} opacity-40 animate-breathe`} style={{ animationDelay: '0.5s' }}></div>
                <div className={`absolute inset-8 rounded-full bg-gradient-to-r ${currentSessionData?.color} opacity-60 animate-breathe`} style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">{formatTime(sessionTime)}</div>
                    <div className="text-white/70 text-sm">
                      {isActive ? 'Session Active' : 'Paused'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Voice Interaction */}
            <Card className="bg-black/20 border-white/10 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">AI Therapist</p>
                      <p className="text-white/60 text-sm">Speaking with you...</p>
                    </div>
                  </div>
                  <Button
                    onClick={toggleListening}
                    size="sm"
                    className={`rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <p className="text-white/90 text-sm italic">
                    "Take a deep breath in... hold for 4 seconds... now slowly release. Notice how your body feels as you let go of tension. You're doing wonderfully."
                  </p>
                </div>
                {isListening && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>Listening for your response...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Session Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={toggleSession}
                size="lg"
                className={`${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white transition-all duration-300 hover:scale-105`}
              >
                {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isActive ? 'Pause' : 'Resume'}
              </Button>
              <Button
                onClick={endSession}
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                End Session
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Session Progress */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Session Progress</p>
                <p className="text-white/60 text-sm">You're making great progress!</p>
              </div>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Therapy Header */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            AI-Powered Therapy Sessions
          </CardTitle>
          <CardDescription className="text-white/70">
            Personalized therapeutic experiences designed to help you grow and heal
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Session Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {therapySessions.map((session) => (
          <Card key={session.id} className="glass-card border-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${session.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <session.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-white/10 text-white border-white/20 mb-2">
                    {session.duration}
                  </Badge>
                  <div className="text-xs text-white/60">{session.difficulty}</div>
                </div>
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-2">{session.title}</h3>
              <p className="text-white/70 text-sm mb-4">{session.description}</p>
              
              <Button 
                onClick={() => handleStartSession(session.id)}
                className={`w-full bg-gradient-to-r ${session.color} hover:opacity-90 text-white transition-all duration-300`}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Sessions */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Sessions</CardTitle>
          <CardDescription className="text-white/70">
            Continue your healing journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Anxiety Relief</p>
                  <p className="text-white/60 text-xs">Completed 2 hours ago</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Mindfulness Practice</p>
                  <p className="text-white/60 text-xs">Completed yesterday</p>
                </div>
              </div>
              <div className="flex space-x-1">
                {[1,2,3,4].map((star) => (
                  <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
                <Star className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITherapy;
