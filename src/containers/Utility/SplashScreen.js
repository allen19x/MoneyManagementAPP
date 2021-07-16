import React, { useEffect } from 'react'
import {
	View,
	Image,
	StatusBar,
	Text,
	StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Colors, Fonts, Icons } from '../../globals/GlobalConfig';
import { getUserData, wait } from '../../globals/GlobalFunction';

const SplashScreen = () => {

	useEffect(() => {
		wait(2000)
		.then(() => {
			getUserData()
				.then((res) => {
					if (res) Actions.tabBar()
					else Actions.tabBar()
				})
				.catch(err => Actions.tabBar())
		})
		})

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={Colors.GREEN_DARK} />
			<Image resizeMethod="resize" source={Icons.iconLogoSariRoti} style={[styles.imageLogo, { width: 200 }]} />
			<Text style={styles.textLogo}>Money Management</Text>
		</View>
	)
}

export default SplashScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: '10%',
		alignItems: "center",
		justifyContent: "center"
	},
	imageLogo: {
		width: 120,
		height: 120,
		resizeMode: "contain"
	},
	textLogo: {
		color: Colors.GREEN_DARK,
		fontSize: 24,
		marginTop: 30,
		fontFamily: Fonts.SF_BOLD,
		fontWeight: 'bold'
	}
});