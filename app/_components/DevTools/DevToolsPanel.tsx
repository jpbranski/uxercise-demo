'use client';

import { Box, Button, Select, MenuItem } from '@mui/material';
import { resetDemoData } from '@/app/_lib/storage';
import { getAppVersion } from '@/app/_lib/tauri';

export type DeviceMode = 'mobile' | 'desktop';

export type DevicePreset = {
  name: string;
  width: number;
  height: number;
};

export const DEVICE_PRESETS: DevicePreset[] = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'Pixel 7', width: 412, height: 915 },
  { name: 'Generic', width: 430, height: 900 },
];

interface DevToolsPanelProps {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  devicePreset: DevicePreset;
  setDevicePreset: (preset: DevicePreset) => void;
}

export default function DevToolsPanel({
  deviceMode,
  setDeviceMode,
  devicePreset,
  setDevicePreset,
}: DevToolsPanelProps) {
  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
      resetDemoData();
      window.location.reload();
    }
  };

  // Always show full toolbar - permanent, no toggling
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        background: 'linear-gradient(135deg, #1C1C1C 0%, #2A2A2A 100%)',
        color: '#FFFFFF',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '2px solid #FF8C42',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box
        sx={{
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#E7CF8B',
          marginRight: 'auto',
        }}
      >
        UXERCISE DEV TOOLS
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          onClick={() => setDeviceMode('mobile')}
          sx={{
            background: deviceMode === 'mobile' ? '#FF8C42' : 'transparent',
            color: deviceMode === 'mobile' ? '#FFF' : '#E7CF8B',
            border: '1px solid #E7CF8B',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 'auto',
            '&:hover': {
              background: deviceMode === 'mobile' ? '#FF8C42' : 'rgba(231, 207, 139, 0.1)',
              opacity: deviceMode === 'mobile' ? 0.9 : 1,
            },
          }}
        >
          MOBILE
        </Button>

        {deviceMode === 'mobile' && (
          <Select
            value={devicePreset.name}
            onChange={(e) => {
              const preset = DEVICE_PRESETS.find(p => p.name === e.target.value);
              if (preset) setDevicePreset(preset);
            }}
            sx={{
              background: '#2A2A2A',
              color: '#E7CF8B',
              border: '1px solid #E7CF8B',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              height: '34px',
              minWidth: '160px',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSelect-select': {
                padding: '6px 12px',
              },
            }}
          >
            {DEVICE_PRESETS.map(preset => (
              <MenuItem key={preset.name} value={preset.name}>
                {preset.name} ({preset.width}×{preset.height})
              </MenuItem>
            ))}
          </Select>
        )}

        <Button
          onClick={() => setDeviceMode('desktop')}
          sx={{
            background: deviceMode === 'desktop' ? '#FF8C42' : 'transparent',
            color: deviceMode === 'desktop' ? '#FFF' : '#E7CF8B',
            border: '1px solid #E7CF8B',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 'auto',
            '&:hover': {
              background: deviceMode === 'desktop' ? '#FF8C42' : 'rgba(231, 207, 139, 0.1)',
              opacity: deviceMode === 'desktop' ? 0.9 : 1,
            },
          }}
        >
          DESKTOP
        </Button>

        <Button
          onClick={handleResetData}
          sx={{
            background: 'transparent',
            color: '#FF8C42',
            border: '1px solid #FF8C42',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 'auto',
            '&:hover': {
              background: 'rgba(255, 140, 66, 0.1)',
            },
          }}
        >
          RESET DATA
        </Button>

        <Box
          sx={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.6)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            paddingLeft: '12px',
          }}
        >
          v{getAppVersion()}
        </Box>
      </Box>
    </Box>
  );
}
