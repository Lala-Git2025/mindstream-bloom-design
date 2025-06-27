
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Flame, Target, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Habit {
  id: string;
  name: string;
  description?: string;
  target_frequency: number;
  streak_count: number;
  last_completed_date?: string;
}

interface HabitCompletion {
  id: string;
  habit_id: string;
  completed_date: string;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [newHabit, setNewHabit] = useState({ name: '', description: '', target_frequency: 1 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchHabits = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching habits:', error);
    } else {
      setHabits(data || []);
    }
  };

  const fetchCompletions = async () => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('habit_completions')
      .select('*')
      .eq('user_id', user.id)
      .eq('completed_date', today);

    if (error) {
      console.error('Error fetching completions:', error);
    } else {
      setCompletions(data || []);
    }
  };

  useEffect(() => {
    fetchHabits();
    fetchCompletions();
  }, [user]);

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newHabit.name.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('habits')
        .insert({
          user_id: user.id,
          ...newHabit
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "New habit added successfully.",
      });

      setNewHabit({ name: '', description: '', target_frequency: 1 });
      setShowAddForm(false);
      fetchHabits();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add habit.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteHabit = async (habitId: string) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const isCompleted = completions.some(c => c.habit_id === habitId);

    try {
      if (isCompleted) {
        // Remove completion
        const { error } = await supabase
          .from('habit_completions')
          .delete()
          .eq('habit_id', habitId)
          .eq('user_id', user.id)
          .eq('completed_date', today);

        if (error) throw error;
      } else {
        // Add completion
        const { error } = await supabase
          .from('habit_completions')
          .insert({
            habit_id: habitId,
            user_id: user.id,
            completed_date: today
          });

        if (error) throw error;
      }

      fetchCompletions();
      fetchHabits();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update habit.",
      });
    }
  };

  const isHabitCompleted = (habitId: string) => {
    return completions.some(c => c.habit_id === habitId);
  };

  const getCompletionRate = () => {
    if (habits.length === 0) return 0;
    const completedToday = completions.length;
    return Math.round((completedToday / habits.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Habit Tracker</h2>
          <p className="text-white/70">Build lasting wellness habits with streak tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/20">
            <Target className="w-3 h-3 mr-1" />
            {getCompletionRate()}% Today
          </Badge>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Habit
          </Button>
        </div>
      </div>

      {/* Add Habit Form */}
      {showAddForm && (
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Add New Habit</CardTitle>
            <CardDescription className="text-white/70">
              Create a new wellness habit to track daily
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddHabit} className="space-y-4">
              <div>
                <Label className="text-white">Habit Name</Label>
                <Input
                  placeholder="e.g., Morning meditation"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
              </div>
              <div>
                <Label className="text-white">Description (Optional)</Label>
                <Input
                  placeholder="Brief description of your habit"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Label className="text-white">Target Frequency (times per day)</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newHabit.target_frequency}
                  onChange={(e) => setNewHabit({...newHabit, target_frequency: parseInt(e.target.value)})}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Habit'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Habits List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <Card key={habit.id} className="glass-card border-white/20 hover:bg-white/5 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-1">{habit.name}</h3>
                  {habit.description && (
                    <p className="text-white/70 text-sm">{habit.description}</p>
                  )}
                </div>
                <Button
                  onClick={() => handleCompleteHabit(habit.id)}
                  variant={isHabitCompleted(habit.id) ? "default" : "outline"}
                  size="sm"
                  className={`ml-4 ${
                    isHabitCompleted(habit.id)
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : 'bg-transparent border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-white/70 text-sm">{habit.streak_count} day streak</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-white/70 text-sm">{habit.target_frequency}x/day</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {habits.length === 0 && (
        <Card className="glass-card border-white/20">
          <CardContent className="p-8 text-center">
            <Target className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">No habits yet</h3>
            <p className="text-white/70 mb-4">Start building healthy habits by adding your first one!</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Habit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HabitTracker;
