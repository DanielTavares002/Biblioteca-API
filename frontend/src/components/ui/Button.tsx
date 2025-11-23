import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  [key: string]: any;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'contained',
  color = 'primary',
  ...props 
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      {...props}
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        ...props.sx
      }}
    >
      {children}
    </MuiButton>
  );
};