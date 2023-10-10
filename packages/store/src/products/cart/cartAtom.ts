import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const cart = atom({
    key: 'cartItt',
    default: [
        {
            id: 1,
            name: 'default one',
            price: 5000,
            description: 'helllo bollo',
            imagesUrl: ''
        },
        {
            id: 2,
            name: 'default two',
            price: 7000,
            description: 'brollo the great hello',
            imagesUrl: ''
        },
        {
            id: 3,
            name: 'default three',
            price: 12000,
            description: 'mojan lorem',
            imagesUrl: ''
        },
    ],
    effects_UNSTABLE: [persistAtom]
})