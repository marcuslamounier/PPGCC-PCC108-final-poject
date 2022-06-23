import React, { InputHTMLAttributes } from 'react'
import { render } from '@testing-library/react'
import Home from "../src/pages/index"
import { AuthService } from '../src/services/AuthService/AuthService'
import userEvent from '@testing-library/user-event'

describe('Page tests', () => {
  it('should render fields', () => {
    const { getByTestId } = render(<Home />)
    const fields = [
      'email',
      'pass'
    ]
    for (let field of fields) {
      expect(getByTestId(`test-input-${field}`)).toBeTruthy()
    }
  })
  it('should render submit button', () => {
    const { getByTestId } = render(<Home />)
    expect(getByTestId('test-submit')).toBeTruthy()
  })
})

describe('Auth tests', () => {
  it('should autheticate', async () => {
    const testInfo = { email: 'user@teste.com', pass: 'user' }
    const { status } = await AuthService.login(
      testInfo.email,
      testInfo.pass
    )

    expect(status).toBe(200)
  })
})