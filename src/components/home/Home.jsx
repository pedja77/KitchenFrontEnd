import { Box, Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import RecipeCard from "../lib/RecipeCard";
import { getUser } from "../../utils/token";
import { Star, StarBorder, Warning } from "@mui/icons-material";



const Home = () => {
    const recipes = useLoaderData();
    const [recipesList, setRecipes] = useState(structuredClone(recipes));
    const [loggedUser, setLoggedUser] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [limFactors, setLimFactors] = useState([]);

    // if(getUser() !== null && getUser().role === "REGULARUSER") {
      useEffect(() => {
          // let ignore = false;
          const getLoggedUser = async () => {
          let res = await fetch(`http://localhost:8080/api/v1/project/register/getLoggedInUser/${getUser().user}`, {
              method: "GET",
              headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + getUser().token,
              },
          });
          let result = await res.json();
          console.log(JSON.stringify(result, null, 4));
              setLoggedUser(result);
              setFavRecipes(result.favRecipesId);
              setLimFactors(result.myLimitigFactors);
          };
          getLoggedUser();
          
      }, []);
  // }
 
 

    
 

    return (
    <>
    <Typography sx={{textAlign:"center", 
          paddingTop:"20px", backgroundColor:"coral", 
          fontSize:"20px", fontWeight:"Bold" }}>Welcome to Hell's Kitchen!!</Typography>
    <Container sx={{backgroundColor: "#bf360c", padding:"30px 30px"}}>
    
       {/* return condition1 ? value1
          : condition2 ? value2
          : condition3 ? value3
          : value4;
        */}



      <Grid container spacing={3}> 
      {recipesList.map((r) => 
      favRecipes.indexOf(r.id) > -1 ?    
      <><RecipeCard props={r} /><Star sx={{color:"yellow"}} /> </> :
      r.limitingFactors.includes(...limFactors) ? 
      <><RecipeCard props={r} /><Warning sx={{ color: "red" }} /> </> : 
      favRecipes.indexOf(r.id) > -1 && r.limitingFactors.includes(...limFactors) ?
      <><RecipeCard props={r}/> <Star sx={{color:"yellow"}} /> <Warning sx={{ color: "red" }} /> </> :
      <RecipeCard props={r}/>  
      )}
      </Grid>
          
    
    {console.log(limFactors)}
    {console.log(favRecipes)}
    {console.log(recipesList.map(e=> e.limitingFactors))}
    </Container>
    <Container>
        <Typography>Some info</Typography>
      </Container>
      {/* {favRecipes} */}
      <br/>
      
    </>
    )     
}

export default Home;