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
        background: 'var(--devtools-bg)',
        color: 'var(--devtools-text)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '2px solid var(--devtools-border)',
        boxShadow: '0 4px 12px var(--shadow-sm)',
      }}
    >
      <Box
        sx={{
          fontWeight: 600,
          fontSize: '0.875rem',
          color: 'var(--devtools-text-gold)',
          marginRight: 'auto',
        }}
      >
        UXERCISE DEV TOOLS
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Button
          onClick={() => setDeviceMode('mobile')}
          sx={{
            background: deviceMode === 'mobile' ? 'var(--devtools-button-bg)' : 'var(--devtools-button-inactive)',
            color: deviceMode === 'mobile' ? 'var(--devtools-button-text)' : 'var(--devtools-text-gold)',
            border: '1px solid var(--devtools-text-gold)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 'auto',
            '&:hover': {
              background: deviceMode === 'mobile' ? 'var(--devtools-button-bg)' : 'var(--devtools-button-hover)',
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
              background: 'var(--devtools-select-bg)',
              color: 'var(--devtools-text-gold)',
              border: '1px solid var(--devtools-text-gold)',
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
            background: deviceMode === 'desktop' ? 'var(--devtools-button-bg)' : 'var(--devtools-button-inactive)',
            color: deviceMode === 'desktop' ? 'var(--devtools-button-text)' : 'var(--devtools-text-gold)',
            border: '1px solid var(--devtools-text-gold)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 'auto',
            '&:hover': {
              background: deviceMode === 'desktop' ? 'var(--devtools-button-bg)' : 'var(--devtools-button-hover)',
              opacity: deviceMode === 'desktop' ? 0.9 : 1,
            },
          }}
        >
          DESKTOP
        </Button>

        <Button
          onClick={handleResetData}
          sx={{
            background: 'var(--devtools-button-inactive)',
            color: 'var(--devtools-border)',
            border: '1px solid var(--devtools-border)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            minWidth: 'auto',
            '&:hover': {
              background: 'var(--devtools-button-hover)',
            },
          }}
        >
          RESET DATA
        </Button>

        <Box
          sx={{
            fontSize: '0.75rem',
            color: 'var(--devtools-version-text)',
            borderLeft: '1px solid var(--devtools-version-border)',
            paddingLeft: '12px',
          }}
        >
          v{getAppVersion()}
        </Box>
      </Box>
    </Box>
  );
}
