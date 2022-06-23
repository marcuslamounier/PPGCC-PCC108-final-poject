import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import { initialUser } from './AuthContext'
import { AuthService } from './AuthService'

export const checkAtStart = async (ctx: GetServerSidePropsContext) => {
  let props = { user: initialUser, token: '' }

  const cookies = nookies.get(ctx)
  const token = cookies.token
  const user_id = cookies.user_id

  try {
    const me = await AuthService.getMe(token, Number(user_id))
    if (me) {
      props = {
        user: { id: Number(user_id), name: me.name, role: me.role },
        token: token
      }
    }
  } catch (error) {
    console.error('user not found')
  } finally {
    return { props }
  }
}