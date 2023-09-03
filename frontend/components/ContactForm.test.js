import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toBeVisible();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const contactForm = render(<ContactForm />);
    const firstName = contactForm.container.querySelector('#firstName');
    userEvent.type(firstName, 'Eddy');
    await expect(screen.getByText(/firstname must have at least 5 characters./i)).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submit = screen.getByText(/submit/i);
    userEvent.click(submit);
    await expect(screen.getByText(/firstname must have at least 5 characters./i)).toBeInTheDocument();
    await expect(screen.getByText(/lastname is a required field./i)).toBeInTheDocument();
    await expect(screen.getByText(/email must be a valid email address./i)).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const contactForm = render(<ContactForm />);
    const firstName = contactForm.container.querySelector('#firstName');
    const lastName = contactForm.container.querySelector('#lastName');
    userEvent.type(firstName, 'Sherran');
    userEvent.type(lastName, 'Ed');
    const submit = screen.getByText(/submit/i);
    userEvent.click(submit);
    await expect(screen.getByText(/email must be a valid email address./i)).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    userEvent.type(email, 'testing');
    await expect(screen.getByText(/email must be a valid email address./i)).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
