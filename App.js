import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import { Image, StatusBar }from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home/Home';
import Shop from './Shop/Shop';
import Cart from './Cart/Cart';
import Product from './Product/Product';
import Account from './Account/Account';
import User from './Account/User';
import Delivery from './Account/Delivery';
import History from './History/History';
import Privacy from './Settings/Privacy';
import Previous from './Previous/Previous';
import Customer from './Settings/Customer';
import Terms from './Settings/Terms';
import Refund from './Settings/Refund';
import Category from './Shop/Category';
import Gender from './Shop/Gender';
import Signup from './Login/Signup';
import Login from './Login/Login';
import Forgot from './Login/Forgot';
import AuthLoading from './Login/Authloading';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz1NwWgjC9U4CU7nRcWtwVp6aBkOIhN_Q",
  authDomain: "malgre-business.firebaseapp.com",
  projectId: "malgre-business",
  storageBucket: "malgre-business.appspot.com",
  messagingSenderId: "9807951283",
  appId: "1:9807951283:web:b841f4d997e169da6e87c6",
  measurementId: "G-3JJFPCV0H6"
};
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const HomeStack = createNativeStackNavigator();
const ShopStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const PreviousStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const HomeStackScreen = ({ route }) => {
  return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name = "Home" component = {Home} />
          <HomeStack.Screen name = "Category" component = {Category}/>
          <HomeStack.Screen name = "Product" component = {Product} />
        </HomeStack.Navigator>

    )
}

const ShopStackScreen = ({route}) => {
  return (
      <ShopStack.Navigator screenOptions={{ headerShown: false }}>
          <ShopStack.Screen name = "Shop" component = {Shop} />
          <ShopStack.Screen name = "Gender" component = {Gender} />
          <ShopStack.Screen name = "Category" component = {Category} />
          <ShopStack.Screen name = "Product" component = {Product} />
      </ShopStack.Navigator>

  )
}

const CartStackScreen = ({ route }) => {
  return (
      <CartStack.Navigator screenOptions={{ headerShown: false }}>
        <CartStack.Screen name = "C" component = {Cart} />
      </CartStack.Navigator>

  )
}

const AccountStackScreen = ({ route }) => {
  return (
      <AccountStack.Navigator screenOptions={{ headerShown: false }}>
        <AccountStack.Screen name = "Account" component = {Account}/>
        <AccountStack.Screen name = "User" component = {User} />
        <AccountStack.Screen name = "Delivery" component = {Delivery} />
        <AccountStack.Screen name = "Customer" component = {Customer} />
        <AccountStack.Screen name = "Previous" component = {Previous} />
        <AccountStack.Screen name = "Privacy" component = {Privacy} />
        <AccountStack.Screen name = "Refund" component = {Refund} />
        <AccountStack.Screen name = "Terms" component = {Terms} />
      </AccountStack.Navigator>

  )
}

const HistoryStackScreen = ({ route }) => {
  return (
      <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
        <HistoryStack.Screen name = "History" component = {History} />
        <HistoryStack.Screen name = "Product" component = {Product} />
      </HistoryStack.Navigator>

  )
}

const PreviousStackScreen = ({ route }) => {
  return (
      <PreviousStack.Navigator screenOptions={{ headerShown: false }}>
        <PreviousStack.Screen name = "Previous" component = {Previous} />
      </PreviousStack.Navigator>

  )
}

const SettingsStackScreen = ({ route }) => {
  return (
      <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
        <SettingsStack.Screen name = "Customer" component = {Customer} />
        <SettingsStack.Screen name = "Privacy" component = {Privacy} />
        <SettingsStack.Screen name = "Refund" component = {Refund} />
        <SettingsStack.Screen name = "Terms" component = {Terms} />
      </SettingsStack.Navigator>

  )
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 200, height: 200, resizeMode: 'contain' }}
      source={require ('./images/header.png')}
    />
  );
}

const Tab = createBottomTabNavigator();

const MyTab = () => {
  const [id, setId] = useState(''); //This is user id
  const [count, setCount] = useState(0);

    useEffect(() => {
      const fetchCart = async() => {
        const userid = await SecureStore.getItemAsync('user');
        setId(userid);
        const q = query(collection(db, "Cart"), where("user", "==", id));
        const querySnapShot = await getDocs(q);
        if(querySnapShot.empty)
        {
            console.log('It is empty dawq');
        }
        else
        {
          let count = 0; // Create a variable to hold the count
          querySnapShot.forEach((doc) => {
            count++;
          });
          setCount(count);
        }
      };
      
      fetchCart();
    });

  return(
      <Tab.Navigator
        screenOptions = {({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') 
          {
            iconName = focused
              ? 'home'
              : 'home-outline';
          }  
          else if (route.name === 'Shop') 
          {
            iconName = focused 
            ? 'shirt' 
            : 'shirt-outline';
          }
          else if (route.name === 'Cart') 
          {
            iconName = focused 
            ? 'cart' 
            : 'cart-outline';
          }
          else if (route.name === 'Account') 
          {
            iconName = focused 
            ? 'person' 
            : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
      })}>
      <Tab.Screen 
        name={"Home"} 
        component={HomeStackScreen}
        options={{ headerShown: false, }}
      />
      <Tab.Screen 
        name={"Shop"} 
        component={ShopStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name={"Cart"} 
        component={CartStackScreen}
        options={{ headerShown: false, tabBarBadge: count, tabBarBadgeStyle: {backgroundColor: '#e2c6bf', color: 'black', padding: 1, fontSize: 9,} }}
      />
      <Tab.Screen 
        name={"Account"} 
        component={AccountStackScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => { 
  return (
    <Drawer.Navigator useLegacyImplementation
      screenOptions = {{drawerInactiveBackgroundColor: 'black' , drawerInactiveTintColor: '#e6c2bf', drawerActiveTintColor: 'black', drawerActiveBackgroundColor: '#e6c2bf', drawerStyle: {backgroundColor: '#e6c2bf'},}}>
      <Drawer.Screen name={ 'Home' } component = {MyTab} 
        options={{ headerStyle: { height: 100},
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
  
       }}/>
      <Drawer.Screen name={ 'Browsing History' } component={HistoryStackScreen} 
        options={{ headerStyle: { height: 100},
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
       }}/>
       <Drawer.Screen name={ 'Previous Orders' } component={PreviousStackScreen} 
        options={{ headerStyle: { height: 100},
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
       }}/>
       <Drawer.Screen name={ 'Customer Service' } component={SettingsStackScreen} 
        options={{ headerStyle: { height: 100},
        headerTitle: (props) => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
       }}/>
    </Drawer.Navigator>
  );
}

const LoginStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name = "Signup" component = {Signup} />
        <AuthStack.Screen name = "Login" component = {Login} />
        <AuthStack.Screen name = "Forgot" component = {Forgot} />
        <AuthStack.Screen name = "View" component = {MyDrawer} />
      </AuthStack.Navigator>
    )
}

const LoginStackScreen = () => {
  return (
      <LoginStack.Navigator screenOptions={{ headerShown: false }}>
        <LoginStack.Screen name = "Check" component = {AuthLoading} />
        <LoginStack.Screen name = "Auth" component = {AuthStackScreen} />
        <LoginStack.Screen name = "View" component = {MyDrawer} />
      </LoginStack.Navigator>
    )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={'white'}/>
      <LoginStackScreen/>
    </NavigationContainer>
  );
};
