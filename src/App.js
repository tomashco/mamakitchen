import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useAuth} from './Contexts/userContext'
import {userContext} from './Contexts/userContext'

import AppLayout from './AppLayout'
import KitchenList from './KitchenList'
import Kitchen from './Kitchen'
import Login from './Login'
import Signin from './Signin'
import kitchenData from './dummyData/kitchenData'
import recipeData from './dummyData/recipeData'

const App = () => {
  const [kitchens, setKitchens] = useState(kitchenData)
  const [recipes, setRecipes] = useState(recipeData)
  const { user } = useAuth()

  const findKitchen = (kitchenId) => {
    return kitchens.find((kitchen) => {
      return kitchen.id === kitchenId;
    });
  }

  const findRecipes = (kitchenId) => {
    return recipes.filter((recipe) => recipe.id === kitchenId);
  }

  return (
    <userContext.Provider value={{user}}>
      <Route render={({location}) => (
        <Switch location={location}>
          <Route exact path="/login"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <Login
                  {...routeProps}
                  />
              </AppLayout>
              )}
          />
          <Route exact path="/signin"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <Signin {...routeProps}/>
              </AppLayout>
              )}
          />
          <Route exact path="/kitchen/edit/:id"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <Kitchen
                  {...routeProps}
                  kitchenInfo={findKitchen(routeProps.match.params.id)}
                  recipes = {findRecipes(routeProps.match.params.id)}
                  />
              </AppLayout>
              )}
          />
          <Route exact path="/kitchen/:id"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
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
              <AppLayout {...routeProps} >
                <KitchenList
                  kitchens={kitchens}
                  {...routeProps}
                  />
                </AppLayout>
            )}/>
          <Route
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <KitchenList
                  kitchens={kitchenData}
                  {...routeProps}
                  />
              </AppLayout>
              )}/>
        </Switch>
      )}/>
    </userContext.Provider>
  );
}

export default App;
