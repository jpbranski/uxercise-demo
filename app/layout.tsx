'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useEffect, ReactNode } from 'react';
import theme from './_theme/theme';
import './_styles/globals.css';
import BottomNav from './_components/BottomNav';
import DevToolsPanel, { DEVICE_PRESETS, DeviceMode, DevicePreset } from './_components/DevTools/DevToolsPanel';
import { isTauriApp } from './_lib/tauri';
import { loadTheme, saveTheme, Theme } from './_lib/storage';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile');
  const [devicePreset, setDevicePreset] = useState<DevicePreset>(DEVICE_PRESETS[1]);
  const [appTheme, setAppTheme] = useState<Theme>('light');
  const showDevTools = !isTauriApp();

  // Load theme on mount
  useEffect(() => {
    const savedTheme = loadTheme();
    setAppTheme(savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, []);

  // Update theme class when theme changes
  useEffect(() => {
    document.body.className = `theme-${appTheme}`;
    saveTheme(appTheme);
  }, [appTheme]);

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
                background: 'var(--border)',
                padding: showDevTools ? '96px 20px 40px' : '40px 20px',
              }}
            >
              <div
                className="device-frame"
                style={{
                  width: `${devicePreset.width}px`,
                  height: `${devicePreset.height}px`,
                  overflow: 'hidden',
                }}
              >
                <div
                  className="device-screen"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    background: 'var(--bg)',
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      padding: '16px',
                      paddingBottom: 'calc(var(--bottom-nav-height, 72px) + 16px)',
                    }}
                  >
                    {children}
                  </div>
                  <BottomNav deviceMode={deviceMode} />
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg)',
              paddingTop: showDevTools ? '56px' : '0',
            }}>
              <div
                className="desktop-mode"
                style={{
                  maxWidth: '720px',
                  margin: '0 auto',
                  width: '100%',
                  flex: 1,
                  paddingBottom: 'calc(var(--bottom-nav-height, 72px) + 24px)',
                }}
              >
                {children}
              </div>
              <BottomNav deviceMode={deviceMode} />
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
