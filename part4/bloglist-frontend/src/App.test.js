import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitForElement, prettyDOM } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('if no user logged, blogs ara not render', async () => {
    const component = render(
      <App />
    );
    component.rerender(<App />)
    // await waitForElement(() => {
    //   component.container.querySelector('.login');
    // });
    const loginForm = component.getByText('login');
    const blogs = component.container.querySelector('blogs');

    // console.log(prettyDOM(loginForm));
    expect(loginForm).toHaveTextContent('login');
    expect(blogs).not.toBeInTheDocument();
  });

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      token: '9023309',
      username: 'damigreen',
      name: 'Damilola Faseun'
    };

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    const component = render(
      <App />
    );
    component.rerender(<App />);

    // await waitForElement(() => {
    //   component.container.querySelector('create');
    // });
    const blogs = component.container.querySelector('.blogs');
    const blog = component.container.querySelector('.blog');


    expect(blogs).toBeInTheDocument();
    expect(blog).not.toBeInTheDocument(); //fix
  });
});
