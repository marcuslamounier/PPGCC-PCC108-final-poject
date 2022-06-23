export const dateToUtc = (value: string) => {
  return new Date(
    Number(value.substring(6, 10)),
    Number(value.substring(3, 5)) - 1,
    Number(value.substring(0, 2)),
    0,
    0,
    0,
    0
  ).toISOString()
}

export const months: string[] = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

