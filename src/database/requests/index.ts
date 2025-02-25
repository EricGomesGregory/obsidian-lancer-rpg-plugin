import { requestNpc, requestNpcList, type NpcRequest } from "./Npc"


export enum RequestStatus {
  Failed = "Failed",
  Succeeded = "Succeeded"
}

export type RequestResult<T> = {
  status: RequestStatus
  data: T
}

export type {
  NpcRequest,
}

export {
  requestNpc,
  requestNpcList
}