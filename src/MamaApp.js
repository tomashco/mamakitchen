import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import AppLayout from './AppLayout'
import KitchenList from './KitchenList'
import Kitchen from './Kitchen'
import kitchenData from './dummyData/kitchenData'
import recipeData from './dummyData/recipeData'

function MamaApp() {
  const [kitchens, setKitchens] = useState(kitchenData)
  const [recipes, setRecipes] = useState(recipeData)
  const findKitchen = (kitchenId) => {
    return kitchens.find((kitchen) => {
      return kitchen.id === kitchenId;
    });
  }
  const findRecipes = (kitchenId) => {
    return recipes.filter((recipe) => recipe.id === kitchenId);
  }

  return (
    <Route render={({location}) => (
      <Switch location={location}>
        <Route exact path="/kitchen/:id"
          render={(routeProps) => (
            <AppLayout {...routeProps}>
              <Kitchen
                {...routeProps}
                kitchenInfo={findKitchen(routeProps.match.params.id)}
                recipes = {findRecipes(routeProps.match.params.id)}
                />
            </AppLayout>
            )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <AppLayout {...routeProps}>
              <KitchenList
                kitchens={kitchens}
                {...routeProps}
                />
              </AppLayout>
          )}/>
        <Route
          render={(routeProps) => (
            <AppLayout {...routeProps}>
              <KitchenList
                kitchens={kitchenData}
                {...routeProps}
                />
            </AppLayout>
            )}/>
      </Switch>
    )}/>
  );
}

export default MamaApp;
