import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Pages
import AppLayout from './AppLayout'
import KitchenList from './KitchenList'
import Kitchen from './Kitchen'
import KitchenAdd from './KitchenAdd'
import KitchenEdit from './KitchenEdit'
import Login from './Login'
import Signin from './Signin'

const App = () => {

  return (
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
          <Route exact path="/newKitchen/"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <KitchenAdd
                  {...routeProps}
                  //recipes = {getRecipes(routeProps.match.params.id)}
                  />
              </AppLayout>
              )}
          />
          <Route exact path="/kitchen/edit/:id"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <KitchenEdit
                  {...routeProps}
                  //recipes = {getRecipes(routeProps.match.params.id)}
                  />
              </AppLayout>
              )}
          />
          <Route exact path="/kitchen/:id"
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <Kitchen
                  {...routeProps}
                  />
              </AppLayout>
              )}
          />
          <Route
            exact
            path="/"
            render={(routeProps) => (
                <AppLayout {...routeProps} >
                  <KitchenList {...routeProps} />
                </AppLayout>
              )}
            />
          <Route
            render={(routeProps) => (
              <AppLayout {...routeProps} >
                <KitchenList {...routeProps} />
              </AppLayout>
              )}/>
        </Switch>
      )}/>
  );
}

export default App;
