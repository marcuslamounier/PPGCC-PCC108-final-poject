import { GetServerSidePropsContext } from 'next'
import nookies, {
  parseCookies,
  destroyCookie,
  setCookie
} from 'nookies'
import { SessionInterface } from "../interfaces/SessionInterface"

export class Session implements SessionInterface {
  protected _token: SessionInterface['token']
  protected _user_id: SessionInterface['user_id']

  constructor(props: Partial<SessionInterface>) {
    this._token = props.token || ''
    this._user_id = props.user_id || null
  }

  public get token() { return this._token }
  public get user_id() { return this._user_id }

  public set token(value: SessionInterface['token']) {
    this._token = value
  }

  public set user_id(value: SessionInterface['user_id']) {
    this.user_id = value
  }

  public async createSession() {
    const cookies = parseCookies()

    for (const prop in cookies) {
      if (cookies[prop]) destroyCookie(null, String(prop))
    }

    for (const prop in this) {
      if (prop.startsWith('_')) {
        let value = String(this[prop])
        setCookie(null, String(prop), value, { path: '/' })
      }
    }
  }

  public getCurrentSession(ctx: GetServerSidePropsContext) {
    const cookies = nookies.get(ctx)

    let isLogged = true
    for (const prop in this) {
      if (prop.startsWith('_') && !cookies[prop]) isLogged = false
    }

    if (isLogged) {
      return new Session({
        token: cookies['_token'] || '',
        user_id: Number(cookies._user_id) || null
      })
    } else {
      return new Session({
        token: '',
        user_id: null
      })
    }
  }
}