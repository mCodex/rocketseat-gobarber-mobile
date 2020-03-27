import React, { useState, useEffect } from 'react';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import api from '~/services/api';

import { Container, HourList, Hour, Title } from './styles';

export default ({ navigation, route }) => {
  const { provider } = route.params;
  const [hours, setHours] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const loadAvailable = async () => {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    };
    loadAvailable();
  }, [date, provider.id]);

  const handleSelectHour = time => {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  };

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          extraData={hours}
          keyExtractor={item => item.time}
          renderItem={({ item }) => (
            <Hour
              enabled={item.available}
              onPress={() => handleSelectHour(item.value)}
            >
              <Title>{item.time}</Title>
            </Hour>
          )}
        />
      </Container>
    </Background>
  );
};
