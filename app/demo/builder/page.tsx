'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { loadWorkouts, saveWorkouts, Workout, Exercise, Set } from '../_lib/storage';
import { EXERCISES, BODY_PARTS, EQUIPMENT, TAGS, ExerciseTemplate } from '../_data/exercises';
import { WORKOUT_TEMPLATES } from '../_data/templates';
import { colors } from '../_theme/theme';

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workoutId = searchParams.get('id');
  const shouldPlay = searchParams.get('play') === 'true';

  const [workout, setWorkout] = useState<Omit<Workout, 'id' | 'createdAt'>>({
    name: 'New Workout',
    difficulty: 'Intermediate',
    tags: [],
    exercises: [],
    estimatedDuration: 30,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [exerciseFilters, setExerciseFilters] = useState({
    bodyPart: 'All',
    equipment: 'All',
    tag: 'All',
    search: '',
  });

  useEffect(() => {
    if (workoutId) {
      const workouts = loadWorkouts();
      const existing = workouts.find(w => w.id === workoutId);
      if (existing) {
        setWorkout(existing);
        if (shouldPlay) {
          router.push(`/demo/builder?id=${workoutId}&play=true`);
        }
      }
    }
  }, [workoutId, shouldPlay, router]);

  const handleSave = () => {
    const workouts = loadWorkouts();
    if (workoutId) {
      const updated = workouts.map(w =>
        w.id === workoutId ? { ...workout, id: workoutId, createdAt: w.createdAt } : w
      );
      saveWorkouts(updated);
    } else {
      const newWorkout: Workout = {
        ...workout,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      saveWorkouts([...workouts, newWorkout]);
      router.push(`/demo/builder?id=${newWorkout.id}`);
    }
    setHasChanges(false);
    alert('Workout saved!');
  };

  const handleTemplateSelect = (template: typeof WORKOUT_TEMPLATES[0]) => {
    setWorkout({
      name: template.name,
      difficulty: template.difficulty,
      tags: template.tags,
      exercises: template.exercises.map(ex => ({
        ...ex,
        id: Date.now().toString() + Math.random(),
      })),
      estimatedDuration: template.estimatedDuration,
    });
    setShowTemplates(false);
    setHasChanges(true);
  };

  const handleAddExercise = (template: ExerciseTemplate) => {
    const newExercise: Exercise = {
      id: Date.now().toString() + Math.random(),
      name: template.name,
      sets: Array.from({ length: template.defaultSets || 3 }, (_, i) => ({
        id: `set-${i}`,
        type: 'standard',
        reps: template.defaultReps || 10,
        weight: 0,
      })),
    };
    setWorkout({ ...workout, exercises: [...workout.exercises, newExercise] });
    setShowExercises(false);
    setHasChanges(true);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter(e => e.id !== exerciseId),
    });
    setHasChanges(true);
  };

  const handleAddSet = (exerciseId: string) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map(ex =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                { id: `set-${ex.sets.length}`, type: 'standard', reps: 10, weight: 0 },
              ],
            }
          : ex
      ),
    });
    setHasChanges(true);
  };

  const handleDeleteSet = (exerciseId: string, setId: string) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map(ex =>
        ex.id === exerciseId ? { ...ex, sets: ex.sets.filter(s => s.id !== setId) } : ex
      ),
    });
    setHasChanges(true);
  };

  const handleUpdateSet = (exerciseId: string, setId: string, updates: Partial<Set>) => {
    setWorkout({
      ...workout,
      exercises: workout.exercises.map(ex =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map(s => (s.id === setId ? { ...s, ...updates } : s)),
            }
          : ex
      ),
    });
    setHasChanges(true);
  };

  const filteredExercises = EXERCISES.filter(ex => {
    if (exerciseFilters.bodyPart !== 'All' && !ex.bodyPart.includes(exerciseFilters.bodyPart)) {
      return false;
    }
    if (exerciseFilters.equipment !== 'All' && !ex.equipment.includes(exerciseFilters.equipment)) {
      return false;
    }
    if (exerciseFilters.tag !== 'All' && !ex.tags.includes(exerciseFilters.tag)) {
      return false;
    }
    if (
      exerciseFilters.search &&
      !ex.name.toLowerCase().includes(exerciseFilters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handlePlay = () => {
    if (hasChanges) {
      handleSave();
    }
    router.push(`/demo/builder/player?id=${workoutId || 'new'}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAFAFA', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="outlined" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowTemplates(true)}
        >
          Templates
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!hasChanges}
          sx={{ ml: 'auto' }}
        >
          Save
        </Button>
        {workout.exercises.length > 0 && (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={handlePlay}
            sx={{ background: colors.gradients.orangeToGold }}
          >
            Start
          </Button>
        )}
      </Box>

      {/* Workout Info */}
      <Card sx={{ mb: 3, borderRadius: '14px' }}>
        <CardContent>
          <TextField
            fullWidth
            value={workout.name}
            onChange={(e) => {
              setWorkout({ ...workout, name: e.target.value });
              setHasChanges(true);
            }}
            sx={{ mb: 2, '& input': { fontSize: '1.5rem', fontWeight: 600 } }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={workout.difficulty}
              label="Difficulty"
              onChange={(e) => {
                setWorkout({ ...workout, difficulty: e.target.value as any });
                setHasChanges(true);
              }}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Tags:
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {TAGS.map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onClick={() => {
                  const newTags = workout.tags.includes(tag)
                    ? workout.tags.filter(t => t !== tag)
                    : [...workout.tags, tag];
                  setWorkout({ ...workout, tags: newTags });
                  setHasChanges(true);
                }}
                sx={{
                  bgcolor: workout.tags.includes(tag) ? colors.primary.main : '#E4E4E4',
                  color: workout.tags.includes(tag) ? '#FFF' : colors.neutral.darkGray,
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Exercises */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Exercises ({workout.exercises.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setShowExercises(true)}
          >
            Add Exercise
          </Button>
        </Box>

        {workout.exercises.map((exercise, idx) => (
          <Card key={exercise.id} sx={{ mb: 2, borderRadius: '14px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <DragIndicatorIcon sx={{ color: colors.neutral.darkGray, cursor: 'grab' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                  {idx + 1}. {exercise.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteExercise(exercise.id)}
                  sx={{ color: '#F44336' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              {exercise.sets.map((set, setIdx) => (
                <Box key={set.id} sx={{ mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ minWidth: 60 }}>
                    Set {setIdx + 1}:
                  </Typography>

                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={set.type}
                      onChange={(e) => handleUpdateSet(exercise.id, set.id, { type: e.target.value as any })}
                    >
                      <MenuItem value="standard">Standard</MenuItem>
                      <MenuItem value="warm-up">Warm-up</MenuItem>
                      <MenuItem value="drop">Drop</MenuItem>
                      <MenuItem value="AMRAP">AMRAP</MenuItem>
                      <MenuItem value="HIIT">HIIT</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    size="small"
                    type="number"
                    value={set.reps || ''}
                    onChange={(e) =>
                      handleUpdateSet(exercise.id, set.id, { reps: parseInt(e.target.value) || 0 })
                    }
                    placeholder="Reps"
                    sx={{ width: 80 }}
                  />

                  <TextField
                    size="small"
                    type="number"
                    value={set.weight || ''}
                    onChange={(e) =>
                      handleUpdateSet(exercise.id, set.id, { weight: parseInt(e.target.value) || 0 })
                    }
                    placeholder="Weight"
                    sx={{ width: 80 }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => handleDeleteSet(exercise.id, set.id)}
                    sx={{ color: '#F44336' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}

              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => handleAddSet(exercise.id)}
                sx={{ mt: 1 }}
              >
                Add Set
              </Button>
            </CardContent>
          </Card>
        ))}

        {workout.exercises.length === 0 && (
          <Card sx={{ borderRadius: '14px' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
                No exercises added yet. Click "Add Exercise" to get started!
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Templates Dialog */}
      <Dialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Choose Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {WORKOUT_TEMPLATES.map(template => (
              <Grid item xs={12} key={template.name}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)' },
                  }}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {template.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                      <Chip label={template.difficulty} size="small" />
                      {template.tags.slice(0, 2).map(tag => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: colors.neutral.darkGray }}>
                      {template.estimatedDuration} min · {template.exercises.length} exercises
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTemplates(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Add Exercise Dialog */}
      <Dialog
        open={showExercises}
        onClose={() => setShowExercises(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Exercise</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search exercises..."
              value={exerciseFilters.search}
              onChange={(e) =>
                setExerciseFilters({ ...exerciseFilters, search: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Body Part</InputLabel>
                  <Select
                    value={exerciseFilters.bodyPart}
                    label="Body Part"
                    onChange={(e) =>
                      setExerciseFilters({ ...exerciseFilters, bodyPart: e.target.value })
                    }
                  >
                    {BODY_PARTS.map(part => (
                      <MenuItem key={part} value={part}>
                        {part}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Equipment</InputLabel>
                  <Select
                    value={exerciseFilters.equipment}
                    label="Equipment"
                    onChange={(e) =>
                      setExerciseFilters({ ...exerciseFilters, equipment: e.target.value })
                    }
                  >
                    {EQUIPMENT.map(eq => (
                      <MenuItem key={eq} value={eq}>
                        {eq}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Tag</InputLabel>
                  <Select
                    value={exerciseFilters.tag}
                    label="Tag"
                    onChange={(e) =>
                      setExerciseFilters({ ...exerciseFilters, tag: e.target.value })
                    }
                  >
                    {['All', ...TAGS].map(tag => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {filteredExercises.map(ex => (
              <Card
                key={ex.id}
                sx={{
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#F5F5F5' },
                }}
                onClick={() => handleAddExercise(ex)}
              >
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {ex.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                    {ex.bodyPart.slice(0, 2).map(part => (
                      <Chip key={part} label={part} size="small" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExercises(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
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
        background: 'transparent',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        '&:hover': {
          bgcolor: '#F5F5F5',
        },
        ...props.sx,
      }}
    />
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<Box sx={{ p: 3 }}>Loading...</Box>}>
      <BuilderContent />
    </Suspense>
  );
}
