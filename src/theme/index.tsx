import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import components from './components'
import { fonts } from './fonts'
import styles from './styles'

export const defaultTheme = extendTheme({
  components: {...components},
  colors: colors,
  fonts: fonts,
  styles: {...styles},
  
})
