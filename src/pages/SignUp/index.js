import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  FooterLink,
  FooterLinkText,
} from './styles';

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    dispatch(signUpRequest(name, email, password));
  };

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={setName}
            value={name}
          />

          <FormInput
            ref={emailRef}
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="E-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={setEmail}
            value={email}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
            value={password}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Criar Conta
          </SubmitButton>
        </Form>

        <FooterLink onPress={() => navigation.pop()}>
          <FooterLinkText>Já tenho conta</FooterLinkText>
        </FooterLink>
      </Container>
    </Background>
  );
};
