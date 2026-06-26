import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ScienceIcon from '@mui/icons-material/Science';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import '../../Components/sectionOne/SectionOne.css'; // Access animated floating orbs

const RegisterTypePage = () => {
  const navigate = useNavigate();

  const registrationTypes = [
    {
      id: 'doctor_registration',
      title: 'Healthcare Provider',
      description: 'Register as a hospital or clinic to access and manage patient records',
      icon: <MedicalServicesIcon fontSize="inherit" />,
      color: 'rgba(30, 99, 243, 0.08)',
      borderColor: 'rgba(30, 99, 243, 0.25)',
      textColor: '#60a5fa',
      iconBg: '#1e63f3',
    },
    {
      id: 'lab_registration',
      title: 'Laboratory Center',
      description: 'Register your testing lab to submit laboratory results and diagnostic reports',
      icon: <ScienceIcon fontSize="inherit" />,
      color: 'rgba(16, 185, 129, 0.08)',
      borderColor: 'rgba(16, 185, 129, 0.25)',
      textColor: '#34d399',
      iconBg: '#10b981',
    },
    {
      id: 'imaging_registration',
      title: 'Imaging Center',
      description:
        'Register your imaging facility to upload radiology and diagnostic imaging studies',
      icon: <ImageOutlinedIcon fontSize="inherit" />,
      color: 'rgba(156, 39, 176, 0.08)',
      borderColor: 'rgba(156, 39, 176, 0.25)',
      textColor: '#c084fc',
      iconBg: '#9c27b0',
    },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #07192f 0%, #0c3e66 100%)',
        minHeight: '100vh',
        minWidth: '100vw',
        py: { xs: 4, md: 8 },
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Floating Orbs */}
      <div className="orb orb-1" style={{ opacity: 0.2 }}></div>
      <div className="orb orb-2" style={{ opacity: 0.2 }}></div>

      {/* Centered Logo */}
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: 120,
          bgcolor: 'white',
          p: 1.5,
          borderRadius: 3,
          mb: 4,
          boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
          zIndex: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05) rotate(-2deg)',
          }
        }}
      />

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ zIndex: 2 }} className="animate-fade-in-up">
        <Paper
          elevation={12}
          sx={{
            borderRadius: 5,
            p: { xs: 3, md: 6 },
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Back Button */}
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 'bold',
              mb: 4,
              textTransform: 'none',
              '&:hover': {
                color: '#00f2fe',
                bgcolor: 'transparent',
              }
            }}
          >
            Back
          </Button>

          <Box textAlign="center" mb={6}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                fontFamily: 'Outfit, sans-serif',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Select Your Registration Type
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: '500', color: 'rgba(255, 255, 255, 0.7)' }}>
              Please choose the type of entity you want to register as.
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            mb={6}
            justifyContent="center"
            wrap="nowrap"
            sx={{ overflowX: 'auto', pb: 2 }}
          >
            {registrationTypes.map((type) => (
              <Grid item key={type.id} xs={4} sx={{ minWidth: { xs: '280px', sm: 'auto' } }}>
                <Card
                  onClick={() => navigate(`/register/${type.id}`)}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: type.color,
                    border: `1px solid ${type.borderColor}`,
                    borderRadius: 4,
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 15px 30px rgba(0, 0, 0, 0.25)`,
                      borderColor: type.textColor,
                      background: 'rgba(255, 255, 255, 0.09)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      className="animate-float"
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: type.iconBg,
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        color: 'white',
                        mb: 3,
                        boxShadow: `0 8px 20px ${type.iconBg}40`,
                      }}
                    >
                      {type.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 2,
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '1.25rem',
                        color: '#ffffff',
                      }}
                    >
                      {type.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        fontSize: '0.9rem',
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.6,
                        height: '60px',
                      }}
                    >
                      {type.description}
                    </Typography>

                    <Button
                      endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.75rem !important' }} />}
                      sx={{
                        color: type.textColor,
                        fontWeight: 800,
                        textTransform: 'none',
                        fontSize: '0.9rem',
                        p: 0,
                        '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                      }}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Information Alert Area */}
          <Box
            sx={{
              p: 3,
              bgcolor: 'rgba(255, 253, 240, 0.05)',
              border: '1px solid rgba(255, 238, 186, 0.25)',
              borderRadius: 3,
              mb: 5,
            }}
          >
            <Box display="flex" alignItems="center" mb={1.5}>
              <WarningAmberIcon sx={{ color: '#ffb74d', mr: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: '800', color: '#ffb74d', fontFamily: 'Outfit, sans-serif' }}>
                Important Registration Information
              </Typography>
            </Box>
            <Box
              component="ul"
              sx={{
                pl: 3,
                m: 0,
                '& li': { mb: 1, fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)' },
              }}
            >
              <li>All entities must provide valid accreditation or registration documents</li>
              <li>Registration requests are reviewed and verified by authorized personnel</li>
              <li>Email verification (OTP) is required during the registration process</li>
              <li>You will receive notification of approval or rejection via email</li>
              <li>Patient self-registration is not permitted on this platform</li>
            </Box>
          </Box>

          <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Switch to Login */}
          <Box textAlign="center">
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Already have an account?{' '}
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  fontWeight: 800,
                  textTransform: 'none',
                  p: 0,
                  minWidth: 'auto',
                  ml: 0.5,
                  color: '#00f2fe',
                  '&:hover': {
                    bgcolor: 'transparent',
                    textDecoration: 'underline',
                  }
                }}
              >
                Sign in here
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterTypePage;
