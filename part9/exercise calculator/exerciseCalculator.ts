interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (args: number[], target: number): exerciseResult => {

  const daysTraining = function() {
    var i = 0;
    args.forEach(function(v) {
      if (v !== 0) i++;
    });
    return i;
  };
  const noOfDays = daysTraining();

  const performance = () => {

     if (noOfDays < 4) {
       return false;
     } else return true;
  }

  const rating = () => {
    return Math.round((noOfDays * 5) / args.length);
  }
  
  const desc = () => {
    const rate = rating();

    if (rate <= 1) {
      return 'Awfull! You need to train more'
    } else if (rate <= 3) {
      return 'Bad! you need more training'
    } else if (rate <= 5) {
      return 'not too bad but could be better'
    } else return 'Great work! Keep up the good work'
  }

  const averageTarget = () => {
    var avg = 0;
    args.forEach((v) => {
      if (v !== 0) {
        avg += v;
      }
    });
    return avg / args.length;
  }

  return {
    periodLength: args.length,
    trainingDays: daysTraining(),
    success: performance(),
    rating: rating(),
    ratingDescription: desc(),
    target: target,
    average:   averageTarget(),
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(exerciseCalculator([0, 0, 2, 4.5, 0, 0, 1], 2));