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
import { colors } from './_theme/theme';
import Image from 'next/image';

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
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAFAFA', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: colors.gradients.orangeToGold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FitnessCenterIcon sx={{ color: '#FFF', fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: colors.neutral.charcoal }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
            {profile.name}
          </Typography>
        </Box>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card
            sx={{
              background: colors.gradients.orangeToGold,
              color: '#FFF',
              borderRadius: '14px',
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                This Week
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {thisWeekLogs.length}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Workouts
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{
              background: colors.gradients.goldToAmber,
              color: colors.neutral.charcoal,
              borderRadius: '14px',
            }}
          >
            <CardContent>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                Total Time
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {Math.floor(totalTime / 60)}h
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {totalTime % 60}m logged
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Start */}
      <Card sx={{ mb: 3, borderRadius: '14px' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Start
          </Typography>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: colors.gradients.orangeToGold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              cursor: 'pointer',
              transition: 'transform 0.15s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            onClick={() => router.push('/demo/builder')}
          >
            <AddIcon sx={{ fontSize: 40, color: '#FFF' }} />
          </Box>
          <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
            Create New Workout
          </Typography>
        </CardContent>
      </Card>

      {/* Today's Plan */}
      {todayWorkouts.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Today's Plan
          </Typography>
          {todayWorkouts.map(workout => (
            <Card key={workout.id} sx={{ mb: 2, borderRadius: '14px' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {workout.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                      {workout.tags.slice(0, 3).map(tag => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.neutral.darkGray }}>
                      {workout.estimatedDuration} min · {workout.exercises.length} exercises
                    </Typography>
                  </Box>
                  <IconButton
                    sx={{
                      background: colors.gradients.orangeToGold,
                      color: '#FFF',
                      '&:hover': { background: colors.gradients.orangeToGold, opacity: 0.9 },
                    }}
                    onClick={() => router.push(`/demo/builder?id=${workout.id}&play=true`)}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Workouts
          </Typography>
          <Button
            size="small"
            onClick={() => router.push('/demo/log')}
            sx={{ color: colors.primary.main }}
          >
            View All
          </Button>
        </Box>

        {recentLogs.length === 0 ? (
          <Card sx={{ borderRadius: '14px' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
                No workouts logged yet. Start your first workout!
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => router.push('/demo/builder')}
              >
                Create Workout
              </Button>
            </CardContent>
          </Card>
        ) : (
          recentLogs.map(log => (
            <Card key={log.id} sx={{ mb: 2, borderRadius: '14px' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {log.workoutName}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.neutral.darkGray }}>
                  {new Date(log.completedAt).toLocaleDateString()} · {log.duration} min
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
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
