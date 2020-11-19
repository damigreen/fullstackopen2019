import React from 'react';

const Total: React.FC<{ total: { name: string, exerciseCount: number }[] }> = ({ total }) => {

  const total_scores = total.reduce((acc, curr) => acc + curr.exerciseCount, 0)

  console.log(total_scores);
  return (
    <div>
      <h1>Total {total_scores}</h1>
      
    </div>
  )
}

export default Total;
