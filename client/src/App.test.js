import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';

describe('Healthcare Patient Management App - Component Tests', () => {
  
  // ========== Login Component Tests ==========
  test('1. renders login page with header', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('HealthCare Portal')).toBeInTheDocument();
  });

  test('2. displays login subtitle', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Secure access to patient management and real-time health monitoring')).toBeInTheDocument();
  });

  test('3. shows real-time vital monitoring feature', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Real-time vital monitoring')).toBeInTheDocument();
  });

  test('4. shows HIPAA compliance feature', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('HIPAA-compliant encryption')).toBeInTheDocument();
  });

  test('5. shows 24/7 emergency alerts feature', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('24/7 emergency alerts')).toBeInTheDocument();
  });

  test('6. shows comprehensive patient records feature', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Comprehensive patient records')).toBeInTheDocument();
  });

  test('7. displays Sign In heading', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('8. displays portal selection subtitle', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Choose your portal to continue')).toBeInTheDocument();
  });

  test('9. shows Patient portal button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Patient')).toBeInTheDocument();
  });

  test('10. shows Administrator portal button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Administrator')).toBeInTheDocument();
  });

  test('11. has email input field', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('12. has password input field', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('13. email field accepts input', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'doctor@hospital.com' } });
    expect(emailInput.value).toBe('doctor@hospital.com');
  });

  test('14. password field accepts input', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    expect(passwordInput.value).toBe('SecurePass123');
  });

  test('15. password field masks input', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('16. has sign in button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: /sign in as administrator/i })).toBeInTheDocument();
  });

  test('17. has homepage link', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const homeLink = screen.getByText('Homepage');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('18. has forgot password link', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const forgotLink = screen.getByText('Forgot Password?');
    expect(forgotLink).toHaveAttribute('href', '/forgot-password');
  });

  test('19. has register link', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const registerLink = screen.getByText(/don't have an account\? register/i);
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  test('20. displays security footer', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Secured by HIPAA-compliant encryption')).toBeInTheDocument();
  });

  // ========== Register Component Tests ==========
  test('21. renders register page with header', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/HealthCare/i)).toBeInTheDocument();
  });

  test('22. displays create account heading', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  test('23. displays registration subtitle', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Start monitoring patient health today')).toBeInTheDocument();
  });

  test('24. has full name input field', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  test('25. has email input field in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('26. has password input field in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
  });

  test('27. has confirm password field', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
  });

  test('28. full name field accepts input', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: 'Dr. Sarah Johnson' } });
    expect(nameInput.value).toBe('Dr. Sarah Johnson');
  });

  test('29. email field accepts input in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'sarah@hospital.com' } });
    expect(emailInput.value).toBe('sarah@hospital.com');
  });

  test('30. password field accepts input in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const passwordInput = screen.getByPlaceholderText('Create a password');
    fireEvent.change(passwordInput, { target: { value: 'MySecurePass123' } });
    expect(passwordInput.value).toBe('MySecurePass123');
  });

  test('31. confirm password field accepts input', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const confirmInput = screen.getByPlaceholderText('Confirm your password');
    fireEvent.change(confirmInput, { target: { value: 'MySecurePass123' } });
    expect(confirmInput.value).toBe('MySecurePass123');
  });

  test('32. has create account button', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  test('33. has link to login page', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const loginLink = screen.getByText(/already have an account\? sign in/i);
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  test('34. displays security footer in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Secured by HIPAA-compliant encryption')).toBeInTheDocument();
  });

  // ========== Form Validation Tests ==========
  test('35. email field is required in login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeRequired();
  });

  test('36. password field is required in login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeRequired();
  });

  test('37. full name field is required in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const nameInput = screen.getByLabelText(/full name/i);
    expect(nameInput).toBeRequired();
  });

  test('38. email field is required in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeRequired();
  });

  test('39. password field is required in register', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const passwordInput = screen.getByPlaceholderText('Create a password');
    expect(passwordInput).toBeRequired();
  });

  test('40. confirm password field is required', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    
    const confirmInput = screen.getByPlaceholderText('Confirm your password');
    expect(confirmInput).toBeRequired();
  });
});
