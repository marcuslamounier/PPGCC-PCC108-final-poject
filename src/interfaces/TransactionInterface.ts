export enum ReleaseEnum {
  "expense" = -1,
  "revenue" = 1
}

export interface TransactionInterface {
  id: number | null
  release: ReleaseEnum
  date: Date
  description: string
  value: number
  category: string
  user_id: number | null
}
