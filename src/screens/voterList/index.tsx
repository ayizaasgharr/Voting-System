

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from 'react-native';

import auth from '@react-native-firebase/auth';
import { DocumentData } from '@firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

import { findUserByEmail } from '../../firebase/User';
import { getUsersbyHalka, getUserHalka } from '../../firebase/Halka';

const { width } = Dimensions.get('window');

const VoterList = () => {
    const [data, setData] = useState<DocumentData[]>()

    const fetchData = async () => {
        const userEmail = auth().currentUser?.email
        if (userEmail) {
            const userId = await findUserByEmail(userEmail)
            const halka = await getUserHalka(userId)
            const halkaVoters = await getUsersbyHalka(halka)
            setData(halkaVoters)
         }
    }
    

    useEffect(() => {
        fetchData()
    }, [])

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
                        <Text style={styles.title}>CNIC: {item.cnic}</Text>
                        <Text style={styles.title}>Email: {item.email}</Text>
                        <Text style={styles.title}>Halka: {item.halka}</Text>

                    </View>
                </View>
            </LinearGradient>
        </>
    );

    return (
        <View style={styles.container}>
            {data?.length ?
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
            : <Text style={styles.notFoundText}>No Registered Voters.</Text>}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    list: {
        padding: 20,
    },
    userInfo: {
        flex: 1,
        flexDirection: 'row',
    },
    userInfoText: {
        flex: 1,
        paddingLeft: '5%'
    },
    item: {
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        width: width - 40,
        elevation: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',

    },
    title: {
        fontSize: 12,
        color: '#fff',
        marginBottom: 10,
        fontFamily: 'Lato-Bold',
    },
    notFoundText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Lato-Bold',
    },
});


export default VoterList;
