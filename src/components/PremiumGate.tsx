
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Lock, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

interface PremiumGateProps {
  children: ReactNode;
  feature: string;
}

const PremiumGate = ({ children, feature }: PremiumGateProps) => {
  const { isPremium, loading } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Premium Feature</h2>
        <p className="text-white/70">Unlock {feature} with a premium subscription</p>
      </div>

      <Card className="glass-card border-yellow-500/30 max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/20 text-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              Premium Access Required
            </Badge>
          </div>
          <CardTitle className="text-white text-2xl">Upgrade to Premium</CardTitle>
          <CardDescription className="text-white/70 text-lg">
            Get access to advanced wellness features and personalized insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-white">Wellness Analytics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-white">Habit Tracker</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                <span className="text-white">Personalized Quiz</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-white">Advanced Charts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Streak Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-white">AI Recommendations</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3 text-lg"
              onClick={() => {
                // This would typically open a payment modal or redirect to subscription page
                alert('Premium subscription coming soon! This would open the payment flow.');
              }}
            >
              <Star className="w-5 h-5 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumGate;
