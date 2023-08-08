import { AccessTime } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, List } from "@mui/material";
import { useNavigate } from "react-router-dom";


const RecipeCard = ({props}) => {
    const nav = useNavigate();


    return (
        <>
        <Grid item xs={4}  >
            <Card sx={
                    {"&:hover": {
                        boxShadow: "10",
                        opacity: "70%",
                        color: "white",
                        cursor: "pointer"
                }
           }}  onClick={() => nav(`/recipe/${props.id}`)}>
             <CardHeader sx={{display: "flex", textAlign: "center", 
                backgroundColor: "rgb(224, 94, 43)", paddingBottom:"2"}} 
                title={props.title} subheader={`Created on:  ${props.createdOn}`}/>
            
            <CardMedia
                 sx={{justifyContent:"center"}}  
                 component="svg"
                 height="200"
                 width="inherit"

                image="https://upload.wikimedia.org/wikipedia/commons/2/2e/Food-luxury-pasta.svg"
                title={props.title}
                />
                <CardContent sx={{display: "flex", flexDirection: "column", alignItems:"center", backgroundColor: "rgb(224, 94, 43)"}}>
                {props.description} 
                <br/>
                By: {props.cook}
                <br/>
                {/* {props.ingredients.map( e=> e.name)}  */}
                <br/>
                {/*test iteracije kroz mapu a i podsetnik za NK*/}
                {/* {Object.entries(props.ingredientAmount).map(([key, value]) =>  `${key}: ${value}`)}  */}
                </CardContent>
               
                
            </Card>
        </Grid>
        
        </>
    )
}

export default RecipeCard;