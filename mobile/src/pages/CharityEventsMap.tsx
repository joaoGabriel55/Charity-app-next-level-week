import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Text, Alert } from 'react-native';
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
  const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const { latitude, longitude } = position.coords

        const location = { latitude, longitude }
        setCurrentPosition(location)
      },
      (error: PositionError) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }, [])

  useFocusEffect(() => {
    api.get('charity_events').then(response => {
      response.data.forEach((elem: any) => {
        const { latitude, longitude } = elem
        elem.latitude = parseFloat(latitude)
        elem.longitude = parseFloat(longitude)
      })
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
      {currentPosition.latitude !== 0 && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }} >
          {charityEvents.map((event) => {
            return (
              <Marker
                key={event.id}
                icon={mapMaker}
                calloutAnchor={{
                  x: 0.5,
                  y: -0.1
                }}
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }} >
                <Callout tooltip={true} onPress={() => handleNavigateToCharityEventDetails(event.id)}>
                  <View style={styles.calloutContainer}>
                    <Text numberOfLines={1} style={styles.calloutText}>{event.name}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })}
        </MapView>
      )}
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
    color: '#007ec7',
    fontFamily: 'NotoSansTC_700Bold',
    fontSize: 14,
    width: 100
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
    backgroundColor: '#007ec7',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
})