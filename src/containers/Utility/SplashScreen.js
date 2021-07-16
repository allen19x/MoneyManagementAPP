import React, { useEffect } from 'react'
import {
	View,
	Image,
	StatusBar,
	Text,
	StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Colors, Fonts, Icons, Illustrations } from '../../globals/GlobalConfig';
import { getAHPAlternative, wait } from '../../globals/GlobalFunction';

const SplashScreen = () => {

	useEffect(() => {
		wait(2000)
		.then(() => {
			getAHPAlternative()
				.then((res) => {
					if (res) Actions.tabBar()
					else Actions.tabBar()
				})
				.catch(err => Actions.tabBar())
		})
		})

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={Colors.BLUE_DARK} />
			<Image resizeMethod="resize" source={Illustrations.illustMoneyManagement} style={[styles.imageLogo, { width: 200 }]} />
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
		color: Colors.BLUE_DARK,
		fontSize: 24,
		marginTop: 30,
		fontFamily: Fonts.SF_BOLD,
		fontWeight: 'bold'
	}
});