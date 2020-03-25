import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Separator,
  Title,
  LogoutButton,
} from './styles';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  // const loading = useSelector(state => state.auth.loading);

  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [email, setEmail] = useState(profile.email);
  const [name, setName] = useState(profile.name);
  const [password, setPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    setOldPassword();
    setPassword();
    setConfirmPassword();
  }, [profile]);

  const handleSubmit = () => {
    dispatch(
      updateProfileRequest({
        name,
        email,
        password,
        oldPassword,
        confirmPassword,
      })
    );
  };

  const handleLogout = () => dispatch(signOut());

  return (
    <Background>
      <Container>
        <Title>Meu Perfil</Title>
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
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            onChangeText={setEmail}
            value={email}
          />

          <Separator />

          <FormInput
            ref={oldPasswordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Senha Atual"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            onChangeText={setOldPassword}
            value={oldPassword}
          />

          <FormInput
            ref={passwordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Nova Senha"
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            onChangeText={setPassword}
            value={password}
          />

          <FormInput
            ref={confirmPasswordRef}
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de Senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
};

export default Profile;
