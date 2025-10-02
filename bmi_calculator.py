def calculate_bmi(weight_kg, height_m):
    """Calculates BMI from weight (kg) and height (m)."""
    if height_m <= 0:
        return "Error: Height must be a positive number."
    
    bmi = weight_kg / (height_m ** 2)
    return bmi

def classify_bmi(bmi):
    """Classifies the BMI into a weight category."""
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 24.9:
        return "Normal Weight"
    elif 25 <= bmi < 29.9:
        return "Overweight"
    else:
        return "Obesity"

def main():
    """Main function to run the BMI calculator."""
    print("Welcome to the BMI Calculator!")
    
    try:
        weight_kg = float(input("Enter your weight in kilograms (kg): "))
        height_m = float(input("Enter your height in meters (m): "))
        bmi_result = calculate_bmi(weight_kg, height_m)
        
        if isinstance(bmi_result, str):
            print(bmi_result)
        else:
            category = classify_bmi(bmi_result)
            print("\n" + "="*40)
            print(f"Your BMI is: {bmi_result:.2f}")
            print(f"Classification: {category}")
            print("="*40)
            
    except ValueError:
        print("Invalid input. Please enter numbers only.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()