import { atom } from "recoil"

export const profile = atom({
    key: 'profileState',
    default: {
        isActive: false,
        email: 'siddhantota@protonmail.com'
    }
})