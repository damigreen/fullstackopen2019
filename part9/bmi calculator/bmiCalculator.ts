const bmiCalculator = (weight: number, height: number): string => {
  const heightInMeters = height / 100;
  const bmiValue = weight / heightInMeters ** 2;

  if (isNaN(Number(weight)) && isNaN(Number(height))) {
    return 'Weight and Height should be a number!';
  }

  if (bmiValue <= 18.5) {
    return 'Underweight'
  } else if ((bmiValue >= 18.5) && (bmiValue < 24.9)) {
    return 'Normal (healthy wright)'
  } else if ((bmiValue >= 25) && (bmiValue < 30)) {
    return 'Overweight';
  } else if ((bmiValue >= 30)) {
    return 'Obese'
  }
}

try {
  console.log(bmiCalculator(180, 74));
} catch(e) {
  console.log('Something was wrong', e.message);
}
