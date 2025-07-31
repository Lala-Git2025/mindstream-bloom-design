import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  Star,
  Flame
} from 'lucide-react';

const WellnessJourney = () => {
  const journeyStats = {
    currentStreak: 12,
    totalDays: 45,
    activitiesCompleted: 167,
    milestones: [
      { name: "First Week", completed: true, date: "2 weeks ago" },
      { name: "Meditation Master", completed: true, date: "1 week ago" },
      { name: "30-Day Challenge", completed: false, progress: 75 },
      { name: "Wellness Warrior", completed: false, progress: 45 }
    ]
  };

  const weeklyProgress = [
    { day: 'Mon', activities: 4, mood: 8 },
    { day: 'Tue', activities: 3, mood: 7 },
    { day: 'Wed', activities: 5, mood: 9 },
    { day: 'Thu', activities: 2, mood: 6 },
    { day: 'Fri', activities: 4, mood: 8 },
    { day: 'Sat', activities: 6, mood: 9 },
    { day: 'Sun', activities: 3, mood: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-700">{journeyStats.currentStreak}</div>
            <div className="text-sm text-orange-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-700">{journeyStats.totalDays}</div>
            <div className="text-sm text-blue-600">Total Days</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-700">{journeyStats.activitiesCompleted}</div>
            <div className="text-sm text-green-600">Activities</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {journeyStats.milestones.filter(m => m.completed).length}
            </div>
            <div className="text-sm text-purple-600">Milestones</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className="text-xs font-medium text-gray-600 mb-2">{day.day}</div>
                <div className="space-y-1">
                  <div 
                    className="w-full bg-blue-100 rounded-full h-16 flex items-end justify-center relative"
                    title={`${day.activities} activities`}
                  >
                    <div
                      className="bg-blue-500 rounded-full transition-all duration-300 w-full"
                      style={{ height: `${(day.activities / 6) * 100}%` }}
                    />
                    <span className="absolute text-xs font-medium text-blue-700 bottom-1">
                      {day.activities}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    {Array.from({ length: Math.floor(day.mood / 2) }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Wellness Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {journeyStats.milestones.map((milestone, index) => (
              <div key={milestone.name} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.completed 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {milestone.completed ? (
                    <Award className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                    {milestone.completed ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Completed {milestone.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        {milestone.progress}% complete
                      </Badge>
                    )}
                  </div>
                  {!milestone.completed && milestone.progress && (
                    <Progress value={milestone.progress} className="mt-2 h-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessJourney;