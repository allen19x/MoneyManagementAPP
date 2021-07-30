import React, { useEffect } from 'react'
import {
	View,
	Image,
	StatusBar,
	Text,
	StyleSheet,
	Linking
} from 'react-native'
import { Actions } from 'react-native-router-flux';

import { Colors, Fonts, Illustrations } from '../../globals/GlobalConfig';
import { getAHPAlternative, wait } from '../../globals/GlobalFunction';

const SplashScreen = () => {

	useEffect(() => {
		wait(2000)
		.then(() => {
			getAHPAlternative()
				.then((res) => {
					if (res) Actions.tabBar()
					else Actions.ahp()
				})
				.catch(err => Actions.ahp())
		})
	})

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={Colors.BLUE_DARK} />
			<Image resizeMethod="resize" source={Illustrations.illustMoneyManagement} style={[styles.imageLogo, { width: 200 }]} />
			<Text style={styles.textLogo}>Money Management</Text>
			<Text style={styles.textAttribute}>This APP use icons made by{" "}
				<Text style={styles.textAttributeUnderline}
					onPress={() => Linking.openURL('https://www.freepik.com')}>
					Freepik
				</Text> from{" "}
				<Text style={styles.textAttributeUnderline}
					onPress={() => Linking.openURL('https://www.flaticon.com/')}>
					www.flaticon.com
				</Text>
			</Text>
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
	},
	textAttribute: {
		textAlign: 'center',
		position: 'absolute',
		bottom: 20,
		color: Colors.BLUE_DARK,
		fontSize: 16,
		fontFamily: Fonts.SF_BOLD,
	},
	textAttributeUnderline: {
		color: Colors.BLUE_DARK,
		fontSize: 16,
		fontFamily: Fonts.SF_BOLD,
		textDecorationLine: 'underline'
	}
});