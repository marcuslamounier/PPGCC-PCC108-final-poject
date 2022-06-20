import { Box, Button } from "@chakra-ui/react"
import { ReactNode, useContext } from "react"
import TopMenu from "../components/organisms/TopMenu/TopMenu"
import { UserAuthContextProps, UserInterface } from "../interfaces/UserInterface"
import { AuthContext } from "../services/AuthService/AuthContext"
import PageTemplate from "./pageTemplate"

type Props = {
  children: ReactNode
  userDetails: UserAuthContextProps | null
}

const LoggedTemplate = ({ children, userDetails }: Props) => {
  return (
    <PageTemplate>
      <TopMenu username={userDetails?.name || ""} role={userDetails?.role || "student"}/>
      <Box p={[2, 4]}>
        {children}
      </Box>
    </PageTemplate>
  )
}

export default LoggedTemplate
