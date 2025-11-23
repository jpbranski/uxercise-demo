// localStorage API layer with namespaced keys

const KEYS = {
  WORKOUTS: 'uxercise_demo_workouts_v1',
  LOGS: 'uxercise_demo_logs_v1',
  PROFILE: 'ux_profile_v1',
  SETTINGS: 'uxercise_demo_settings_v1',
} as const;

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
  notes?: string;
}

export interface Set {
  id: string;
  type: 'standard' | 'warm-up' | 'drop' | 'pyramid' | 'reverse-pyramid' | 'AMRAP' | 'EMOM' | 'Tabata' | 'HIIT' | 'superset' | 'circuit';
  reps?: number;
  weight?: number;
  duration?: number; // seconds
  distance?: number; // meters
  completed?: boolean;
}

export interface Workout {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  exercises: Exercise[];
  estimatedDuration: number; // minutes
  createdAt: string;
  scheduledDays?: string[]; // ['Mon', 'Wed', 'Fri']
}

export interface WorkoutLog {
  id: string;
  workoutId: string;
  workoutName: string;
  completedAt: string;
  duration: number; // actual minutes
  exercises: Exercise[];
  notes?: string;
}

export interface Profile {
  name: string;
  avatar?: string; // base64
  height?: number; // cm
  weight?: number; // kg
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  age?: number;
}

export interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoStartTimer: boolean;
  restTimerDefault: number; // seconds
}

// Workouts
export function loadWorkouts(): Workout[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(KEYS.WORKOUTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWorkouts(workouts: Workout[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.WORKOUTS, JSON.stringify(workouts));
  } catch (error) {
    console.error('Failed to save workouts:', error);
  }
}

// Logs
export function loadLogs(): WorkoutLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(KEYS.LOGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLogs(logs: WorkoutLog[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.LOGS, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save logs:', error);
  }
}

// Profile
export function loadProfile(): Profile {
  if (typeof window === 'undefined') {
    return {
      name: 'Athlete',
      heightUnit: 'cm',
      weightUnit: 'kg',
    };
  }
  try {
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : {
      name: 'Athlete',
      heightUnit: 'cm',
      weightUnit: 'kg',
    };
  } catch {
    return {
      name: 'Athlete',
      heightUnit: 'cm',
      weightUnit: 'kg',
    };
  }
}

export function saveProfile(profile: Profile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save profile:', error);
  }
}

// Settings
export function loadSettings(): Settings {
  if (typeof window === 'undefined') {
    return {
      theme: 'light',
      notifications: true,
      autoStartTimer: false,
      restTimerDefault: 60,
    };
  }
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      theme: 'light',
      notifications: true,
      autoStartTimer: false,
      restTimerDefault: 60,
    };
  } catch {
    return {
      theme: 'light',
      notifications: true,
      autoStartTimer: false,
      restTimerDefault: 60,
    };
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

// Reset all demo data
export function resetDemoData(): void {
  if (typeof window === 'undefined') return;
  Object.values(KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
