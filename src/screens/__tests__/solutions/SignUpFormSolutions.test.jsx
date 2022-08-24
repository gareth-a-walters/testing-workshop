import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SignUpForm from '../../SignUpForm';

// Test Block 1
describe('SignUpForm initial conditions', () => {
  test('email and password fields are empty', () => {
    // render the SignUpForm component
    render(<SignUpForm />);

    // query the email input - hint: <input> = textbox
    const emailInput = screen.getByRole('textbox', { name: /email/i });

    // query the password input - hint password input is NOT a textbox
    const passwordInput = screen.getByLabelText(/password/i);

    // assert that both the inputs are empty 
    expect(emailInput.value).toBe('')
    expect(passwordInput.value).toBe('')
  })

  test('checkbox is unchecked', () => {
    // render the SignUpForm component
    render(<SignUpForm />);
    
    // query the terms and conditions checkbox
    const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to the terms and conditions/i });
  
    // assert that the checkbox is unchecked
    expect(termsCheckbox).not.toBeChecked();
  });

  test('submit button is disabled', () => {
    // render the SignUpForm component
    render(<SignUpForm />);
  
    // query the submit button
    const submitButton = screen.getByRole('button', { name: /submit/i });
  
    // assert that the submit button is disabled
    expect(submitButton).toBeDisabled();
  })
});

// Test Block 2
describe('SignUpForm functionality', () => {
  test('checkbox enables and disables the submit button', async () => {
    // invoke setup of the user event
    const user = userEvent.setup();
  
    // render the SignUpForm component
    render(<SignUpForm />);

    // query the terms and conditions checkbox
    const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to the terms and conditions/i });
  
    // query the submit button 
    const submitButton = screen.getByRole('button', { name: /submit/i });
  
    // click the checkbox
    await user.click(termsCheckbox);
  
    // assert that the button is enabled
    expect(submitButton).toBeEnabled();
  
    // click the checkbox again
    await user.click(termsCheckbox);
  
    // assert that the button is disabled
    expect(submitButton).toBeDisabled();
  });

  test('terms and conditions popover responds to hover', async () => {
    // invoke setup of the user event
    const user = userEvent.setup();
  
    // render the SignUpForm component
    render(<SignUpForm />);
  
    // query the non existant popover ... hint: it starts out not in the DOM ;)
    const nullPopover = screen.queryByText(/i promise to read all the testing documentation/i);
  
    // assert that the popover is not in the DOM
    expect(nullPopover).not.toBeInTheDocument();
  
    // query the terms and conditions popover trigger
    const termsAndConditions = screen.getByText(/terms and conditions/i);
  
    // hover over the terms and conditions popover trigger
    await user.hover(termsAndConditions);
  
    // query the existing popover ... hint: it should now be in the DOM ;)
    const popover = screen.getByText(/i promise to read all the testing documentation/i);
  
    // assert that the popover is in the DOM
    expect(popover).toBeInTheDocument();
  
    // mouse out from the terms and conditions
    await user.unhover(termsAndConditions);
  
    // assert that the popover is no longer in the DOM
    await waitFor(() => {
      expect(popover).not.toBeInTheDocument();
    });
  });
});

// Test Block 3
describe('SignUpForm validation and submission', () => {
  test('submits with valid inputs', async () => {
    // invoke setup of user event
    const user = userEvent.setup();
  
    // mock the onSubmit method
    const mockOnSubmit = jest.fn();
  
    // render the SignUpForm component with the mocked on submit method as a prop
    render(<SignUpForm onSubmit={mockOnSubmit}/>);
  
    // query the inputs. hint: <input> = textbox but not for password 
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);
  
    // query the checkbox
    const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to the terms and conditions/i });
  
    // query the submit button
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    // type in the inputs
    await user.type(emailInput, 'johnsmith@test.com');
    await user.type(passwordInput, 'password123');
  
    // check the checkbox
    await user.click(termsCheckbox);
  
    // click the submit button
    await user.click(submitButton);

    // assert that the mocked onSubmit is called 
    expect(mockOnSubmit).toBeCalled(); 
  })

  test('renders the email validation error and does not submit', async () => {
    // invoke setup of user event
    const user = userEvent.setup();

    // mock the onSubmit method
    const mockOnSubmit = jest.fn();

    // render the SignUpForm component with the mocked on submit method as a prop
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    // query all the necessary elements
    const passwordInput = screen.getByLabelText(/password/i);
    const termsCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // type in the password field
    await user.type(passwordInput, 'password123');

    // check the checkbox
    await user.click(termsCheckbox);

    // click the submit button
    await user.click(submitButton);

    // assert that the mocked onSubmit is not called
    expect(mockOnSubmit).not.toBeCalled();
  
    // assert that the email error message is shown
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
  })

  test('renders the password validation error and does not submit', async () => {
    // invoke setup of user event
    const user = userEvent.setup();

    // mock the onSubmit method
    const mockOnSubmit = jest.fn();

    // render the SignUpForm component with the mocked on submit method as a prop
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    // query all the necessary elements
    const emailInput = screen.getByLabelText(/email/i);
    const termsCheckbox = screen.getByRole('checkbox', { name: /i agree to the terms and conditions/i });
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // type in the email field
    await user.type(emailInput, 'johnsmith@test.com');

    // check the checkbox
    await user.click(termsCheckbox);

    // click the submit button
    await user.click(submitButton);

    // assert that the mocked onSubmit is not called
    expect(mockOnSubmit).not.toBeCalled();

    // assert that the password error message is shown
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()
  })
})
