import { Grid, Typography } from '@mui/material'
import './App.css'
import classes from './_styles/mui-styles'
import AddCategoryButton from './_components/AddCategory/add-category-button'
import ListDisplay from './_components/ListDisplay/list-display'
import { CategoriesProvider, useCategories } from './contexts/CategoriesContext'

function AppContent() {
  const { 
    isSaving,
    justSaved
  } = useCategories();

  return (
    <>
      <Grid container sx={classes.mainContainer}>
        <Grid container sx={classes.titleContainer}>
          <Typography variant="h1" sx={classes.titleText}>
            Impossible Checklist
          </Typography>
          {(isSaving || justSaved) && (
            <Typography 
              variant="body2" 
              sx={{ 
                position: 'fixed', 
                top: 16, 
                right: 16, 
                backgroundColor: justSaved ? '#4caf50' : '#ff9800',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                zIndex: 1000
              }}
            >
              {isSaving ? 'Saving...' : 'Saved'}
            </Typography>
          )}
        </Grid>
        <AddCategoryButton />
        <Grid container sx={classes.categoryContainer}>
          <ListDisplay />
        </Grid>
      </Grid>
    </>
  )
}

function App() {
  return (
    <CategoriesProvider>
      <AppContent />
    </CategoriesProvider>
  );
}

export default App
