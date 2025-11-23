import { Workout } from '../_lib/storage';

export const WORKOUT_TEMPLATES: Omit<Workout, 'id' | 'createdAt'>[] = [
  {
    name: 'Push Day (PPL)',
    difficulty: 'Intermediate',
    tags: ['Push', 'Strength'],
    estimatedDuration: 60,
    exercises: [
      {
        id: 'temp1',
        name: 'Barbell Bench Press',
        sets: [
          { id: 's1', type: 'warm-up', reps: 10, weight: 135 },
          { id: 's2', type: 'standard', reps: 8, weight: 185 },
          { id: 's3', type: 'standard', reps: 8, weight: 185 },
          { id: 's4', type: 'standard', reps: 8, weight: 185 },
        ],
      },
      {
        id: 'temp2',
        name: 'Incline Dumbbell Press',
        sets: [
          { id: 's1', type: 'standard', reps: 10, weight: 60 },
          { id: 's2', type: 'standard', reps: 10, weight: 60 },
          { id: 's3', type: 'standard', reps: 10, weight: 60 },
        ],
      },
      {
        id: 'temp3',
        name: 'Dumbbell Fly',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 30 },
          { id: 's2', type: 'standard', reps: 12, weight: 30 },
          { id: 's3', type: 'standard', reps: 12, weight: 30 },
        ],
      },
      {
        id: 'temp4',
        name: 'Overhead Press',
        sets: [
          { id: 's1', type: 'standard', reps: 8, weight: 95 },
          { id: 's2', type: 'standard', reps: 8, weight: 95 },
          { id: 's3', type: 'standard', reps: 8, weight: 95 },
        ],
      },
      {
        id: 'temp5',
        name: 'Lateral Raises',
        sets: [
          { id: 's1', type: 'standard', reps: 15, weight: 20 },
          { id: 's2', type: 'standard', reps: 15, weight: 20 },
          { id: 's3', type: 'standard', reps: 15, weight: 20 },
        ],
      },
      {
        id: 'temp6',
        name: 'Tricep Pushdown',
        sets: [
          { id: 's1', type: 'standard', reps: 15, weight: 50 },
          { id: 's2', type: 'standard', reps: 15, weight: 50 },
          { id: 's3', type: 'standard', reps: 15, weight: 50 },
        ],
      },
    ],
  },
  {
    name: 'Pull Day (PPL)',
    difficulty: 'Intermediate',
    tags: ['Pull', 'Strength'],
    estimatedDuration: 60,
    exercises: [
      {
        id: 'temp1',
        name: 'Deadlift',
        sets: [
          { id: 's1', type: 'warm-up', reps: 5, weight: 135 },
          { id: 's2', type: 'standard', reps: 5, weight: 225 },
          { id: 's3', type: 'standard', reps: 5, weight: 225 },
          { id: 's4', type: 'standard', reps: 5, weight: 225 },
          { id: 's5', type: 'standard', reps: 5, weight: 225 },
        ],
      },
      {
        id: 'temp2',
        name: 'Pull-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 10, weight: 0 },
          { id: 's2', type: 'standard', reps: 10, weight: 0 },
          { id: 's3', type: 'standard', reps: 10, weight: 0 },
          { id: 's4', type: 'standard', reps: 10, weight: 0 },
        ],
      },
      {
        id: 'temp3',
        name: 'Barbell Row',
        sets: [
          { id: 's1', type: 'standard', reps: 8, weight: 135 },
          { id: 's2', type: 'standard', reps: 8, weight: 135 },
          { id: 's3', type: 'standard', reps: 8, weight: 135 },
        ],
      },
      {
        id: 'temp4',
        name: 'Face Pulls',
        sets: [
          { id: 's1', type: 'standard', reps: 15, weight: 40 },
          { id: 's2', type: 'standard', reps: 15, weight: 40 },
          { id: 's3', type: 'standard', reps: 15, weight: 40 },
        ],
      },
      {
        id: 'temp5',
        name: 'Barbell Curl',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 65 },
          { id: 's2', type: 'standard', reps: 12, weight: 65 },
          { id: 's3', type: 'standard', reps: 12, weight: 65 },
        ],
      },
      {
        id: 'temp6',
        name: 'Hammer Curl',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 35 },
          { id: 's2', type: 'standard', reps: 12, weight: 35 },
          { id: 's3', type: 'standard', reps: 12, weight: 35 },
        ],
      },
    ],
  },
  {
    name: 'Leg Day (PPL)',
    difficulty: 'Intermediate',
    tags: ['Legs', 'Strength'],
    estimatedDuration: 60,
    exercises: [
      {
        id: 'temp1',
        name: 'Barbell Squat',
        sets: [
          { id: 's1', type: 'warm-up', reps: 10, weight: 95 },
          { id: 's2', type: 'standard', reps: 5, weight: 185 },
          { id: 's3', type: 'standard', reps: 5, weight: 185 },
          { id: 's4', type: 'standard', reps: 5, weight: 185 },
          { id: 's5', type: 'standard', reps: 5, weight: 185 },
        ],
      },
      {
        id: 'temp2',
        name: 'Romanian Deadlift',
        sets: [
          { id: 's1', type: 'standard', reps: 10, weight: 135 },
          { id: 's2', type: 'standard', reps: 10, weight: 135 },
          { id: 's3', type: 'standard', reps: 10, weight: 135 },
        ],
      },
      {
        id: 'temp3',
        name: 'Leg Press',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 270 },
          { id: 's2', type: 'standard', reps: 12, weight: 270 },
          { id: 's3', type: 'standard', reps: 12, weight: 270 },
        ],
      },
      {
        id: 'temp4',
        name: 'Leg Curl',
        sets: [
          { id: 's1', type: 'standard', reps: 15, weight: 80 },
          { id: 's2', type: 'standard', reps: 15, weight: 80 },
          { id: 's3', type: 'standard', reps: 15, weight: 80 },
        ],
      },
      {
        id: 'temp5',
        name: 'Standing Calf Raise',
        sets: [
          { id: 's1', type: 'standard', reps: 15, weight: 100 },
          { id: 's2', type: 'standard', reps: 15, weight: 100 },
          { id: 's3', type: 'standard', reps: 15, weight: 100 },
        ],
      },
    ],
  },
  {
    name: 'Upper Body',
    difficulty: 'Beginner',
    tags: ['Push', 'Pull', 'Strength'],
    estimatedDuration: 45,
    exercises: [
      {
        id: 'temp1',
        name: 'Push-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 15, weight: 0 },
          { id: 's2', type: 'standard', reps: 15, weight: 0 },
          { id: 's3', type: 'standard', reps: 15, weight: 0 },
        ],
      },
      {
        id: 'temp2',
        name: 'Dumbbell Row',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 40 },
          { id: 's2', type: 'standard', reps: 12, weight: 40 },
          { id: 's3', type: 'standard', reps: 12, weight: 40 },
        ],
      },
      {
        id: 'temp3',
        name: 'Dumbbell Shoulder Press',
        sets: [
          { id: 's1', type: 'standard', reps: 10, weight: 30 },
          { id: 's2', type: 'standard', reps: 10, weight: 30 },
          { id: 's3', type: 'standard', reps: 10, weight: 30 },
        ],
      },
      {
        id: 'temp4',
        name: 'Dumbbell Curl',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 25 },
          { id: 's2', type: 'standard', reps: 12, weight: 25 },
          { id: 's3', type: 'standard', reps: 12, weight: 25 },
        ],
      },
      {
        id: 'temp5',
        name: 'Overhead Tricep Extension',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 30 },
          { id: 's2', type: 'standard', reps: 12, weight: 30 },
          { id: 's3', type: 'standard', reps: 12, weight: 30 },
        ],
      },
    ],
  },
  {
    name: 'Full Body Beginner',
    difficulty: 'Beginner',
    tags: ['Strength', 'Bodyweight'],
    estimatedDuration: 30,
    exercises: [
      {
        id: 'temp1',
        name: 'Goblet Squat',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 35 },
          { id: 's2', type: 'standard', reps: 12, weight: 35 },
          { id: 's3', type: 'standard', reps: 12, weight: 35 },
        ],
      },
      {
        id: 'temp2',
        name: 'Push-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 12, weight: 0 },
          { id: 's2', type: 'standard', reps: 12, weight: 0 },
          { id: 's3', type: 'standard', reps: 12, weight: 0 },
        ],
      },
      {
        id: 'temp3',
        name: 'Dumbbell Row',
        sets: [
          { id: 's1', type: 'standard', reps: 10, weight: 30 },
          { id: 's2', type: 'standard', reps: 10, weight: 30 },
          { id: 's3', type: 'standard', reps: 10, weight: 30 },
        ],
      },
      {
        id: 'temp4',
        name: 'Plank',
        sets: [
          { id: 's1', type: 'standard', reps: 1, duration: 30 },
          { id: 's2', type: 'standard', reps: 1, duration: 30 },
          { id: 's3', type: 'standard', reps: 1, duration: 30 },
        ],
      },
    ],
  },
  {
    name: 'HIIT Circuit',
    difficulty: 'Intermediate',
    tags: ['HIIT', 'Cardio'],
    estimatedDuration: 20,
    exercises: [
      {
        id: 'temp1',
        name: 'Burpees',
        sets: [
          { id: 's1', type: 'HIIT', reps: 15, duration: 30 },
          { id: 's2', type: 'HIIT', reps: 15, duration: 30 },
          { id: 's3', type: 'HIIT', reps: 15, duration: 30 },
        ],
      },
      {
        id: 'temp2',
        name: 'Mountain Climbers',
        sets: [
          { id: 's1', type: 'HIIT', reps: 20, duration: 30 },
          { id: 's2', type: 'HIIT', reps: 20, duration: 30 },
          { id: 's3', type: 'HIIT', reps: 20, duration: 30 },
        ],
      },
      {
        id: 'temp3',
        name: 'Jump Rope',
        sets: [
          { id: 's1', type: 'HIIT', reps: 100, duration: 60 },
          { id: 's2', type: 'HIIT', reps: 100, duration: 60 },
          { id: 's3', type: 'HIIT', reps: 100, duration: 60 },
        ],
      },
      {
        id: 'temp4',
        name: 'Box Jumps',
        sets: [
          { id: 's1', type: 'HIIT', reps: 10, duration: 30 },
          { id: 's2', type: 'HIIT', reps: 10, duration: 30 },
          { id: 's3', type: 'HIIT', reps: 10, duration: 30 },
        ],
      },
    ],
  },
  {
    name: 'Murph',
    difficulty: 'Advanced',
    tags: ['HIIT', 'CrossFit', 'Bodyweight'],
    estimatedDuration: 45,
    exercises: [
      {
        id: 'temp1',
        name: 'Running',
        sets: [{ id: 's1', type: 'standard', reps: 1, distance: 1600 }],
      },
      {
        id: 'temp2',
        name: 'Pull-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 20, weight: 0 },
          { id: 's2', type: 'standard', reps: 20, weight: 0 },
          { id: 's3', type: 'standard', reps: 20, weight: 0 },
          { id: 's4', type: 'standard', reps: 20, weight: 0 },
          { id: 's5', type: 'standard', reps: 20, weight: 0 },
        ],
      },
      {
        id: 'temp3',
        name: 'Push-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 40, weight: 0 },
          { id: 's2', type: 'standard', reps: 40, weight: 0 },
          { id: 's3', type: 'standard', reps: 40, weight: 0 },
          { id: 's4', type: 'standard', reps: 40, weight: 0 },
          { id: 's5', type: 'standard', reps: 40, weight: 0 },
        ],
      },
      {
        id: 'temp4',
        name: 'Barbell Squat',
        sets: [
          { id: 's1', type: 'standard', reps: 60, weight: 0 },
          { id: 's2', type: 'standard', reps: 60, weight: 0 },
          { id: 's3', type: 'standard', reps: 60, weight: 0 },
          { id: 's4', type: 'standard', reps: 60, weight: 0 },
          { id: 's5', type: 'standard', reps: 60, weight: 0 },
        ],
      },
      {
        id: 'temp5',
        name: 'Running',
        sets: [{ id: 's1', type: 'standard', reps: 1, distance: 1600 }],
      },
    ],
  },
  {
    name: 'Badger',
    difficulty: 'Advanced',
    tags: ['HIIT', 'CrossFit', 'Bodyweight'],
    estimatedDuration: 40,
    exercises: [
      {
        id: 'temp1',
        name: 'Barbell Squat',
        sets: [
          { id: 's1', type: 'standard', reps: 30, weight: 95 },
          { id: 's2', type: 'standard', reps: 30, weight: 95 },
          { id: 's3', type: 'standard', reps: 30, weight: 95 },
        ],
      },
      {
        id: 'temp2',
        name: 'Pull-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 30, weight: 0 },
          { id: 's2', type: 'standard', reps: 30, weight: 0 },
          { id: 's3', type: 'standard', reps: 30, weight: 0 },
        ],
      },
      {
        id: 'temp3',
        name: 'Power Clean',
        sets: [
          { id: 's1', type: 'standard', reps: 30, weight: 95 },
          { id: 's2', type: 'standard', reps: 30, weight: 95 },
          { id: 's3', type: 'standard', reps: 30, weight: 95 },
        ],
      },
    ],
  },
  {
    name: 'The Seven',
    difficulty: 'Advanced',
    tags: ['HIIT', 'CrossFit'],
    estimatedDuration: 35,
    exercises: [
      {
        id: 'temp1',
        name: 'Deadlift',
        sets: [
          { id: 's1', type: 'standard', reps: 7, weight: 245 },
          { id: 's2', type: 'standard', reps: 7, weight: 245 },
          { id: 's3', type: 'standard', reps: 7, weight: 245 },
          { id: 's4', type: 'standard', reps: 7, weight: 245 },
          { id: 's5', type: 'standard', reps: 7, weight: 245 },
          { id: 's6', type: 'standard', reps: 7, weight: 245 },
          { id: 's7', type: 'standard', reps: 7, weight: 245 },
        ],
      },
      {
        id: 'temp2',
        name: 'Burpees',
        sets: [
          { id: 's1', type: 'standard', reps: 7, weight: 0 },
          { id: 's2', type: 'standard', reps: 7, weight: 0 },
          { id: 's3', type: 'standard', reps: 7, weight: 0 },
          { id: 's4', type: 'standard', reps: 7, weight: 0 },
          { id: 's5', type: 'standard', reps: 7, weight: 0 },
          { id: 's6', type: 'standard', reps: 7, weight: 0 },
          { id: 's7', type: 'standard', reps: 7, weight: 0 },
        ],
      },
      {
        id: 'temp3',
        name: 'Kettlebell Swings',
        sets: [
          { id: 's1', type: 'standard', reps: 7, weight: 53 },
          { id: 's2', type: 'standard', reps: 7, weight: 53 },
          { id: 's3', type: 'standard', reps: 7, weight: 53 },
          { id: 's4', type: 'standard', reps: 7, weight: 53 },
          { id: 's5', type: 'standard', reps: 7, weight: 53 },
          { id: 's6', type: 'standard', reps: 7, weight: 53 },
          { id: 's7', type: 'standard', reps: 7, weight: 53 },
        ],
      },
      {
        id: 'temp4',
        name: 'Pull-Ups',
        sets: [
          { id: 's1', type: 'standard', reps: 7, weight: 0 },
          { id: 's2', type: 'standard', reps: 7, weight: 0 },
          { id: 's3', type: 'standard', reps: 7, weight: 0 },
          { id: 's4', type: 'standard', reps: 7, weight: 0 },
          { id: 's5', type: 'standard', reps: 7, weight: 0 },
          { id: 's6', type: 'standard', reps: 7, weight: 0 },
          { id: 's7', type: 'standard', reps: 7, weight: 0 },
        ],
      },
    ],
  },
];
