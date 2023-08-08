import { Card, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";


const RecipeDetails = () => {
const recipe = useLoaderData();



return (
    <Container>
        <Card sx={{}} variant="outlined">
            <CardHeader title={recipe.title}
            sx={{display:"flex", textAlign:"center", backgroundColor: "rgb(224, 94, 43)"}} 
            subheader={`Created by: ${recipe.cook}`} 
            />
            <CardMedia></CardMedia>
            <CardContent sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                backgroundColor: "rgb(224, 94, 43)"
            }}>
                <Grid container spacing={3} 
                direction="column" alingItems="center" justifyContent="center"
                 sx={{padding: '5px', maxWidth: '50%'}}>   
                </Grid>
                <Grid item xs={6}>
                    {recipe.description}
                </Grid>
                <Grid item xs={6}>
                    {recipe.steps}
                </Grid>
                <Grid item xs={6}>
                    For: {recipe.amount} 
                </Grid>
                <Grid>
                   About {recipe.timeToPrepare} minutes.
                </Grid>
                
            </CardContent>
        </Card>
    </Container>
)
}

export default RecipeDetails;