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
import { loadProfile, saveProfile, Profile } from '../_lib/storage';
import { colors } from '../_theme/theme';

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Athlete',
    heightUnit: 'cm',
    weightUnit: 'kg',
  });
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    setHasChanges(false);
    alert('Profile saved successfully!');
  };

  const handleReset = () => {
    setProfile(loadProfile());
    setHasChanges(false);
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

  const bmi = calculateBMI();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAFAFA', p: 3 }}>
      {/* Header */}
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        My Account
      </Typography>

      {/* Avatar */}
      <Card sx={{ mb: 3, borderRadius: '14px' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={profile.avatar}
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                background: colors.gradients.orangeToGold,
                fontSize: '3rem',
              }}
            >
              {!profile.avatar && <PersonIcon sx={{ fontSize: '3rem' }} />}
            </Avatar>
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: colors.primary.main,
                color: '#FFF',
                '&:hover': { bgcolor: colors.primary.dark },
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
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: colors.neutral.darkGray }}>
            Click camera to upload photo
          </Typography>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card sx={{ mb: 3, borderRadius: '14px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Personal Information
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={profile.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value) || undefined)}
            sx={{ mb: 2 }}
          />
        </CardContent>
      </Card>

      {/* Body Stats */}
      <Card sx={{ mb: 3, borderRadius: '14px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Body Stats
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Height
              </Typography>
              <ToggleButtonGroup
                value={profile.heightUnit}
                exclusive
                onChange={(e, value) => value && handleChange('heightUnit', value)}
                size="small"
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
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Weight
              </Typography>
              <ToggleButtonGroup
                value={profile.weightUnit}
                exclusive
                onChange={(e, value) => value && handleChange('weightUnit', value)}
                size="small"
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
            />
          </Box>

          {bmi && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: '10px',
                background: colors.gradients.goldToAmber,
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: colors.neutral.charcoal }}>
                Body Mass Index (BMI)
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: colors.neutral.charcoal }}>
                {bmi}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save Changes
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleReset}
          disabled={!hasChanges}
        >
          Reset
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
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx,
      }}
    />
  );
}
