import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// Generate heatmap data
const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  return hours.map((hour) => ({
    hour,
    values: days.map(() => Math.floor(Math.random() * 100)),
  }));
};

const getColor = (value: number) => {
  if (value < 20) return '#e3f2fd';
  if (value < 40) return '#90caf9';
  if (value < 60) return '#42a5f5';
  if (value < 80) return '#1976d2';
  return '#0d47a1';
};

export const HeatmapView: React.FC = () => {
  const data = generateHeatmapData();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5" gutterBottom>
        Activity Heatmap
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Weekly Activity Pattern (24 Hours)
        </Typography>
        
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ minWidth: 700 }}>
            {/* Days header */}
            <Box sx={{ display: 'flex', mb: 1, ml: 6 }}>
              {days.map((day) => (
                <Box
                  key={day}
                  sx={{
                    flex: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                >
                  {day}
                </Box>
              ))}
            </Box>

            {/* Heatmap grid */}
            {data.map((row, rowIndex) => (
              <Box key={row.hour} sx={{ display: 'flex', mb: 0.5, alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    fontSize: '0.75rem',
                    textAlign: 'right',
                    pr: 1,
                  }}
                >
                  {row.hour}
                </Box>
                {row.values.map((value, colIndex) => (
                  <Box
                    key={`${rowIndex}-${colIndex}`}
                    sx={{
                      flex: 1,
                      height: 20,
                      bgcolor: getColor(value),
                      border: '1px solid #fff',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      color: value > 60 ? 'white' : 'black',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        zIndex: 1,
                        boxShadow: 2,
                      },
                    }}
                    title={`${days[colIndex]} ${row.hour}: ${value}%`}
                  >
                    {value}
                  </Box>
                ))}
              </Box>
            ))}

            {/* Legend */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2">Low</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[0, 20, 40, 60, 80].map((val) => (
                  <Box
                    key={val}
                    sx={{
                      width: 40,
                      height: 20,
                      bgcolor: getColor(val),
                      border: '1px solid #ccc',
                    }}
                  />
                ))}
              </Box>
              <Typography variant="body2">High</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Second heatmap - Simpler version */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          User Engagement Heatmap
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 1 }}>
          {Array.from({ length: 100 }, (_, i) => {
            const value = Math.floor(Math.random() * 100);
            return (
              <Box
                key={i}
                sx={{
                  aspectRatio: '1',
                  bgcolor: getColor(value),
                  borderRadius: 1,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  color: value > 60 ? 'white' : 'black',
                  '&:hover': {
                    transform: 'scale(1.2)',
                    zIndex: 1,
                    boxShadow: 3,
                  },
                }}
              >
                {value}
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};
