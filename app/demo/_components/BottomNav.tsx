'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Box, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard', value: '/demo', icon: <DashboardIcon /> },
    { label: 'Builder', value: '/demo/builder', icon: <FitnessCenterIcon /> },
    { label: 'Workouts', value: '/demo/workouts', icon: <ListAltIcon /> },
    { label: 'Log', value: '/demo/log', icon: <HistoryIcon /> },
    { label: 'Account', value: '/demo/account', icon: <PersonIcon /> },
  ];

  const currentValue = navItems.find(item => pathname === item.value)?.value || '/demo';

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid #E4E4E4',
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
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            '&.Mui-selected': {
              color: '#FF8C42',
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
