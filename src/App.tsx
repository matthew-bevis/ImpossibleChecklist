import { Grid, Typography } from '@mui/material'
import './App.css'
import classes from './_styles/mui-styles'
import AddCategoryButton from './_components/CategoryPopup/add-category-button'
import ListDisplay from './_components/ListDisplay/list-display'
import { useElectronData } from './_hooks/useElectronData'

function App() {
  const { 
    categories, 
    isLoading, 
    error, 
    hasUnsavedChanges,
    isSaving,
    addCategory,
    updateCategories,
    saveData,
    reloadData
  } = useElectronData();

  return (
    <>
      <Grid container sx={classes.mainContainer}>
        <Grid container sx={classes.titleContainer}>
          <Typography variant="h1" sx={classes.titleText}>
            Impossible Checklist
          </Typography>
        </Grid>
        <AddCategoryButton onAddCategory={addCategory} />
        <Grid container sx={classes.categoryContainer}>
          <ListDisplay 
            categories={categories}
            isLoading={isLoading}
            error={error}
            hasUnsavedChanges={hasUnsavedChanges}
            isSaving={isSaving}
            updateCategories={updateCategories}
            saveData={saveData}
            reloadData={reloadData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
