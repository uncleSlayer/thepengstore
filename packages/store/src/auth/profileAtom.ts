import { atom } from "recoil"
import { type User } from 'firebase/auth'


export const profile = atom({
    key: 'profileState',
    default: <null | User>null
})