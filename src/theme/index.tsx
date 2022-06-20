import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'
import { fonts } from './fonts'
import styles from './styles'

export const defaultTheme = extendTheme({
  colors: colors,
  fonts: fonts,
  styles: {...styles}
})
