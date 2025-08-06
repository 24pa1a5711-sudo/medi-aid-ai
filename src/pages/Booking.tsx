import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Calendar, Clock, MapPin, Video, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    doctorName: '',
    doctorSpecialty: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'offline',
    location: '',
    symptoms: ''
  });

  const specialties = [
    'General Physician',
    'Pediatrician',
    'Cardiologist',
    'Dermatologist',
    'Orthopedist',
    'Gynecologist',
    'ENT Specialist',
    'Ophthalmologist',
    'Psychiatrist',
    'Dentist'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          doctor_name: formData.doctorName,
          doctor_specialty: formData.doctorSpecialty,
          appointment_date: formData.appointmentDate,
          appointment_time: formData.appointmentTime,
          appointment_type: formData.appointmentType,
          location: formData.location,
          symptoms: formData.symptoms
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked!",
        description: "Your appointment has been successfully scheduled."
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Book Appointment</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Schedule Your Appointment
            </CardTitle>
            <CardDescription>
              Book an appointment with qualified doctors in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Doctor Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doctorName">Doctor Name</Label>
                  <Input
                    id="doctorName"
                    placeholder="Enter doctor's name"
                    value={formData.doctorName}
                    onChange={(e) => handleInputChange('doctorName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={formData.doctorSpecialty} onValueChange={(value) => handleInputChange('doctorSpecialty', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Appointment Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => handleInputChange('appointmentDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Appointment Time</Label>
                  <Select value={formData.appointmentTime} onValueChange={(value) => handleInputChange('appointmentTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Appointment Type */}
              <div className="space-y-3">
                <Label>Appointment Type</Label>
                <RadioGroup 
                  value={formData.appointmentType} 
                  onValueChange={(value) => handleInputChange('appointmentType', value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offline" id="offline" />
                    <Label htmlFor="offline" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      In-Person Visit
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Consultation
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  {formData.appointmentType === 'online' ? 'Platform/Meeting Link' : 'Clinic/Hospital Address'}
                </Label>
                <Input
                  id="location"
                  placeholder={formData.appointmentType === 'online' ? 'Video call platform details' : 'Enter clinic address'}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms/Reason for Visit</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Describe your symptoms or reason for the appointment"
                  value={formData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Booking Appointment...
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;