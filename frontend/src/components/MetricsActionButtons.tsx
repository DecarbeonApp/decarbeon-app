'use client';

import { useRouter } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

interface MetricsActionButtonsProps {
  onReset: () => void;
}

export default function MetricsActionButtons({ onReset }: MetricsActionButtonsProps) {
  const router = useRouter();
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setExportAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportAnchorEl(null);
  };

  const handleExportFormat = (format: string) => {
    // TODO: Implement export functionality
    console.log(`Exporting in ${format} format`);
    handleExportClose();
  };

  const handleViewDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', padding: '20px' }}>
      <Button
        variant="outlined"
        onClick={onReset}
        sx={{
          color: '#2D6A4F',
          borderColor: '#2D6A4F',
          '&:hover': {
            backgroundColor: '#2D6A4F',
            color: '#ffffff'
          },
        }}
      >
        Reset
      </Button>

      <Button
        variant="outlined"
        sx={{
          color: '#2D6A4F',
          borderColor: '#2D6A4F',
          '&:hover': {
            backgroundColor: '#2D6A4F',
            color: '#ffffff'
          },
        }}
      >
        Preview
      </Button>

      <Button
        variant="outlined"
        onClick={handleExportClick}
        sx={{
          color: '#2D6A4F',
          borderColor: '#2D6A4F',
          '&:hover': {
            backgroundColor: '#2D6A4F',
            color: '#ffffff'
          },
        }}
      >
        Export
      </Button>
      <Menu
        anchorEl={exportAnchorEl}
        open={Boolean(exportAnchorEl)}
        onClose={handleExportClose}
      >
        <MenuItem onClick={() => handleExportFormat('pdf')}>PDF</MenuItem>
        <MenuItem onClick={() => handleExportFormat('excel')}>Excel</MenuItem>
        <MenuItem onClick={() => handleExportFormat('csv')}>CSV</MenuItem>
      </Menu>

      <Button
        variant="outlined"
        sx={{
          color: '#2D6A4F',
          borderColor: '#2D6A4F',
          '&:hover': {
            backgroundColor: '#2D6A4F',
            color: '#ffffff'
          },
        }}
      >
        Calculate & Save
      </Button>

      <Button
        variant="outlined"
        onClick={handleViewDashboard}
        sx={{
          color: '#2D6A4F',
          borderColor: '#2D6A4F',
          '&:hover': {
            backgroundColor: '#2D6A4F',
            color: '#ffffff'
          },
        }}
      >
        View Dashboard
      </Button>
    </div>
  );
}