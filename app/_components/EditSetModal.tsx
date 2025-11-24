'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Set } from '../_lib/storage';
import { colors } from '../_theme/theme';

interface EditSetModalProps {
  open: boolean;
  onClose: () => void;
  set: Set | null;
  setIndex: number;
  onSave: (updates: Partial<Set>) => void;
  onDelete: () => void;
}

export default function EditSetModal({
  open,
  onClose,
  set,
  setIndex,
  onSave,
  onDelete,
}: EditSetModalProps) {
  if (!set) return null;

  const [localSet, setLocalSet] = React.useState(set);

  React.useEffect(() => {
    if (set) {
      setLocalSet(set);
    }
  }, [set]);

  const handleSave = () => {
    onSave(localSet);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Delete this set?')) {
      onDelete();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          bgcolor: 'var(--card-bg)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 2, pt: 3, px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text)' }}>
          Edit Set {setIndex + 1}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 2, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <FormControl fullWidth>
            <InputLabel>Set Type</InputLabel>
            <Select
              value={localSet.type}
              label="Set Type"
              onChange={(e) =>
                setLocalSet({ ...localSet, type: e.target.value as any })
              }
              sx={{
                bgcolor: 'var(--input-bg)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--input-border)',
                },
              }}
            >
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="warm-up">Warm-up</MenuItem>
              <MenuItem value="drop">Drop Set</MenuItem>
              <MenuItem value="AMRAP">AMRAP</MenuItem>
              <MenuItem value="HIIT">HIIT</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            type="number"
            label="Reps"
            value={localSet.reps || ''}
            onChange={(e) =>
              setLocalSet({
                ...localSet,
                reps: parseInt(e.target.value) || 0,
              })
            }
            inputProps={{ min: 0 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'var(--input-bg)',
                '& fieldset': {
                  borderColor: 'var(--input-border)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="number"
            label="Weight (lbs)"
            value={localSet.weight || ''}
            onChange={(e) =>
              setLocalSet({
                ...localSet,
                weight: parseInt(e.target.value) || 0,
              })
            }
            inputProps={{ min: 0, step: 5 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'var(--input-bg)',
                '& fieldset': {
                  borderColor: 'var(--input-border)',
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="number"
            label="Duration (seconds)"
            value={localSet.duration || ''}
            onChange={(e) =>
              setLocalSet({
                ...localSet,
                duration: parseInt(e.target.value) || undefined,
              })
            }
            placeholder="60"
            inputProps={{ min: 0, step: 15 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'var(--input-bg)',
                '& fieldset': {
                  borderColor: 'var(--input-border)',
                },
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2.5,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={handleDelete}
          startIcon={<DeleteIcon />}
          sx={{
            color: '#F44336',
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'rgba(244, 67, 54, 0.1)',
            },
          }}
        >
          Delete
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            onClick={onClose}
            sx={{
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              background: 'var(--btn-primary-bg)',
              color: 'var(--btn-primary-text)',
              fontWeight: 600,
              minWidth: '80px',
              '&:hover': {
                background: 'var(--btn-primary-hover)',
              },
            }}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
