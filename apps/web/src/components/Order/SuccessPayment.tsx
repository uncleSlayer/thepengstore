import { SERVER_IP } from "configs"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { cart } from 'store'

const SuccessPayment = () => {
    const [cartItems, setCartItems] = useRecoilState(cart)
    const params = new URLSearchParams(location.search)

    const houseNo = params.get('houseno')
    const city = params.get('city')
    const state = params.get('state')
    const district = params.get('district')
    const pin = params.get('pin')

    if (!pin) {
        console.log('error related to type of pin');
        return
    }

    console.log(houseNo, city, state, district, pin);
    const cartItemsIds: number[] = []
    console.log(cartItems);

    for (let i = 0; i < cartItems.length; i++) {
        cartItemsIds.push(cartItems[i].id)
    }

    useEffect(() => {

        fetch(
            `${SERVER_IP}/create-order-next-step`,
            {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        success: true,
                        ids: cartItemsIds,
                        address: {
                            houseNo,
                            city,
                            district,
                            state,
                            pin: parseInt(pin),
                            phone: ''
                        }
                    }
                })
            }
        )
    }, [])

    return (
        <div className="mt-20" >SuccessPayment</div>
    )
}

export default SuccessPayment