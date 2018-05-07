import { StackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import OrderScreen from '../Containers/Order/OrderScreen'
import PaymentScreen from '../Containers/Payment/PaymentScreen'
import ConfirmationScreen from '../Containers/Confirmation/ConfirmationScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  OrderScreen: {screen: OrderScreen},
  PaymentScreen: {screen: PaymentScreen},
  ConfirmationScreen: {screen: ConfirmationScreen}
}, {
  // Default config for all screens
  initialRouteName: 'OrderScreen',
  navigationOptions: {
    //headerStyle: styles.header
    headerStyle: {
      height: 70
    }
  }
})

export default PrimaryNav
