import { SERVER_IP } from "configs"
import { useState } from "react"
import { cart } from "store"
import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"

const Address = () => {
    const [cartItems, setCartItem] = useRecoilState(cart)
    const [houseno, setHouseNo] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [pin, setPin] = useState('')
    const [phone, setPhone] = useState('')
    const navigate = useNavigate()

    const orderButtonHandler = () => {
        fetch(
            `${SERVER_IP}/create-order`,
            {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
                    //  houseNumber: string,
                    // cityAddr: string,
                    // districtAddr: string,
                    // stateAddr: string,
                    // pinAddr: string,
                    // phone: string
                    orderAddress: {
                        houseNumber: houseno,
                        cityAddr: city,
                        districtAddr: district,
                        stateAddr: state,
                        pinAddr: pin,
                        phone: phone
                    },

                    orderItems: cartItems
                })
            }
        )
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                console.log(resp)
                window.location.href = resp.url
            })
    }

    return (
        <div className="mt-20 p-2 flex flex-col items-center" >
            <p className="text-3xl text-center mb-5 mt-6">Add order address</p>

            <form className="">
                <p className="m-1">House no:</p>
                <input value={houseno} onChange={(e) => setHouseNo(e.target.value)} type="text" className="rounded-lg shadow-lg border border-slate-400 p-1 mb-2" />

                <p className="m-1">City:</p>
                <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="rounded-lg border shadow-lg border-slate-400 p-1 mb-2" />

                <p className="m-1">District:</p>
                <input value={district} onChange={(e) => setDistrict(e.target.value)} type="text" className="rounded-lg shadow-lg border border-slate-400 p-1 mb-2" />

                <p className="m-1">State:</p>
                <input value={state} onChange={(e) => setState(e.target.value)} type="text" className="rounded-lg shadow-lg border border-slate-400 p-1 mb-2" />

                <p className="m-1">Zip:</p>
                <input value={pin} onChange={(e) => setPin(e.target.value)} type="text" className="rounded-lg shadow-lg border border-slate-400 p-1 mb-2" />

            </form>

            <button onClick={(e) => {
                e.preventDefault()
                orderButtonHandler()
            }} className="fixed bottom-24 font-sans font-bold mx-auto left-0 right-0 w-52 border-2 bg-blackbg text-white rounded-lg shadow-lg px-2 py-1">Proceed to payment</button>
        </div>
    )
}

export default Address