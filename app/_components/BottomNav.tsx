'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { DeviceMode } from './DevTools/DevToolsPanel';

interface BottomNavProps {
  deviceMode: DeviceMode;
}

export default function BottomNav({ deviceMode }: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', value: '/', icon: <DashboardIcon /> },
    { label: 'Builder', value: '/builder', icon: <FitnessCenterIcon /> },
    { label: 'Workouts', value: '/workouts', icon: <ListAltIcon /> },
    { label: 'Log', value: '/log', icon: <HistoryIcon /> },
    { label: 'Account', value: '/account', icon: <PersonIcon /> },
  ];

  const currentValue = navItems.find(item => pathname === item.value)?.value || '/';

  return (
    <Paper
      sx={{
        position: deviceMode === 'desktop' ? 'fixed' : 'absolute',
        bottom: 0,
        left: deviceMode === 'desktop' ? '50%' : 0,
        right: deviceMode === 'desktop' ? 'auto' : 0,
        transform: deviceMode === 'desktop' ? 'translateX(-50%)' : 'none',
        width: deviceMode === 'desktop' ? '540px' : 'auto',
        maxWidth: deviceMode === 'desktop' ? '100%' : 'auto',
        zIndex: 1000,
        bgcolor: 'var(--nav-bg)',
        borderTop: '1px solid var(--nav-border)',
      }}
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
        showLabels
        sx={{
          bgcolor: 'var(--nav-bg)',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            color: 'var(--text-secondary)',
            '&.Mui-selected': {
              color: 'var(--accent-orange)',
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
