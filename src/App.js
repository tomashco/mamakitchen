import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useAuth} from './Contexts/userContext'
import {userContext} from './Contexts/userContext'
//Pages
import AppLayout from './AppLayout'
import KitchenList from './KitchenList'
import Kitchen from './Kitchen'
import KitchenEdit from './KitchenEdit'
import Login from './Login'
import Signin from './Signin'
//Dummy data
import kitchenData from './dummyData/kitchenData'
import recipeData from './dummyData/recipeData'

import firebase from 'firebase'

const App = () => {
  const [kitchens, setKitchens] = useState(kitchenData)
  const [data, setData] = useState([])
  const [recipes, setRecipes] = useState(recipeData)
  const { user } = useAuth()

  useEffect(() => {
    const ref = firebase.database().ref(`/kitchens/`);
    ref.once('value').then(function(snapshot) {
      const array = [];
      snapshot.forEach(el => {
        array.push(el.val());
      });
      if( array.length !== data.length){
      setData(array)
    }
    })
    return () => {
      ref.off("value")
    }
  })

  const getKitchen = (kitchenId) => {

    if(kitchenId === "new")
    return ["", "", "", "", ""]

    return data.find((kitchen) => {
      return kitchen.id === kitchenId;
    });
  }

  const getRecipes = (kitchenId) => {
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
                <KitchenEdit
                  {...routeProps}
                  kitchenInfo={getKitchen(routeProps.match.params.id)}
                  recipes = {getRecipes(routeProps.match.params.id)}
                  />
              </AppLayout>
              )}
          />
          <Route exact path="/kitchen/:id"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <Kitchen
                  {...routeProps}
                  kitchenInfo={getKitchen(routeProps.match.params.id)}
                  recipes = {getRecipes(routeProps.match.params.id)}
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
                  kitchens={data}
                  {...routeProps}
                  />
                </AppLayout>
            )}/>
          <Route
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <KitchenList
                  kitchens={data}
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
