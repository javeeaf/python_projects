import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { duas } from '../data/duas';
import { FontAwesome } from '@expo/vector-icons';

export default function FavoritesScreen({ navigation }) {
    const [favoriteDuas, setFavoriteDuas] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadFavorites();
        }, [])
    );

    const loadFavorites = async () => {
        try {
            const storedFavs = await AsyncStorage.getItem('favorites');
            const favIds = storedFavs ? JSON.parse(storedFavs) : [];

            // Flatten the duas object to easily find by ID
            const allDuas = Object.values(duas).flat();
            const favs = allDuas.filter(dua => favIds.includes(dua.id));

            setFavoriteDuas(favs);
        } catch (error) {
            console.error('Failed to load favorites', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('DuaDetail', { dua: item })}
        >
            <View style={styles.iconContainer}>
                <FontAwesome name="heart" size={16} color="#ef4444" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.duaTitle}>{item.title}</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {favoriteDuas.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <FontAwesome name="heart-o" size={64} color="#cbd5e1" />
                    <Text style={styles.emptyText}>No favorites yet</Text>
                    <Text style={styles.emptySubtext}>Tap the heart icon on any Dua to save it here.</Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteDuas}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
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
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fee2e2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    duaTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#64748b',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 8,
    },
});
