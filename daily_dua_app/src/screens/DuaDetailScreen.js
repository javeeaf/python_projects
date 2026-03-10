import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function DuaDetailScreen({ route, navigation }) {
    const { dua } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkFavoriteStatus();
    }, []);

    const checkFavoriteStatus = async () => {
        try {
            const storedFavs = await AsyncStorage.getItem('favorites');
            const favIds = storedFavs ? JSON.parse(storedFavs) : [];
            setIsFavorite(favIds.includes(dua.id));
        } catch (error) {
            console.error(error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const storedFavs = await AsyncStorage.getItem('favorites');
            let favIds = storedFavs ? JSON.parse(storedFavs) : [];

            if (isFavorite) {
                favIds = favIds.filter(id => id !== dua.id);
            } else {
                favIds.push(dua.id);
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(favIds));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error(error);
        }
    };

    // Add a heart button to the header
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={toggleFavorite} style={{ marginRight: 16 }}>
                    <FontAwesome
                        name={isFavorite ? "heart" : "heart-o"}
                        size={24}
                        color={isFavorite ? "#ef4444" : "#ffffff"}
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation, isFavorite]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.card}>
                <View style={styles.arabicContainer}>
                    <Text style={styles.arabicText}>{dua.arabic}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Transliteration</Text>
                    <Text style={styles.transliterationText}>{dua.transliteration}</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Translation</Text>
                    <Text style={styles.translationText}>{dua.translation}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        padding: 16,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    arabicContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    arabicText: {
        fontSize: 28,
        color: '#1e293b',
        lineHeight: 48,
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#64748b',
        marginBottom: 8,
        letterSpacing: 1,
    },
    transliterationText: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 24,
        fontStyle: 'italic',
    },
    translationText: {
        fontSize: 16,
        color: '#334155',
        lineHeight: 24,
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 16,
    },
});
