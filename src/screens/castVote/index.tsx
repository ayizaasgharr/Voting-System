import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity,Dimensions, Image, ActivityIndicator} from 'react-native';

import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

import { castVote } from '../../firebase/Voting';
import { getCandidates } from '../../firebase/Voting';
import { getUserHalka } from '../../firebase/Halka';
import { findUserByEmail } from '../../firebase/User';

const { width } = Dimensions.get('window');

const CastVote = () => {
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId,setUserId] = useState('')
    const [halka, setHalka] = useState('')

    const fetchData = async () => {
        try {
            const email = auth().currentUser?.email
            if (email) {
                const voterid = await findUserByEmail(email)
                const constituent = await getUserHalka(voterid)
                const candidatesList = await getCandidates(constituent);
                setCandidates(candidatesList);
                setUserId(voterid)
                setHalka(constituent)
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch candidates.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [halka]);

    const handleVote = async (item:any) => {
        try {
            await castVote(userId, item.email, halka,);
            Alert.alert('Success', 'Your vote has been cast.');
        } catch (error:any) {
            console.error('Error',error?.message);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    const renderItem = ({ item }: any) => (
        <>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.item}
            >
                <View style={styles.userInfo}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.userInfoText}>
                        <Text style={styles.title}>Email: {item.email}</Text>
                        <Text style={styles.title}>Party Name: {item.partyName}</Text>

                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleVote(item)}>
                        <Text style={styles.buttonText}>Vote</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </>
    );

    return (
        <View style={styles.container}>
            {candidates.length ?
                <FlatList
                data={candidates}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            /> : <Text style={styles.notFoundText}>No Candidiates in your halka </Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    header: {
        fontSize: 16,
        fontWeight:'bold',
        marginBottom: 20,
        fontFamily: 'Lato-Bold',
        justifyContent: 'center',
        alignItems: 'center',
    },

    candidate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent:'center'
    },

    title: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'Lato-Bold',
    },

    candidateName: {
        fontSize: 18,
    },

    userInfoText: {
        flex: 1,
        paddingLeft: '5%'
    },

    infoText: {
        marginLeft: 4
    },

    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    button: {
        justifyContent: 'center',
        alignContent:'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },

    partyName: {
        fontSize: 12,
        fontWeight:'bold'
    },

    userInfo: {
        flex: 1,
        flexDirection: 'row',
    },

    item: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: width - 40,
        elevation: 5, // Adding shadow for Android
        shadowColor: '#000', // Adding shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },

    notFoundText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Lato-Bold',
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',

    },
});

export default CastVote;
