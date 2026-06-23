import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import AuthLayout from '../../Components/AuthLayout';
import { login } from '../../api/authApi';
import { getLoginErrorMessage } from '../../utils/sessionErrorMessages';
import { useToast } from '../../context/ToastContext';

/* ===== Icons ===== */
const EyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255, 255, 255, 0.7)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255, 255, 255, 0.7)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

/* ===== Login Page ===== */
const LoginPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingId = addToast('loading', 'Signing in…', { message: 'Verifying your credentials.' });

    try {
      const response = await login(email, password);
      const query = createSearchParams({
        mode: 'login',
        loginSessionId: response.loginSessionId,
        email: response.otpDelivery || email,
      }).toString();

      addToast('info', 'OTP Sent', {
        message: `A verification code has been sent to ${response.otpDelivery || email}.`,
        duration: 4000,
      });

      navigate(`/otp-verification?${query}`);
    } catch (error) {
      addToast('error', 'Login Failed', {
        message: getLoginErrorMessage(error),
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout showBackButton={true}>
      {/* Unified Login Alert - Premium Glassmorphic Callout */}
      <div
        className="p-3 mb-4 rounded-3 d-flex align-items-start"
        style={{
          background: 'rgba(0, 242, 254, 0.06)',
          border: '1px solid rgba(0, 242, 254, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(0, 242, 254, 0.05)',
        }}
      >
        <span className="me-3 mt-1 text-info fs-5">ⓘ</span>
        <div>
          <h6 className="text-info fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
            Unified Login
          </h6>
          <p className="mb-0 text-white-50" style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
            The system will automatically identify your role (Admin, Healthcare Provider,
            Laboratory, or Imaging Center) and redirect you to your dashboard.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <Form onSubmit={handleLogin}>
        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-white-50">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="HCP@example.com"
            className="custom-auth-input py-2 border-0 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password with toggle */}
        <Form.Group className="mb-2">
          <Form.Label className="small fw-bold text-white-50">Password</Form.Label>

          <InputGroup className="shadow-sm">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="custom-auth-input py-2 border-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              variant="outline-none"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                borderLeft: '0',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderLeftWidth: 0,
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Forgot password */}
        <div className="text-end mb-4">
          <Link to="/forgot-password" className="text-decoration-none fw-bold small text-info">
            Forgot password?
          </Link>
        </div>

        {/* Submit with shine and hover transformations */}
        <Button
          variant="primary"
          type="submit"
          className="w-100 py-2.5 fw-bold shadow-sm mb-4 custom-primary-btn btn-shine-effect"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Login'}
        </Button>
      </Form>

      {/* Separator */}
      <div className="position-relative text-center mb-4">
        <hr className="border-secondary opacity-25" />
        <span className="position-absolute top-50 start-50 translate-middle px-3 text-white-50 small" style={{ background: 'transparent' }}>
          or
        </span>
      </div>

      {/* Register */}
      <div className="text-center">
        <p className="small text-white-50 mb-0">
          Don't have an account?{' '}
          <Link to="/registerType" className="text-decoration-none fw-bold text-info">
            Register here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
