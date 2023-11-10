import { SERVER_IP } from "configs"
import { useState } from "react"
import { cart } from "store"
import { useRecoilState } from "recoil"

const Address = () => {
    const [cartItems] = useRecoilState(cart)
    const [houseno, setHouseNo] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [pin, setPin] = useState('')
    const [phone] = useState('')

    const orderButtonHandler = () => {
        fetch(
            `${SERVER_IP}/create-order`,
            {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({
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
            <p className="text-white text-3xl text-center mb-5 mt-6 maxwt md:w-[80%] lg:w-[80%] xl:w-[80%]">Add order address</p>

            <form className="bg-white mx-5 p-5 rounded-lg">
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

                <button onClick={(e) => {
                    e.preventDefault()
                    orderButtonHandler()
                }} className="block font-sans font-bold mx-auto my-5 left-0 right-0 w-52 border-2 bg-white text-black rounded-lg shadow-lg px-2 py-1">Proceed to payment</button>
            </form>
        </div>
    )
}

export default Address