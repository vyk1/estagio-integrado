import React, { Button } from "react";

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

import Main from "./src/pages/Main";
import About from "./src/pages/About";
import StudentMain from "./src/pages/StudentMain";
import VisorMain from "./src/pages/VisorMain";
import RegisterActivity from "./src/pages/RegisterActivity";
const AppNavigator = createStackNavigator({
    Main,
    About,
    StudentMain,
    VisorMain,
    RegisterActivity

}, {
    initialRouteName: 'StudentMain'
}
);

const AppContainer = createAppContainer(AppNavigator);
//title do lugar onde stá
// bttm nav-> profile ('voce está logado como ...', read e update de cadastro - form, )
// https://medium.com/better-programming/react-native-add-app-icons-and-launch-screens-onto-ios-and-android-apps-3bfbc20b7d4c
export default class App extends React.Component {
    render() {
        return (
            <AppContainer />
            // <AppContainer2 />
        )
    }
}

// export default createStackNavigator({TabNavigator}, {headerMode: 'none'});