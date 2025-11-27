import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, User, Activity, Target, Heart, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    region: '',
    foodTypes: [],
    sportsActivities: [],
    activityLevel: '',
    primaryGoals: [],
    experienceLevel: '',
    medicalConditions: '',
    preferences: '',
    motivation: '',
    timeline: ''
  });

  const steps = [
    { title: 'Personal Information', description: 'Tell us about yourself', icon: User },
    { title: 'Lifestyle & Habits', description: 'Your daily habits', icon: Activity },
    { title: 'Fitness & Health Goals', description: 'What you want to achieve', icon: Target },
    { title: 'Motivation & Timeline', description: 'Your drive and plans', icon: Heart },
    { title: 'Summary & Submit', description: 'Review and complete', icon: Check }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/accounts/onboarding/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(formData.age),
          gender: formData.gender,
          region: formData.region,
          food_types: formData.foodTypes,
          sports_activities: formData.sportsActivities,
          activity_level: formData.activityLevel,
          primary_goals: formData.primaryGoals,
          experience_level: formData.experienceLevel,
          medical_conditions: formData.medicalConditions,
          preferences: formData.preferences,
          motivation: formData.motivation,
          timeline: formData.timeline,
        }),
      });

      if (response.ok) {
        alert('Onboarding completed! Redirecting to login...');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert('Error submitting onboarding: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Onboarding submission error:', error);
      alert('An error occurred during onboarding submission. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                placeholder="City, Country"
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label>Types of Food You Regularly Eat</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Protein', 'Carbs', 'Fast Food', 'Vegetarian', 'Vegan', 'Others'].map((food) => (
                  <div key={food} className="flex items-center space-x-2">
                    <Checkbox
                      id={food}
                      checked={formData.foodTypes.includes(food)}
                      onCheckedChange={(checked) => handleCheckboxChange('foodTypes', food, checked)}
                    />
                    <Label htmlFor={food}>{food}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Types of Sports Activities</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Running', 'Swimming', 'Gym', 'Yoga', 'Cycling', 'Other'].map((sport) => (
                  <div key={sport} className="flex items-center space-x-2">
                    <Checkbox
                      id={sport}
                      checked={formData.sportsActivities.includes(sport)}
                      onCheckedChange={(checked) => handleCheckboxChange('sportsActivities', sport, checked)}
                    />
                    <Label htmlFor={sport}>{sport}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="activityLevel">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Primary Goals</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {['Weight Loss', 'Strength', 'Endurance', 'Flexibility', 'General Fitness'].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.primaryGoals.includes(goal)}
                      onCheckedChange={(checked) => handleCheckboxChange('primaryGoals', goal, checked)}
                    />
                    <Label htmlFor={goal}>{goal}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="medicalConditions">Medical Conditions / Restrictions (Optional)</Label>
              <Textarea
                id="medicalConditions"
                placeholder="Any allergies, injuries, or medical conditions..."
                value={formData.medicalConditions}
                onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="preferences">Preferences / Limitations (Optional)</Label>
              <Textarea
                id="preferences"
                placeholder="Dietary preferences, exercise limitations..."
                value={formData.preferences}
                onChange={(e) => handleInputChange('preferences', e.target.value)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="motivation">Motivation (Optional)</Label>
              <Textarea
                id="motivation"
                placeholder="Why do you want to be fit/healthy?"
                value={formData.motivation}
                onChange={(e) => handleInputChange('motivation', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="timeline">Timeline / Target</Label>
              <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short-term">Short-term (weeks)</SelectItem>
                  <SelectItem value="medium-term">Medium-term (months)</SelectItem>
                  <SelectItem value="long-term">Long-term (year+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Your Information</CardTitle>
                <CardDescription>Please review your answers before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div><strong>Age:</strong> {formData.age}</div>
                <div><strong>Gender:</strong> {formData.gender}</div>
                <div><strong>Region:</strong> {formData.region}</div>
                <div><strong>Food Types:</strong> {formData.foodTypes.join(', ')}</div>
                <div><strong>Sports Activities:</strong> {formData.sportsActivities.join(', ')}</div>
                <div><strong>Activity Level:</strong> {formData.activityLevel}</div>
                <div><strong>Primary Goals:</strong> {formData.primaryGoals.join(', ')}</div>
                <div><strong>Experience Level:</strong> {formData.experienceLevel}</div>
                <div><strong>Medical Conditions:</strong> {formData.medicalConditions}</div>
                <div><strong>Preferences:</strong> {formData.preferences}</div>
                <div><strong>Motivation:</strong> {formData.motivation}</div>
                <div><strong>Timeline:</strong> {formData.timeline}</div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to AthleteHub</h1>
            <p className="text-gray-600">Let's personalize your experience</p>
          </div>

          <div className="mb-8">
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                  <step.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs text-center">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {React.createElement(steps[currentStep].icon, { className: "w-6 h-6 mr-2" })}
                {steps[currentStep].title}
              </CardTitle>
              <CardDescription>{steps[currentStep].description}</CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit}>
                Complete Onboarding
                <Check className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={nextStep}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
