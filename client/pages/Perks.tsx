import { useState, useRef, useEffect } from 'react';
import Header from "@/components/Header";
import ContactFooter from "@/components/ContactFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { User, UserCheck, Minus, Plus, Activity, Scale, Heart, TrendingUp, TrendingDown, Target } from 'lucide-react';
import ShaderBackground from "@/components/ui/ShaderBackground";

type BMIResult = {
  bmi: number;
  category: string;
  description: string;
  idealWeight: { min: number; max: number; };
};

type CalorieResult = {
  calories: number;
  bmr: number;
  goal: string;
  description: string;
  macronutrients: { protein: number; carbs: number; fat: number; };
};

export default function HealthCalculator() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bmiForm, setBmiForm] = useState({
    name: "",
    dateOfBirth: "",
    gender: "male",
    height: 172,
    weight: 70
  });
  const [bmiResult, setBmiResult] = useState<BMIResult | null>(null);
  const [showBmiResult, setShowBmiResult] = useState(false);

  const [calorieForm, setCalorieForm] = useState({
    name: "",
    age: 30,
    sex: "male",
    goal: "maintain",
    activityLevel: "moderate",
    height: 172,
    weight: 70
  });
  const [calorieResult, setCalorieResult] = useState<CalorieResult | null>(null);
  const [showCalorieResult, setShowCalorieResult] = useState(false);

  const bmiCardRef = useRef<HTMLDivElement>(null);
  const calorieCardRef = useRef<HTMLDivElement>(null);
  const nutrientCardRef = useRef<HTMLDivElement>(null);

  type NutrientPer100 = {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };

  type NutrientResult = {
    item: string;
    amountGrams: number;
    per100: NutrientPer100;
    totals: NutrientPer100;
  };

  const [nutrientForm, setNutrientForm] = useState({
    name: "",
    searchTerm: "",
    amount: 100,
    unit: "g",
  });
  const [nutrientResult, setNutrientResult] = useState<NutrientResult | null>(null);
  const [showNutrientResult, setShowNutrientResult] = useState(false);
  const [nutrientLoading, setNutrientLoading] = useState(false);
  const [nutrientError, setNutrientError] = useState<string | null>(null);

  // simple nutrient database per 100g (demo values)
 

  const convertToGrams = (amount: number, unit: string) => {
    if (unit === 'kg') return amount * 1000;
    if (unit === 'ltr' || unit === 'l' || unit === 'ml') {
      // assume density ~1g/ml for simple foods/fluids (demo)
      if (unit === 'ml') return amount; // ml -> g
      return amount * 1000; // ltr -> g
    }
    return amount; // g
  }

  const calculateNutrients = async () => {
    if (!nutrientForm.name || !nutrientForm.searchTerm) return;

    setNutrientLoading(true);
    setNutrientError(null);
    setNutrientResult(null);

    try {
      const response = await fetch(`/api/food?query=${encodeURIComponent(nutrientForm.searchTerm)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch nutrient data');
      }

      if (!data.per100) {
        setNutrientError('Could not find nutrient data for the entered item. Try a different search term (e.g. "apple", "chicken breast").');
        return;
      }

      const grams = convertToGrams(nutrientForm.amount, nutrientForm.unit);
      const factor = grams / 100;
      const per100 = data.per100;

      const totals: NutrientPer100 = {
        calories: Math.round(per100.calories * factor * 10) / 10,
        protein: Math.round(per100.protein * factor * 10) / 10,
        carbs: Math.round(per100.carbs * factor * 10) / 10,
        fat: Math.round(per100.fat * factor * 10) / 10,
        fiber: per100.fiber ? Math.round(per100.fiber * factor * 10) / 10 : undefined,
      };

      const result: NutrientResult = {
        item: data.item,
        amountGrams: grams,
        per100,
        totals,
      };

      setNutrientResult(result);

    } catch (err) {
      console.error('Failed to fetch nutrients:', err);
      setNutrientError('Failed to fetch nutrient data. Please try again.');
      return;
    } finally {
      setNutrientLoading(false);
    }

    if (nutrientCardRef.current) {
      nutrientCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowNutrientResult(true);
        if (nutrientCardRef.current) {
          nutrientCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const resetNutrient = () => {
    if (nutrientCardRef.current) {
      nutrientCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowNutrientResult(false);
        setNutrientResult(null);
        if (nutrientCardRef.current) nutrientCardRef.current.style.transform = 'rotateY(0deg)';
      }, 300);
    }
  };

  const calculateBMI = () => {
    if (!bmiForm.name || !bmiForm.dateOfBirth) return;

    const heightInMeters = bmiForm.height / 100;
    const bmi = bmiForm.weight / (heightInMeters * heightInMeters);
    
    let category = "";
    let description = "";

    // Calculate ideal weight range (BMI 18.5 - 24.9)
    const idealMin = 18.5 * (heightInMeters * heightInMeters);
    const idealMax = 24.9 * (heightInMeters * heightInMeters);

    if (bmi < 16) {
      category = "Severely Underweight";
      description = "This indicates severe underweight condition. Please consult with a healthcare professional for proper guidance and nutrition plan.";
    } else if (bmi < 18.5) {
      category = "Underweight";
      description = "Being underweight may indicate insufficient body fat and muscle mass. Focus on consuming a balanced diet with adequate calories to promote healthy weight gain.";
    } else if (bmi < 25) {
      category = "Normal Weight";
      description = "Congratulations! Your weight is within the healthy range. Maintain your current lifestyle with balanced nutrition and regular physical activity.";
    } else if (bmi < 30) {
      category = "Overweight";
      description = "Being overweight may increase your risk of health conditions. Consider incorporating regular exercise and making dietary modifications for better health.";
    } else if (bmi < 35) {
      category = "Obese Class I";
      description = "This indicates obesity which significantly increases health risks. It's recommended to consult with healthcare professionals for a comprehensive weight management plan.";
    } else if (bmi < 40) {
      category = "Obese Class II";
      description = "This indicates severe obesity. Medical supervision is strongly recommended for weight management and overall health improvement.";
    } else {
      category = "Obese Class III";
      description = "This indicates morbid obesity requiring immediate medical attention. Please consult with healthcare professionals for proper treatment and guidance.";
    }

    const result: BMIResult = {
      bmi: Math.round(bmi * 10) / 10,
      category,
      description,
      idealWeight: {
        min: Math.round(idealMin),
        max: Math.round(idealMax)
      }
    };

    setBmiResult(result);
    
    if (bmiCardRef.current) {
      bmiCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowBmiResult(true);
        if (bmiCardRef.current) {
          bmiCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const calculateCalories = () => {
    if (!calorieForm.name) return;

    const heightInCm = calorieForm.height;
    const weightInKg = calorieForm.weight;
    const age = calorieForm.age;

    // Revised Harris-Benedict Equation (more accurate)
    let bmr = 0;
    if (calorieForm.sex === "male") {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
    }

    const activityMultipliers = {
      sedentary: 1.2,      // Little to no exercise
      light: 1.375,        // Light exercise 1-3 days/week
      moderate: 1.55,      // Moderate exercise 3-5 days/week
      active: 1.725,       // Hard exercise 6-7 days/week
      very_active: 1.9     // Very hard exercise & physical job
    };

    const maintenanceCalories = Math.round(bmr * activityMultipliers[calorieForm.activityLevel as keyof typeof activityMultipliers]);

    let calories = maintenanceCalories;
    let description = "";
    let protein, carbs, fat;

    switch (calorieForm.goal) {
      case "lose":
        calories = Math.round(maintenanceCalories * 0.85); // 15% deficit
        description = "For healthy weight loss (0.5-1 kg per week), maintain a moderate calorie deficit with balanced nutrition and regular exercise.";
        // Macronutrients for weight loss: Higher protein, moderate carbs
        protein = Math.round((calories * 0.35) / 4); // 35% protein
        carbs = Math.round((calories * 0.40) / 4);   // 40% carbs
        fat = Math.round((calories * 0.25) / 9);     // 25% fat
        break;
      case "gain":
        calories = Math.round(maintenanceCalories * 1.15); // 15% surplus
        description = "For muscle gain (0.25-0.5 kg per week), ensure adequate protein intake and combine with strength training exercises.";
        // Macronutrients for muscle gain: Higher protein and carbs
        protein = Math.round((calories * 0.30) / 4); // 30% protein
        carbs = Math.round((calories * 0.50) / 4);   // 50% carbs
        fat = Math.round((calories * 0.20) / 9);     // 20% fat
        break;
      default:
        description = "Maintain your current weight with balanced nutrition, regular physical activity, and consistent eating habits.";
        // Balanced macronutrients for maintenance
        protein = Math.round((calories * 0.25) / 4); // 25% protein
        carbs = Math.round((calories * 0.50) / 4);   // 50% carbs
        fat = Math.round((calories * 0.25) / 9);     // 25% fat
    }

    const result: CalorieResult = {
      calories: calories,
      bmr: Math.round(bmr),
      goal: calorieForm.goal,
      description,
      macronutrients: {
        protein,
        carbs,
        fat
      }
    };

    setCalorieResult(result);
    
    if (calorieCardRef.current) {
      calorieCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowCalorieResult(true);
        if (calorieCardRef.current) {
          calorieCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const updateHeight = (value: number, type: 'bmi' | 'calorie') => {
    const newValue = Math.max(100, Math.min(250, value));
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, height: newValue }));
    } else {
      setCalorieForm(prev => ({ ...prev, height: newValue }));
    }
  };

  const updateWeight = (value: number, type: 'bmi' | 'calorie') => {
    const newValue = Math.max(30, Math.min(300, value));
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, weight: newValue }));
    } else {
      setCalorieForm(prev => ({ ...prev, weight: newValue }));
    }
  };

  const updateAge = (value: number) => {
    const newValue = Math.max(15, Math.min(100, value));
    setCalorieForm(prev => ({ ...prev, age: newValue }));
  };

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'bmi' | 'calorie') => {
    const value = parseInt(e.target.value) || 0;
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, height: value }));
    } else {
      setCalorieForm(prev => ({ ...prev, height: value }));
    }
  };

  const handleWeightInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'bmi' | 'calorie') => {
    const value = parseInt(e.target.value) || 0;
    if (type === 'bmi') {
      setBmiForm(prev => ({ ...prev, weight: value }));
    } else {
      setCalorieForm(prev => ({ ...prev, weight: value }));
    }
  };

  const handleAgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCalorieForm(prev => ({ ...prev, age: value }));
  };

  const handleHeightInputBlur = (type: 'bmi' | 'calorie') => {
    if (type === 'bmi') {
      updateHeight(bmiForm.height, 'bmi');
    } else {
      updateHeight(calorieForm.height, 'calorie');
    }
  };

  const handleWeightInputBlur = (type: 'bmi' | 'calorie') => {
    if (type === 'bmi') {
      updateWeight(bmiForm.weight, 'bmi');
    } else {
      updateWeight(calorieForm.weight, 'calorie');
    }
  };

  const handleAgeInputBlur = () => {
    updateAge(calorieForm.age);
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const resetBMI = () => {
    if (bmiCardRef.current) {
      bmiCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowBmiResult(false);
        setBmiResult(null);
        if (bmiCardRef.current) {
          bmiCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  const resetCalorie = () => {
    if (calorieCardRef.current) {
      calorieCardRef.current.style.transform = 'rotateY(90deg)';
      setTimeout(() => {
        setShowCalorieResult(false);
        setCalorieResult(null);
        if (calorieCardRef.current) {
          calorieCardRef.current.style.transform = 'rotateY(0deg)';
        }
      }, 300);
    }
  };

  // BMI Scale Visual Component
  const BMIScale = ({ bmi }: { bmi: number }) => {
    const getPosition = (bmi: number) => {
      if (bmi < 16) return (bmi / 16) * 20;
      if (bmi < 18.5) return 20 + ((bmi - 16) / 2.5) * 15;
      if (bmi < 25) return 35 + ((bmi - 18.5) / 6.5) * 30;
      if (bmi < 30) return 65 + ((bmi - 25) / 5) * 15;
      if (bmi < 35) return 80 + ((bmi - 30) / 5) * 10;
      if (bmi < 40) return 90 + ((bmi - 35) / 5) * 5;
      return 95 + (Math.min(bmi - 40, 10) / 10) * 5;
    };

    const position = getPosition(bmi);

    return (
      <div className="w-full mt-4">
        <div className="relative h-6 bg-gradient-to-r from-blue-400 via-green-400 to-red-500 rounded-full overflow-hidden shadow-inner">
          <div className="absolute inset-0 flex justify-between items-center px-1">
            {[16, 18.5, 25, 30, 35, 40].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-px h-2 bg-white/60"></div>
              </div>
            ))}
          </div>
          <div 
            className="absolute top-0 w-3 h-8 -ml-1.5 -mt-1 bg-white rounded-full shadow-lg border-2 border-gray-800 z-10 transition-all duration-500 ease-out"
            style={{ left: `${position}%` }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
              {bmi}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-white/80 mt-2 px-1">
          <span>Under</span>
          <span>Healthy</span>
          <span>Over</span>
          <span>Obese</span>
        </div>
      </div>
    );
  };

  // Macronutrients Pie Chart Component
  const MacroPieChart = ({ protein, carbs, fat }: { protein: number; carbs: number; fat: number }) => {
    const total = protein + carbs + fat;
    const proteinPercent = (protein / total) * 100;
    const carbsPercent = (carbs / total) * 100;
    const fatPercent = (fat / total) * 100;

    return (
      <div className="flex items-center justify-between">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-green-400" 
               style={{ clipPath: `conic-gradient(from 0deg, #10b981 0% ${proteinPercent}%, #3b82f6 ${proteinPercent}% ${proteinPercent + carbsPercent}%, #f59e0b ${proteinPercent + carbsPercent}% 100%)` }}>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white font-bold text-sm">{Math.round(proteinPercent)}%</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 ml-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded mr-2"></div>
              <span className="text-white text-sm">Protein</span>
            </div>
            <span className="text-white font-bold text-sm">{protein}g</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded mr-2"></div>
              <span className="text-white text-sm">Carbs</span>
            </div>
            <span className="text-white font-bold text-sm">{carbs}g</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded mr-2"></div>
              <span className="text-white text-sm">Fat</span>
            </div>
            <span className="text-white font-bold text-sm">{fat}g</span>
          </div>
        </div>
      </div>
    );
  };

  // Goal Icon Component
  const GoalIcon = ({ goal }: { goal: string }) => {
    switch (goal) {
      case 'lose':
        return <TrendingDown className="w-6 h-6 text-white" />;
      case 'gain':
        return <TrendingUp className="w-6 h-6 text-white" />;
      default:
        return <Target className="w-6 h-6 text-white" />;
    }
  };

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };
  const glassAccentStyle = {
    ...glassStyle,
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  return (
    <div className="min-h-screen">
      <ShaderBackground>
        <div className="relative z-10">
          <Header />
          <div className="p-4 sm:p-6 lg:p-8 pt-48 sm:pt-56">
            <style jsx>{`
              .flip-card {
                perspective: 1000px;
                transition: transform 0.6s;
              }
              input[type='number']::-webkit-outer-spin-button,
              input[type='number']::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type='number'] {
                -moz-appearance: textfield;
              }
              .progress-ring {
                transform: rotate(-90deg);
              }
            `}</style>
            
            <div className="max-w-7xl mx-auto py-20">
              <div className="text-center mb-12 sm:mb-16">
                <h2 
            
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-400"
          >
            Health Calculator
          </h2>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed px-4">
                  Calculate your Body Mass Index and daily calorie requirements with precision
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                {/* BMI Calculator Card */}
                <div ref={bmiCardRef} className="flip-card h-full">
                  {!showBmiResult ? (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full min-h-[500px] sm:min-h-[550px]" style={glassStyle}>
                      <div className="mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">BMI Calculator</h2>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Your Name</Label>
                            <Input
                              placeholder="Enter your name"
                              value={bmiForm.name}
                              onChange={(e) => setBmiForm(prev => ({ ...prev, name: e.target.value }))}
                              className="rounded-lg border-white/30 bg-white/20 text-white placeholder:text-gray-300 h-9 sm:h-10 focus:border-white focus:ring-white/20 text-sm sm:text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Date of Birth</Label>
                            <Input
                              type="date"
                              value={bmiForm.dateOfBirth}
                              onChange={(e) => setBmiForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                              className="rounded-lg border-white/30 bg-white/20 text-white h-9 sm:h-10 focus:border-white focus:ring-white/20 text-sm sm:text-base"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white font-medium text-sm sm:text-base">Gender</Label>
                          <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <Button
                              type="button"
                              variant={bmiForm.gender === "male" ? "default" : "outline"}
                              onClick={() => setBmiForm(prev => ({ ...prev, gender: "male" }))}
                              className={`flex items-center gap-1 sm:gap-2 h-9 sm:h-10 rounded-lg transition-all text-xs sm:text-sm ${
                                bmiForm.gender === "male" 
                                  ? 'bg-white text-gray-900 hover:bg-white/90' 
                                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              }`}
                            >
                              <User className="w-3 h-3 sm:w-4 sm:h-4" />
                              Male
                            </Button>
                            <Button
                              type="button"
                              variant={bmiForm.gender === "female" ? "default" : "outline"}
                              onClick={() => setBmiForm(prev => ({ ...prev, gender: "female" }))}
                              className={`flex items-center gap-1 sm:gap-2 h-9 sm:h-10 rounded-lg transition-all text-xs sm:text-sm ${
                                bmiForm.gender === "female" 
                                  ? 'bg-white text-gray-900 hover:bg-white/90' 
                                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                              }`}
                            >
                              <UserCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                              Female
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Height (cm)</Label>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateHeight(bmiForm.height - 1, 'bmi')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={bmiForm.height}
                                onChange={(e) => handleHeightInputChange(e, 'bmi')}
                                onBlur={() => handleHeightInputBlur('bmi')}
                                className="flex-1 text-center py-1 sm:py-2 px-2 sm:px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-lg sm:text-xl text-white h-9 sm:h-10 no-spinner"
                                min="100"
                                max="250"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateHeight(bmiForm.height + 1, 'bmi')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Weight (kg)</Label>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateWeight(bmiForm.weight - 1, 'bmi')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={bmiForm.weight}
                                onChange={(e) => handleWeightInputChange(e, 'bmi')}
                                onBlur={() => handleWeightInputBlur('bmi')}
                                className="flex-1 text-center py-1 sm:py-2 px-2 sm:px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-lg sm:text-xl text-white h-9 sm:h-10 no-spinner"
                                min="30"
                                max="300"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateWeight(bmiForm.weight + 1, 'bmi')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={calculateBMI}
                          className="w-full rounded-lg py-2 sm:py-3 font-bold h-9 sm:h-11 bg-white text-gray-900 hover:bg-white/90 transition-all text-sm sm:text-base"
                          disabled={!bmiForm.name || !bmiForm.dateOfBirth}
                        >
                          Calculate BMI
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full min-h-[500px] sm:min-h-[550px]" style={glassStyle}>
                      <div className="mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Scale className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">BMI Result</h2>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                        </div>
                      </div>

                      {bmiResult && (
                        <div className="space-y-3 sm:space-y-4">
                          <Card className="border-white/30" style={glassAccentStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <div className="text-center mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{bmiForm.name}</h3>
                                <div className="text-3xl sm:text-4xl font-black text-white mb-1">{bmiResult.bmi}</div>
                                <div className="text-white/90 text-sm">BMI Score</div>
                              </div>

                              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                                <div>
                                  <div className="font-bold text-base sm:text-lg text-white">{calculateAge(bmiForm.dateOfBirth)} yrs</div>
                                  <div className="text-white/80 text-xs">Age</div>
                                </div>
                                <div>
                                  <div className="font-bold text-base sm:text-lg text-white">{bmiForm.height} cm</div>
                                  <div className="text-white/80 text-xs">Height</div>
                                </div>
                                <div>
                                  <div className="font-bold text-base sm:text-lg text-white">{bmiForm.weight} kg</div>
                                  <div className="text-white/80 text-xs">Weight</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* BMI Scale Visual */}
                          <BMIScale bmi={bmiResult.bmi} />

                          <Card className="border-white/30" style={glassStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                                {bmiResult.category}
                              </h4>
                              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-3">
                                {bmiResult.description}
                              </p>
                              <div className="bg-white/10 rounded-lg p-3" style={glassAccentStyle}>
                                <h5 className="text-white font-semibold text-sm mb-2">Healthy Weight Range</h5>
                                <div className="flex justify-between items-center">
                                  <span className="text-white/80 text-sm">Ideal weight for your height:</span>
                                  <span className="text-white font-bold text-sm">{bmiResult.idealWeight.min} - {bmiResult.idealWeight.max} kg</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Button 
                            onClick={resetBMI}
                            className="w-full rounded-lg py-2 sm:py-3 font-bold h-9 sm:h-11 bg-white text-gray-900 hover:bg-white/90 transition-all text-sm sm:text-base"
                          >
                            Calculate Again
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Calorie Calculator Card */}
                <div ref={calorieCardRef} className="flip-card h-full">
                  {!showCalorieResult ? (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full min-h-[500px] sm:min-h-[550px]" style={glassStyle}>
                      <div className="mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Calorie Calculator</h2>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium text-sm sm:text-base">Your Name</Label>
                          <Input
                            placeholder="Enter your name"
                            value={calorieForm.name}
                            onChange={(e) => setCalorieForm(prev => ({ ...prev, name: e.target.value }))}
                            className="rounded-lg border-white/30 bg-white/20 text-white placeholder:text-gray-300 h-9 sm:h-10 focus:border-white focus:ring-white/20 text-sm sm:text-base"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Sex</Label>
                            <div className="grid grid-cols-2 gap-1 sm:gap-2">
                              <Button
                                type="button"
                                variant={calorieForm.sex === "male" ? "default" : "outline"}
                                onClick={() => setCalorieForm(prev => ({ ...prev, sex: "male" }))}
                                className={`flex items-center gap-1 h-9 sm:h-10 rounded-lg transition-all text-xs ${
                                  calorieForm.sex === "male" 
                                    ? 'bg-white text-gray-900 hover:bg-white/90' 
                                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                                }`}
                              >
                                <User className="w-3 h-3" />
                                Male
                              </Button>
                              <Button
                                type="button"
                                variant={calorieForm.sex === "female" ? "default" : "outline"}
                                onClick={() => setCalorieForm(prev => ({ ...prev, sex: "female" }))}
                                className={`flex items-center gap-1 h-9 sm:h-10 rounded-lg transition-all text-xs ${
                                  calorieForm.sex === "female" 
                                    ? 'bg-white text-gray-900 hover:bg-white/90' 
                                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                                }`}
                              >
                                <UserCheck className="w-3 h-3" />
                                Female
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Age</Label>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateAge(calorieForm.age - 1)}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={calorieForm.age}
                                onChange={handleAgeInputChange}
                                onBlur={handleAgeInputBlur}
                                className="flex-1 text-center py-1 sm:py-2 px-2 sm:px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-lg sm:text-xl text-white h-9 sm:h-10 no-spinner"
                                min="15"
                                max="100"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateAge(calorieForm.age + 1)}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Goal</Label>
                            <Select value={calorieForm.goal} onValueChange={(value) => setCalorieForm(prev => ({ ...prev, goal: value }))}>
                              <SelectTrigger className="rounded-lg border-white/30 bg-white/20 text-white h-9 sm:h-10 focus:border-white focus:ring-white/20 text-xs sm:text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="lose" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Lose Weight</SelectItem>
                                <SelectItem value="maintain" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Maintain Weight</SelectItem>
                                <SelectItem value="gain" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Gain Weight</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Activity Level</Label>
                            <Select value={calorieForm.activityLevel} onValueChange={(value) => setCalorieForm(prev => ({ ...prev, activityLevel: value }))}>
                              <SelectTrigger className="rounded-lg border-white/30 bg-white/20 text-white h-9 sm:h-10 focus:border-white focus:ring-white/20 text-xs sm:text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="sedentary" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Sedentary</SelectItem>
                                <SelectItem value="light" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Light Activity</SelectItem>
                                <SelectItem value="moderate" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Moderate Activity</SelectItem>
                                <SelectItem value="active" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Active</SelectItem>
                                <SelectItem value="very_active" className="text-white focus:bg-gray-700 text-xs sm:text-sm">Very Active</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Height (cm)</Label>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateHeight(calorieForm.height - 1, 'calorie')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={calorieForm.height}
                                onChange={(e) => handleHeightInputChange(e, 'calorie')}
                                onBlur={() => handleHeightInputBlur('calorie')}
                                className="flex-1 text-center py-1 sm:py-2 px-2 sm:px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-lg sm:text-xl text-white h-9 sm:h-10 no-spinner"
                                min="100"
                                max="250"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateHeight(calorieForm.height + 1, 'calorie')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Weight (kg)</Label>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateWeight(calorieForm.weight - 1, 'calorie')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={calorieForm.weight}
                                onChange={(e) => handleWeightInputChange(e, 'calorie')}
                                onBlur={() => handleWeightInputBlur('calorie')}
                                className="flex-1 text-center py-1 sm:py-2 px-2 sm:px-3 bg-white/20 border border-white/30 rounded-lg font-bold text-lg sm:text-xl text-white h-9 sm:h-10 no-spinner"
                                min="30"
                                max="300"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => updateWeight(calorieForm.weight + 1, 'calorie')}
                                className="rounded-full w-7 h-7 sm:w-8 sm:h-8 border-white/30 bg-white/20 text-white hover:bg-white/30"
                              >
                                <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={calculateCalories}
                          className="w-full rounded-lg py-2 sm:py-3 font-bold h-9 sm:h-11 bg-white text-gray-900 hover:bg-white/90 transition-all text-sm sm:text-base"
                          disabled={!calorieForm.name}
                        >
                          Calculate Calories
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full min-h-[500px] sm:min-h-[550px]" style={glassStyle}>
                      <div className="mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Calorie Result</h2>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                        </div>
                      </div>

                      {calorieResult && (
                        <div className="space-y-3 sm:space-y-4">
                          <Card className="border-white/30" style={glassAccentStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <GoalIcon goal={calorieResult.goal} />
                                    <h3 className="text-lg sm:text-xl font-bold text-white">{calorieForm.name}</h3>
                                  </div>
                                  <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">Daily Calorie Needs</p>
                                  
                                  <div className="mb-3 sm:mb-4">
                                    <div className="text-3xl sm:text-4xl font-black text-white mb-1">{calorieResult.calories}</div>
                                    <div className="text-white/80 text-xs sm:text-sm">Calories/Day</div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
                                    <div>
                                      <div className="font-bold text-base sm:text-lg text-white">{calorieForm.height} cm</div>
                                      <div className="text-white/80 text-xs">Height</div>
                                    </div>
                                    <div>
                                      <div className="font-bold text-base sm:text-lg text-white">{calorieForm.weight} kg</div>
                                      <div className="text-white/80 text-xs">Weight</div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="ml-2 sm:ml-4">
                                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Macronutrients Section */}
                          <Card className="border-white/30" style={glassStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <h4 className="text-lg sm:text-xl font-bold text-white mb-3">Macronutrients</h4>
                              <MacroPieChart 
                                protein={calorieResult.macronutrients.protein}
                                carbs={calorieResult.macronutrients.carbs}
                                fat={calorieResult.macronutrients.fat}
                              />
                            </CardContent>
                          </Card>

                          <Card className="border-white/30" style={glassStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{calorieResult.bmr}</div>
                                  <div className="text-white/80 text-xs">BMR Calories</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">
                                    {calorieForm.activityLevel.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                  </div>
                                  <div className="text-white/80 text-xs">Activity Level</div>
                                </div>
                              </div>
                              
                              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                                {calorieForm.goal.charAt(0).toUpperCase() + calorieForm.goal.slice(1)} Weight Goal
                              </h4>
                              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                                {calorieResult.description}
                              </p>
                            </CardContent>
                          </Card>

                          <Button 
                            onClick={resetCalorie}
                            className="w-full rounded-lg py-2 sm:py-3 font-bold h-9 sm:h-11 bg-white text-gray-900 hover:bg-white/90 transition-all text-sm sm:text-base"
                          >
                            Calculate Again
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Nutrient Calculator Card */}
                <div ref={nutrientCardRef} className="flip-card h-full">
                  {!showNutrientResult ? (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full min-h-[500px] sm:min-h-[550px]" style={glassStyle}>
                      <div className="mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Nutrients Calculator</h2>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white font-medium text-sm sm:text-base">Your Name</Label>
                          <Input
                            placeholder="Enter your name"
                            value={nutrientForm.name}
                            onChange={(e) => setNutrientForm(prev => ({ ...prev, name: e.target.value }))}
                            className="rounded-lg border-white/30 bg-white/20 text-white placeholder:text-gray-300 h-9 sm:h-10 focus:border-white focus:ring-white/20 text-sm sm:text-base"
                          />
                        </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Search for food</Label>
                            <Input
                              placeholder="Enter any food item (e.g. apple, chicken breast, milk)"
                              value={nutrientForm.searchTerm}
                              onChange={(e) => setNutrientForm(prev => ({ ...prev, searchTerm: e.target.value }))}
                              className="rounded-lg border-white/30 bg-white/20 text-white placeholder:text-gray-300 h-9 sm:h-10 focus:border-white focus:ring-white/20 text-sm sm:text-base"
                            />
                            {nutrientError && (
                              <p className="text-red-400 text-xs mt-1">{nutrientError}</p>
                            )}
                          </div>                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Amount</Label>
                            <Input
                              type="number"
                              value={nutrientForm.amount}
                              onChange={(e) => setNutrientForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                              className="rounded-lg border-white/30 bg-white/20 text-white h-9 sm:h-10 focus:border-white focus:ring-white/20 text-sm sm:text-base"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-white font-medium text-sm sm:text-base">Unit</Label>
                            <Select value={nutrientForm.unit} onValueChange={(value) => setNutrientForm(prev => ({ ...prev, unit: value }))}>
                              <SelectTrigger className="rounded-lg border-white/30 bg-white/20 text-white h-9 sm:h-10 focus:border-white focus:ring-white/20 text-xs sm:text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-700">
                                <SelectItem value="g" className="text-white text-xs sm:text-sm">g (grams)</SelectItem>
                                <SelectItem value="kg" className="text-white text-xs sm:text-sm">kg (kilograms)</SelectItem>
                                <SelectItem value="ml" className="text-white text-xs sm:text-sm">ml (milliliters)</SelectItem>
                                <SelectItem value="ltr" className="text-white text-xs sm:text-sm">ltr (liters)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button 
                          onClick={calculateNutrients}
                          className="w-full rounded-lg py-2 sm:py-3 font-bold h-9 sm:h-11 bg-white text-gray-900 hover:bg-white/90 transition-all text-sm sm:text-base"
                          disabled={!nutrientForm.name || !nutrientForm.searchTerm || nutrientLoading}
                        >
                          {nutrientLoading ? 'Searching...' : 'Calculate Nutrients'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl h-full min-h-[500px] sm:min-h-[550px]" style={glassStyle}>
                      <div className="mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Nutrient Result</h2>
                          <div className="w-12 sm:w-16 h-0.5 bg-white/60"></div>
                        </div>
                      </div>

                      {nutrientResult && (
                        <div className="space-y-3 sm:space-y-4">
                          <Card className="border-white/30" style={glassAccentStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <div className="text-center mb-3 sm:mb-4">
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{nutrientForm.name}</h3>
                                <div className="text-sm text-white/80">{nutrientResult.item.charAt(0).toUpperCase() + nutrientResult.item.slice(1)} • {nutrientResult.amountGrams} g</div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{nutrientResult.totals.calories}</div>
                                  <div className="text-white/80 text-xs">Calories</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-white">{nutrientResult.totals.protein} g</div>
                                  <div className="text-white/80 text-xs">Protein</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="border-white/30" style={glassStyle}>
                            <CardContent className="p-3 sm:p-4">
                              <div className="grid grid-cols-3 gap-3 text-center">
                                <div>
                                  <div className="font-bold text-base sm:text-lg text-white">{nutrientResult.totals.carbs} g</div>
                                  <div className="text-white/80 text-xs">Carbs</div>
                                </div>
                                <div>
                                  <div className="font-bold text-base sm:text-lg text-white">{nutrientResult.totals.fat} g</div>
                                  <div className="text-white/80 text-xs">Fat</div>
                                </div>
                                <div>
                                  <div className="font-bold text-base sm:text-lg text-white">{nutrientResult.totals.fiber ?? '-'} g</div>
                                  <div className="text-white/80 text-xs">Fiber</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Button 
                            onClick={resetNutrient}
                            className="w-full rounded-lg py-2 sm:py-3 font-bold h-9 sm:h-11 bg-white text-gray-900 hover:bg-white/90 transition-all text-sm sm:text-base"
                          >
                            Calculate Again
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ContactFooter />
        </div>
      </ShaderBackground>
    </div>
  );
}