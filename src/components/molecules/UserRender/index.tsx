import { Box, Flex, Text, HStack } from "@chakra-ui/react"
import { RoleEnum, UserInterface } from "../../../interfaces/UserInterface"
import MvBadge from "../../atoms/Badge/MvBadge"

type Props = {
  user: UserInterface
  viewerRole: RoleEnum
  me?: boolean
}

const UserRender = ({
  user,
  viewerRole = RoleEnum.manager,
  me = false
}: Props) => {  
  return (
    <Box
      as="div"
      bgColor={me ? 'brand.lighter' : 'inherit'}
      py={2}
      px={4}
      borderRadius={10}
    >
      <Flex as="div" justifyContent="space-between">
        <Text fontWeight="bold">
          {user.name}
          {me && ' (Eu)'}
        </Text>
        <HStack
          display="flex"
          spacing={1}
          bgColor="gray.100"
          p={1}
          borderRadius={5}
        >
          {viewerRole === RoleEnum.admin && (
            <>
              <MvBadge
                badgeName='admin'
                active={user.role === RoleEnum.admin}
              />
              <MvBadge
                badgeName='teacher'
                active={user.role !== RoleEnum.student}
              />
            </>
          )}
          <MvBadge badgeName='edit' />
          <MvBadge badgeName='delete' />
        </HStack>
      </Flex>
      <Text fontStyle="italic">{user.email}</Text>
    </Box>
  )
}

export default UserRender
