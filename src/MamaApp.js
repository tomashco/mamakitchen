import React from 'react';
import AppLayout from './AppLayout'
import KitchenList from './KitchenList'
import kitchenData from './kitchenData'

function MamaApp() {
  return (
      <AppLayout>
        <KitchenList kitchens={kitchenData}/>
      </AppLayout>
  );
}

export default MamaApp;
