interface argumentValues {
  weight: number;
  height: number;
}

const parseArgument = (args: Array<string>): argumentValues => {
  if (args.length < 4) throw new Error('Please include your weight and height')
  if (args.length > 4) throw new Error('Too many arguments entered')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3]),
    }
  }

}

const bmiCalculator = (weight: number, height: number): string => {
  const heightInMeters = height / 100;
  const bmiValue = weight / heightInMeters ** 2;

  console.log(bmiValue);

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
  const { weight, height } = parseArgument(process.argv)
  console.log(bmiCalculator(weight, height));
} catch(e) {
  console.log('Something was wrong', e.message);
}
