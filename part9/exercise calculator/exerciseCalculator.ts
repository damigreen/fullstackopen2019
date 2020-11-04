interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseArgs {
  target: number;
  noOfDays: Array<number>;
}

const parseArguments = (args: Array<string>): exerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  var arr = [];
  for (var i = 0; i < args.length; i++) {
    if ((i > 2) && !isNaN(Number(args[i]))) {
      arr.push(Number(args[i]));
    }
  }

  return {
    target: Number(args[2]),
    noOfDays: arr,
  }
}

export const exerciseCalculator = (target: number, args: number[]): exerciseResult => {

  const daysTraining = function() {
    var i = 0;
    args.forEach(function(v) {
      if (v !== 0) i++;
    });
    return i;
  };
  const noOfDays = daysTraining();

  const performance = () => {

     if (noOfDays < args.length / 2) {
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


try {
  const { target, noOfDays } = parseArguments(process.argv);
  console.log(exerciseCalculator(target, noOfDays))
} catch(e) {
  console.log('Error happende', e.message);
}
