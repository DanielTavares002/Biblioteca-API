import React from 'react';
import { Card as MuiCard, Box } from '@mui/material';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  [key: string]: any;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  hover = false,
  ...props 
}) => {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': hover ? {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
        } : {},
        ...props.sx
      }}
    >
      <Box sx={{ p: 3 }}>
        {children}
      </Box>
    </MuiCard>
  );
};