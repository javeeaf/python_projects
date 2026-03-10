import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function TasbeehScreen() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        loadCount();
    }, []);

    const loadCount = async () => {
        try {
            const savedCount = await AsyncStorage.getItem('tasbeeh_count');
            if (savedCount !== null) {
                setCount(parseInt(savedCount, 10));
            }
        } catch (error) {
            console.error('Failed to load count', error);
        }
    };

    const saveCount = async (newCount) => {
        try {
            await AsyncStorage.setItem('tasbeeh_count', newCount.toString());
        } catch (error) {
            console.error('Failed to save count', error);
        }
    };

    const handlePress = () => {
        const newCount = count + 1;
        setCount(newCount);
        saveCount(newCount);
        Vibration.vibrate(50); // Small haptic feedback
    };

    const handleReset = () => {
        setCount(0);
        saveCount(0);
        Vibration.vibrate(100);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Digital Tasbeeh</Text>
                <Text style={styles.headerSubtitle}>Keep track of your Dhikr</Text>
            </View>

            <View style={styles.counterContainer}>
                <Text style={styles.countText}>{count}</Text>
            </View>

            <TouchableOpacity
                style={styles.mainButton}
                onPress={handlePress}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Count</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <FontAwesome name="refresh" size={20} color="#64748b" />
                <Text style={styles.resetText}>Reset Counter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#15803d',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#64748b',
        marginTop: 8,
    },
    counterContainer: {
        width: 200,
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 40,
    },
    countText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    mainButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#15803d',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#15803d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginBottom: 60,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2e8f0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    resetText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#64748b',
    },
});
