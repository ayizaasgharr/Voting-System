import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import auth from '@react-native-firebase/auth';

import { fetchVotes } from '../../firebase/Voting';
import { findUserByEmail } from '../../firebase/User';

const VotesReceived = () => {
    const [votes, setVotes] = useState<number>();
   
    const getVotes = async () => {
        const email = auth().currentUser?.email
    if(email)
        {
            const userId = await findUserByEmail(email)
            const receivedVotes = await fetchVotes(userId)
            setVotes(receivedVotes)
        } 
    }

    useEffect(() => {
        getVotes()
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Total Votes: {votes}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default VotesReceived;
