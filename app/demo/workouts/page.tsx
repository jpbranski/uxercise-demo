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
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { loadWorkouts, saveWorkouts, Workout } from '../_lib/storage';
import { colors } from '../_theme/theme';

export default function WorkoutsPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'duration'>('name');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setWorkouts(loadWorkouts());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      const updated = workouts.filter(w => w.id !== id);
      setWorkouts(updated);
      saveWorkouts(updated);
    }
  };

  const handleToggleSchedule = (workout: Workout, day: string) => {
    const updated = workouts.map(w => {
      if (w.id === workout.id) {
        const scheduledDays = w.scheduledDays || [];
        const newDays = scheduledDays.includes(day)
          ? scheduledDays.filter(d => d !== day)
          : [...scheduledDays, day];
        return { ...w, scheduledDays: newDays };
      }
      return w;
    });
    setWorkouts(updated);
    saveWorkouts(updated);
  };

  const filteredWorkouts = workouts
    .filter(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'difficulty') return a.difficulty.localeCompare(b.difficulty);
      if (sortBy === 'duration') return a.estimatedDuration - b.estimatedDuration;
      return 0;
    });

  const difficultyColors: Record<string, string> = {
    Beginner: '#4CAF50',
    Intermediate: '#FF9800',
    Advanced: '#F44336',
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAFAFA', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Workouts
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/demo/builder')}
        >
          New
        </Button>
      </Box>

      {/* Search & Sort */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search workouts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ border: '1px solid #E4E4E4' }}
        >
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => { setSortBy('name'); setAnchorEl(null); }}>Sort by Name</MenuItem>
          <MenuItem onClick={() => { setSortBy('difficulty'); setAnchorEl(null); }}>Sort by Difficulty</MenuItem>
          <MenuItem onClick={() => { setSortBy('duration'); setAnchorEl(null); }}>Sort by Duration</MenuItem>
        </Menu>
      </Box>

      {/* Workouts List */}
      {filteredWorkouts.length === 0 ? (
        <Card sx={{ borderRadius: '14px' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" sx={{ color: colors.neutral.darkGray, mb: 2 }}>
              {searchTerm ? 'No workouts found' : 'No workouts yet'}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => router.push('/demo/builder')}
            >
              Create Your First Workout
            </Button>
          </CardContent>
        </Card>
      ) : (
        filteredWorkouts.map(workout => (
          <Card key={workout.id} sx={{ mb: 2, borderRadius: '14px' }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {workout.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                      <Chip
                        label={workout.difficulty}
                        size="small"
                        sx={{
                          bgcolor: difficultyColors[workout.difficulty],
                          color: '#FFF',
                          fontWeight: 600,
                        }}
                      />
                      {workout.tags.slice(0, 3).map(tag => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.neutral.darkGray }}>
                      {workout.estimatedDuration} min · {workout.exercises.length} exercises
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/demo/builder?id=${workout.id}&play=true`)}
                      sx={{
                        background: colors.gradients.orangeToGold,
                        color: '#FFF',
                        '&:hover': { background: colors.gradients.orangeToGold, opacity: 0.9 },
                      }}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/demo/builder?id=${workout.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(workout.id)}
                      sx={{ color: '#F44336' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Schedule Days */}
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #E4E4E4' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarTodayIcon sx={{ fontSize: 16, color: colors.neutral.darkGray }} />
                    <Typography variant="caption" sx={{ color: colors.neutral.darkGray }}>
                      Schedule:
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {weekDays.map(day => {
                      const isScheduled = workout.scheduledDays?.includes(day);
                      return (
                        <Chip
                          key={day}
                          label={day}
                          size="small"
                          onClick={() => handleToggleSchedule(workout, day)}
                          sx={{
                            bgcolor: isScheduled ? colors.primary.main : '#E4E4E4',
                            color: isScheduled ? '#FFF' : colors.neutral.darkGray,
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: isScheduled ? colors.primary.dark : '#D0D0D0',
                            },
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
