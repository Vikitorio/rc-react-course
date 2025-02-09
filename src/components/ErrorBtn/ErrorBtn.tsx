import React, { useState } from 'react';
import Button from '../Button/Button';
const ErrorBtn: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
  };
  if (isError) {
    throw new Error('Error happens!!!');
  }
  return <>{!isError && <Button onClick={handleClick}>Throw Error</Button>}</>;
};

export default ErrorBtn;
