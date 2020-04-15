import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, prettyDOM, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('the components renders the blog parameters', () => {
  test('renders the blog title and author', () => {
    const blog = {
      title: 'Testing react appllications with react-testing library',
      author: 'Dr priscilia Rose',
      likes: 4
    };

    const component = render(
      <SimpleBlog blog={blog} />
    );

    const element = component.getByText(
      'Testing react appllications with react-testing library Dr priscilia Rose'
    );
    expect(element).toBeDefined();

    const div = component.container.querySelector('.likeDiv');
    expect(div).toHaveTextContent(
      'blog had 4 likes'
    );
  });

  test('like button is pressed twice', () => {
    const blog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const mockHandler = jest.fn();

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('likes');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  });

});