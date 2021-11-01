import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />);
  // find an element with a role of button and text of Change to blue
 const colorButton = screen.getByRole('button', {name: 'Change to midnightblue' });
  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'mediumvioletred' });

  //Click button
  fireEvent.click(colorButton);

  //expect the background color to be blue
  expect(colorButton).toHaveStyle( { backgroundColor: 'midnightblue' } );

  // expect the button to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to mediumvioletred');

});



test('initial conditions', () => {
  render(<App />);

  // check that the button stats out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to midnightblue' } );
  expect(colorButton).toBeEnabled();

  // check that the checbox out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});


test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' } );
  const colorButton = screen.getByRole('button', { name: 'Change to midnightblue' } );

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox',  {name: 'Disable button' } );
  const colorButton = screen.getByRole('button',  { name: 'Change to midnightblue' });

  //change button to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox); 
  expect(colorButton).toHaveStyle('background-color: gray');

  //reneable button
fireEvent.click(checkbox);
expect(colorButton).toHaveStyle('background-color: midnightblue');

});

 // Use describe to group tests together

describe('spaces before camel-case capital letters', ()=> {

  test('Works for no inner capital letters', ()=> {
  expect(replaceCamelWithSpaces('Red')).toBe('Red');
  
});

test('Works for one inner capital letter', ()=> {
  expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });

  test('Works for multiple inner capital letter', ()=> {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });

});