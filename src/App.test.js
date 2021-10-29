import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App />);
  // find an element with a role of button and text of Change to blue
 const colorButton = screen.getByRole('button', {name: 'Change to blue' });
  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  //Click button
  fireEvent.click(colorButton);

  //expect the background color to be blue
  expect(colorButton).toHaveStyle( { backgroundColor: 'blue' } );

  // expect the button to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to red');

});



test('initial conditions', () => {
  render(<App />);

  // check that the button stats out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' } );
  expect(colorButton).toBeEnabled();

  // check that the checbox out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});


test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' } );
  const colorButton = screen.getByRole('button', { name: 'Change to blue' } );

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);
  const checkbox = screen.getByRole('checkbox',  {name: 'Disable button' } );
  const colorButton = screen.getByRole('button',  { name: 'Change to blue' });

  //change button to blue
  fireEvent.click(colorButton);

  
  // disable button
  fireEvent.click(checkbox); 
  expect(colorButton).toHaveStyle('background-color: gray');

  //reneable button
fireEvent.click(checkbox);
expect(colorButton).toHaveStyle('background-color: blue');

});