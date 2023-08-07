import { Card, CardContent, CardHeader, CardMedia, Grid, List } from "@mui/material";
import { useNavigate } from "react-router-dom";


const RecipeCard = ({props}) => {
    const nav = useNavigate();


    return (
        <>
        <Grid item xs={4}>
            <Card   >
            <CardMedia
                 sx={{justifyContent:"center"}}  
                 component="svg"
                 height="200"
                 width="inherit"

                image="https://upload.wikimedia.org/wikipedia/commons/2/2e/Food-luxury-pasta.svg"
                title={props.title}
                />
                <CardHeader sx={{display: "flex", textAlign: "center", 
                backgroundColor: "rgb(224, 94, 43)", paddingBottom:"2"}} 
                title={props.title} subheader={`Created on:  ${props.createdOn}`}/>
                  
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems:"center", backgroundColor: "rgb(224, 94, 43)"}}>
                {props.description} 
                <br/>
                {props.timeToPrepare} minutes
                <br/>
                By: {props.cook}
                <br/>
                
                </CardContent>
                
            </Card>
        </Grid>
        
        </>
    )
}

export default RecipeCard;