import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Search,
  Favorite,
  FavoriteBorder,
  Share,
  ShoppingCart,
  Star,
} from '@mui/icons-material';

interface GridItem {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  inStock: boolean;
  liked: boolean;
}

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books'];

const generateGridData = (): GridItem[] => {
  const titles = [
    'Premium Headphones',
    'Smart Watch',
    'Laptop Stand',
    'Wireless Mouse',
    'Desk Lamp',
    'Coffee Maker',
    'Running Shoes',
    'Yoga Mat',
    'Camera Lens',
    'Backpack',
    'Water Bottle',
    'Notebook Set',
  ];

  const descriptions = [
    'High-quality product with excellent features',
    'Perfect for everyday use',
    'Durable and stylish design',
    'Best in class performance',
  ];

  const categoryList = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books'];

  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: titles[i % titles.length],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    price: Math.floor(Math.random() * 500) + 50,
    category: categoryList[Math.floor(Math.random() * categoryList.length)],
    rating: Math.floor(Math.random() * 2) + 3.5,
    image: `https://source.unsplash.com/400x300/?product,${i}`,
    inStock: Math.random() > 0.2,
    liked: false,
  }));
};

export const GridView: React.FC = () => {
  const [items, setItems] = useState(generateGridData());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const toggleLike = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5" gutterBottom>
        Product Grid
      </Typography>

      <Paper elevation={2} sx={{ p: 3 }}>
        {/* Filters */}
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Grid */}
        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'white' },
                    }}
                    onClick={() => toggleLike(item.id)}
                  >
                    {item.liked ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  {!item.inStock && (
                    <Chip
                      label="Out of Stock"
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {item.title}
                    </Typography>
                    <Chip label={item.category} size="small" color="primary" variant="outlined" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Star sx={{ color: '#ffc107', fontSize: 20 }} />
                    <Typography variant="body2">{item.rating.toFixed(1)}</Typography>
                  </Box>
                  <Typography variant="h6" color="primary.main">
                    ${item.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    disabled={!item.inStock}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <IconButton color="primary">
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredItems.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products found
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
