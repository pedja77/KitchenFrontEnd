import { AccessTime, PersonPinCircleSharp, Star } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/token";


const RecipeCard = ({props}) => {
    const nav = useNavigate();
   


    return (
        <>
        <Grid item xs={5}  >
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
                title={props.title} titleTypographyProps={{fontWeight:"bold"}}
                subheader={`Created on:  ${props.createdOn}`}
                subheaderTypographyProps={{color: "black"}}/>
            <CardMedia
                 sx={{justifyContent:"center"}}  
                 component="svg"
                 height="200"
                 width="inherit"

                image="/Food-luxury-pasta.svg"
                title={props.title}
                />
                <CardContent 
                sx={{display: "flex", flexDirection: "column", 
                alignItems:"center", backgroundColor: "rgb(224, 94, 43)"}}>
                
                
                </CardContent>
               
                
            </Card>
        </Grid>
        
        </>
    )
}

export default RecipeCard;