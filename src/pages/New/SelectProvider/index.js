import React, { useEffect, useState } from 'react';

import Background from '~/components/Background';

import { Container, ProviderList, Provider, Avatar, Name } from './styles';
import api from '~/services/api';

export default ({ navigation }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const loadProviders = async () => {
      const response = await api.get('providers');
      setProviders(response.data);
    };
    loadProviders();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Provider
        onPress={() =>
          navigation.navigate('SelectDateTime', { provider: item })
        }
      >
        <Avatar
          source={{
            uri: item.avatar
              ? item.avatar.url
              : `https://api.adorable.io/avatar/50/${item.name}.png`,
          }}
        />

        <Name>{item.name}</Name>
      </Provider>
    );
  };

  return (
    <Background>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => provider.id.toString()}
          renderItem={renderItem}
        />
      </Container>
    </Background>
  );
};
