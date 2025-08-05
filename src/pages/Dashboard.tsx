import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Pill, Stethoscope, Phone, User, LogOut, Activity, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule with nearby doctors",
      icon: Calendar,
      action: () => navigate('/booking'),
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Order Medicine",
      description: "Affordable medicine delivery",
      icon: Pill,
      action: () => navigate('/medicine'),
      color: "bg-green-50 text-green-600"
    },
    {
      title: "AI Health Check",
      description: "Symptom checker & guidance",
      icon: Stethoscope,
      action: () => navigate('/ai-check'),
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Emergency Help",
      description: "24/7 emergency assistance",
      icon: Phone,
      action: () => navigate('/emergency'),
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Mobile Clinics",
      description: "Find visiting clinics",
      icon: MapPin,
      action: () => navigate('/mobile-clinics'),
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Health Records",
      description: "View medical history",
      icon: Activity,
      action: () => navigate('/records'),
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">HealthCare+</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{user?.email}</span>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Your Health Dashboard</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive healthcare services designed for Tier 2, Tier 3, and rural communities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">No appointments</div>
              <p className="text-xs text-muted-foreground">Schedule your first appointment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No pending medicine orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Good</div>
              <p className="text-xs text-muted-foreground">Keep up the healthy habits</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={action.action}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle>{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest healthcare interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Start using our services to see your activity here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;