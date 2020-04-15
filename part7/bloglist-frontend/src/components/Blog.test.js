import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, prettyDOM, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  likes: 2,
  user: {
    name: 'Dr. Evel Cortex',
    username: 'Dr. Cortex',
    id: '5e56518099257a05046d1a6a'
  }
};

const user = {
  name: 'Dr. Evel Cortex',
  username: 'damigreen',
  id: '5e56518099257a05046d1a6a'
};

describe('blog test', () => {
  test('name and author are displayed by default', () => {
    const component = render(
      <Blog blog={blog} user={user} />
    );

    const div = component.container.querySelector('.blog');

    expect(div).toHaveTextContent(
      'Type wars Robert C. Martin'
    );
    expect(div).not.toHaveTextContent(
      '2'
    );

    // console.log(prettyDOM(div));

  });

  test('after expansion likes are displayed as wall', () => {

    const component = render(
      <Blog blog={blog} user={user} />
    )

    expect(component.container).not.toHaveTextContent(
      '2'
    );

    const blogPostElement = component.getByText('Type wars Robert C. Martin');
    fireEvent.click(blogPostElement);

    expect(blogPostElement).toHaveTextContent(
      '2'
    );
  })
});