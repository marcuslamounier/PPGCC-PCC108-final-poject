import { Button } from "@chakra-ui/react"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { checkAtStart } from "../services/AuthService/CheckLogin"
import LoggedTemplate from "../templates/loggedTemplate"
import { TestService } from "../services/TestService"

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return await checkAtStart(ctx)
    .then((props) => { return props })
    .catch((error) => { throw error })
}

const Teste = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const ver = async () => {
    const teste = await TestService.getProducts(props.token)
    console.log(teste)
  } 
  const adicionar = async () => {
    const teste = await TestService.addProducts(props.token)
    console.log(teste)
  }
  const editar = async () => {
    const teste = await TestService.editProducts(props.token)
    console.log(teste)
  }
  const deletar = async () => {
    const teste = await TestService.deleteProduct(props.token)
    console.log(teste)
  }
  return (
    <LoggedTemplate userDetails={props.user}>
      <Button onClick={ver}>ver</Button>
      <Button onClick={adicionar}>adicionar</Button>
      <Button onClick={editar}>editar</Button>
      <Button onClick={deletar}>deletar</Button>
      asdfasdfasd
    </LoggedTemplate>
  )
}

export default Teste
