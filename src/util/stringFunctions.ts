export const onlyNums = (value: string | number): string => {
  return String(value).replace(/\D/g, '')
}

export const getCurrencyVal = (value: string) => {
  return Number(onlyNums(value))/100
}

export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-Br', {
    style: 'currency', currency: 'BRL'
  })
}
