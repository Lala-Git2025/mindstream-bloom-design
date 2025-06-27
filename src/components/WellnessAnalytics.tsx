
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TrendingUp, Calendar, BarChart3, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface WellnessEntry {
  id: string;
  date: string;
  mood_score: number;
  energy_level: number;
  stress_level: number;
  sleep_hours: number;
  exercise_minutes: number;
  meditation_minutes: number;
  notes?: string;
}

const WellnessAnalytics = () => {
  const [entries, setEntries] = useState<WellnessEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState({
    mood_score: 5,
    energy_level: 5,
    stress_level: 5,
    sleep_hours: 8,
    exercise_minutes: 0,
    meditation_minutes: 0,
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchEntries = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('wellness_analytics')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(30);

    if (error) {
      console.error('Error fetching entries:', error);
    } else {
      setEntries(data || []);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('wellness_analytics')
        .upsert({
          user_id: user.id,
          date: new Date().toISOString().split('T')[0],
          ...todayEntry
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your wellness entry has been saved.",
      });

      fetchEntries();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save entry.",
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = entries.slice(0, 7).reverse().map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    mood: entry.mood_score,
    energy: entry.energy_level,
    stress: 11 - entry.stress_level, // Invert stress for better visualization
    sleep: entry.sleep_hours
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Wellness Analytics</h2>
          <p className="text-white/70">Track and analyze your daily wellness metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <span className="text-white font-medium">Premium Feature</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Entry Form */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Today's Entry
            </CardTitle>
            <CardDescription className="text-white/70">
              Log your daily wellness metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-white">Mood (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={todayEntry.mood_score}
                    onChange={(e) => setTodayEntry({...todayEntry, mood_score: parseInt(e.target.value)})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Energy (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={todayEntry.energy_level}
                    onChange={(e) => setTodayEntry({...todayEntry, energy_level: parseInt(e.target.value)})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Stress (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={todayEntry.stress_level}
                    onChange={(e) => setTodayEntry({...todayEntry, stress_level: parseInt(e.target.value)})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-white">Sleep Hours</Label>
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={todayEntry.sleep_hours}
                    onChange={(e) => setTodayEntry({...todayEntry, sleep_hours: parseFloat(e.target.value)})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Exercise (min)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={todayEntry.exercise_minutes}
                    onChange={(e) => setTodayEntry({...todayEntry, exercise_minutes: parseInt(e.target.value)})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Meditation (min)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={todayEntry.meditation_minutes}
                    onChange={(e) => setTodayEntry({...todayEntry, meditation_minutes: parseInt(e.target.value)})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">Notes (Optional)</Label>
                <Textarea
                  placeholder="How are you feeling today? Any insights or reflections..."
                  value={todayEntry.notes}
                  onChange={(e) => setTodayEntry({...todayEntry, notes: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Analytics Chart */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Weekly Trends
            </CardTitle>
            <CardDescription className="text-white/70">
              Your wellness patterns over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '0.5rem',
                      color: 'white'
                    }} 
                  />
                  <Line type="monotone" dataKey="mood" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="energy" stroke="#06b6d4" strokeWidth={2} />
                  <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
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
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-white/70 text-sm">Low Stress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessAnalytics;
