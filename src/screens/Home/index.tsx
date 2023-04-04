import { useState } from 'react';
import { Alert, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {
    const [participants, setParticipants] = useState([
        {
            name: 'Mateus',
            id: 1
        },
        {
            name: 'João',
            id: 2
        },
        {
            name: 'Pedro',
            id: 3
        },
        {
            name: 'Maria',
            id: 4
        },
        {
            name: 'Ana',
            id: 5
        },
        {
            name: 'Paulo',
            id: 6
        },
        {
            name: 'Alfredo',
            id: 7
        }
    ])

    const [newParticipant, setNewParticipant] = useState('');

    function handleParticipantAdd() {
        if (participants.map(p => p.name).includes(newParticipant)) {
            Alert.alert('Esse participante já foi adicionado antes!', undefined, undefined, {
                cancelable: true
            });
            return;
        }
        const lastId = participants[participants.length - 1]?.id || 0;
        const newParticipants = [...participants, {
            name: newParticipant,
            id: lastId + 1
        }]
        setParticipants(newParticipants);
        Alert.alert('Participante adicionado!', undefined, undefined, {
            cancelable: true
        });
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", `Deseja remover ${name}?`, [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: () => {
                    const newParticipants = participants.filter(participant => participant.name !== name);
                    setParticipants(newParticipants);
                    Alert.alert('Participante removido!', undefined, undefined, {
                        cancelable: true
                    });
                }
            }
        ],
            {
                cancelable: true,
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do Evento</Text>
            <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6b6b6b"
                    // Some keyboard types will only work on Android or iOS
                    keyboardType='default'
                    value={newParticipant}
                    onChangeText={setNewParticipant}
                />

                {/* Clickeable region  */}
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>



            <FlatList
                data={participants}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>Nenhum participante! :(</Text>
                )}
                keyExtractor={item => String(item.id)}
                renderItem={({ item: {
                    id,
                    name
                } }) => (
                    <Participant
                        key={id}
                        name={name}
                        onRemove={handleParticipantRemove}
                    />
                )}
            />


            {/* 
Main difference between FlatList and ScrollView is that FlatList is more performatic
ScrollList loads all the data at once, while FlatList loads only the data that is visible on the screen.
            */}
            <ScrollView>
                {participants.map(participant => (
                    <Participant
                        key={participant.id}
                        name={participant.name}
                        onRemove={handleParticipantRemove}
                    />
                ))}
            </ScrollView>
        </View>
    );
}