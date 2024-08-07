

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { DocumentData } from '@firebase/firestore'; 

import { getUnapprovedCanidiates } from '../../firebase/updateUser';
import { findUserByEmail, updateUser } from '../../firebase/updateUser';

import { SuccessMessages } from '../../constants/message';
const { width } = Dimensions.get('window');

const CandidateInvites = () => {
    const [data, setData] = useState<DocumentData[]>()
    
    const fetchData = async () => {
        const unapprovedCanidiates = await getUnapprovedCanidiates()
        if(unapprovedCanidiates?.length)
        {
            setData(unapprovedCanidiates)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    const handleApprove = async(email:string) => {

        if(email)
        {
            const userId = await findUserByEmail(email)
            const response = await updateUser({ canidiateRequest: 'approved', user_type: 'canidiate' }, userId)
            if (response == SuccessMessages.UPDATED_USER) {
                setData((user)=>(user?.filter((data)=>data.email !== email)))
            }
}
    }

    const handleDisApprove = async (email: string) => {
        if (email) {
            const userId = await findUserByEmail(email)
            const response = await updateUser({ canidiateRequest: 'disapproved' }, userId)
            if (response == SuccessMessages.UPDATED_USER) {
                setData((user) => (user?.filter((data) => data.email !== email)))
            }
        }
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
                    <Text style={styles.title}>{item.email}</Text>
                    <Text style={styles.title}>{item.partyName}</Text>

                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>handleApprove(item.email)}>
                    <Text style={styles.buttonText}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handleDisApprove(item.email)}>
                    <Text style={styles.buttonText}>Disapprove</Text>
                </TouchableOpacity>
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
                : <Text style={styles.notFoundText}>No Invite received</Text>}
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
        paddingLeft:'5%'
    },
    infoText: {
        marginLeft: 4
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
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',

    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    notFoundText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20, 
    },
});


export default CandidateInvites;
