'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { loadProfile, saveProfile, Profile, loadTheme, saveTheme, Theme } from '../_lib/storage';

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Athlete',
    heightUnit: 'cm',
    weightUnit: 'kg',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfile(loadProfile());
    setTheme(loadTheme());
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    saveTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  const handleSave = () => {
    saveProfile(profile);
    setHasChanges(false);
    alert('Profile saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset your profile?')) {
      const defaultProfile: Profile = {
        name: 'Athlete',
        heightUnit: 'cm',
        weightUnit: 'kg',
      };
      setProfile(defaultProfile);
      saveProfile(defaultProfile);
      setHasChanges(false);
    }
  };

  const handleChange = (field: keyof Profile, value: any) => {
    setProfile({ ...profile, [field]: value });
    setHasChanges(true);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('avatar', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateBMI = () => {
    if (!profile.height || !profile.weight) return null;

    let heightInMeters = profile.height;
    if (profile.heightUnit === 'ft') {
      heightInMeters = profile.height * 30.48; // convert feet to cm
    }
    heightInMeters = heightInMeters / 100; // cm to meters

    let weightInKg = profile.weight;
    if (profile.weightUnit === 'lbs') {
      weightInKg = profile.weight * 0.453592;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMICategory = (bmi: string) => {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return 'Underweight';
    if (bmiNum < 25) return 'Normal';
    if (bmiNum < 30) return 'Overweight';
    return 'Obese';
  };

  const bmi = calculateBMI();

  return (
    <Box sx={{ bgcolor: 'var(--bg)' }}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'var(--text)' }}>
        My Profile
      </Typography>

      {/* Avatar Card */}
      <Card sx={{ mb: 3, borderRadius: '16px', bgcolor: 'var(--card-bg)', boxShadow: '0 2px 12px var(--shadow-sm)' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={profile.avatar}
              sx={{
                width: 140,
                height: 140,
                margin: '0 auto',
                background: 'var(--btn-primary-bg)',
                fontSize: '3.5rem',
                border: '4px solid var(--card-bg)',
                boxShadow: '0 4px 16px var(--shadow-md)',
              }}
            >
              {!profile.avatar && <PersonIcon sx={{ fontSize: '4rem' }} />}
            </Avatar>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 4,
                right: 4,
                bgcolor: 'var(--accent-orange)',
                color: 'var(--btn-primary-text)',
                width: 44,
                height: 44,
                boxShadow: '0 2px 8px var(--shadow-sm)',
                '&:hover': {
                  bgcolor: 'var(--accent-orange-dark)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarUpload}
          />
          <Typography variant="caption" sx={{ display: 'block', mt: 2.5, color: 'var(--text-secondary)' }}>
            Click the camera icon to upload a photo
          </Typography>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card sx={{ mb: 3, borderRadius: '16px', bgcolor: 'var(--card-bg)', boxShadow: '0 2px 12px var(--shadow-sm)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--text)' }}>
            Personal Information
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            sx={{
              mb: 2.5,
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
              input: {
                color: 'var(--text)',
              },
              '& .MuiInputLabel-root': {
                color: 'var(--text-secondary)',
              },
            }}
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={profile.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || undefined)}
            placeholder="Enter your age"
            sx={{
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
              input: {
                color: 'var(--text)',
              },
              '& .MuiInputLabel-root': {
                color: 'var(--text-secondary)',
              },
            }}
          />
        </CardContent>
      </Card>

      {/* Body Stats */}
      <Card sx={{ mb: 3, borderRadius: '16px', bgcolor: 'var(--card-bg)', boxShadow: '0 2px 12px var(--shadow-sm)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--text)' }}>
            Body Metrics
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text)' }}>
                Height
              </Typography>
              <ToggleButtonGroup
                value={profile.heightUnit}
                exclusive
                onChange={(e, value) => value && handleChange('heightUnit', value)}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    px: 2,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    '&.Mui-selected': {
                      bgcolor: 'var(--accent-orange)',
                      color: 'var(--btn-primary-text)',
                      '&:hover': {
                        bgcolor: 'var(--accent-orange-dark)',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="cm">cm</ToggleButton>
                <ToggleButton value="ft">ft</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              fullWidth
              type="number"
              value={profile.height || ''}
              onChange={(e) => handleChange('height', parseFloat(e.target.value) || undefined)}
              placeholder={profile.heightUnit === 'cm' ? '170' : '5.7'}
              inputProps={{ step: '0.1' }}
              sx={{
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
                input: {
                  color: 'var(--text)',
                },
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text)' }}>
                Weight
              </Typography>
              <ToggleButtonGroup
                value={profile.weightUnit}
                exclusive
                onChange={(e, value) => value && handleChange('weightUnit', value)}
                size="small"
                sx={{
                  '& .MuiToggleButton-root': {
                    px: 2,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    '&.Mui-selected': {
                      bgcolor: 'var(--accent-orange)',
                      color: 'var(--btn-primary-text)',
                      '&:hover': {
                        bgcolor: 'var(--accent-orange-dark)',
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="kg">kg</ToggleButton>
                <ToggleButton value="lbs">lbs</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              fullWidth
              type="number"
              value={profile.weight || ''}
              onChange={(e) => handleChange('weight', parseFloat(e.target.value) || undefined)}
              placeholder={profile.weightUnit === 'kg' ? '70' : '154'}
              inputProps={{ step: '0.1' }}
              sx={{
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
                input: {
                  color: 'var(--text)',
                },
              }}
            />
          </Box>

          {bmi && (
            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--accent-gold-1) 0%, var(--accent-gold-2) 50%, var(--accent-gold-3) 100%)',
                textAlign: 'center',
                boxShadow: '0 2px 8px var(--shadow-md)',
              }}
            >
              <Typography variant="caption" sx={{ color: 'var(--text-on-gradient)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Body Mass Index
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'var(--text-on-gradient)', my: 1 }}>
                {bmi}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-on-gradient)', fontWeight: 500 }}>
                {getBMICategory(bmi)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card sx={{ mb: 3, borderRadius: '16px', bgcolor: 'var(--card-bg)', boxShadow: '0 2px 12px var(--shadow-sm)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--text)' }}>
            Appearance
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text)' }}>
              Theme
            </Typography>
            <ToggleButtonGroup
              value={theme}
              exclusive
              onChange={(e, value) => value && handleThemeChange(value)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 2,
                  py: 1,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '&.Mui-selected': {
                    bgcolor: 'var(--accent-orange)',
                    color: 'var(--btn-primary-text)',
                    '&:hover': {
                      bgcolor: 'var(--accent-orange-dark)',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="light">
                <LightModeIcon sx={{ fontSize: '1rem' }} />
                Light
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkModeIcon sx={{ fontSize: '1rem' }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, pb: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          disabled={!hasChanges}
          sx={{
            py: 1.75,
            minHeight: '48px',
            fontSize: '1rem',
            fontWeight: 600,
            background: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-text)',
            boxShadow: hasChanges ? '0 4px 12px var(--accent-orange-shadow)' : 'none',
            '&:hover': {
              background: 'var(--btn-primary-hover)',
            },
            '&:focus-visible': {
              outline: '3px solid var(--accent-orange)',
              outlineOffset: '2px',
            },
            '&:disabled': {
              opacity: 0.5,
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
            },
          }}
        >
          Save Changes
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleReset}
          sx={{
            py: 1.75,
            minHeight: '48px',
            fontSize: '1rem',
            fontWeight: 600,
            borderColor: 'var(--accent-orange)',
            color: 'var(--accent-orange)',
            borderWidth: '2px',
            '&:hover': {
              borderColor: 'var(--accent-orange-dark)',
              bgcolor: 'var(--accent-orange-bg-light)',
              borderWidth: '2px',
            },
            '&:focus-visible': {
              outline: '3px solid var(--accent-orange)',
              outlineOffset: '2px',
            },
          }}
        >
          Reset Profile
        </Button>
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx,
      }}
    />
  );
}
