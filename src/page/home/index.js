import React, {useEffect, useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import {Container, Body, Temp, Text, Button, TextButton, Column} from './style';
import api from '../../services/api';
import 'moment/locale/pt-br';
import {keyWeather, KeyGoogle} from '../../config/key';

const Home = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [firstAccess, setFirtAccess] = useState(false);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  async function getWeather(_latitude, _longitude) {
    const res = await api.get(
      `weather?lat=${_latitude}&lon=${_longitude}&appid=${keyWeather}&units=metric`
    );
    setData(res.data);
    setLoading(false);
    setLoadingButton(false);
    setFirtAccess(true);
  }
  async function getAddress(_latitude, _longitude) {
    const response = await api.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${_latitude},${_longitude}&sensor=true/false`,
      {
        params: {
          key: KeyGoogle,
        },
      }
    );
    const addressFormated = response.data.results[0].address_components;
    setCity(addressFormated[3].long_name);
    setState(addressFormated[4].long_name);
    setCountry(addressFormated[5].long_name);
  }
  async function getLocation() {
    setLoading(true);

    Geolocation.getCurrentPosition((info, erro) => {
      console.log(info);
      const {latitude, longitude} = info.coords;
      Promise.all([
        getWeather(latitude, longitude),
        getAddress(latitude, longitude),
      ]);
      if (erro) {
        setLoading(false);
        Alert.alert(
          'Atenção!',
          'Não foi possivel obter sua  localização neste momento!'
        );
      }
    });
  }
  useEffect(() => {
    if (firstAccess) {
      setFirtAccess(true);
    }
  }, []);
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Container>
      <Body>
        {loading ? (
          <Column>
            <ActivityIndicator color="#7473d6" size="large" />
          </Column>
        ) : (
          <Column>
            <Temp style={{color: '#7473d6'}}>
              {data === '' ? '' : data.main.temp.toFixed(1)} °C
            </Temp>
            <Text style={{marginTop: 12, fontWeight: '600', fontSize: 22}}>
              {' '}
              {city === '' ? '' : `${city}`}
            </Text>
            <Text>{state}</Text>
            <Text>{country}</Text>
            <Text style={{marginTop: 16}}>
              {' '}
              Temperatura max.{' '}
              {data === '' ? '' : data.main.temp_min.toFixed(1)}
            </Text>
            <Text>
              {' '}
              Temperatura min.{' '}
              {data === '' ? '' : data.main.temp_max.toFixed(1)}
            </Text>
            <Text> Pressão {data === '' ? '' : data.main.pressure}</Text>
            <Text>{moment().format('DD/MM/YYYY')}</Text>
          </Column>
        )}
        {firstAccess ? (
          <Button
            disabled={loading}
            onPress={() => {
              getLocation();
              setLoadingButton(true);
            }}>
            {!loadingButton ? (
              <TextButton>Atualizar</TextButton>
            ) : (
              <TextButton>Atualizando ...</TextButton>
            )}
          </Button>
        ) : null}
      </Body>
    </Container>
  );
};
export default Home;
