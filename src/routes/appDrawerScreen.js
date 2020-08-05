import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutScreen from '../pages/About';
import AppTab from './appBottomTab';
import Heart from '../assets/icons/isus_hor.svg';
import packageJson from '../../package.json';
import FaleConoscoScreen from '../pages/FaleConoscoScreen';
import SusNoCearaScreen from '../pages/SusNoCeara';
import { ALERTA_FALTA_EPI, RELATAR_SUGESTAO } from '../pages/FaleConoscoScreen/tiposDeOcorrencia';


function CustomDrawerContent(props) {
  const {
    navigation: { navigate },
    routeName
  } = props;

  const versaoSistema = packageJson.version;
  return (
    <>
      <SafeAreaView style={styles.droidSafeArea}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            borderBottomWidth: 0.5,
            borderBottomColor: '#C4C4C4',
          }}
        >
          <Heart size={40} style={{ margin: 10 }} />
        </View>
      </SafeAreaView>
      <DrawerContentScrollView {...props} style={{ marginTop: 0 }}>
        <DrawerItem
          icon={() => <Icon name="home" size={20} color="rgba(0, 0, 0, 0.54)" />}
          label="Home"
          labelStyle={{ fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'HOME'}
          onPress={() => navigate('HOME', { screen: 'Home' })}
        />
         <DrawerItem
           icon={() => <Icon name="account" size={20} color="rgba(0, 0, 0, 0.54)" />}
           label="Meu perfil"
           labelStyle={{ fontSize: 15 }}
           inactiveTintColor="#111"
           activeTintColor="#111"
           inactiveBackgroundColor="transparent"
           activeBackgroundColor="transparent"
           focused={routeName === 'PERFIL'}
           onPress={() => navigate('PERFIL', { screen: 'Perfil' })}
         />
        <DrawerItem
          icon={() => <Icon name="message-alert" size={20} color="rgba(0, 0, 0, 0.54)" />}
          label="Fale conosco"
          labelStyle={{ fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'FEEDBACK'}
          onPress={() => navigate('FEEDBACK')}
        />
        <DrawerItem
          icon={() => <Icon name="alert-octagon" size={20} color="rgba(0, 0, 0, 0.54)" />}
          label="Alerta de EPI"
          labelStyle={{ fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'ALERTA_EPI'}
          onPress={() => navigate('ALERTA_EPI')}
        />
        <DrawerItem
          icon={() => <Icon name="help-circle" size={20} color="rgba(0, 0, 0, 0.54)" />}
          label="SUS no Ceará"
          labelStyle={{ fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'SUS_NO_CEARA'}
          onPress={() => navigate('SUS_NO_CEARA')}
        />
        <DrawerItem
          icon={() => <Icon name="information" size={20} color="rgba(0, 0, 0, 0.54)" />}
          label="Sobre o iSUS"
          labelStyle={{ fontSize: 15 }}
          inactiveTintColor="#111"
          activeTintColor="#111"
          inactiveBackgroundColor="transparent"
          activeBackgroundColor="transparent"
          focused={routeName === 'SOBRE'}
          onPress={() => navigate('SOBRE')}
        />
      </DrawerContentScrollView>
      {/* View é relativa a margem de porcentagem em relação a ultima opção do drawer */}
      {/* Caso adicione um item, a margemTop deve diminuir também */}
      <View style={styles.itemCompartilhar}>
            <DrawerItem
              icon={() => <Icon name="share-variant" size={20} color="rgba(0, 0, 0, 0.54)" />}
              label="Compartilhe o iSUS"
              labelStyle={{ fontSize: 15 }}
              inactiveTintColor="#111"
              activeTintColor="#111"
              inactiveBackgroundColor="transparent"
              activeBackgroundColor="transparent"
              onPress={() => aoCompartilhar()}
            />
      </View>
      <View style={styles.viewVersao}>
        <Text style={styles.textoVersao}>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          Versão { versaoSistema }
        </Text>
      </View>
    </>
  );
}

const Drawer = createDrawerNavigator();
export default function appDrawerScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="SERVICE"
      drawerPosition="left"
      drawerStyle={{
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 1.5
      }}
      drawerContent={props => (
        <CustomDrawerContent {...props} routeName={props.state.routeNames[props.state.index]} />
      )}
    >
      <Drawer.Screen name="HOME" component={AppTab} />
      <Drawer.Screen name="PERFIL" component={PerfilStackScreen} />
      <Drawer.Screen name="FEEDBACK" component={FeedbackStackScreen} />
      <Drawer.Screen name="ALERTA_EPI" component={AlertaEpiStackScreen} />
      <Drawer.Screen name="SUS_NO_CEARA" component={SusNoCearaStackScreen} />
      <Drawer.Screen name="SOBRE" component={AboutStackScreen} />
    </Drawer.Navigator>
  );
}

const AboutStack = createStackNavigator();
function AboutStackScreen() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="SOBRE" component={AboutScreen} options={{ headerShown: true }} />
    </AboutStack.Navigator>
  );
}

const FeedbackStack = createStackNavigator();
function FeedbackStackScreen() {
  return (
    <FeedbackStack.Navigator>
      <FeedbackStack.Screen
        name="FEEDBACK"
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: RELATAR_SUGESTAO }}
      />
    </FeedbackStack.Navigator>
  );
}

const PerfilStack = createDrawerNavigator();
function PerfilStackScreen() {
  return (
    <PerfilStackScreen.Navigator>
      <PerfilStack.Screen
        name="PERFIL"
        component={PerfilStackScreen}
        options={{ headerShown: true }}
      />
    </PerfilStackScreen.Navigator>
  );
}

const AlertaEpiStack = createStackNavigator();
function AlertaEpiStackScreen() {
  return (
    <AlertaEpiStack.Navigator>
      <AlertaEpiStack.Screen
        name="ALERTA_EPI"
        component={FaleConoscoScreen}
        options={{ headerShown: true }}
        initialParams={{ ocorrencia: ALERTA_FALTA_EPI }}
      />
    </AlertaEpiStack.Navigator>
  );
}
const SusNoCearaStack = createStackNavigator();
function SusNoCearaStackScreen() {
  return (
    <SusNoCearaStack.Navigator>
      <SusNoCearaStack.Screen
        name="SUS_NO_CEARA"
        component={SusNoCearaScreen}
        options={{ headerShown: true }}
      />
    </SusNoCearaStack.Navigator>
  );
}

const aoCompartilhar = async () => {
  const messagLink = 'Conhece o app iSUS? Um produto digital do governo do Ceará de apoio a profissionais de saúde, com informações, serviços e oportunidades na palma da mão! Saiba mais: https://coronavirus.ceara.gov.br/isus/';
  try {
    await Share.share({
      message: messagLink
    });
  } catch (error) {
    console.log(error.message);
  }
};

const styles = StyleSheet.create({
  viewVersao: {
    marginTop: 0,
    marginBottom: 16,
  },
  textoVersao: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.4,
    margin: Platform.OS === 'android' ? 10 : 20
  },
  droidSafeArea: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  itemCompartilhar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});
