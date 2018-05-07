import screenView from 'yoo-commons/Components/ScreenView'
import banner from 'yoo-commons/Components/Banner'
import animateNumber from 'yoo-commons/Components/AnimateNumber'
import animatedCurrency from 'yoo-commons/Components/AnimatedCurrency'
import title from 'yoo-commons/Components/Title'
import section from 'yoo-commons/Components/Section'
import paper from 'yoo-commons/Components/Paper'
import roundedButton from 'yoo-commons/Components/RoundedButton'

import ReactNative from 'react-native'
import Timer from 'react-timer-mixin';
import {Colors} from '../Themes'
import * as Theme from '../Themes'

export const ScreenView = screenView({ReactNative})
export const Banner = banner({ReactNative})
const AnimateNumber = animateNumber({ReactNative, Timer})
export const AnimatedCurrency = animatedCurrency({ReactNative, AnimateNumber})
export const Title = title({ReactNative, color: Colors.darkGrey})
export const Section = section({ReactNative})
export const Paper = paper({ReactNative})
export const RoundedButton = roundedButton({ReactNative, Theme})
