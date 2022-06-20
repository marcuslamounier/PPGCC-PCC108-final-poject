import api from "./api"

const path = '/products'

export const TestService = {
  getProducts(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.get(path, config)
  },
  addProducts(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const body = {
      "cost": 10,
      "quantity": 1000,
      "locationId": 1,
      "familyId": 1
    }
    return api.post(path, body, config)
  },
  editProducts(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const body = {
      "name": "mudou",
      "cost": 10,
      "quantity": 1000,
      "locationId": 1,
      "familyId": 1
    }
    return api.put(`${path}/19`, body, config)
  },
  deleteProduct(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.delete(`${path}/19`, config)
  }
}