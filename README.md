# Physio Health Calculator

A comprehensive health calculator app that provides:
- BMI Calculator with visual scale and health recommendations
- Calorie Calculator with macronutrient breakdowns
- Nutrient Content Calculator powered by USDA FoodData Central

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Get a free USDA FoodData Central API key from [https://fdc.nal.usda.gov/api-key-signup.html](https://fdc.nal.usda.gov/api-key-signup.html)
   - Add your API key to `.env`:
     ```
     FDC_API_KEY=your_api_key_here
     ```

3. Run the development server:
```bash
npm run dev
```

## Features

### BMI Calculator
- Calculate BMI with visual scale
- Get personalized health recommendations
- View ideal weight range

### Calorie Calculator
- Calculate daily calorie needs
- Customize activity level and goals
- View macronutrient breakdown

### Nutrient Content Calculator
- Search any food item using USDA database
- Get detailed nutrient information per serving
- Support for various units (g, kg, ml, etc.)

## API Integration

The nutrient calculator uses the USDA FoodData Central API to provide accurate nutrition data. You'll need an API key to use this feature. Without an API key, the calculator will show an error message.
