import React, { useEffect, useState } from 'react';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import api from '~/services/api';

import { Container, Title, List } from './styles';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const response = await api.get('appointments');

      setAppointments(response.data);
    };

    loadAppointments();
  }, []);

  const handleCancel = async id => {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment => {
        if (appointment.id !== id) {
          return appointment;
        }

        return {
          ...appointment,
          canceled_at: response.data.canceled_at,
        };
      })
    );
  };

  const renderItem = ({ item }) => (
    <Appointment data={item} onCancel={() => handleCancel(item.id)} />
  );

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          extraData={appointments}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </Container>
    </Background>
  );
};

export default Dashboard;
