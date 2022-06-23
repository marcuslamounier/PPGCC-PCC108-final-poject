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
  getProductsById(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.get(`${path}/1`, config)
  },
  getProductsByQuery(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    return api.get(`${path}?cost=10`, config)
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
  },
  addTransaction(token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const body = {
      "release": "expense",
      "date": new Date(),
      "description": "Conserto da bicicleta",
      "value": 15464,
      "category": "Lazer",
      "user_id": 2
    }
    return api.post('/transactions', body, config)
  }
}