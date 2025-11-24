'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { loadWorkouts, loadLogs, loadProfile, Workout, WorkoutLog } from './_lib/storage';

export default function DashboardPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [profile, setProfile] = useState({ name: 'Athlete' });

  useEffect(() => {
    setWorkouts(loadWorkouts());
    setLogs(loadLogs());
    setProfile(loadProfile());
  }, []);

  const thisWeekLogs = logs.filter(log => {
    const logDate = new Date(log.completedAt);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return logDate >= weekAgo;
  });

  const totalTime = logs.reduce((acc, log) => acc + log.duration, 0);
  const recentLogs = logs.slice(0, 3);
  const todayWorkouts = workouts.filter(w =>
    w.scheduledDays?.includes(new Date().toLocaleDateString('en-US', { weekday: 'short' }))
  );

  return (
    <Box className="main-content" sx={{ bgcolor: 'var(--bg)' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            background: 'var(--btn-primary-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px var(--shadow-md)',
          }}
        >
          <FitnessCenterIcon sx={{ color: 'var(--btn-primary-text)', fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text)' }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            {profile.name}
          </Typography>
        </Box>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card
            sx={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              borderRadius: '16px',
              boxShadow: '0 4px 16px var(--shadow-md)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px var(--shadow-lg)',
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="body2" sx={{ opacity: 0.95, mb: 0.5, fontWeight: 600 }}>
                This Week
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, my: 0.5 }}>
                {thisWeekLogs.length}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                Workouts Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, var(--accent-gold-1) 0%, var(--accent-gold-2) 50%, var(--accent-gold-3) 100%)',
              color: 'var(--text-on-gradient)',
              borderRadius: '16px',
              boxShadow: '0 4px 16px var(--shadow-md)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px var(--shadow-lg)',
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5, fontWeight: 600 }}>
                Total Time
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, my: 0.5 }}>
                {Math.floor(totalTime / 60)}h
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>
                {totalTime % 60}m Logged
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Start */}
      <Card
        sx={{
          mb: 3,
          borderRadius: '18px',
          background: 'var(--card-bg)',
          boxShadow: '0 2px 16px var(--shadow-md)',
          border: '1px solid var(--border)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 20px var(--shadow-lg)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent sx={{ textAlign: 'center', py: 4, px: 3 }}>
          <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 700, color: 'var(--text)' }}>
            Quick Start Workout
          </Typography>
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'var(--btn-primary-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px var(--shadow-md)',
              '&:hover': {
                transform: 'scale(1.08)',
                boxShadow: '0 6px 24px var(--shadow-lg)',
              },
              '&:active': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => router.push('/builder')}
          >
            <AddIcon sx={{ fontSize: 48, color: 'var(--btn-primary-text)' }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            Create a new workout or choose from templates
          </Typography>
        </CardContent>
      </Card>

      {/* Today's Plan */}
      {todayWorkouts.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2.5, fontWeight: 700, color: 'var(--text)' }}>
            Today's Plan
          </Typography>
          {todayWorkouts.map(workout => (
            <Card
              key={workout.id}
              sx={{
                mb: 2,
                borderRadius: '16px',
                bgcolor: 'var(--card-bg)',
                boxShadow: '0 2px 12px var(--shadow-sm)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 16px var(--shadow-md)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'var(--text)' }}>
                      {workout.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                      {workout.tags.slice(0, 3).map(tag => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {workout.estimatedDuration} min · {workout.exercises.length} exercises
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      background: 'var(--btn-primary-bg)',
                      color: 'var(--btn-primary-text)',
                      width: 48,
                      height: 48,
                      boxShadow: '0 2px 8px var(--shadow-sm)',
                      '&:hover': {
                        background: 'var(--btn-primary-hover)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px var(--shadow-md)',
                      },
                    }}
                    onClick={() => router.push(`/builder?id=${workout.id}&play=true`)}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Recent Workouts */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text)' }}>
            Recent Workouts
          </Typography>
          <Button
            size="small"
            onClick={() => router.push('/workouts')}
            sx={{
              color: 'var(--accent-orange)',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'var(--surface)',
              },
            }}
          >
            View All
          </Button>
        </Box>

        {recentLogs.length === 0 ? (
          <Card
            sx={{
              borderRadius: '16px',
              bgcolor: 'var(--card-bg)',
              boxShadow: '0 2px 12px var(--shadow-sm)',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 5 }}>
              <FitnessCenterIcon sx={{ fontSize: 64, color: 'var(--text-muted)', mb: 2 }} />
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', mb: 3, fontWeight: 500 }}>
                No workouts logged yet
              </Typography>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.5,
                  minHeight: '48px',
                  background: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                  '&:hover': {
                    background: 'var(--btn-primary-hover)',
                  },
                }}
                onClick={() => router.push('/builder')}
              >
                Create Your First Workout
              </Button>
            </CardContent>
          </Card>
        ) : (
          recentLogs.map(log => (
            <Card
              key={log.id}
              sx={{
                mb: 2,
                borderRadius: '16px',
                bgcolor: 'var(--card-bg)',
                boxShadow: '0 2px 12px var(--shadow-sm)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 16px var(--shadow-md)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'var(--text)' }}>
                  {log.workoutName}
                </Typography>
                <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {new Date(log.completedAt).toLocaleDateString()} · {log.duration} min
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1.5 }}>
                  {log.exercises.slice(0, 3).map((ex, idx) => (
                    <Chip key={idx} label={ex.name} size="small" />
                  ))}
                  {log.exercises.length > 3 && (
                    <Chip label={`+${log.exercises.length - 3} more`} size="small" />
                  )}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
