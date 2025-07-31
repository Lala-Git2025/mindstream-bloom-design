import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Heart, 
  Zap, 
  Wind, 
  Headphones,
  Timer,
  CheckCircle,
  Play
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'breathing' | 'meditation' | 'mindfulness' | 'relaxation';
  icon: any;
  color: string;
  completed?: boolean;
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Deep Breathing',
    description: 'Simple 4-7-8 breathing technique to reduce stress',
    duration: '3 min',
    type: 'breathing',
    icon: Wind,
    color: 'text-blue-600'
  },
  {
    id: '2',
    title: 'Body Scan',
    description: 'Progressive relaxation from head to toe',
    duration: '10 min',
    type: 'meditation',
    icon: Brain,
    color: 'text-purple-600'
  },
  {
    id: '3',
    title: 'Gratitude Practice',
    description: 'Reflect on three things you\'re grateful for',
    duration: '5 min',
    type: 'mindfulness',
    icon: Heart,
    color: 'text-pink-600'
  },
  {
    id: '4',
    title: 'Energy Boost',
    description: 'Quick energizing exercises and stretches',
    duration: '7 min',
    type: 'relaxation',
    icon: Zap,
    color: 'text-orange-600'
  }
];

const WellnessActivities = () => {
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const { toast } = useToast();

  const startActivity = (activity: Activity) => {
    setActiveActivity(activity.id);
    toast({
      title: `Starting ${activity.title}`,
      description: `${activity.duration} of guided ${activity.type}`,
    });

    // Simulate activity completion
    setTimeout(() => {
      setCompletedActivities(prev => new Set([...prev, activity.id]));
      setActiveActivity(null);
      toast({
        title: "Activity completed!",
        description: `Great job completing ${activity.title}. How do you feel?`,
      });
    }, 3000);
  };

  const completionPercentage = (completedActivities.size / activities.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Headphones className="h-5 w-5 text-primary" />
            Wellness Activities
          </span>
          <Badge variant="outline">
            {completedActivities.size}/{activities.length} completed
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Daily Progress</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            const isCompleted = completedActivities.has(activity.id);
            const isActive = activeActivity === activity.id;
            
            return (
              <div
                key={activity.id}
                className={`p-4 rounded-lg border transition-colors ${
                  isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : isActive 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      isCompleted ? 'bg-green-100' : 'bg-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <IconComponent className={`h-5 w-5 ${activity.color}`} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Timer className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{activity.duration}</span>
                        <Badge variant="secondary" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                    onClick={() => startActivity(activity)}
                    disabled={isActive}
                    className={isCompleted ? "text-green-600 border-green-300" : ""}
                  >
                    {isActive ? (
                      <Timer className="h-4 w-4 animate-pulse" />
                    ) : isCompleted ? (
                      "Retry"
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessActivities;