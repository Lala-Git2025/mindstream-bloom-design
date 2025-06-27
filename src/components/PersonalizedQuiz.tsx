
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const PersonalizedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const questions: Question[] = [
    {
      id: 1,
      question: "How would you describe your current stress levels?",
      options: ["Very low", "Low", "Moderate", "High", "Very high"]
    },
    {
      id: 2,
      question: "How many hours of quality sleep do you typically get?",
      options: ["Less than 5 hours", "5-6 hours", "6-7 hours", "7-8 hours", "More than 8 hours"]
    },
    {
      id: 3,
      question: "How often do you practice mindfulness or meditation?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Daily"]
    },
    {
      id: 4,
      question: "What's your biggest wellness challenge right now?",
      options: ["Managing anxiety", "Improving sleep", "Building confidence", "Finding balance", "Staying motivated"]
    },
    {
      id: 5,
      question: "How would you prefer to track your wellness progress?",
      options: ["Daily journaling", "Mood tracking", "Habit building", "Goal setting", "Regular check-ins"]
    },
    {
      id: 6,
      question: "What time of day do you feel most motivated for self-care?",
      options: ["Early morning", "Mid-morning", "Afternoon", "Evening", "Night"]
    }
  ];

  const generateRecommendations = (userAnswers: string[]) => {
    const recs: string[] = [];
    
    // Stress-based recommendations
    if (userAnswers[0]?.includes("High") || userAnswers[0]?.includes("Very high")) {
      recs.push("Try deep breathing exercises for 5-10 minutes daily");
      recs.push("Consider progressive muscle relaxation before bed");
    }
    
    // Sleep-based recommendations
    if (userAnswers[1]?.includes("Less than") || userAnswers[1]?.includes("5-6")) {
      recs.push("Establish a consistent bedtime routine");
      recs.push("Create a sleep-friendly environment (cool, dark, quiet)");
    }
    
    // Mindfulness recommendations
    if (userAnswers[2]?.includes("Never") || userAnswers[2]?.includes("Rarely")) {
      recs.push("Start with 3-minute guided meditations");
      recs.push("Practice mindful breathing during daily activities");
    }
    
    // Challenge-based recommendations
    if (userAnswers[3]?.includes("anxiety")) {
      recs.push("Try grounding techniques (5-4-3-2-1 method)");
      recs.push("Keep an anxiety journal to identify triggers");
    }
    
    if (userAnswers[3]?.includes("confidence")) {
      recs.push("Practice daily positive affirmations");
      recs.push("Celebrate small wins in a gratitude journal");
    }
    
    // Tracking preferences
    if (userAnswers[4]?.includes("Habit")) {
      recs.push("Use our habit tracker to build consistent routines");
    }
    
    if (userAnswers[4]?.includes("Mood")) {
      recs.push("Log your daily mood to identify patterns");
    }
    
    // Time-based recommendations
    if (userAnswers[5]?.includes("morning")) {
      recs.push("Create a morning wellness routine");
      recs.push("Try morning meditation or journaling");
    }
    
    // Default recommendations if not enough specific ones
    while (recs.length < 4) {
      const defaults = [
        "Practice gratitude by writing down 3 things you're thankful for daily",
        "Take short mindful walks to connect with nature",
        "Set boundaries with technology for better mental health",
        "Practice self-compassion when facing challenges"
      ];
      
      for (const rec of defaults) {
        if (!recs.includes(rec) && recs.length < 4) {
          recs.push(rec);
        }
      }
    }
    
    return recs.slice(0, 4);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz(newAnswers);
    }
  };

  const completeQuiz = async (finalAnswers: string[]) => {
    if (!user) return;
    
    setLoading(true);
    const generatedRecs = generateRecommendations(finalAnswers);
    
    try {
      const { error } = await supabase
        .from('quiz_responses')
        .insert({
          user_id: user.id,
          responses: finalAnswers,
          recommendations: generatedRecs
        });

      if (error) throw error;

      setRecommendations(generatedRecs);
      setCompleted(true);
      
      toast({
        title: "Quiz Completed!",
        description: "Your personalized recommendations are ready.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save quiz results.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCompleted(false);
    setRecommendations([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p>Generating your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-white/70">Here are your personalized wellness recommendations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec, index) => (
            <Card key={index} className="glass-card border-white/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-white">{rec}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white/10"
          >
            Take Quiz Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Wellness Assessment</h2>
          <p className="text-white/70">Get personalized recommendations based on your needs</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/20">
          <Brain className="w-3 h-3 mr-1" />
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
      </div>

      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            {questions[currentQuestion].question}
          </CardTitle>
          <CardDescription className="text-white/70">
            Choose the option that best describes you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              variant="outline"
              className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10 h-12 text-left"
            >
              {option}
              <ArrowRight className="w-4 h-4" />
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PersonalizedQuiz;
