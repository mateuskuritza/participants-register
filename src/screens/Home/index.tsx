import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {
    const participants = [
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
            name: 'José',
            id: 5
        },
        {
            name: 'Ana',
            id: 6
        },
        {
            name: 'Paulo',
            id: 7
        },
        {
            name: 'Marcos',
            id: 8
        }
    ];

    function handleParticipantAdd() {
        console.log('Adicionar participante')
    }

    function handleParticipantRemove(name: string) {
        console.log('Remover participante:', name)
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