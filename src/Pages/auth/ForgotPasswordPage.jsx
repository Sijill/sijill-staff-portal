import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import AuthLayout from '../../Components/AuthLayout';
import { initiatePasswordReset } from '../../api/authApi';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setIsSubmitting(true);

    try {
      const result = await initiatePasswordReset(email);
      setSubmitted(true);

      const query = createSearchParams({
        flow: 'password-reset',
        sessionId: result.resetSessionId,
        email: result.otpDelivery || email,
      }).toString();

      navigate(`/otp-verification?${query}`);
    } catch (error) {
      setApiError(error?.payload?.message || error.message || 'Failed to start password reset.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout showBackButton={true}>
      <div className="mb-4 text-center">
        <h4 className="fw-bold mb-2 text-white">Forgot Password</h4>
        <p className="text-white-50 small mb-0">
          Enter your email and we will send you instructions to reset your password.
        </p>
      </div>

      {submitted && (
        <Alert variant="success" className="small border-0 text-white" style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          If an account exists for <strong>{email}</strong>, a reset link has been sent.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {apiError ? (
          <Alert variant="danger" className="small border-0 text-white" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
            {apiError}
          </Alert>
        ) : null}

        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-white-50">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="admin@ehr.com"
            className="custom-auth-input py-2 border-0 shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 py-2.5 fw-bold shadow-sm mb-3 custom-primary-btn btn-shine-effect"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </Form>

      <div className="text-center mt-3">
        <Link to="/login" className="text-decoration-none fw-bold small text-info">
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
