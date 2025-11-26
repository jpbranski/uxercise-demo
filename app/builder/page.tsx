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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import { loadWorkouts, saveWorkouts, Workout, Exercise, Set } from '../_lib/storage';
import { EXERCISES, BODY_PARTS, EQUIPMENT, TAGS, ExerciseTemplate } from '../_data/exercises';
import { WORKOUT_TEMPLATES } from '../_data/templates';
import EditSetModal from '../_components/EditSetModal';

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
  const [editingSet, setEditingSet] = useState<{
    exerciseId: string;
    set: Set;
    setIndex: number;
  } | null>(null);
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
          router.push(`/builder/player?id=${workoutId}`);
        }
      }
    }
  }, [workoutId, shouldPlay, router]);

  const handleSave = () => {
    if (workout.exercises.length === 0) {
      alert("A workout must have at least one exercise.");
      return;
    }

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
      router.push(`/builder?id=${newWorkout.id}`);
    }

    setHasChanges(false);
    alert("Workout saved!");
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
    router.push(`/builder/player?id=${workoutId || 'new'}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg)', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', gap: 2.5, mb: 3, alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          sx={{
            minWidth: '80px',
            height: '48px',
            fontWeight: 600,
            borderColor: 'var(--border)',
            color: 'var(--text)',
            '&:hover': {
              borderColor: 'var(--accent-orange)',
              bgcolor: 'var(--accent-orange-bg-light)',
            },
          }}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowTemplates(true)}
          sx={{
            minWidth: '100px',
            height: '48px',
            fontWeight: 600,
            borderColor: 'var(--border)',
            color: 'var(--text)',
            '&:hover': {
              borderColor: 'var(--accent-orange)',
              bgcolor: 'var(--accent-orange-bg-light)',
            },
          }}
        >
          Templates
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={!hasChanges}
          sx={{
            ml: 'auto',
            minWidth: '100px',
            height: '48px',
            px: 2,
            fontWeight: 600,
            background: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-text)',
            '&:hover': {
              background: 'var(--btn-primary-hover)',
            },
            '&:disabled': {
              opacity: 0.5,
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
            },
          }}
        >
          Save
        </Button>
      </Box>

      {/* Workout Info */}
      <Card sx={{ mb: 3, borderRadius: '14px', bgcolor: 'var(--card-bg)' }}>
        <CardContent>
          <TextField
            fullWidth
            value={workout.name}
            onChange={(e) => {
              setWorkout({ ...workout, name: e.target.value });
              setHasChanges(true);
            }}
            sx={{
              mb: 2,
              '& input': { fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--input-border)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--input-border-hover)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--accent-orange)',
                },
              },
            }}
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
                variant={workout.tags.includes(tag) ? 'chipActive' : 'chip'}
                onClick={() => {
                  const newTags = workout.tags.includes(tag)
                    ? workout.tags.filter(t => t !== tag)
                    : [...workout.tags, tag];
                  setWorkout({ ...workout, tags: newTags });
                  setHasChanges(true);
                }}
                sx={{ cursor: 'pointer' }}
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
          <Card key={exercise.id} sx={{ mb: 2, borderRadius: '14px', bgcolor: 'var(--card-bg)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <DragIndicatorIcon sx={{ color: 'var(--text-muted)', cursor: 'grab' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                  {idx + 1}. {exercise.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteExercise(exercise.id)}
                  sx={{ color: 'var(--error-red)' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              {exercise.sets.map((set, setIdx) => (
                <Box
                  key={set.id}
                  sx={{
                    mb: 1.5,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: '10px',
                    bgcolor: 'var(--tile-bg)',
                    border: '1px solid var(--tile-border)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: 'var(--accent-orange)',
                      boxShadow: '0 2px 8px var(--shadow-sm)',
                    },
                  }}
                  onClick={() =>
                    setEditingSet({
                      exerciseId: exercise.id,
                      set,
                      setIndex: setIdx,
                    })
                  }
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 60, fontWeight: 700, color: 'var(--text)' }}
                    >
                      Set {setIdx + 1}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        flex: 1,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--text-secondary)', fontWeight: 500 }}
                      >
                        {set.type === 'warm-up' ? 'Warm-up' : set.type === 'AMRAP' ? 'AMRAP' : set.type === 'HIIT' ? 'HIIT' : set.type === 'drop' ? 'Drop' : 'Standard'}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--text-secondary)' }}
                      >
                        ·
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--text)', fontWeight: 600 }}
                      >
                        {set.reps} reps
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--text-secondary)' }}
                      >
                        ·
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'var(--text)', fontWeight: 600 }}
                      >
                        {set.weight} lbs
                      </Typography>
                    </Box>
                  </Box>
                  <EditIcon sx={{ color: 'var(--accent-orange)', fontSize: '1.25rem' }} />
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
          <Card sx={{ borderRadius: '14px', bgcolor: 'var(--card-bg)' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
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
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxHeight: '80vh',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 2, pt: 3, px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text)' }}>
            Choose Template
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-muted)', mt: 0.5 }}>
            Select a pre-built workout to get started quickly
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pt: 2 }}>
          <Box sx={{ maxHeight: '50vh', overflowY: 'auto', pr: 1 }}>
            <Grid container spacing={2}>
              {WORKOUT_TEMPLATES.map(template => (
                <Grid item xs={12} key={template.name}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '14px',
                      transition: 'all 0.2s ease',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--card-bg)',
                      color: 'var(--text)',
                      '&:hover': {
                        borderColor: 'var(--accent-orange)',
                        backgroundColor: 'var(--surface)',
                        boxShadow: '0 4px 16px var(--shadow-md)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, mb: 1, color: 'var(--text)' }}
                      >
                        {template.name}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5, flexWrap: 'wrap' }}>
                        {/* Difficulty pill */}
                        <Box
                          sx={{
                            px: 1.1,
                            py: 0.5,
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            background:
                              'linear-gradient(135deg, var(--accent-gold-1) 0%, var(--accent-gold-2) 50%, var(--accent-gold-3) 100%)',
                            color: 'var(--btn-primary-text)',
                          }}
                        >
                          {template.difficulty}
                        </Box>

                        {/* Tags */}
                        {template.tags.slice(0, 2).map(tag => (
                          <Box
                            key={tag}
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              backgroundColor: 'var(--surface)',
                              color: 'var(--text)',
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                      </Box>

                      <Typography variant="body2" sx={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                        {template.estimatedDuration} min · {template.exercises.length} exercises
                      </Typography>
                    </CardContent>
                  </Card>

                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2.5, borderTop: '1px solid var(--border)' }}>
          <Button
            onClick={() => setShowTemplates(false)}
            sx={{
              color: 'var(--text-muted)',
              fontWeight: 600,
              px: 3,
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Exercise Dialog */}
      <Dialog
        open={showExercises}
        onClose={() => setShowExercises(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            maxHeight: '85vh',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
          },
        }}
      >
        <DialogTitle sx={{ pb: 2, pt: 3, px: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text)' }}>
            Add Exercise
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-muted)', mt: 0.5 }}>
            Browse 100+ exercises or use filters to find the perfect movement
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pt: 2 }}>
          <Box sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              placeholder="Search exercises..."
              value={exerciseFilters.search}
              onChange={(e) =>
                setExerciseFilters({ ...exerciseFilters, search: e.target.value })
              }
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'var(--input-border)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--input-border-hover)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--accent-orange)',
                  },
                },
                input: {
                  color: 'var(--text)',
                },
              }}
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

          <Box sx={{ maxHeight: '45vh', overflowY: 'auto', pr: 1 }}>
            {filteredExercises.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                  No exercises found. Try adjusting your filters.
                </Typography>
              </Box>
            ) : (
              filteredExercises.map(ex => (
                <Card
                  key={ex.id}
                  sx={{
                    mb: 1.5,
                    cursor: 'pointer',
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    border: '1px solid transparent',
                    bgcolor: 'var(--card-bg)',
                    '&:hover': {
                      bgcolor: 'var(--surface)',
                      borderColor: 'var(--accent-orange)',
                      boxShadow: '0 2px 8px var(--shadow-sm)',
                    },
                  }}
                  onClick={() => handleAddExercise(ex)}
                >
                  <CardContent sx={{ py: 2, px: 2.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.75, color: 'var(--text)' }}>
                      {ex.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {ex.bodyPart.slice(0, 2).map(part => (
                        <Chip
                          key={part}
                          label={part}
                          size="small"
                          sx={{
                            bgcolor: 'var(--surface)',
                            color: 'var(--text)',
                            fontWeight: 500,
                            fontSize: '0.7rem',
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2.5, borderTop: '1px solid var(--border)' }}>
          <Button
            onClick={() => setShowExercises(false)}
            sx={{
              color: 'var(--text-muted)',
              fontWeight: 600,
              px: 3,
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Set Modal */}
      {editingSet && (
        <EditSetModal
          open={!!editingSet}
          onClose={() => setEditingSet(null)}
          set={editingSet.set}
          setIndex={editingSet.setIndex}
          onSave={(updates) =>
            handleUpdateSet(editingSet.exerciseId, editingSet.set.id, updates)
          }
          onDelete={() => {
            handleDeleteSet(editingSet.exerciseId, editingSet.set.id);
            setEditingSet(null);
          }}
        />
      )}
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
          bgcolor: 'var(--surface)',
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
