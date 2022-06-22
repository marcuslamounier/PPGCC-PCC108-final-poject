import { Button } from "@chakra-ui/react"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { checkAtStart } from "../services/AuthService/CheckLogin"
import LoggedTemplate from "../templates/loggedTemplate"
import { TestService } from "../services/TestService"
import { User } from "../classes/User"
import { Transaction } from "../classes/Transaction"

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
  const ver2 = async () => {
    const teste = await TestService.getProductsById(props.token)
    console.log(teste)
  } 
  const ver3 = async () => {
    const teste = await TestService.getProductsByQuery(props.token)
    console.log(teste)
  } 
  const adicionar = async () => {
    const teste = await TestService.addProducts(props.token)
    console.log(teste)
  }
  const adicionar2 = async () => {
    const teste = await TestService.addTransaction(props.token)
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
  const createUser = () => {
    let u = new User({})
    u.name
    u.name = 'marcusssss'
    u.testar()
  }
  const creatTransaction = () => {
    let u = new Transaction({})
    u.value
    u.value = 250
    u.testar()
  }
  return (
    <LoggedTemplate userDetails={props.user}>
      <Button onClick={ver}>ver</Button>
      <Button onClick={ver2}>ver2</Button>
      <Button onClick={ver3}>ver3</Button>
      <Button onClick={adicionar}>adicionar</Button>
      <Button onClick={adicionar2}>adicionar2</Button>
      <Button onClick={editar}>editar</Button>
      <Button onClick={deletar}>deletar</Button>
      <Button onClick={createUser}>criar user</Button>
      <Button onClick={creatTransaction}>criar transaction</Button>
      asdfasdfasd
    </LoggedTemplate>
  )
}

export default Teste
