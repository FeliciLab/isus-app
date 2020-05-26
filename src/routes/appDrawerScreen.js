import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Headline } from 'react-native-paper';
import { View, Image, Dimensions } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AboutScreen from '../pages/About';
import AppTab from './appBottomTab';
import Heart from '../assets/icons/heart.png';
import FeedbackScreen from '../pages/FeedbackScreen';

function CustomDrawerContent(props) {
  const {
    navigation: { navigate },
    routeName
  } = props;
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          borderBottomWidth: 0.5,
          borderBottomColor: '#c4c4c4'
        }}
      >
        <Image source={Heart} resizeMode="contain" style={{ margin: 10 }} />
        <Headline style={{ alignSelf: 'flex-end', fontWeight: 'bold' }}>iSUS</Headline>
      </View>
      <DrawerItem
        icon={() => <FontAwesomeIcon name="home" size={20} color="#111" />}
        label="Home"
        labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
        inactiveTintColor="#111"
        activeTintColor="#111"
        inactiveBackgroundColor="transparent"
        activeBackgroundColor="transparent"
        focused={routeName === 'HOME'}
        onPress={() => navigate('HOME')}
      />
      <DrawerItem
        icon={() => <Icon name="face" size={20} color="#111" />}
        label="FeedBack"
        labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
        inactiveTintColor="#111"
        activeTintColor="#111"
        inactiveBackgroundColor="transparent"
        activeBackgroundColor="transparent"
        focused={routeName === 'FEEDBACK'}
        onPress={() => navigate('FEEDBACK')}
      />
      <DrawerItem
        icon={() => <Icon name="information-outline" size={20} color="#111" />}
        label="Sobre o iSUS"
        labelStyle={{ fontWeight: 'bold', fontSize: 15 }}
        inactiveTintColor="#111"
        activeTintColor="#111"
        inactiveBackgroundColor="transparent"
        activeBackgroundColor="transparent"
        focused={routeName === 'SOBRE'}
        onPress={() => navigate('SOBRE')}
      />
    </DrawerContentScrollView>
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
      <Drawer.Screen name="FEEDBACK" component={FeedbackStackScreen} />
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
      <FeedbackStack.Screen name="FEEDBACK" component={FeedbackScreen} options={{ headerShown: true }} />
    </FeedbackStack.Navigator>
  );
}
