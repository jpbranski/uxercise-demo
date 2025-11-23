'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, ReactNode } from 'react';
import theme from './_theme/theme';
import './_styles/globals.css';
import BottomNav from './_components/BottomNav';
import { resetDemoData } from './_lib/storage';
import { isTauriApp } from './_lib/tauri';

type DevicePreset = {
  name: string;
  width: number;
  height: number;
};

const DEVICE_PRESETS: DevicePreset[] = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12', width: 390, height: 844 },
  { name: 'Pixel 7', width: 412, height: 915 },
  { name: 'Generic', width: 430, height: 900 },
];

export default function DemoLayout({ children }: { children: ReactNode }) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [devicePreset, setDevicePreset] = useState<DevicePreset>(DEVICE_PRESETS[1]);
  const showPrototypeToolbar = !isTauriApp();

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all demo data? This cannot be undone.')) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Uxercise Demo</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {showPrototypeToolbar && (
            <div className="prototype-toolbar">
              <div className="prototype-toolbar-title">UXERCISE PROTOTYPE</div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  style={{
                    background: deviceMode === 'mobile' ? '#FF8C42' : 'transparent',
                    color: deviceMode === 'mobile' ? '#FFF' : '#E7CF8B',
                    border: '1px solid #E7CF8B',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  MOBILE
                </button>
                <button
                  onClick={() => setDeviceMode('desktop')}
                  style={{
                    background: deviceMode === 'desktop' ? '#FF8C42' : 'transparent',
                    color: deviceMode === 'desktop' ? '#FFF' : '#E7CF8B',
                    border: '1px solid #E7CF8B',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  DESKTOP
                </button>

                {deviceMode === 'mobile' && (
                  <select
                    value={devicePreset.name}
                    onChange={(e) => {
                      const preset = DEVICE_PRESETS.find(p => p.name === e.target.value);
                      if (preset) setDevicePreset(preset);
                    }}
                    style={{
                      background: '#2A2A2A',
                      color: '#E7CF8B',
                      border: '1px solid #E7CF8B',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {DEVICE_PRESETS.map(preset => (
                      <option key={preset.name} value={preset.name}>
                        {preset.name} ({preset.width}×{preset.height})
                      </option>
                    ))}
                  </select>
                )}

                <button
                  onClick={handleResetData}
                  style={{
                    background: 'transparent',
                    color: '#FF8C42',
                    border: '1px solid #FF8C42',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  RESET DATA
                </button>
              </div>
            </div>
          )}

          {deviceMode === 'mobile' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: showPrototypeToolbar ? 'calc(100vh - 56px)' : '100vh',
                background: '#E4E4E4',
                padding: '40px 20px',
              }}
            >
              <div
                className="device-frame"
                style={{
                  width: `${devicePreset.width}px`,
                  height: `${devicePreset.height}px`,
                }}
              >
                <div
                  className="device-screen"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div style={{ paddingBottom: '60px', minHeight: '100%' }}>
                    {children}
                  </div>
                  <BottomNav />
                </div>
              </div>
            </div>
          ) : (
            <div className="desktop-mode">
              <div style={{ paddingBottom: '60px' }}>
                {children}
              </div>
              <BottomNav />
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
