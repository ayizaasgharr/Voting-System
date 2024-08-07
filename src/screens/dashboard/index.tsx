import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

import CustomButton from "../../components/CustomButton";

import {Navigation} from '../../types';

import { getUserRole } from "../../firebase/User";
import { findUserByEmail } from "../../firebase/User";

import { fetchVotes } from "../../firebase/Voting";

type LoginScreenProps = {
  navigation: Navigation;
};

export default function Dashboard({ navigation }: LoginScreenProps) {
    
  const [role, setRole] = useState('')
  const [votes, setVotes] = useState<number>();

  const isAdmin = role == 'admin'
  const isCanidiate = role == 'canidiate'
  const isVoter = role == 'voter'

  const getRole = async () => {
    const email = auth().currentUser?.email
    if(email)
    {
      const role = await getUserRole(email)  
      console.log('Role', role)

      setRole(role)
    }
  }


  const getVotes = async () => {
    const email = auth().currentUser?.email
    if (email) {
      const userId = await findUserByEmail(email)
      const receivedVotes = await fetchVotes(userId)
      setVotes(receivedVotes)
    }
  }

  useEffect(() => {
  }, []);

  useEffect(() => {
    getRole()
    getVotes()
  }, [])
    
  const handleVotesReceived = () => {
    Alert.alert("Total votes received "+ votes)
  }


  return (
    <View style={styles.safeArea}>
      {isAdmin && <CustomButton text={'Generate Invite'} onPress={()=>navigation.navigate('Invite')} />}
      {isAdmin && <CustomButton text={'Canidiate Invites'} onPress={() => (navigation.navigate('Invite Candidiate'))} />}
      {isVoter&& <CustomButton text={'Apply to be a Canidiate'} onPress={() => (navigation.navigate('Canidiate Form'))} />}
      {isCanidiate && <CustomButton text={'List of Voters'} onPress={() => (navigation.navigate('Voters list'))} />}
      {isAdmin && <CustomButton text={'Schedule Voting'} onPress={() => (navigation.navigate('Voting'))} />}
      {isVoter && <CustomButton text={'Cast a vote'} onPress={() => (navigation.navigate('Cast Vote'))} />}
      <CustomButton text={'View Result'} onPress={() => (navigation.navigate('Result'))} />
      {isCanidiate && <CustomButton text={'Votes Received'} onPress={handleVotesReceived} />}
      {isAdmin && <CustomButton text={'Create Halka'} onPress={()=>navigation.navigate('Create Halka')} />}

    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  buttonStyle: {
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
   buttonView: {
    width: '100%',
    marginTop: '20%',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    width: 240,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
});