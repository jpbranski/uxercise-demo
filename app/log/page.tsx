'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  Collapse,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DownloadIcon from '@mui/icons-material/Download';
import { loadLogs, WorkoutLog } from '../_lib/storage';
import { saveFile } from '../_lib/tauri';

export default function LogPage() {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setLogs(loadLogs());
  }, []);

  const handleExportSummary = () => {
    const csv = [
      ['Date', 'Workout', 'Duration (min)', 'Exercises', 'Notes'].join(','),
      ...logs.map(log => [
        new Date(log.completedAt).toLocaleDateString(),
        `"${log.workoutName}"`,
        log.duration,
        log.exercises.length,
        `"${log.notes || ''}"`,
      ].join(',')),
    ].join('\n');

    saveFile('workout-summary.csv', csv);
    setAnchorEl(null);
  };

  const handleExportDetailed = () => {
    const csv = [
      ['Date', 'Workout', 'Exercise', 'Set Type', 'Reps', 'Weight', 'Duration', 'Completed'].join(','),
      ...logs.flatMap(log =>
        log.exercises.flatMap(exercise =>
          exercise.sets.map(set => [
            new Date(log.completedAt).toLocaleDateString(),
            `"${log.workoutName}"`,
            `"${exercise.name}"`,
            set.type,
            set.reps || '',
            set.weight || '',
            set.duration || '',
            set.completed ? 'Yes' : 'No',
          ].join(','))
        )
      ),
    ].join('\n');

    saveFile('workout-detailed.csv', csv);
    setAnchorEl(null);
  };

  const filterByDateRange = (log: WorkoutLog) => {
    const logDate = new Date(log.completedAt);
    const now = new Date();

    if (dateRange === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return logDate >= weekAgo;
    }
    if (dateRange === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return logDate >= monthAgo;
    }
    return true;
  };

  const filteredLogs = logs
    .filter(log => log.workoutName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(filterByDateRange)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--bg)', p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--text)' }}>
          Workout Log
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            minHeight: '48px',
            px: 2,
            background: 'var(--btn-primary-bg)',
            color: 'var(--btn-primary-text)',
            '&:hover': {
              background: 'var(--btn-primary-hover)',
            },
          }}
        >
          Export
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleExportSummary}>
            <DownloadIcon sx={{ mr: 1, fontSize: 18 }} />
            Summary CSV
          </MenuItem>
          <MenuItem onClick={handleExportDetailed}>
            <DownloadIcon sx={{ mr: 1, fontSize: 18 }} />
            Detailed CSV
          </MenuItem>
        </Menu>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'var(--text-muted)' }} />,
          }}
          sx={{
            mb: 2,
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
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['all', 'week', 'month'].map(range => (
            <Chip
              key={range}
              label={range === 'all' ? 'All Time' : range === 'week' ? 'This Week' : 'This Month'}
              onClick={() => setDateRange(range)}
              sx={{
                bgcolor: dateRange === range ? 'var(--accent-orange)' : 'var(--surface)',
                color: dateRange === range ? 'var(--btn-primary-text)' : 'var(--text)',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: dateRange === range ? 'var(--accent-orange-dark)' : 'var(--tile-bg)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <Card sx={{ borderRadius: '14px', bgcolor: 'var(--card-bg)' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>
              {searchTerm ? 'No logs found' : 'No workouts logged yet'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        filteredLogs.map(log => (
          <Card key={log.id} sx={{ mb: 2, borderRadius: '14px', bgcolor: 'var(--card-bg)', boxShadow: '0 2px 12px var(--shadow-sm)' }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', cursor: 'pointer' }}
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'var(--text)' }}>
                    {log.workoutName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                    {new Date(log.completedAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label={`${log.duration} min`} size="small" />
                    <Chip label={`${log.exercises.length} exercises`} size="small" />
                  </Box>
                </Box>
                <IconButton size="small">
                  {expandedId === log.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>

              <Collapse in={expandedId === log.id}>
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid var(--border)' }}>
                  {log.exercises.map((exercise, idx) => (
                    <Box key={idx} sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        {exercise.name}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        {exercise.sets.map((set, setIdx) => (
                          <Box
                            key={set.id}
                            sx={{
                              display: 'flex',
                              gap: 2,
                              p: 1,
                              bgcolor: set.completed ? 'var(--tile-bg)' : 'var(--surface)',
                              borderRadius: '8px',
                              fontSize: '0.875rem',
                            }}
                          >
                            <Typography variant="caption" sx={{ minWidth: 60 }}>
                              Set {setIdx + 1}:
                            </Typography>
                            {set.reps && (
                              <Typography variant="caption">
                                {set.reps} reps
                              </Typography>
                            )}
                            {set.weight && (
                              <Typography variant="caption">
                                @ {set.weight} lbs
                              </Typography>
                            )}
                            {set.duration && (
                              <Typography variant="caption">
                                {set.duration}s
                              </Typography>
                            )}
                            <Typography variant="caption" sx={{ ml: 'auto', fontStyle: 'italic' }}>
                              {set.type}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                  {log.notes && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'var(--tile-bg)', borderRadius: '8px' }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                        Notes:
                      </Typography>
                      <Typography variant="body2">{log.notes}</Typography>
                    </Box>
                  )}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        ))
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
        ...props.sx,
      }}
    />
  );
}
