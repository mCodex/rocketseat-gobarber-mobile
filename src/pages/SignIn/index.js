import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default ({ navigation }) => {
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const passwordRef = useRef();

  const handleSubmit = () => {
    dispatch(signInRequest(email, password));
  };

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={setEmail}
            value={email}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
            value={password}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink
          onPress={() => navigation.navigate('SignUp')}
          loading={loading}
        >
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
};
