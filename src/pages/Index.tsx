import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Stethoscope, Calendar, Pill, Phone, MapPin, Shield, Star } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const features = [
    {
      icon: Calendar,
      title: "Doctor Appointments",
      description: "Book online & offline appointments with nearby doctors and hospitals"
    },
    {
      icon: Pill,
      title: "Medicine Delivery",
      description: "Affordable medicine delivery from local pharmacies & generic suppliers"
    },
    {
      icon: Stethoscope,
      title: "AI Health Assistant",
      description: "AI-powered symptom checker & medical guidance in regional languages"
    },
    {
      icon: MapPin,
      title: "Mobile Clinics",
      description: "Track and book mobile clinics visiting rural areas based on demand"
    },
    {
      icon: Phone,
      title: "Emergency Help",
      description: "24/7 emergency medical assistance and ambulance services"
    },
    {
      icon: Shield,
      title: "Secure Records",
      description: "HIPAA compliant storage of medical history and prescriptions"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <Stethoscope className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">HealthCare+</h1>
            </div>
            <Button onClick={() => navigate('/auth')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Healthcare for Everyone, Everywhere
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive healthcare platform designed specifically for Tier 2, Tier 3, and rural communities. 
            Access quality medical care, affordable medicines, and AI-powered health guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')} className="text-lg px-8 py-3">
              <Stethoscope className="h-5 w-5 mr-2" />
              Start Your Health Journey
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')} className="text-lg px-8 py-3">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Help
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Complete Healthcare Solutions</h3>
            <p className="text-lg text-muted-foreground">Everything you need for better health in one platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Registered Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Partner Pharmacies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted by Communities</h3>
            <p className="text-lg text-muted-foreground">See what our users say about HealthCare+</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, healthcare that understands rural needs. The medicine delivery saved us a 3-hour trip to the city."
                </p>
                <p className="font-semibold">- Priya S., Rural Madhya Pradesh</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The AI health checker helped me understand my symptoms before visiting the doctor. Very helpful!"
                </p>
                <p className="font-semibold">- Rajesh K., Tier 3 City</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h3>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who trust HealthCare+ for their medical needs
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate('/auth')} className="text-lg px-8 py-3">
            <Heart className="h-5 w-5 mr-2" />
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">HealthCare+</span>
            </div>
            <p className="text-muted-foreground">
              Making quality healthcare accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
