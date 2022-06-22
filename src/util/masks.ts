export const dateMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{1,2})/, '$1/$2')
    .replace(/(\/\d{4})\d+?$/, '$1')
}

export const moneyMask = (value: any) => {
  if (value === '') return 'R$ 0,00'
  else {
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
    const result = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2
    }).format(parseFloat(value) / 100)
    return 'R$ ' + result
  }
}
