export interface ExerciseTemplate {
  id: string;
  name: string;
  bodyPart: string[];
  equipment: string[];
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  defaultSets?: number;
  defaultReps?: number;
}

export const EXERCISES: ExerciseTemplate[] = [
  // CHEST
  { id: 'ex001', name: 'Barbell Bench Press', bodyPart: ['Chest'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex002', name: 'Dumbbell Bench Press', bodyPart: ['Chest'], equipment: ['Dumbbells', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 10 },
  { id: 'ex003', name: 'Incline Barbell Bench Press', bodyPart: ['Chest', 'Shoulders'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex004', name: 'Incline Dumbbell Press', bodyPart: ['Chest', 'Shoulders'], equipment: ['Dumbbells', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 10 },
  { id: 'ex005', name: 'Decline Bench Press', bodyPart: ['Chest'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex006', name: 'Chest Dips', bodyPart: ['Chest', 'Triceps'], equipment: ['Dip Bar'], tags: ['Push', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex007', name: 'Push-Ups', bodyPart: ['Chest', 'Triceps', 'Shoulders'], equipment: ['Bodyweight'], tags: ['Push', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex008', name: 'Cable Chest Fly', bodyPart: ['Chest'], equipment: ['Cable Machine'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex009', name: 'Dumbbell Fly', bodyPart: ['Chest'], equipment: ['Dumbbells', 'Bench'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex010', name: 'Pec Deck Machine', bodyPart: ['Chest'], equipment: ['Machine'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },

  // BACK
  { id: 'ex011', name: 'Deadlift', bodyPart: ['Back', 'Legs'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Advanced', defaultSets: 5, defaultReps: 5 },
  { id: 'ex012', name: 'Barbell Row', bodyPart: ['Back'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex013', name: 'Pull-Ups', bodyPart: ['Back', 'Biceps'], equipment: ['Pull-Up Bar'], tags: ['Pull', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex014', name: 'Chin-Ups', bodyPart: ['Back', 'Biceps'], equipment: ['Pull-Up Bar'], tags: ['Pull', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex015', name: 'Lat Pulldown', bodyPart: ['Back'], equipment: ['Cable Machine'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 12 },
  { id: 'ex016', name: 'Seated Cable Row', bodyPart: ['Back'], equipment: ['Cable Machine'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 12 },
  { id: 'ex017', name: 'T-Bar Row', bodyPart: ['Back'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex018', name: 'Dumbbell Row', bodyPart: ['Back'], equipment: ['Dumbbells'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 12 },
  { id: 'ex019', name: 'Face Pulls', bodyPart: ['Back', 'Shoulders'], equipment: ['Cable Machine'], tags: ['Pull', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex020', name: 'Hyperextensions', bodyPart: ['Back', 'Core'], equipment: ['Bench'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },

  // SHOULDERS
  { id: 'ex021', name: 'Overhead Press', bodyPart: ['Shoulders'], equipment: ['Barbell'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex022', name: 'Dumbbell Shoulder Press', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Push', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 10 },
  { id: 'ex023', name: 'Arnold Press', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex024', name: 'Lateral Raises', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex025', name: 'Front Raises', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex026', name: 'Rear Delt Fly', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex027', name: 'Upright Row', bodyPart: ['Shoulders'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex028', name: 'Cable Lateral Raises', bodyPart: ['Shoulders'], equipment: ['Cable Machine'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex029', name: 'Shrugs', bodyPart: ['Shoulders', 'Traps'], equipment: ['Dumbbells'], tags: ['Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex030', name: 'Pike Push-Ups', bodyPart: ['Shoulders'], equipment: ['Bodyweight'], tags: ['Push', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },

  // ARMS - BICEPS
  { id: 'ex031', name: 'Barbell Curl', bodyPart: ['Biceps'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex032', name: 'Dumbbell Curl', bodyPart: ['Biceps'], equipment: ['Dumbbells'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex033', name: 'Hammer Curl', bodyPart: ['Biceps', 'Forearms'], equipment: ['Dumbbells'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex034', name: 'Preacher Curl', bodyPart: ['Biceps'], equipment: ['Barbell', 'Bench'], tags: ['Pull', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex035', name: 'Cable Curl', bodyPart: ['Biceps'], equipment: ['Cable Machine'], tags: ['Pull', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex036', name: 'Concentration Curl', bodyPart: ['Biceps'], equipment: ['Dumbbells'], tags: ['Pull', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex037', name: 'Incline Dumbbell Curl', bodyPart: ['Biceps'], equipment: ['Dumbbells', 'Bench'], tags: ['Pull', 'Isolation'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex038', name: 'EZ-Bar Curl', bodyPart: ['Biceps'], equipment: ['EZ-Bar'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },

  // ARMS - TRICEPS
  { id: 'ex039', name: 'Close-Grip Bench Press', bodyPart: ['Triceps', 'Chest'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex040', name: 'Tricep Dips', bodyPart: ['Triceps'], equipment: ['Dip Bar'], tags: ['Push', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex041', name: 'Overhead Tricep Extension', bodyPart: ['Triceps'], equipment: ['Dumbbells'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex042', name: 'Tricep Pushdown', bodyPart: ['Triceps'], equipment: ['Cable Machine'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex043', name: 'Skull Crushers', bodyPart: ['Triceps'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Isolation'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex044', name: 'Diamond Push-Ups', bodyPart: ['Triceps', 'Chest'], equipment: ['Bodyweight'], tags: ['Push', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex045', name: 'Rope Pushdown', bodyPart: ['Triceps'], equipment: ['Cable Machine'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex046', name: 'Bench Dips', bodyPart: ['Triceps'], equipment: ['Bench'], tags: ['Push', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },

  // LEGS - QUADS
  { id: 'ex047', name: 'Barbell Squat', bodyPart: ['Legs', 'Glutes'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 5, defaultReps: 5 },
  { id: 'ex048', name: 'Front Squat', bodyPart: ['Legs', 'Core'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 8 },
  { id: 'ex049', name: 'Leg Press', bodyPart: ['Legs', 'Glutes'], equipment: ['Machine'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 12 },
  { id: 'ex050', name: 'Leg Extension', bodyPart: ['Legs'], equipment: ['Machine'], tags: ['Legs', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex051', name: 'Goblet Squat', bodyPart: ['Legs', 'Glutes'], equipment: ['Dumbbells'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex052', name: 'Bulgarian Split Squat', bodyPart: ['Legs', 'Glutes'], equipment: ['Dumbbells', 'Bench'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex053', name: 'Lunges', bodyPart: ['Legs', 'Glutes'], equipment: ['Dumbbells'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex054', name: 'Walking Lunges', bodyPart: ['Legs', 'Glutes'], equipment: ['Dumbbells'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },
  { id: 'ex055', name: 'Hack Squat', bodyPart: ['Legs'], equipment: ['Machine'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex056', name: 'Sissy Squat', bodyPart: ['Legs'], equipment: ['Bodyweight'], tags: ['Legs', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 12 },

  // LEGS - HAMSTRINGS & GLUTES
  { id: 'ex057', name: 'Romanian Deadlift', bodyPart: ['Hamstrings', 'Glutes'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex058', name: 'Leg Curl', bodyPart: ['Hamstrings'], equipment: ['Machine'], tags: ['Legs', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex059', name: 'Glute Bridge', bodyPart: ['Glutes', 'Hamstrings'], equipment: ['Bodyweight'], tags: ['Legs', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex060', name: 'Hip Thrust', bodyPart: ['Glutes'], equipment: ['Barbell', 'Bench'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 12 },
  { id: 'ex061', name: 'Good Mornings', bodyPart: ['Hamstrings', 'Back'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex062', name: 'Nordic Hamstring Curl', bodyPart: ['Hamstrings'], equipment: ['Bodyweight'], tags: ['Legs', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },
  { id: 'ex063', name: 'Cable Pull-Through', bodyPart: ['Glutes', 'Hamstrings'], equipment: ['Cable Machine'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex064', name: 'Single-Leg Deadlift', bodyPart: ['Hamstrings', 'Glutes'], equipment: ['Dumbbells'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },

  // CALVES
  { id: 'ex065', name: 'Standing Calf Raise', bodyPart: ['Calves'], equipment: ['Machine'], tags: ['Legs', 'Isolation'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 15 },
  { id: 'ex066', name: 'Seated Calf Raise', bodyPart: ['Calves'], equipment: ['Machine'], tags: ['Legs', 'Isolation'], difficulty: 'Beginner', defaultSets: 4, defaultReps: 15 },
  { id: 'ex067', name: 'Calf Press on Leg Press', bodyPart: ['Calves'], equipment: ['Machine'], tags: ['Legs', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },

  // CORE/ABS
  { id: 'ex068', name: 'Plank', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex069', name: 'Crunches', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },
  { id: 'ex070', name: 'Bicycle Crunches', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },
  { id: 'ex071', name: 'Leg Raises', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 15 },
  { id: 'ex072', name: 'Russian Twists', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },
  { id: 'ex073', name: 'Mountain Climbers', bodyPart: ['Core', 'Cardio'], equipment: ['Bodyweight'], tags: ['Core', 'HIIT'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },
  { id: 'ex074', name: 'Ab Wheel Rollout', bodyPart: ['Core'], equipment: ['Ab Wheel'], tags: ['Core', 'Strength'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 10 },
  { id: 'ex075', name: 'Hanging Knee Raises', bodyPart: ['Core'], equipment: ['Pull-Up Bar'], tags: ['Core', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex076', name: 'Cable Crunch', bodyPart: ['Core'], equipment: ['Cable Machine'], tags: ['Core', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex077', name: 'Side Plank', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex078', name: 'Dead Bug', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex079', name: 'Flutter Kicks', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },

  // CARDIO & CONDITIONING
  { id: 'ex080', name: 'Running', bodyPart: ['Cardio'], equipment: ['Bodyweight'], tags: ['Cardio'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex081', name: 'Rowing Machine', bodyPart: ['Cardio', 'Back'], equipment: ['Machine'], tags: ['Cardio'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex082', name: 'Assault Bike', bodyPart: ['Cardio'], equipment: ['Machine'], tags: ['Cardio', 'HIIT'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex083', name: 'Jump Rope', bodyPart: ['Cardio', 'Calves'], equipment: ['Jump Rope'], tags: ['Cardio', 'HIIT'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 100 },
  { id: 'ex084', name: 'Burpees', bodyPart: ['Full Body', 'Cardio'], equipment: ['Bodyweight'], tags: ['HIIT', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 15 },
  { id: 'ex085', name: 'Box Jumps', bodyPart: ['Legs', 'Cardio'], equipment: ['Box'], tags: ['HIIT', 'Plyometric'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex086', name: 'Battle Ropes', bodyPart: ['Cardio', 'Shoulders'], equipment: ['Battle Ropes'], tags: ['HIIT', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 1 },
  { id: 'ex087', name: 'Kettlebell Swings', bodyPart: ['Full Body'], equipment: ['Kettlebell'], tags: ['HIIT', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 20 },
  { id: 'ex088', name: 'Sled Push', bodyPart: ['Legs', 'Full Body'], equipment: ['Sled'], tags: ['Strength', 'Conditioning'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 1 },
  { id: 'ex089', name: 'Farmer\'s Walk', bodyPart: ['Full Body', 'Grip'], equipment: ['Dumbbells'], tags: ['Strength', 'Conditioning'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },

  // OLYMPIC LIFTS
  { id: 'ex090', name: 'Power Clean', bodyPart: ['Full Body'], equipment: ['Barbell'], tags: ['Strength', 'Olympic'], difficulty: 'Advanced', defaultSets: 5, defaultReps: 3 },
  { id: 'ex091', name: 'Clean and Jerk', bodyPart: ['Full Body'], equipment: ['Barbell'], tags: ['Strength', 'Olympic'], difficulty: 'Advanced', defaultSets: 5, defaultReps: 3 },
  { id: 'ex092', name: 'Snatch', bodyPart: ['Full Body'], equipment: ['Barbell'], tags: ['Strength', 'Olympic'], difficulty: 'Advanced', defaultSets: 5, defaultReps: 3 },
  { id: 'ex093', name: 'Hang Clean', bodyPart: ['Full Body'], equipment: ['Barbell'], tags: ['Strength', 'Olympic'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 5 },

  // CROSSFIT CLASSICS
  { id: 'ex094', name: 'Wall Balls', bodyPart: ['Legs', 'Shoulders'], equipment: ['Medicine Ball'], tags: ['HIIT', 'CrossFit'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 20 },
  { id: 'ex095', name: 'Thrusters', bodyPart: ['Full Body'], equipment: ['Barbell'], tags: ['HIIT', 'CrossFit'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 15 },
  { id: 'ex096', name: 'Muscle-Ups', bodyPart: ['Back', 'Chest', 'Arms'], equipment: ['Pull-Up Bar'], tags: ['Pull', 'Bodyweight', 'CrossFit'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 5 },
  { id: 'ex097', name: 'Toes to Bar', bodyPart: ['Core'], equipment: ['Pull-Up Bar'], tags: ['Core', 'CrossFit'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 15 },
  { id: 'ex098', name: 'Double Unders', bodyPart: ['Cardio'], equipment: ['Jump Rope'], tags: ['Cardio', 'CrossFit'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 50 },

  // MOBILITY & FLEXIBILITY
  { id: 'ex099', name: 'Foam Rolling', bodyPart: ['Full Body'], equipment: ['Foam Roller'], tags: ['Mobility'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex100', name: 'Dynamic Stretching', bodyPart: ['Full Body'], equipment: ['Bodyweight'], tags: ['Mobility'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },

  // ADDITIONAL COMPOUND MOVEMENTS
  { id: 'ex101', name: 'Turkish Get-Up', bodyPart: ['Full Body', 'Core'], equipment: ['Kettlebell'], tags: ['Strength', 'Mobility'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 5 },
  { id: 'ex102', name: 'Landmine Press', bodyPart: ['Shoulders', 'Core'], equipment: ['Barbell'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex103', name: 'Zercher Squat', bodyPart: ['Legs', 'Core'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 8 },

  // MORE ISOLATION EXERCISES
  { id: 'ex104', name: 'Wrist Curls', bodyPart: ['Forearms'], equipment: ['Dumbbells'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex105', name: 'Reverse Wrist Curls', bodyPart: ['Forearms'], equipment: ['Dumbbells'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex106', name: 'Neck Curls', bodyPart: ['Neck'], equipment: ['Bodyweight'], tags: ['Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },

  // ADVANCED VARIATIONS
  { id: 'ex107', name: 'One-Arm Push-Ups', bodyPart: ['Chest', 'Triceps'], equipment: ['Bodyweight'], tags: ['Push', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },
  { id: 'ex108', name: 'Pistol Squats', bodyPart: ['Legs'], equipment: ['Bodyweight'], tags: ['Legs', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },
  { id: 'ex109', name: 'Archer Pull-Ups', bodyPart: ['Back', 'Biceps'], equipment: ['Pull-Up Bar'], tags: ['Pull', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },
  { id: 'ex110', name: 'L-Sit', bodyPart: ['Core', 'Arms'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 1 },

  // STRONGMAN EXERCISES
  { id: 'ex111', name: 'Log Press', bodyPart: ['Shoulders', 'Full Body'], equipment: ['Log'], tags: ['Strength', 'Strongman'], difficulty: 'Advanced', defaultSets: 5, defaultReps: 3 },
  { id: 'ex112', name: 'Atlas Stones', bodyPart: ['Full Body'], equipment: ['Atlas Stones'], tags: ['Strength', 'Strongman'], difficulty: 'Advanced', defaultSets: 5, defaultReps: 1 },
  { id: 'ex113', name: 'Yoke Walk', bodyPart: ['Full Body'], equipment: ['Yoke'], tags: ['Strength', 'Strongman'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 1 },

  // FUNCTIONAL FITNESS
  { id: 'ex114', name: 'Bear Crawl', bodyPart: ['Full Body'], equipment: ['Bodyweight'], tags: ['Conditioning', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex115', name: 'Crab Walk', bodyPart: ['Full Body'], equipment: ['Bodyweight'], tags: ['Conditioning', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex116', name: 'Broad Jumps', bodyPart: ['Legs'], equipment: ['Bodyweight'], tags: ['Plyometric', 'Power'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex117', name: 'Lateral Bounds', bodyPart: ['Legs'], equipment: ['Bodyweight'], tags: ['Plyometric', 'Power'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },

  // BALANCE & STABILITY
  { id: 'ex118', name: 'Single-Leg Balance', bodyPart: ['Legs', 'Core'], equipment: ['Bodyweight'], tags: ['Balance'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex119', name: 'Bosu Ball Squats', bodyPart: ['Legs', 'Core'], equipment: ['Bosu Ball'], tags: ['Balance', 'Legs'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 12 },
  { id: 'ex120', name: 'Stability Ball Pike', bodyPart: ['Core'], equipment: ['Stability Ball'], tags: ['Core'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 12 },

  // PLYOMETRICS
  { id: 'ex121', name: 'Depth Jumps', bodyPart: ['Legs'], equipment: ['Box'], tags: ['Plyometric', 'Power'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },
  { id: 'ex122', name: 'Clap Push-Ups', bodyPart: ['Chest', 'Triceps'], equipment: ['Bodyweight'], tags: ['Push', 'Plyometric'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 10 },
  { id: 'ex123', name: 'Medicine Ball Slam', bodyPart: ['Full Body', 'Core'], equipment: ['Medicine Ball'], tags: ['Power', 'HIIT'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 15 },

  // ADDITIONAL CHEST
  { id: 'ex124', name: 'Svend Press', bodyPart: ['Chest'], equipment: ['Weight Plate'], tags: ['Push', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex125', name: 'Guillotine Press', bodyPart: ['Chest'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 10 },

  // ADDITIONAL BACK
  { id: 'ex126', name: 'Meadows Row', bodyPart: ['Back'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex127', name: 'Rack Pulls', bodyPart: ['Back'], equipment: ['Barbell'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex128', name: 'Straight-Arm Pulldown', bodyPart: ['Back'], equipment: ['Cable Machine'], tags: ['Pull', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },

  // ADDITIONAL LEGS
  { id: 'ex129', name: 'Sumo Squat', bodyPart: ['Legs', 'Glutes'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex130', name: 'Box Squats', bodyPart: ['Legs'], equipment: ['Barbell', 'Box'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex131', name: 'Pause Squats', bodyPart: ['Legs'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 6 },
  { id: 'ex132', name: 'Step-Ups', bodyPart: ['Legs', 'Glutes'], equipment: ['Dumbbells', 'Box'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },

  // ADDITIONAL CORE
  { id: 'ex133', name: 'Pallof Press', bodyPart: ['Core'], equipment: ['Cable Machine'], tags: ['Core', 'Stability'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex134', name: 'Bird Dog', bodyPart: ['Core', 'Back'], equipment: ['Bodyweight'], tags: ['Core', 'Stability'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex135', name: 'Hollow Body Hold', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 1 },
  { id: 'ex136', name: 'Dragon Flag', bodyPart: ['Core'], equipment: ['Bench'], tags: ['Core', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },

  // ADDITIONAL SHOULDERS
  { id: 'ex137', name: 'Bus Drivers', bodyPart: ['Shoulders'], equipment: ['Weight Plate'], tags: ['Isolation', 'Endurance'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 20 },
  { id: 'ex138', name: 'Cuban Press', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Strength', 'Mobility'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },

  // GRIP TRAINING
  { id: 'ex139', name: 'Dead Hang', bodyPart: ['Grip', 'Back'], equipment: ['Pull-Up Bar'], tags: ['Grip', 'Bodyweight'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex140', name: 'Plate Pinch', bodyPart: ['Grip'], equipment: ['Weight Plate'], tags: ['Grip'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex141', name: 'Towel Pull-Ups', bodyPart: ['Back', 'Grip'], equipment: ['Pull-Up Bar', 'Towel'], tags: ['Pull', 'Grip'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 8 },

  // UNILATERAL MOVEMENTS
  { id: 'ex142', name: 'Single-Arm Cable Row', bodyPart: ['Back'], equipment: ['Cable Machine'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex143', name: 'Single-Arm Dumbbell Press', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Push', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 10 },
  { id: 'ex144', name: 'Single-Leg Press', bodyPart: ['Legs'], equipment: ['Machine'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },

  // TEMPO TRAINING
  { id: 'ex145', name: 'Tempo Push-Ups', bodyPart: ['Chest', 'Triceps'], equipment: ['Bodyweight'], tags: ['Push', 'Bodyweight'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 10 },
  { id: 'ex146', name: 'Tempo Squats', bodyPart: ['Legs'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },

  // RESISTANCE BAND EXERCISES
  { id: 'ex147', name: 'Band Pull-Aparts', bodyPart: ['Shoulders', 'Back'], equipment: ['Resistance Band'], tags: ['Pull', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },
  { id: 'ex148', name: 'Banded Squats', bodyPart: ['Legs'], equipment: ['Resistance Band'], tags: ['Legs', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex149', name: 'Banded Deadlifts', bodyPart: ['Back', 'Legs'], equipment: ['Resistance Band'], tags: ['Pull', 'Strength'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },

  // ISOMETRIC HOLDS
  { id: 'ex150', name: 'Wall Sit', bodyPart: ['Legs'], equipment: ['Bodyweight'], tags: ['Legs', 'Isometric'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex151', name: 'Handstand Hold', bodyPart: ['Shoulders', 'Core'], equipment: ['Bodyweight'], tags: ['Push', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 1 },
  { id: 'ex152', name: 'Front Lever Hold', bodyPart: ['Back', 'Core'], equipment: ['Pull-Up Bar'], tags: ['Pull', 'Bodyweight'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 1 },

  // ADDITIONAL VARIATIONS
  { id: 'ex153', name: 'Deficit Deadlift', bodyPart: ['Back', 'Legs'], equipment: ['Barbell', 'Weight Plate'], tags: ['Pull', 'Strength'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 6 },
  { id: 'ex154', name: 'Paused Bench Press', bodyPart: ['Chest'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 6 },
  { id: 'ex155', name: '1.5 Rep Squats', bodyPart: ['Legs'], equipment: ['Barbell'], tags: ['Legs', 'Strength'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 8 },
  { id: 'ex156', name: 'Spoto Press', bodyPart: ['Chest'], equipment: ['Barbell', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Advanced', defaultSets: 4, defaultReps: 8 },

  // SPECIALTY BARS
  { id: 'ex157', name: 'Safety Bar Squat', bodyPart: ['Legs'], equipment: ['Safety Bar'], tags: ['Legs', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex158', name: 'Swiss Bar Press', bodyPart: ['Chest', 'Triceps'], equipment: ['Swiss Bar', 'Bench'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 10 },
  { id: 'ex159', name: 'Trap Bar Deadlift', bodyPart: ['Legs', 'Back'], equipment: ['Trap Bar'], tags: ['Pull', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },

  // CORRECTIVE EXERCISES
  { id: 'ex160', name: 'YTW Raises', bodyPart: ['Shoulders'], equipment: ['Dumbbells'], tags: ['Mobility', 'Corrective'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 12 },
  { id: 'ex161', name: 'Wall Slides', bodyPart: ['Shoulders'], equipment: ['Bodyweight'], tags: ['Mobility', 'Corrective'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex162', name: 'Banded Dislocations', bodyPart: ['Shoulders'], equipment: ['Resistance Band'], tags: ['Mobility', 'Corrective'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },

  // ADDITIONAL COMPOUND
  { id: 'ex163', name: 'Push Press', bodyPart: ['Shoulders', 'Legs'], equipment: ['Barbell'], tags: ['Push', 'Strength'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 8 },
  { id: 'ex164', name: 'Power Shrugs', bodyPart: ['Traps', 'Full Body'], equipment: ['Barbell'], tags: ['Pull', 'Power'], difficulty: 'Intermediate', defaultSets: 4, defaultReps: 6 },

  // SWIMMING & WATER
  { id: 'ex165', name: 'Swimming - Freestyle', bodyPart: ['Cardio', 'Full Body'], equipment: ['Pool'], tags: ['Cardio'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex166', name: 'Swimming - Backstroke', bodyPart: ['Cardio', 'Back'], equipment: ['Pool'], tags: ['Cardio'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex167', name: 'Swimming - Breaststroke', bodyPart: ['Cardio', 'Chest'], equipment: ['Pool'], tags: ['Cardio'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },

  // YOGA & PILATES
  { id: 'ex168', name: 'Downward Dog', bodyPart: ['Full Body'], equipment: ['Bodyweight'], tags: ['Mobility', 'Yoga'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },
  { id: 'ex169', name: 'Pilates Hundred', bodyPart: ['Core'], equipment: ['Bodyweight'], tags: ['Core', 'Pilates'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 100 },
  { id: 'ex170', name: 'Warrior Pose', bodyPart: ['Legs', 'Core'], equipment: ['Bodyweight'], tags: ['Mobility', 'Yoga'], difficulty: 'Beginner', defaultSets: 1, defaultReps: 1 },

  // MARTIAL ARTS INSPIRED
  { id: 'ex171', name: 'Shadow Boxing', bodyPart: ['Cardio', 'Arms'], equipment: ['Bodyweight'], tags: ['Cardio', 'Martial Arts'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex172', name: 'Heavy Bag', bodyPart: ['Cardio', 'Full Body'], equipment: ['Heavy Bag'], tags: ['Cardio', 'Martial Arts'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex173', name: 'Kicks - Front/Side/Round', bodyPart: ['Legs', 'Core'], equipment: ['Bodyweight'], tags: ['Martial Arts'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 20 },

  // SPORTS SPECIFIC
  { id: 'ex174', name: 'Agility Ladder Drills', bodyPart: ['Legs', 'Cardio'], equipment: ['Agility Ladder'], tags: ['Agility', 'Sports'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex175', name: 'Cone Drills', bodyPart: ['Legs', 'Cardio'], equipment: ['Cones'], tags: ['Agility', 'Sports'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex176', name: 'Sprint Intervals', bodyPart: ['Cardio', 'Legs'], equipment: ['Bodyweight'], tags: ['Cardio', 'HIIT'], difficulty: 'Intermediate', defaultSets: 5, defaultReps: 1 },

  // FINAL ADDITIONS
  { id: 'ex177', name: 'Reverse Hyperextension', bodyPart: ['Glutes', 'Hamstrings'], equipment: ['Machine'], tags: ['Legs', 'Isolation'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 15 },
  { id: 'ex178', name: 'GHD Sit-Ups', bodyPart: ['Core'], equipment: ['GHD'], tags: ['Core', 'CrossFit'], difficulty: 'Advanced', defaultSets: 3, defaultReps: 15 },
  { id: 'ex179', name: 'Weighted Vest Walks', bodyPart: ['Full Body', 'Cardio'], equipment: ['Weighted Vest'], tags: ['Conditioning'], difficulty: 'Beginner', defaultSets: 3, defaultReps: 1 },
  { id: 'ex180', name: 'Sled Drag', bodyPart: ['Legs', 'Full Body'], equipment: ['Sled'], tags: ['Conditioning', 'Strength'], difficulty: 'Intermediate', defaultSets: 3, defaultReps: 1 },
];

export const BODY_PARTS = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Glutes',
  'Hamstrings',
  'Calves',
  'Core',
  'Cardio',
  'Full Body',
  'Forearms',
  'Traps',
  'Neck',
  'Grip',
];

export const EQUIPMENT = [
  'All',
  'Barbell',
  'Dumbbells',
  'Bodyweight',
  'Cable Machine',
  'Machine',
  'Bench',
  'Pull-Up Bar',
  'Kettlebell',
  'Medicine Ball',
  'Resistance Band',
  'Box',
  'Jump Rope',
  'Battle Ropes',
  'Sled',
  'Ab Wheel',
  'Foam Roller',
  'TRX',
  'Bosu Ball',
  'Stability Ball',
  'EZ-Bar',
];

export const TAGS = [
  'Push',
  'Pull',
  'Legs',
  'HIIT',
  'Strength',
  'Core',
  'Cardio',
  'Bodyweight',
  'Isolation',
  'Compound',
  'Olympic',
  'CrossFit',
  'Plyometric',
  'Mobility',
  'Conditioning',
];
