import React from 'react'
import { StatusBar, View } from 'react-native'

import { Colors } from './globals/GlobalConfig';
import NavigationRouter from './navigations/NavigationRouter';

const App = () => {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar backgroundColor={Colors.BLUE_DARK} barStyle='light-content'/>
			<NavigationRouter />
		</View>
	)
}

export default App