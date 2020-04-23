import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Index from '../screens';
import Preview from '../screens/preview';

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator mode={'modal'} initialRouteName={'index'}
							 screenOptions={{
								 headerTintColor: 'white',
								 headerStyle: {backgroundColor: 'blue'}
							 }}>
				<Stack.Screen name={'index'} component={Index} options={
					{title: 'Todo\'s'}
				}/>
				<Stack.Screen name={'preview'} component={Preview} options={
					{title: 'Preview Todo\'s'}
				}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
