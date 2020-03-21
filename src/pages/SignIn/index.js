import React from 'react';
import { Text } from 'react-native';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

export default () => {
  return (
    <Background>
      <Text>SignIn</Text>
      <Input icon="call" />
      <Button>Entrar</Button>
    </Background>
  );
};
