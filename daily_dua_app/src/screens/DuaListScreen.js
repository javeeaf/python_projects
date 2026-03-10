import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { duas } from '../data/duas';
import { FontAwesome } from '@expo/vector-icons';

export default function DuaListScreen({ route, navigation }) {
    const { categoryId } = route.params;
    const categoryDuas = duas[categoryId] || [];

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('DuaDetail', { dua: item })}
        >
            <View style={styles.numberContainer}>
                <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.duaTitle}>{item.title}</Text>
            </View>
            <FontAwesome name="angle-right" size={24} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={categoryDuas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
        backgroundColor: '#dcfce3',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    numberText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#15803d',
    },
    textContainer: {
        flex: 1,
    },
    duaTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
    },
});
