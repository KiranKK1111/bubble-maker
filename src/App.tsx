import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton as MuiIconButton,
  Grow,
  Slide,
} from '@mui/material';
import {
  KeyboardArrowDown,
  Close,
  BarChart,
  GridOn,
  TableChart,
  Whatshot,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { ChartView } from './components/ChartView.tsx';
import { HeatmapView } from './components/HeatmapView.tsx';
import { TableView } from './components/TableView.tsx';
import { GridView } from './components/GridView.tsx';

type ViewType = 'chart' | 'heatmap' | 'table' | 'grid' | null;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openView = (view: ViewType) => {
    setActiveView(view);
  };

  const closeView = () => {
    setActiveView(null);
  };

  const menuItems = [
    { id: 'chart', icon: <BarChart />, label: 'Chart', component: ChartView },
    { id: 'heatmap', icon: <Whatshot />, label: 'Heatmap', component: HeatmapView },
    { id: 'table', icon: <TableChart />, label: 'Table', component: TableView },
    { id: 'grid', icon: <GridOn />, label: 'Grid', component: GridView },
  ];

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#f5f5f5',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Down Arrow */}
      <Box
        onClick={toggleMenu}
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateX(-50%) scale(1.1)',
          },
        }}
      >
        {menuOpen ? (
          <KeyboardArrowUp sx={{ fontSize: 70, color: 'primary.main' }} />
        ) : (
          <KeyboardArrowDown
            sx={{
              fontSize: 70,
              color: 'primary.main',
              animation: 'arrow-bounce 2s infinite',
              '@keyframes arrow-bounce': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(4px)' },
              },
            }}
          />
        )}
      </Box>

      {/* Animated Icon Menu */}
      <Box
        sx={{
          position: 'absolute',
          top: 90,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          zIndex: 999,
        }}
      >
        {menuItems.map((item, index) => (
          <Grow
            key={item.id}
            in={menuOpen}
            timeout={300 + index * 150}
            style={{
              transformOrigin: 'center top',
            }}
          >
            <Box>
              <Slide
                direction="down"
                in={menuOpen}
                timeout={400 + index * 150}
              >
                <IconButton
                  onClick={() => openView(item.id as ViewType)}
                  sx={{
                    bgcolor: 'white',
                    width: 64,
                    height: 64,
                    boxShadow: 2,
                    transition: 'all 0.3s ease',
                    animation: menuOpen ? `bubble-up 0.6s ease ${index * 0.15}s` : 'none',
                    '@keyframes bubble-up': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(-20px) scale(0.8)',
                      },
                      '50%': {
                        transform: 'translateY(5px) scale(1.1)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0) scale(1)',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'primary.light',
                      color: 'white',
                      boxShadow: 6,
                      transform: 'translateY(-4px) scale(1.15)',
                    },
                  }}
                >
                  {React.cloneElement(item.icon, { sx: { fontSize: 32 } })}
                </IconButton>
              </Slide>
            </Box>
          </Grow>
        ))}
      </Box>

      {/* Dialogs for each view */}
      {menuItems.map((item) => (
        <Dialog
          key={item.id}
          open={activeView === item.id}
          onClose={closeView}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              minHeight: '80vh',
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.icon}
              {item.label}
            </Box>
            <MuiIconButton onClick={closeView} size="small">
              <Close />
            </MuiIconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 3 }}>
            {activeView === item.id && <item.component />}
          </DialogContent>
        </Dialog>
      ))}
    </Box>
  );
}

export default App;
