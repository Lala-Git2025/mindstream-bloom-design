
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Smile, Frown, Meh, Angry, Laugh } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const moods = [
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'from-yellow-400 to-orange-400', icon: Smile },
    { id: 'excited', emoji: '🤩', label: 'Excited', color: 'from-pink-400 to-red-400', icon: Laugh },
    { id: 'calm', emoji: '😌', label: 'Calm', color: 'from-green-400 to-emerald-400', icon: Heart },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: 'from-gray-400 to-slate-400', icon: Meh },
    { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-blue-400 to-indigo-400', icon: Frown },
    { id: 'angry', emoji: '😠', label: 'Angry', color: 'from-red-400 to-rose-400', icon: Angry },
  ];

  const moodTags = [
    'work stress', 'family time', 'exercise', 'social', 'tired', 'motivated',
    'anxious', 'grateful', 'lonely', 'productive', 'creative', 'overwhelmed'
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSaveMood = () => {
    // Save mood logic here
    console.log({
      mood: selectedMood,
      intensity: moodIntensity,
      journal: journalEntry,
      tags: selectedTags,
      timestamp: new Date()
    });
  };

  return (
    <div className="space-y-6">
      {/* Mood Selection */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            How are you feeling?
          </CardTitle>
          <CardDescription className="text-white/70">
            Select your primary emotion right now
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedMood === mood.id
                    ? 'border-white/50 bg-white/10'
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${mood.color} rounded-full flex items-center justify-center text-2xl`}>
                  {mood.emoji}
                </div>
                <p className="text-white text-sm font-medium">{mood.label}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intensity Slider */}
      {selectedMood && (
        <Card className="glass-card border-white/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white">Intensity Level</CardTitle>
            <CardDescription className="text-white/70">
              How strong is this feeling? (1-10)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Mild</span>
                <span className="text-white font-bold text-xl">{moodIntensity}</span>
                <span className="text-white/70">Intense</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={moodIntensity}
                onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {moodIntensity >= 8 ? '🔥' : moodIntensity >= 6 ? '💪' : moodIntensity >= 4 ? '👍' : '💭'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      <Card className="glass-card border-white/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-white">What's influencing your mood?</CardTitle>
          <CardDescription className="text-white/70">
            Select any relevant factors (optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {moodTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Journal Entry */}
      <Card className="glass-card border-white/20 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-white">Journal Entry (Optional)</CardTitle>
          <CardDescription className="text-white/70">
            What's on your mind? Write down your thoughts...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Today I'm feeling... because..."
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px] resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-white/50 text-sm">{journalEntry.length} characters</span>
            <Button
              onClick={handleSaveMood}
              disabled={!selectedMood}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white transition-all duration-300 hover:scale-105"
            >
              Save Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
