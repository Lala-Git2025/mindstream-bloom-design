
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Target, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileCompletionProps {
  onProfileCompleted: () => void;
}

const ProfileCompletion = ({ onProfileCompleted }: ProfileCompletionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const { toast } = useToast();

  const wellnessGoals = [
    'Reduce Stress',
    'Improve Sleep',
    'Build Confidence',
    'Manage Anxiety',
    'Practice Mindfulness',
    'Emotional Balance',
    'Better Focus',
    'Self-Care Routine'
  ];

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          age: age ? parseInt(age) : null,
          location,
          wellness_goals: selectedGoals,
          profile_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile Completed!",
        description: "Your wellness journey is now personalized for you.",
      });

      onProfileCompleted();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center wellness-gradient px-4">
      <Card className="w-full max-w-2xl glass-card border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-white mb-2">Complete Your Profile</CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Help us personalize your wellness experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Age (Optional)
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location (Optional)
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-white flex items-center gap-2">
                <Target className="w-4 h-4" />
                Wellness Goals (Select all that apply)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {wellnessGoals.map((goal) => (
                  <Badge
                    key={goal}
                    variant={selectedGoals.includes(goal) ? "default" : "outline"}
                    className={`cursor-pointer p-3 text-center justify-center transition-all ${
                      selectedGoals.includes(goal)
                        ? 'bg-white/90 text-purple-600 hover:bg-white'
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                    }`}
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="w-full bg-white/90 hover:bg-white text-purple-600 font-semibold h-12 text-lg"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-600 border-t-transparent" />
              ) : (
                'Complete Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletion;
