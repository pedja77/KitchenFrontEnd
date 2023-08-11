import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import TableTemplate from "../lib/TableTemplate";
import { produce } from "immer";
import { deleteResource } from "../../utils/paths";

const Recipes = () => {
  const recipesList = useLoaderData();
  const [recipes, setRecipes] = useState(structuredClone(recipesList));
  const fetcher = useFetcher();

  const removeRecipe = async (e, t, collectionName) => {
    console.log("removeRecipe", t, collectionName);
    setRecipes(
      produce(recipes, (draft) => {
        const index = draft.findIndex((e) => e.id === t.id);
        if (index > -1) draft.splice(index, 1);
      })
    );
    // fetcher.submit({},{
    //     method: "delete", 
    //     action: `/admin/recipes/${t.id}`
    // })
    const response = await deleteResource(
        `http://localhost:8080/api/v1/project/recipes/${t.id}`
      );

  };

  const recipesTableProps = {
    tableLabel: "Recipes",
    tableHeaders: ["Id", "Title", "Preparation time", "Cook", "Posted"],
    tableData: recipes,
    tdConfig: ["id", "title", "timeToPrepare", "cook", "createdOn"],
    removeFn: removeRecipe,
    collectionName: "recipes",
    editUrl: "/",
    deleteBtn: true,
  };
  return (
    <Box>
      <TableTemplate props={recipesTableProps} />
    </Box>
  );
};

export default Recipes;
