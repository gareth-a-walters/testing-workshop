import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SignUpForm from '../../SignUpForm';

// Test Block 1
describe('SignUpForm initial conditions', () => {
  test('email and password fields are empty', () => {
    throw Error('delete this line')
    // render the SignUpForm component

    // query the email input - hint: <input> = textbox

    // query the password input - hint password input is NOT a textbox

    // assert that both the inputs are empty 

  })

  test('checkbox is unchecked', () => {
    throw Error('delete this line')
    // render the SignUpForm component
    
    // query the terms and conditions checkbox
  
    // assert that the checkbox is unchecked

  });

  test('submit button is disabled', () => {
    throw Error('delete this line')
  
    // query the submit button
  
    // assert that the submit button is disabled

  })
});

// Test Block 2
describe('SignUpForm functionality', () => {
  test('checkbox enables and disables the submit button', async () => {
    throw Error('delete this line')
    // invoke setup of the user event
  
    // render the SignUpForm component

    // query the terms and conditions checkbox
  
    // query the submit button 
  
    // click the checkbox
  
    // assert that the button is enabled
  
    // click the checkbox again
  
    // assert that the button is disabled

  });

  test('terms and conditions popover responds to hover', async () => {
    throw Error('delete this line')
    // invoke setup of the user event
  
    // render the SignUpForm component
  
    // query the non existant popover ... hint: it starts out not in the DOM ;)
  
    // assert that the popover is not in the DOM
  
    // query the terms and conditions popover trigger
  
    // hover over the terms and conditions popover trigger
  
    // query the existing popover ... hint: it should now be in the DOM ;)
  
    // assert that the popover is in the DOM
  
    // mouse out from the terms and conditions
  
    // assert that the popover is no longer in the DOM

  });
});

// Test Block 3
describe('SignUpForm validation and submission', () => {
  test('submits with valid inputs', async () => {
    throw Error('delete this line')
    // invoke setup of user event
  
    // mock the onSubmit method
  
    // render the SignUpForm component with the mocked on submit method as a prop
  
    // query the inputs. hint: <input> = textbox but not for password 
  
    // query the checkbox
  
    // query the submit button
    
    // type in the inputs
  
    // check the checkbox
  
    // click the submit button

    // assert that the mocked onSubmit is called 

  })

  test('renders the email validation error and does not submit', async () => {
    throw Error('delete this line')
    // invoke setup of user event

    // mock the onSubmit method

    // render the SignUpForm component with the mocked on submit method as a prop

    // query all the necessary elements

    // type in the password field

    // check the checkbox

    // click the submit button

    // assert that the mocked onSubmit is not called
  
    // assert that the email error message is shown

  })

  test('renders the password validation error and does not submit', async () => {
    throw Error('delete this line')
    // invoke setup of user event

    // mock the onSubmit method

    // render the SignUpForm component with the mocked on submit method as a prop

    // query all the necessary elements

    // type in the email field

    // check the checkbox

    // click the submit button

    // assert that the mocked onSubmit is not called

    // assert that the password error message is shown

  })
})
