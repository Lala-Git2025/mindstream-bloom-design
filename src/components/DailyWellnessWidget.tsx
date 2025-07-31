import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, RefreshCw, BookOpen, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const wellnessQuotes = [
  {
    text: "You are stronger than you think, braver than you feel, and more loved than you know.",
    category: "Self-Love",
    icon: Heart
  },
  {
    text: "Progress, not perfection. Every small step forward is a victory worth celebrating.",
    category: "Progress",
    icon: Sparkles
  },
  {
    text: "Your mental health is just as important as your physical health. Honor both.",
    category: "Awareness",
    icon: BookOpen
  },
  {
    text: "Healing is not linear. Be patient with yourself as you grow and learn.",
    category: "Healing",
    icon: Heart
  },
  {
    text: "You have survived 100% of your difficult days. You're doing better than you think.",
    category: "Resilience",
    icon: Sparkles
  }
];

const DailyWellnessWidget = () => {
  const [currentQuote, setCurrentQuote] = useState(wellnessQuotes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set a random quote on component mount
    const randomIndex = Math.floor(Math.random() * wellnessQuotes.length);
    setCurrentQuote(wellnessQuotes[randomIndex]);
  }, []);

  const refreshQuote = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wellnessQuotes.length);
      setCurrentQuote(wellnessQuotes[randomIndex]);
      setIsRefreshing(false);
      toast({
        title: "New inspiration loaded",
        description: "Take a moment to reflect on these words.",
      });
    }, 500);
  };

  const IconComponent = currentQuote.icon;

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <IconComponent className="h-5 w-5 text-purple-600" />
            Daily Wellness
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshQuote}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {currentQuote.category}
          </Badge>
          <blockquote className="text-gray-700 italic leading-relaxed">
            "{currentQuote.text}"
          </blockquote>
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast({
                title: "Reflection saved",
                description: "This inspiration has been added to your wellness journal.",
              })}
              className="text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              Save to Journal
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => toast({
                title: "Shared",
                description: "Inspiration shared with your wellness community.",
              })}
              className="text-purple-600 border-purple-300 hover:bg-purple-50"
            >
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyWellnessWidget;