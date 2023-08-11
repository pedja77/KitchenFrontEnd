import { LineAxis, LineStyle, StarBorder, Warning } from "@mui/icons-material";
import { Card, CardContent, Paper, CardHeader, CardMedia, Container, 
    Grid, Typography, Button, CardActionArea, List, ListItem } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { getUser } from "../../utils/token";
import { useEffect, useState } from "react";


// const Item = styled(Card)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : 'inherit',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

        const RecipeDetails = () => {
        const recipe = useLoaderData();
        const [loggedUser, setLoggedUser] = useState([]);

        if(getUser() !== null) {
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
            };
            getLoggedUser();
            
        }, []);
    }

    const addRecipe = async () => {
        let response = await fetch(`http://localhost:8080/api/v1/project/regUser/rec/${recipe.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             Authorization: "Bearer " + getUser().token
          },
        });
        if (response.ok) {
          let d = await response.json();
          console.log("Recipe added to user's cookbook");
          addRecipe();
        } else {
          console.log("There was a request error.");
        }
      };




    return (
        
    <Container sx={{display:"flex", justifyContent:"center", flexDirection:"row", marginTop:"20px"}}>
        
        
        
        <Card sx={{width:"800px"}} variant="outlined">
            <CardHeader title={recipe.title} 
            titleTypographyProps={{fontSize:"30px", fontWeight:"bold" }}
            sx={{display:"flex", textAlign:"center", 
            backgroundColor: "#bf360c", padding:"20px"}} 
            subheader={`Created by: ${recipe.cook}`}
            subheaderTypographyProps={{color:"black", fontStyle:"italic"}}
            /> 
           <CardMedia
                 sx={{justifyContent:"center"}}  
                 component="svg"
                 width="100%"
                 height="200px"
                 border="1px solid black"
                image="/Food-luxury-pasta.svg"
                title={recipe.title}
                />
            <CardContent sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",

                backgroundColor: "rgb(224, 94, 43)"
            }}>
                <Typography sx={{fontStyle: "oblique", fontWeight:"bold"}}>{recipe.description}</Typography>
                <Typography>Approximately {recipe.amount == 1 ? `${recipe.amount} serving` : `${recipe.amount} servings`}</Typography>
                <Typography>{recipe.timeToPrepare} minutes.</Typography>
                <Grid container spacing={2} direction='row' 
                alignItems='row' justifyContent="center"  
                sx={{padding: 'auto', maxWidth: '100%'}}>
                    <Grid container   item xs={4} maxWidth="40%" textAlign="left"
                    sx={{display:"flex", flexDirection:"column"}}>
                        <Typography fontWeight="bold">Ingredients</Typography>
                        <List sx={{lineHeight:"5px", color:"white"}}>
                        {Object.entries(recipe.ingredientAmount).map(([key, value]) =>
                        <ListItem>{key}: {value}</ListItem>)}
                        </List  >
                        <Typography fontWeight="bold">Nutrition per 100g:</Typography>
                        <List sx={{lineHeight:"5px", color:"white", flexDirection:"row-reverse"}}>
                        {Object.entries(recipe.nutrition).map(([key, value]) => 
                        <ListItem>{key == "calories" ? `${key}: ${value.toFixed(0)}kCal` : `${key}: ${value.toFixed(1)}g`}</ListItem>)}
                        </List>
                        {getUser() !== null && loggedUser !== null ? 
                        <>
                        <Typography sx={{ fontWeight: "bold" }}>Contains:</Typography>
                        
                        <List sx={{lineHeight: "5px", color:"white"}}>
                            {recipe.limitingFactors.map(lf => <ListItem>{lf}</ListItem>)}
                            </List>    
                        </> 
                        : null }
                    </Grid>
                    
                    <Grid container item xs={6} maxWidth="50%" textAlign="center" >
                        <Typography  sx={{fontWeight: "bold", color: ""}}>Preparation</Typography>
                        
                        <Typography sx={{
                            textAlign:"left",
                            color:"white",
                        }}>{recipe.steps}</Typography>
                    </Grid>
                </Grid>
                
            </CardContent>
        </Card>
        <Button variant="outlined" sx={{alignItems:"start", 
        marginLeft:"40px", height:"10%"}} onClick={() => {addRecipe()}}>ADD TO FAVORITES</Button>
    {console.log(JSON.stringify(loggedUser, null, 4))}
    </Container>
    )
}

export default RecipeDetails;