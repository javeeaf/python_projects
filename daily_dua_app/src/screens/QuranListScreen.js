import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function QuranListScreen({ navigation }) {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSurahs();
    }, []);

    const fetchSurahs = async () => {
        try {
            const response = await fetch('https://api.alquran.cloud/v1/surah');
            const data = await response.json();
            if (data.code === 200) {
                setSurahs(data.data);
            }
        } catch (error) {
            console.error('Error fetching Surahs:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('QuranDetail', {
                surahId: item.number,
                surahName: item.englishName
            })}
        >
            <View style={styles.numberContainer}>
                <Text style={styles.numberText}>{item.number}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.englishName}</Text>
                <Text style={styles.subtitle}>{item.revelationType} • {item.numberOfAyahs} Ayahs</Text>
            </View>
            <View style={styles.arabicNameContainer}>
                <Text style={styles.arabicName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0369a1" />
                <Text style={styles.loadingText}>Loading Quran Data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={surahs}
                renderItem={renderItem}
                keyExtractor={item => item.number.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    loadingText: {
        marginTop: 16,
        color: '#64748b',
        fontSize: 16,
    },
    listContainer: {
        padding: 16,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    numberContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e0f2fe',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    numberText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0369a1',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 13,
        color: '#64748b',
    },
    arabicNameContainer: {
        marginLeft: 8,
        justifyContent: 'center',
    },
    arabicName: {
        fontSize: 20,
        color: '#0369a1',
        fontFamily: 'sans-serif', // Fallback for arabic
    }
});
