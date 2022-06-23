import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"

type Props = {
  points: number
  showPontuation?: boolean
}

const PontuationProgress = ({
  points,
  showPontuation = true
}: Props) => {
  return (
    <CircularProgress
      value={showPontuation ? 100 : points * 100}
      size='170px'
      h="180px"
      thickness='15px'
      display="flex"
      justifyContent="center"
    >
      <CircularProgressLabel fontSize="3xl" fontStyle="italic" fontWeight="bold">
        {!showPontuation && '---'}
        {showPontuation && points * 100}
        {' pts'}
      </CircularProgressLabel>
    </CircularProgress>
  )
}

export default PontuationProgress
