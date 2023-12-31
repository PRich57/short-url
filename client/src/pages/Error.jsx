import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Oops!</h2>
      <h3>404: Page Not Found</h3>
      <p>The page you are looking for does not exist.</p>
      <Button 
        variant='contained' 
        color='primary' 
        onClick={() =>
          navigate('/home')
        }
      >
        GO BACK
      </Button>
    </div>
  );
}

export default ErrorPage;