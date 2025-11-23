'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, ReactNode } from 'react';
import theme from './_theme/theme';
import './_styles/globals.css';
import BottomNav from './_components/BottomNav';
import DevToolsPanel, { DEVICE_PRESETS, DeviceMode, DevicePreset } from './_components/DevTools/DevToolsPanel';
import { isTauriApp } from './_lib/tauri';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile');
  const [devicePreset, setDevicePreset] = useState<DevicePreset>(DEVICE_PRESETS[1]);
  const showDevTools = !isTauriApp();

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Uxercise - Fitness Tracking & Workout Builder</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {showDevTools && (
            <DevToolsPanel
              deviceMode={deviceMode}
              setDeviceMode={setDeviceMode}
              devicePreset={devicePreset}
              setDevicePreset={setDevicePreset}
            />
          )}

          {deviceMode === 'mobile' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
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
                    position: 'relative',
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
            <div className="desktop-mode" style={{ position: 'relative' }}>
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
