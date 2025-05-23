import type { SafePointData } from './schema'

/**
 * Model
 */
export type SafePoint = {
  id: string
  accountId: string
  name: string
  googlePlaceId: string | null
  address: string
  lat: number
  lng: number
  type: SafePointData['type'] | {} | string
}

/**
 * API Responses
 */
export type GetSafePointResponse = {
  data: SafePoint
}

export type GetSafePointsResponse = {
  data: SafePoint[]
}

export type CreateSafePointResponse = {
  message: string
  data: SafePoint
}

export type UpdateSafePointResponse = {
  message: string
  data: SafePoint
}

export type DeleteSafePointsResponse = {
  message: string
}
