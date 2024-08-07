import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { DocumentData } from '@firebase/firestore';

import { getHalka } from '../../firebase/Halka';
import { getCandidates } from '../../firebase/Voting';
import { fetchVotes } from '../../firebase/Voting';

import CustomButton from '../../components/CustomButton';

const Result = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [halka, setHalka] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getHalka();
            setHalka(data);
        } catch (error) {
            console.error('Error fetching halka:', error);
            setError('Failed to load halka data.');
        } finally {
            setLoading(false);
        }
    };

    const filteredResults = halka.filter(result =>
        result.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchCandidates = async (name: string) => {
        try {
            const candidates: DocumentData[] = await getCandidates(name);

            const votesPromises = candidates.map(async (candidate) => {
                const votes = await fetchVotes(candidate.email);
                return {
                    ...candidate,
                    email: candidate.email,
                    votes: votes, 
                };
            });

            const candidatesWithVotes = await Promise.all(votesPromises);

            const candidatesText = candidatesWithVotes.map(candidate =>
                `${candidate?.email} - Votes: ${candidate.votes}`
            ).join('\n');

            Alert.alert('Candidates and Votes', candidatesText||"No one has voted yet");

        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by Halka"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : filteredResults.length ? (
                <>
                    <FlatList
                        data={filteredResults}
                        keyExtractor={(item) => item.Name}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={styles.text}>{item.Name}</Text>
                                <CustomButton
                                    text="View Result"
                                    onPress={() => fetchCandidates(item.Name)}
                                />
                            
                            </View>
                        )}
                    />
                </>
            ) : (
                <Text style={styles.notFoundText}>No result exists</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    searchInput: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 8,
        marginBottom: 16,
        fontWeight: 'bold',
        fontSize:16,
        fontFamily: 'Lato-Regular',
    },

    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    text: {
        fontSize: 18,
        fontFamily: 'Lato-Bold',
        textTransform: 'capitalize'
    },

    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 16,
    },

    notFoundText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Lato-Bold',
    },
});

export default Result;
