import { Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { Timestamp } from 'firebase/firestore';

export const saveTimesToFirebase = async (startTime: Date, endTime: Date) => {
    if (startTime && endTime) {
        try {
            await firestore().collection('Voting').add({
                startTime: Timestamp.fromDate(startTime),
                endTime: Timestamp.fromDate(endTime),   
            });
            Alert.alert('Success', 'Voting times saved successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save voting times.');
        }
    } else {
        Alert.alert('Error', 'Please select both start and end times.');
    }
};

export const getVotingTimes = async () => {
    const now = new Date();
    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

    const startOfDayTimestamp = Timestamp.fromDate(startOfDay);
    const endOfDayTimestamp = Timestamp.fromDate(endOfDay);

    try {
        const snapshot = await firestore()
            .collection('Voting')
            .where('startTime', '<=', endOfDayTimestamp)
            .where('endTime', '>=', startOfDayTimestamp)
            .get();

        if (!snapshot.empty) {
            return snapshot.docs[0].id
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
        return [];
    }
};


export const getCandidates = async (constituency: string) => {

    const snapshot = await firestore()
        .collection('User')
        .where('user_type', '==', 'canidiate' ).where('halka','==',constituency)
        .get();
    
    if (!snapshot.empty) {
        return snapshot.docs.map(doc => doc.data());
    } else {
        return [];
    }

};

export const hasVoted = async (voterId: string) => {

    const snapshot = await firestore()
        .collection('Vote')
        .where('voterId', '==', voterId)
        .get();

    return !snapshot.empty;
};

export const castVote = async (voterId: string, email: string, halka: string) => {

    if (await hasVoted(voterId)) {
        throw new Error('You have already voted.');
    }

    const votingTimes = await getVotingTimes();

    if (votingTimes.length === 0) {
        throw new Error('Voting is not available at this time.');
    }

    await firestore().collection('Vote').add({
        voterId,
        email,
        votingTimes,
        halka,
        timestamp: new Date(),
    });
};


export const fetchVotes = async (candidateEmail:string) => {
    try {

        const votesSnapshot = await firestore().collection('Vote').where('email', '==', candidateEmail).get();

        if (!votesSnapshot.empty) {
            return votesSnapshot.size
        }
        
             return 0
    } catch (error) {
        console.error('Error fetching votes:', error);
    }
};
