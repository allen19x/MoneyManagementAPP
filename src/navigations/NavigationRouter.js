import React, { PureComponent } from 'react'
import {
    View,
    Text,
    Image,
    TouchableNativeFeedback,
    Platform,
    StyleSheet,
    Easing,
    BackHandler
} from 'react-native'
import { Scene, Router, Stack, Actions } from 'react-native-router-flux'

import { Fonts, Icons, Colors, Metrics } from '../globals/GlobalConfig'

import SplashScreen from '../containers/Utility/SplashScreen'

import GlobalStyle from '../globals/GlobalStyle'
import DetailTransaction from '../containers/MainTabs/DetailTransaction/DetailTransactionScreen'
import DailyTrackScreen from '../containers/MainTabs/DailyTrack/DailyTrackScreen'
import MonthlTrackScreen from '../containers/MainTabs/MonthlyTrack/MonthlyTrackScreen'
import TransactionSummary from '../containers/MainTabs/TransactionSummary/TransactionSummaryScreen'
import AHPScreen from '../containers/AHP/AHPScreen'


class TabIcon extends PureComponent {
    navigate(pathName) {
        Actions.jump(pathName)
    }

    render() {
        const focusedColor = Colors.GOLD
        const inactiveColor = '#B7B7B7'
        const { screenKey, iconProps } = this.props
        const { focused, title } = iconProps

        let iconTab, titleTab = title

        switch (screenKey) {
            case 'dailyTrack':
                iconTab = Icons.iconDaily
                titleTab = 'Daily Track'
                break;
            case 'monthlyTrack':
                iconTab = Icons.iconCalendar
                titleTab = 'Monthly Track'
                break;
            case 'transactionSummary':
                iconTab = Icons.iconReport
                titleTab = 'Transaction Summary'
                break;
        }

        return (
            <TouchableNativeFeedback
                onPress={() => this.navigate(screenKey)}
                background={Platform.Version >= 21 ?
                    TouchableNativeFeedback.Ripple(Colors.GOLD, true) :
                    TouchableNativeFeedback.SelectableBackground()}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
                    <View style={{ height: 24, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image resizeMethod="resize" source={iconTab} style={[{ height: '100%', width: '100%', resizeMode: "contain" }, focused ? { tintColor: focusedColor } : { tintColor: inactiveColor }]} />
                    </View>
                    <Text style={[{ fontFamily: Fonts.SF_MEDIUM, fontSize: 10, marginTop: 5, textAlign: 'center' }, focused ? { color: focusedColor } : { color: inactiveColor }]}>{titleTab}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const NavigationRouter = () => {
    const handleBack = () => {
        switch (Actions.currentScene) {
            case 'splash':
                break;
            case 'dailyTrack':
                BackHandler.exitApp()
                break;
            default:
                Actions.pop()
                break;
        }

        return true;
    }

    const MyTransitionSpec = ({
        duration: 250,
        easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99)
        // timing: Animated.timing,
    });

    const transitionConfig = () => ({
        transitionSpec: MyTransitionSpec,
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
            const width = layout.initWidth;

            // right to left by replacing bottom scene
            return {
                transform: [{
                    translateX: position.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [width, 0, -width],
                    }),
                }]
            };
        }
    });


    return (
        <Router backAndroidHandler={handleBack}>
            <Stack key='root'
                navigationBarStyle={{ ...GlobalStyle.navigationBarShadow, height: Metrics.NAVBAR_HEIGHT }}
                transitionConfig={transitionConfig}
            >
                <Scene key='splash'
                    initial
                    hideNavBar
                    type="reset"
                    component={SplashScreen}
                />
                <Scene
                    initial
                    hideNavBar
                    key='ahp'
                    titleStyle={styles.headerBackTitle}
                    component={AHPScreen} />
                <Scene
                    back
                    key='detailTransaction'
                    onEnter={() => Actions.refresh({ lastUpdate: new Date })}
                    title="Detail Transaction"
                    titleStyle={styles.headerBackTitle}
                    component={DetailTransaction} />
                <Scene key="tabBar"
                    type="reset"
                    tabs
                    showLabel={false}
                    tabBarStyle={{ backgroundColor: Colors.BLUE, borderTopWidth: 1, borderTopColor: Colors.GRAY, height: 70 }}
                    hideNavBar>
                    <Scene key='dailyTrack'
                        onEnter={() => Actions.refresh({ lastUpdate: new Date })}
                        title="Daily Track"
                        titleStyle={styles.headerLeftTitle}
                        icon={(iconProps) => <TabIcon screenKey='dailyTrack' iconProps={iconProps} />}
                        component={DailyTrackScreen} />
                    <Scene key='monthlyTrack'
                        onEnter={() => Actions.refresh({ lastUpdate: new Date })}
                        title="Monthly Track"
                        titleStyle={styles.headerLeftTitle}
                        icon={(iconProps) => <TabIcon screenKey='monthlyTrack' iconProps={iconProps} />}
                        component={MonthlTrackScreen} />
                    <Scene key='transactionSummary'
                        onEnter={() => Actions.refresh({ lastUpdate: new Date })}
                        title="Transaction Summary"
                        titleStyle={styles.headerLeftTitle}
                        icon={(iconProps) => <TabIcon screenKey='transactionSummary' iconProps={iconProps} />}
                        component={TransactionSummary} />
                </Scene>
            </Stack>
        </Router>
    )
}

const styles = StyleSheet.create({
    headerBackContainer: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLeftTitle: {
        width: '100%',
        paddingLeft: 3,
        color: Colors.BLACK,
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        fontFamily: Fonts.SF_MEDIUM,
    },
    headerBackTitle: {
        marginLeft: 0,
        color: Colors.BLACK,
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        fontFamily: Fonts.SF_MEDIUM,
    },
})

export default NavigationRouter