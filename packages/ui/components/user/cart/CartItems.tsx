import { Button, Typography } from "@mui/material"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { Card } from "@mui/material"
import { SERVER_IP } from "configs"


const CartItems = () => {

    const handlePaymentSubmit = () => {
        fetch('http://localhost:8000/create-order', {
            method: 'POST'
        })
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                window.location.href = resp.url
            })
    };

    const [cartItems, setCartItems] = useState<{
        id: number;
        name: string;
        price: number;
        description: string;
        imagesUrl: string;
    }[]>([
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
    ])

    useEffect(() => {
        fetch(`${SERVER_IP}/cart/getall`, {
            headers: {
                'Content-type': 'Application/json'
            },
            credentials: 'include'
        })
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                const cartArr: {
                    id: number;
                    name: string;
                    price: number;
                    description: string;
                    imagesUrl: string;
                }[] = resp.message

                setCartItems(cartArr)

            })
    }, [])

    return (

        <Box sx={{ marginTop: '35px' }}>
            <Typography sx={{ padding: '1%', textAlign: 'center' }} variant="h4"> Cart items </Typography>
            <Box className='cart-items-holder'>
                {
                    cartItems.map((item) => {
                        const stringUrlTrimmed = item.imagesUrl.slice(1, (item.imagesUrl.length - 1))
                        const arr = stringUrlTrimmed.split(', ').map((url) => {
                            return url.slice(1, url.length - 1)
                        })
                        return (
                            <Card key={item.id} sx={{ margin: '2%', padding: '2%' }}>
                                <img src={'http://' + arr[0]} alt={item.name} style={{ borderRadius: '4px' }} />
                                <Typography variant='h6'>{item.name}</Typography>
                                <Typography variant='h6'>{'₹ ' + item.price}</Typography>
                            </Card>
                        )
                    })
                }
            </Box>
            <form>
                <Button variant="contained" sx={{ position: 'fixed', bottom: '4%', left: '50%', right: '50%', width: '100px' }} onClick={handlePaymentSubmit}>Buy now</Button>
            </form>
        </Box>

    )
}

export default CartItems