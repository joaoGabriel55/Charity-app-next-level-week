import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import CharityEventsMap from '../src/pages/CharityEventsMap'
import CharityEventDetails from '../src/pages/CharityEventDetails'

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="CharityEventsMap" component={CharityEventsMap} />
        <Screen name="CharityEventDetails" component={CharityEventDetails} />
      </Navigator>
    </NavigationContainer>
  )
}