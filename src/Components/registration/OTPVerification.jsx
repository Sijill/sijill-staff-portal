import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  confirmPasswordReset,
  resendLoginOtp,
  resendPasswordResetOtp,
  resendRegistrationOtp,
  verifyLoginOtp,
  verifyRegistrationOtp,
} from "../../api/authApi";

const OTPVerification = ({ email = "example@email.com" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const flow = searchParams.get("flow") || "registration";
  const sessionId = searchParams.get("sessionId") || "";
  const platform = searchParams.get("platform") || "web";
  const otpEmail = searchParams.get("email") || email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (index, value) => {
    const digitsOnly = (value || "").replace(/\D/g, "");
    if (!digitsOnly) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const digit = digitsOnly.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (index < 5) {
      document.getElementById(`otp-${index + 2}`)?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index}`)?.focus();
    }
  };

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
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setApiError("");
    setValidationError("");
    setMessage("");

    const otpCode = otp.join("");

    if (!sessionId) {
      setValidationError("Missing OTP session. Please restart the verification flow.");
      return;
    }

    if (!/^\d{6}$/.test(otpCode)) {
      setValidationError("Please enter a valid 6-digit OTP code.");
      return;
    }

    if (flow === "password-reset" && newPassword.length < 8) {
      setValidationError("Please enter a new password with at least 8 characters.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (flow === "login") {
        const result = await verifyLoginOtp(sessionId, otpCode, platform);
        if (result?.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
        }
        navigate("/");
      } else if (flow === "password-reset") {
        await confirmPasswordReset(sessionId, otpCode, newPassword);
        navigate("/login");
      } else {
        await verifyRegistrationOtp(sessionId, otpCode);
        navigate(`/registration-submitted${location.search || ""}`);
      }
    } catch (error) {
      setApiError(error?.payload?.message || error.message || "OTP verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || !sessionId || isResending) return;

    setApiError("");
    setValidationError("");
    setMessage("");
    setIsResending(true);

    try {
      if (flow === "login") {
        await resendLoginOtp(sessionId);
      } else if (flow === "password-reset") {
        await resendPasswordResetOtp(sessionId);
      } else {
        await resendRegistrationOtp(sessionId);
      }

      setMessage("A new OTP has been sent.");
      setTimer(90);
      setCanResend(false);
    } catch (error) {
      setApiError(error?.payload?.message || error.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background:
          "radial-gradient(circle at top, #f4f7fb 0%, #eaf0f8 40%, #e6edf6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <div
                  onClick={() => navigate(-1)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    color: "#475569",
                    marginBottom: 20
                  }}
                >
                  Back
                </div>

                <div className="text-center mb-4">
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto"
                    }}
                  >
                    <img
                      src="/src/assets/logo_light-removebg.png"
                      alt="logo"
                      width={60}
                    />
                  </div>
                </div>

                <h6 className="text-center fw-semibold text-secondary mb-3">
                  Enter the 6-digit OTP sent to {otpEmail}
                </h6>

                {apiError ? (
                  <div className="alert alert-danger small py-2" role="alert">
                    {apiError}
                  </div>
                ) : null}

                {validationError ? (
                  <div className="alert alert-warning small py-2" role="alert">
                    {validationError}
                  </div>
                ) : null}

                {message ? (
                  <div className="alert alert-success small py-2" role="alert">
                    {message}
                  </div>
                ) : null}

                <div className="fw-medium text-muted mb-2">OTP Code</div>

                <Row className="justify-content-center mb-3">
                  {otp.map((digit, index) => (
                    <Col xs="auto" key={index}>
                      <Form.Control
                        id={`otp-${index + 1}`}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        maxLength={1}
                        className="text-center fs-4"
                        style={{
                          width: 55,
                          height: 55,
                          borderRadius: 10
                        }}
                      />
                    </Col>
                  ))}
                </Row>

                {flow === "password-reset" ? (
                  <>
                    <div className="fw-medium text-muted mb-2">New Password</div>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="mb-3"
                    />
                  </>
                ) : null}

                <Button
                  className="w-100 fw-semibold mb-3"
                  style={{ padding: "12px" }}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Verifying..." : "Enter"}
                </Button>

                <div className="text-center text-secondary mb-1">
                  Didn't receive the code?
                </div>

                <div
                  className="text-center fw-medium mb-3"
                  style={{
                    color: canResend ? "#2563eb" : "#94a3b8",
                    cursor: canResend ? "pointer" : "default"
                  }}
                  onClick={handleResend}
                >
                  {isResending
                    ? "Resending..."
                    : `Resend code ${!canResend ? `(wait ${formatTime()})` : ""}`}
                </div>

                <div
                  className="text-center py-2 rounded"
                  style={{ background: "#f1f5f9", fontSize: 13 }}
                >
                  The code will expire in 5 minutes
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
