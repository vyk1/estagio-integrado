import React, { Button } from "react";

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";

import Main from "./src/pages/Main";
import About from "./src/pages/About";
import StudentMain from "./src/pages/StudentMain";
import VisorMain from "./src/pages/VisorMain";
import RegisterActivity from "./src/pages/RegisterActivity";
import Contacts from "./src/pages/Contacts";
import GenReport from "./src/pages/GenReport";
import ViewReports from "./src/pages/ViewReports";
import Inicial from "./src/pages/Inicial";
import InfoStage from "./src/pages/InfoStage";
import RegisterMember from "./src/pages/RegisterMember";

const AppNavigator = createStackNavigator({
    Main,
    About,
    StudentMain,
    VisorMain,
    RegisterActivity,
    Contacts,
    GenReport,
    ViewReports,
    Inicial,
    InfoStage,
    RegisterMember
}, {
    initialRouteName: 'Main'
}
); 

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (
            <AppContainer />
        )
    }
}