import React from 'react';

// interface ContentProps {
//     content: {
//       name: string;
//       exerciseCount: number;
//     }[]
// }

// const Content: React.FC<ContentProps> = (content) => {
// const Content: React.FC<{ content: { name: string, exerciseCount: number }[] }> = (props) => {
const Content: React.FC<{ content: { name: string, exerciseCount: number }[] }> = ({ content }) => {
  
  console.log(content);
  const content_values = content.map((c, i) => (
  <p key={i}>{c.name} {c.exerciseCount}</p>
  ))
  return (
    <div>
        {content_values}
    </div>
  )
}

export default Content;
