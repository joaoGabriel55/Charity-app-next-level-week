import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import mapMaker from '../images/map-marker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
import ICharityEvent from '../interfaces/ICharityEvent';

export default function CharityEventsMap() {
  const navigation = useNavigation()

  const [charityEvents, setCharityEvents] = useState<ICharityEvent[]>([])

  useFocusEffect(() => {
    api.get('charity_events').then(response => {
      setCharityEvents(response.data)
    })
  })


  function handleNavigateToCharityEventDetails(id: number) {
    navigation.navigate('CharityEventDetails', { id })
  }

  function handleNavToCreateEvent() {
    navigation.navigate('SelectMapPosition')
  }

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -5.8027658,
          longitude: -35.2079938,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }} >
        {charityEvents.map((event) => {
          return (
            <Marker
              key={event.id}
              icon={mapMaker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }} >
              <Callout tooltip={true} onPress={() => handleNavigateToCharityEventDetails(event.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{event.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{charityEvents.length} Eventos encontrados</Text>
        <RectButton style={styles.createEventBtn} onPress={handleNavToCreateEvent}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },
  calloutText: {
    color: '#0089A5',
    fontFamily: 'NotoSansTC_700Bold',
    fontSize: 14
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3
  },
  footerText: {
    color: "#8FA7B3",
    fontFamily: 'NotoSansTC_700Bold'
  },
  createEventBtn: {
    width: 56,
    height: 56,
    backgroundColor: 'blue',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
})