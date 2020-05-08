import * as React from 'react';
import {
  View, FlatList, TouchableOpacity, Image
} from 'react-native';
import {
  TextInput, Button, Caption, Divider
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getBusca } from '../../apis/apiHome';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([]);

  async function search() {
    const response = await getBusca(text);
    console.tron.log('data', response.data.data);
    setData(response.data.data);
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput label="Buscar" value={text} onChangeText={Text => setText(Text)} />
      <Button mode="contained" onPress={() => search()}>
        Procurar
      </Button>
      <FlatList
        // showsVerticalScrollIndicator={false}
        data={data}
        // numColumns={2}
        keyExtractor={item => item.ID}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={{ margin: 10, padding: 10, backgroundColor: 'transparent' }}
              onPress={() => navigation.navigate('Educaçao permanente', { item })}
            >
              <Divider />
              <View style={{ flexDirection: 'row' }}>
                {item.image ? (
                  <Image
                    resizeMode="contain"
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 80,
                      margin: 10
                    }}
                    source={{ uri: `${item.image}` }}
                  />
                ) : (
                  <View
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 80,
                      margin: 10,
                      borderWidth: 40,
                      borderColor: '#fff'
                    }}
                  />
                )}

                <Caption style={{ justifyContent: 'center', alignSelf: 'center', maxWidth: 200 }}>
                  {item.post_title}
                </Caption>
              </View>
              <Divider />
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
}
