import React, { useState } from 'react'

const   ReceipeList= () => {
  const [recipes, setRecipes] =useState([]);
  const[isLoading, setIsLoading] = useState(true);
 

  return (
    <div> ReceipList </div>
  )
}

export default ReceipeList

//se usa la siguiente extension : https://themealdb.com/api/json/v1/1/search.php?s=
//hay que tener la extension de chrome json formatter 

