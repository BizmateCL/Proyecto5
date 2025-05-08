import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
    .then(response => response.json())
    .then(data => setRecipes(data.meals || []))
    .catch(error => {
      console.log('error', error);
    })
    .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      {
        recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
            <Card>
              <CardActionArea
                component={Link}
                to={`/recetas/${recipe.strMeal}`}
                state={{ recipe }}
              >
                <CardMedia
                  component="img"
                  height='140'
                  image={recipe.strMealThumb} 
                />
                <CardContent>
                  <Typography gutterBottom variant='h6'>{recipe.strMeal}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default RecipeList

// EJERCICIO 3
// Crea dos estados utilizando el hook useState. Un estado que nos permita guardar las recetas al consultar la API y otro que permita manejar
// el momento es que la data esta cargandose.