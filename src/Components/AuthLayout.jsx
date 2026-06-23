import React from 'react';
import { Box, Card, CardContent, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_light-removebg.png';
import '../Components/sectionOne/SectionOne.css'; // Leverage orb animations

const AuthLayout = ({ children, showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #07192f 0%, #0c3e66 100%)',
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 1, sm: 2 },
      }}
    >
      {/* Background decoration orbs */}
      <div className="orb orb-1" style={{ opacity: 0.25 }}></div>
      <div className="orb orb-2" style={{ opacity: 0.25 }}></div>

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }} className="animate-fade-in-up">
        <Card
          sx={{
            borderRadius: 5,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
            }}
          >
            {/* Back Button with hover glow */}
            {showBackButton && (
              <Button
                variant="text"
                onClick={() => navigate(-1)}
                sx={{
                  mb: 2,
                  px: 0,
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  '&:hover': {
                    color: '#00f2fe',
                    bgcolor: 'transparent',
                    textShadow: '0 0 8px rgba(0, 242, 254, 0.4)',
                  },
                }}
              >
                ← Back
              </Button>
            )}

            {/* Logo wrapper */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
              }}
            >
              <Box
                className="animate-scale-in"
                sx={{
                  width: { xs: 75, sm: 90 },
                  height: { xs: 75, sm: 90 },
                  borderRadius: '30%',
                  bgcolor: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05) rotate(2deg)',
                  }
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{
                    width: { xs: 45, sm: 55 },
                  }}
                />
              </Box>
            </Box>

            {/* Content */}
            <Box width="100%">{children}</Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AuthLayout;
