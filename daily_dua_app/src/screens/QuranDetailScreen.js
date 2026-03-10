import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

export default function QuranDetailScreen({ route, navigation }) {
    const { surahId, surahName } = route.params;
    const [ayahs, setAyahs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Audio State
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(-1);
    const flatListRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({ title: surahName });
        fetchSurahDetails();

        // Cleanup audio on unmount
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const fetchSurahDetails = async () => {
        try {
            // Fetch both Arabic (with audio) and English translation
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/editions/ar.alafasy,en.asad`);
            const data = await response.json();

            if (data.code === 200) {
                const arabicEdition = data.data[0];
                const englishEdition = data.data[1];

                // Merge the two editions into a single array of Ayahs
                const mergedAyahs = arabicEdition.ayahs.map((ayah, index) => ({
                    number: ayah.numberInSurah,
                    arabic: ayah.text,
                    audioUrl: ayah.audio,
                    translation: englishEdition.ayahs[index].text
                }));

                setAyahs(mergedAyahs);
            }
        } catch (error) {
            console.error('Error fetching Surah details:', error);
        } finally {
            setLoading(false);
        }
    };

    const playNextAyah = async (index) => {
        if (index >= ayahs.length) {
            setIsPlaying(false);
            setCurrentAyahIndex(-1);
            return;
        }

        try {
            if (sound) {
                await sound.unloadAsync();
            }

            setCurrentAyahIndex(index);
            // Auto-scroll to the currently playing Ayah
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: ayahs[index].audioUrl },
                { shouldPlay: true },
                (status) => {
                    if (status.didJustFinish) {
                        playNextAyah(index + 1); // Automatically play next Ayah
                    }
                }
            );
            setSound(newSound);
            setIsPlaying(true);
        } catch (error) {
            console.error('Error playing ayah audio:', error);
        }
    };

    const togglePlayback = async () => {
        if (loading || ayahs.length === 0) return;

        if (isPlaying && sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else if (!isPlaying && sound) {
            await sound.playAsync();
            setIsPlaying(true);
        } else {
            // Start from the beginning if no sound is loaded
            playNextAyah(0);
        }
    };

    const renderAyah = ({ item, index }) => {
        const isCurrentlyPlaying = index === currentAyahIndex;
        return (
            <View style={[styles.card, isCurrentlyPlaying && styles.playingCard]}>
                <View style={styles.ayahHeader}>
                    <View style={styles.ayahBadge}>
                        <Text style={styles.ayahBadgeText}>{item.number}</Text>
                    </View>
                    {isCurrentlyPlaying && (
                        <FontAwesome name="volume-up" size={16} color="#0369a1" />
                    )}
                </View>

                <Text style={styles.arabicText}>{item.arabic}</Text>
                <View style={styles.divider} />
                <Text style={styles.translationText}>{item.translation}</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0369a1" />
                <Text style={styles.loadingText}>Loading Ayahs...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Global Audio Controller */}
            <View style={styles.audioPlayer}>
                <View style={styles.audioInfo}>
                    <Text style={styles.audioTitle}>Recitation</Text>
                    <Text style={styles.audioSubtitle}>
                        {isPlaying ? `Playing Ayah ${currentAyahIndex + 1}` : 'Paused'}
                    </Text>
                </View>

                <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
                    <FontAwesome
                        name={isPlaying ? "pause" : "play"}
                        size={20}
                        color="#ffffff"
                        style={{ marginLeft: isPlaying ? 0 : 4 }}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={ayahs}
                renderItem={renderAyah}
                keyExtractor={item => item.number.toString()}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
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
    audioPlayer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0369a1',
        padding: 16,
        paddingHorizontal: 24,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    audioInfo: {
        flex: 1,
    },
    audioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    audioSubtitle: {
        fontSize: 13,
        color: '#e0f2fe',
        marginTop: 2,
    },
    playButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#0284c7',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#38bdf8',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    playingCard: {
        borderColor: '#bae6fd',
        borderWidth: 2,
        backgroundColor: '#f0f9ff',
    },
    ayahHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    ayahBadge: {
        backgroundColor: '#e0f2fe',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ayahBadgeText: {
        color: '#0369a1',
        fontWeight: 'bold',
        fontSize: 12,
    },
    arabicText: {
        fontSize: 26,
        color: '#1e293b',
        lineHeight: 48,
        textAlign: 'right', // Arabic is right-to-left
    },
    divider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        marginVertical: 16,
    },
    translationText: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
    },
});
