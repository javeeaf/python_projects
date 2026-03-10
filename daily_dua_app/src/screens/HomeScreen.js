import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { categories } from '../data/duas';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DuaList', { categoryId: item.id, categoryTitle: item.title })}
        >
            <View style={styles.iconContainer}>
                <FontAwesome name={item.icon} size={32} color="#15803d" />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#15803d" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Daily Duas</Text>
                <Text style={styles.headerSubtitle}>Seek blessings every day</Text>
            </View>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        backgroundColor: '#15803d',
        padding: 24,
        paddingTop: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#dcfce3',
        marginTop: 4,
    },
    listContainer: {
        padding: 12,
    },
    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 8,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#dcfce3',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        textAlign: 'center',
    },
});
