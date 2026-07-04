import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import {
  resendLoginOtp,
  resendRegistrationOtp,
  verifyLoginOtp,
  verifyRegistrationOtp,
} from '../../api/authApi';
import { getPortalConfigByRole } from '../../constants/portalSessionConfig';
import { saveAuthenticatedRole } from '../../utils/authSession';
import { getAccountStatusMessage } from '../../utils/sessionErrorMessages';
import { fillTokenArray, normalizeTokenDigits } from '../../utils/tokenInput';
import '../../Components/sectionOne/SectionOne.css'; // Access animated floating orbs
import { useToast } from '../../context/ToastContext';
import logo from '../../assets/logo.svg';

const OTP_LENGTH = 6;

const OTPVerification = ({ email = 'example@email.com' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast, updateToast } = useToast();
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode') || 'registration';
  const registrationSessionId = params.get('registrationSessionId');
  const loginSessionId = params.get('loginSessionId');
  const targetEmail = params.get('email') || email;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  /* =====================
     OTP INPUT
  ====================== */
  const focusOtpInput = (index) => {
    document.getElementById(`otp-${index}`)?.focus();
  };

  const handleChange = (index, value) => {
    const digits = normalizeTokenDigits(value, OTP_LENGTH);

    if (!digits.length) {
      setOtp((current) => current.map((digit, currentIndex) => (currentIndex === index ? '' : digit)));
      return;
    }

    if (digits.length > 1) {
      const { nextValues } = fillTokenArray(otp, digits.join(''), index, OTP_LENGTH);
      setOtp(nextValues);
      if (index + digits.length < OTP_LENGTH) {
        focusOtpInput(index + digits.length);
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digits[0];
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      focusOtpInput(index + 1);
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      focusOtpInput(index - 1);
    }
  };

  const handlePaste = (index, event) => {
    event.preventDefault();

    const pastedText = event.clipboardData.getData('text');
    const { nextValues, digits } = fillTokenArray(otp, pastedText, index, OTP_LENGTH);

    if (digits.length === 0) return;

    setOtp(nextValues);

    if (index + digits.length < OTP_LENGTH) {
      focusOtpInput(index + digits.length);
    }
  };

  /* =====================
     TIMER
  ====================== */
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    setIsSubmitting(true);

    const loadingId = addToast('loading', 'Verifying OTP…', { message: 'Please wait a moment.' });

    try {
      if (mode === 'login') {
        if (!loginSessionId) throw new Error('Missing login session ID.');
        const response = await verifyLoginOtp(loginSessionId, otpCode, 'web');

        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
        }
        if (response.role) {
          saveAuthenticatedRole(response.role);
        }

        updateToast(loadingId, {
          type: 'success',
          title: 'Login Successful',
          message: response.message || 'Welcome back! Redirecting…',
          duration: 3000,
        });

        const portalConfig = getPortalConfigByRole(response.role);
        const destination =
          response.role === 'HEALTHCARE_PROVIDER'
            ? '/provider-session'
            : portalConfig?.tokenEntryPath || '/';

        setTimeout(() => navigate(destination), 800);
      } else {
        if (!registrationSessionId) throw new Error('Missing registration session ID.');
        await verifyRegistrationOtp(registrationSessionId, otpCode);

        updateToast(loadingId, {
          type: 'success',
          title: 'Email Verified',
          message: 'Registration complete! Your application is under review.',
          duration: 3000,
        });

        const regType = params.get('registrationType') || 'simple';
        const entType = params.get('entityType') || '';
        const resultQuery = createSearchParams({
          registrationType: regType,
          entityType: entType,
        }).toString();
        setTimeout(() => navigate(`/registration-submitted?${resultQuery}`), 800);
      }
    } catch (error) {
      updateToast(loadingId, {
        type: 'error',
        title: 'Verification Failed',
        message: getAccountStatusMessage(error) || error.message || 'OTP verification failed.',
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);

    const loadingId = addToast('loading', 'Resending OTP…', { message: 'Generating a new code for you.' });

    try {
      if (mode === 'login') {
        if (!loginSessionId) throw new Error('Missing login session ID.');
        await resendLoginOtp(loginSessionId);
      } else {
        if (!registrationSessionId) throw new Error('Missing registration session ID.');
        await resendRegistrationOtp(registrationSessionId);
      }

      setTimer(90);
      setCanResend(false);
      updateToast(loadingId, {
        type: 'success',
        title: 'Code Sent',
        message: 'A new OTP has been sent to your email.',
        duration: 4000,
      });
    } catch (error) {
      updateToast(loadingId, {
        type: 'error',
        title: 'Resend Failed',
        message: error.message || 'Could not resend OTP.',
        duration: 5000,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(135deg, #07192f 0%, #0c3e66 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration orbs */}
      <div className="orb orb-1" style={{ opacity: 0.22 }}></div>
      <div className="orb orb-2" style={{ opacity: 0.22 }}></div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="justify-content-center">
          <Col md={6} lg={5} className="animate-fade-in-up">
            <Card
              className="border-0 rounded-4"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Card.Body className="p-4">
                {/* Back Link */}
                <div
                  onClick={() => navigate(-1)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginBottom: 20,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#00f2fe')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.7)')}
                >
                  ← Back
                </div>

                {/* Logo wrapper */}
                <div className="text-center mb-4">
                  <div
                    className="animate-scale-in"
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: '30%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <img src={logo} alt="logo" width={50} />
                  </div>
                </div>

                {/* Title */}
                <h6 className="text-center fw-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Enter the 6-digit OTP sent to your email
                </h6>
                <div className="text-center text-info small fw-bold mb-4">{targetEmail}</div>

                {/* Label */}
                <div className="fw-medium text-white-50 small mb-2">OTP Code</div>

                {/* OTP Inputs */}
                <Row className="justify-content-center mb-4 g-2">
                  {otp.map((digit, index) => (
                    <Col xs="auto" key={index}>
                      <Form.Control
                        id={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(event) => handleOtpKeyDown(index, event)}
                        onPasteCapture={(event) => handlePaste(index, event)}
                        maxLength={1}
                        className="text-center fs-4 custom-auth-input"
                        style={{
                          width: 48,
                          height: 52,
                          fontWeight: 700,
                        }}
                      />
                    </Col>
                  ))}
                </Row>

                {/* Enter Button */}
                <Button
                  className="w-100 fw-bold mb-4 custom-primary-btn btn-shine-effect"
                  style={{ padding: '12px', fontSize: '1rem' }}
                  disabled={otp.includes('') || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Code'}
                </Button>

                {/* Resend Action */}
                <div className="text-center text-white-50 small mb-1">Did not receive the code?</div>

                <div
                  className="text-center fw-bold mb-4 small"
                  style={{
                    color: canResend ? '#00f2fe' : 'rgba(255, 255, 255, 0.4)',
                    cursor: canResend ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={handleResend}
                >
                  {isResending
                    ? 'Resending...'
                    : `Resend code ${!canResend ? `(wait ${formatTime()})` : ''}`}
                </div>

                {/* Expiry Status */}
                <div
                  className="text-center py-2.5 rounded text-white-50 small"
                  style={{ background: 'rgba(255, 255, 255, 0.04)', fontSize: 13, border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  The code will expire in 2 minutes
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OTPVerification;
