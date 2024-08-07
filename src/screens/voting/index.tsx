import React, { useState } from 'react';
import { View, Text, Button, Platform, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveTimesToFirebase } from '../../firebase/Voting';

const Voting = ({ navigation }: { navigation: any }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const handleSave = () => {
        if (startDate && endDate) {
            saveTimesToFirebase(startDate, endDate);
            navigation.navigate('Dashboard')
        }
    };

    const validateEndDate = (selectedDate: Date) => {
        if (startDate && selectedDate <= startDate) {
            Alert.alert('Invalid End Date', 'End date must be greater than the start date.');
            return false;
        }
        return true;
    };

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || new Date();
        if (showStartPicker) {
            setShowStartPicker(false);
            setStartDate(currentDate);
        } else if (showEndPicker) {
            if (validateEndDate(currentDate)) {
                setShowEndPicker(false);
                setEndDate(currentDate);
            } else {
                setShowEndPicker(false);
                setShowEndPicker(true);
            }
        }
    };

    const isSaveButtonDisabled = !startDate || !endDate;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Select Start and End Dates</Text>

            <View style={styles.buttonContainer}>
                <Button title="Select Start Date" color={'#040268'} onPress={() => setShowStartPicker(true)} />
            </View>

            <Text style={styles.dateText}>
                {startDate ? `Start Date: ${startDate.toLocaleDateString()}` : 'No Start Date Selected'}
            </Text>

            <View style={styles.buttonContainer}>
                <Button title="Select End Date" color={'#040268'} onPress={() => setShowEndPicker(true)} />
            </View>

            <Text style={styles.dateText}>
                {endDate ? `End Date: ${endDate.toLocaleDateString()}` : 'No End Date Selected'}
            </Text>

            {showStartPicker && (
                <DateTimePicker
                    mode="date"
                    value={startDate || new Date()}
                    onChange={onChange}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                />
            )}

            {showEndPicker && (
                <DateTimePicker
                    mode="date"
                    value={endDate || new Date()}
                    onChange={onChange}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                />
            )}

            <View style={styles.saveButtonContainer}>
                <Button
                    title="Save"
                    color={'#040268'}
                    onPress={handleSave}
                    disabled={isSaveButtonDisabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 15,
        width: '100%',
    },
    dateText: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },
    saveButtonContainer: {
        marginTop: 20,
        width: '100%',
    },
});

export default Voting;
