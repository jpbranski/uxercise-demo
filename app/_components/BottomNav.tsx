'use client';

import { usePathname, useRouter } from 'next/navigation';
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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--input-border)] h-16 flex items-center justify-around text-[var(--text)]"
      style={{
        zIndex: 1000,
        left: deviceMode === 'desktop' ? '50%' : 0,
        right: deviceMode === 'desktop' ? 'auto' : 0,
        transform: deviceMode === 'desktop' ? 'translateX(-50%)' : 'none',
        width: deviceMode === 'desktop' ? '720px' : '100%',
      }}
    >
      {navItems.map((item) => (
        <button
          key={item.value}
          onClick={() => router.push(item.value)}
          className={`flex flex-col items-center justify-center gap-1 px-2 py-2 flex-1 ${
            pathname === item.value ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
          }`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
