import React, { ReactNode, useState } from 'react';
import { Grid, Divider, Button } from '@mui/material';

interface CategorySelectorProps {
  label: string;
  style: any;
  children: ReactNode;
}

function CategorySelector({ label, style, children }: CategorySelectorProps) {
  const [showElements, setShowElements] = useState(false);

  const toggleElements = () => {
    setShowElements(!showElements);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleElements} style={style}>
        {label}
      </Button>

      {showElements && children}
    </div>
  );
}
export default CategorySelector;
