import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import CharityEventsMap from '../src/pages/CharityEventsMap'
import CharityEventDetails from '../src/pages/CharityEventDetails'

import CharityEventData from '../src/pages/CreateCharityEvent/CharityEventData'
import SelectMapPosition from '../src/pages/CreateCharityEvent/SelectMapPosition'
import Header from './components/Header'

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="CharityEventsMap" component={CharityEventsMap} />
        <Screen
          name="CharityEventDetails"
          component={CharityEventDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Evento de Caridade" />
          }}
        />
        <Screen
          name="CharityEventData"
          component={CharityEventData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe dos dados" />
          }}
        />
        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no mapa" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}