import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import { withFirebase } from './Firebase';
import AppLayout from './AppLayout'
import KitchenList from './KitchenList'
import Kitchen from './Kitchen'
import Login from './Login'
import Signin from './Signin'
import kitchenData from './dummyData/kitchenData'
import recipeData from './dummyData/recipeData'

function App({firebase}) {
  const [kitchens, setKitchens] = useState(kitchenData)
  const [recipes, setRecipes] = useState(recipeData)
  const [authUser, setAuthUser] = useState(null)

  console.log("authUser:", authUser)

  useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ?
        setAuthUser(authUser.email)
      : setAuthUser(null)
      });
    });

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
        <Route exact path="/login"
          render={(routeProps) => (
            <AppLayout {...routeProps} authUser={authUser}>
              <Login
                {...routeProps}
                />
            </AppLayout>
            )}
        />
        <Route exact path="/signin"
          render={(routeProps) => (
            <AppLayout {...routeProps} authUser={authUser}>
              <Signin {...routeProps}/>
            </AppLayout>
            )}
        />
        <Route exact path="/kitchen/:id"
          render={(routeProps) => (
            <AppLayout {...routeProps} authUser={authUser}>
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
            <AppLayout {...routeProps} authUser={authUser}>
              <KitchenList
                kitchens={kitchens}
                {...routeProps}
                />
              </AppLayout>
          )}/>
        <Route
          render={(routeProps) => (
            <AppLayout {...routeProps} authUser={authUser}>
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

export default withFirebase(App);
