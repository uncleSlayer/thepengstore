import { SERVER_IP } from "configs"
import { useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom"
import plus from '../../assets/plus.png'
import minus from '../../assets/minus.png'
import toast, { Toaster } from "react-hot-toast"
import { RecoilState, useRecoilState } from "recoil"
import { cart } from "store"

const Cart = () => {
    const navigate = useNavigate()
    const [cartStore, setCartStore] = useRecoilState(cart)
    const [cartInfo, setCartInfo] = useState<{
        id: number,
        name: string,
        description: string,
        price: number,
        imagesUrl: string,
        quantity: number
    }[]>()

    const fetchAllCartProducts = () => {
        fetch(
            SERVER_IP + '/cart/getall',
            {
                headers: {
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            }
        )
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                console.log(resp);
                setCartInfo(resp.message)
                setCartStore(resp.message)
            })
    }

    useEffect(() => {
        fetchAllCartProducts()
    }, [])

    return (
        <>
            <Toaster />
            <div className="mt-20" >

                <p className="text-3xl text-center mt-24 pb-2">Your cart</p>
                {
                    cartInfo?.map((item) => {
                        return (
                            <div className="rounded-lg m-3 border shadow-lg p-2 flex justify-between" key={item.id} id={`${item.id}`}>
                                <div className="p-2">
                                    <p>{item.name}</p>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <div className="flex gap-3 py-2">
                                        <img src={plus} onClick={() => {
                                            fetch(
                                                `${SERVER_IP}/cart/add/${item.id}`,
                                                {
                                                    headers: {
                                                        'Content-type': 'application/json'
                                                    },
                                                    credentials: 'include',
                                                    method: 'post'
                                                }
                                            )
                                                .then((resp) => {
                                                    return resp.json()
                                                })
                                                .then((resp) => {
                                                    console.log(resp);
                                                    toast('🛒 Item added to cart')
                                                    fetchAllCartProducts()
                                                    // I'll move the onclick function to a varible later.
                                                })
                                        }} className="w-6" alt="" />
                                        <img src={minus} onClick={() => {
                                            console.log('clicked');

                                            fetch(
                                                `${SERVER_IP}/cart/remove-one/${item.id}`,
                                                {
                                                    headers: {
                                                        'Contet-type': 'application/json'
                                                    },
                                                    method: 'post',
                                                    credentials: 'include'
                                                }
                                            )
                                                .then((resp) => {
                                                    toast('🛒 one item removed from cart')
                                                    fetchAllCartProducts()
                                                    return resp.json()
                                                })
                                                .then((resp) => {
                                                    console.log(resp);
                                                })
                                                .catch((err) => {
                                                    console.log(err);

                                                })
                                        }} className="w-6" alt="" />
                                    </div>
                                </div>
                                <img src={item.imagesUrl} className="w-40 border-gray-400 border shadow-lg rounded-lg" alt="product image" />
                            </div>
                        )
                    })
                }
            </div>
            <button className="fixed bottom-24 font-sans font-bold mx-auto left-0 right-0 w-32 border-2 bg-blackbg text-white rounded-lg shadow-lg px-2 py-1" onClick={(e) => {
                e.preventDefault()
                console.log('clicked');
                navigate('/order/address')
            }} >Order now</button>
        </>
    )

}

export default Cart