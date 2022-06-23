import { GetServerSidePropsContext } from 'next'
import { Session } from '../../classes/Session'
import { initialUser } from './AuthContext'
import { AuthService } from './AuthService'

export const checkAtStart = async (ctx: GetServerSidePropsContext) => {
  const session = new Session({}).getCurrentSession(ctx)
  let props = { user: initialUser, token: session.token }

  if (session.token && session.user_id) {
    try {
      const me = await AuthService.getMe(session.token, session.user_id)
      if (me) {
        props = {
          user: {
            id: Number(session.user_id),
            name: me.name,
            role: me.role
          },
          token: session.token
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      return { props }
    }
  } else return { props }
}