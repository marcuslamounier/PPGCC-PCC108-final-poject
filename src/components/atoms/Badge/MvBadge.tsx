import { Image, Box } from "@chakra-ui/react"

type Props = {
  badgeName: string
  boxSize?: string | number
  isRole?: boolean
  alt?: string
  active?: boolean
}

const MvBadge = ({
  badgeName,
  boxSize = "24px",
  isRole = false,
  alt,
  active = true
}: Props) => {
  return (
    <Box boxSize={boxSize}>
      <Image
        filter={active ? 'none' : 'blur(1px) opacity(0.3)'}
        src={`${badgeName}.png`}
        alt={isRole ? `You have the ${badgeName} role!` : (alt || badgeName)}
      />
    </Box>
  )
}

export default MvBadge
