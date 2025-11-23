'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import CheckIcon from '@mui/icons-material/Check';
import { loadWorkouts, saveLogs, loadLogs, Workout, WorkoutLog } from '../../_lib/storage';
import { colors } from '../../_theme/theme';

function PlayerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutId = searchParams.get('id');

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);
  const [currentSetIdx, setCurrentSetIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (workoutId) {
      const workouts = loadWorkouts();
      const found = workouts.find(w => w.id === workoutId);
      if (found) {
        setWorkout(found);
      }
    }
  }, [workoutId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, startTime]);

  if (!workout) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading workout...</Typography>
      </Box>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIdx];
  const currentSet = currentExercise?.sets[currentSetIdx];
  const progress = ((currentExerciseIdx * 100) / workout.exercises.length);
  const nextExercise = workout.exercises[currentExerciseIdx + 1];

  const handleNext = () => {
    if (currentSetIdx < currentExercise.sets.length - 1) {
      setCurrentSetIdx(currentSetIdx + 1);
    } else if (currentExerciseIdx < workout.exercises.length - 1) {
      setCurrentExerciseIdx(currentExerciseIdx + 1);
      setCurrentSetIdx(0);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentSetIdx > 0) {
      setCurrentSetIdx(currentSetIdx - 1);
    } else if (currentExerciseIdx > 0) {
      setCurrentExerciseIdx(currentExerciseIdx - 1);
      setCurrentSetIdx(workout.exercises[currentExerciseIdx - 1].sets.length - 1);
    }
  };

  const handleFinish = () => {
    const duration = Math.floor(elapsedTime / 60);
    const log: WorkoutLog = {
      id: Date.now().toString(),
      workoutId: workout.id,
      workoutName: workout.name,
      completedAt: new Date().toISOString(),
      duration,
      exercises: workout.exercises,
      notes,
    };

    const logs = loadLogs();
    saveLogs([log, ...logs]);

    alert(`Workout completed in ${duration} minutes!`);
    router.push('/demo/log');
  };

  const handleClose = () => {
    if (confirm('Are you sure you want to exit? Your progress will not be saved.')) {
      router.back();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.gradients.darkOverlay,
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {workout.name}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: '#FFF' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 2,
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          '& .MuiLinearProgress-bar': {
            bgcolor: colors.primary.main,
          },
        }}
      />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Exercise Info */}
        <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Exercise {currentExerciseIdx + 1} of {workout.exercises.length}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, my: 2 }}>
            {currentExercise.name}
          </Typography>
          <Typography variant="h6" sx={{ color: colors.gold.light }}>
            Set {currentSetIdx + 1} of {currentExercise.sets.length}
          </Typography>
        </Box>

        {/* Timer */}
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `8px solid ${colors.primary.main}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '3.5rem' }}>
            {formatTime(elapsedTime)}
          </Typography>
        </Box>

        {/* Set Info */}
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            mb: 4,
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Type
                </Typography>
                <Typography variant="h6" sx={{ color: colors.gold.light, fontWeight: 600 }}>
                  {currentSet?.type}
                </Typography>
              </Box>
              {currentSet?.reps && (
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Reps
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
                    {currentSet.reps}
                  </Typography>
                </Box>
              )}
              {currentSet?.weight && (
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Weight
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 600 }}>
                    {currentSet.weight} lbs
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Next Up */}
        {nextExercise && (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Next Up:
            </Typography>
            <Typography variant="body1" sx={{ color: colors.gold.light, fontWeight: 600 }}>
              {nextExercise.name}
            </Typography>
          </Box>
        )}

        {/* Controls */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <IconButton
            onClick={handlePrevious}
            disabled={currentExerciseIdx === 0 && currentSetIdx === 0}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFF',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
              '&:disabled': { opacity: 0.3 },
            }}
          >
            <SkipPreviousIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              setIsPlaying(!isPlaying);
              if (!isPlaying) {
                setStartTime(Date.now() - elapsedTime * 1000);
              }
            }}
            sx={{
              width: 80,
              height: 80,
              background: colors.gradients.orangeToGold,
              color: '#FFF',
              '&:hover': { opacity: 0.9 },
            }}
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 40 }} /> : <PlayArrowIcon sx={{ fontSize: 40 }} />}
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFF',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleNext}
            sx={{
              color: '#FFF',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': { borderColor: '#FFF', bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            Complete Set
          </Button>
          {currentExerciseIdx === workout.exercises.length - 1 &&
            currentSetIdx === currentExercise.sets.length - 1 && (
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                onClick={handleFinish}
                sx={{ background: colors.gradients.orangeToGold }}
              >
                Finish Workout
              </Button>
            )}
        </Box>
      </Box>

      {/* Notes */}
      <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <TextField
          fullWidth
          multiline
          rows={2}
          placeholder="Add notes about this workout..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#FFF',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: colors.primary.main },
            },
          }}
        />
      </Box>
    </Box>
  );
}

function IconButton(props: any) {
  return (
    <Box
      component="button"
      {...props}
      sx={{
        border: 'none',
        cursor: 'pointer',
        borderRadius: '50%',
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease',
        ...props.sx,
      }}
    />
  );
}

export default function PlayerPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 3 }}>Loading...</Box>}>
      <PlayerContent />
    </Suspense>
  );
}
