import { Typography } from "@mui/material"
import { Box } from "@mui/material"
import { useState } from "react"
import { Card } from "@mui/material"

const CartItems = () => {

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

    return (
        <Box sx={{ marginTop: '35px' }}>
            <Typography sx={{ padding: '1%', textAlign: 'center' }} variant="h4"> Cart items </Typography>
            <Box className='cart-items-holder'>
                {
                    cartItems.map((item) => {
                        return (
                            <Card key={item.id} sx={{ margin: '2%', padding: '2%' }}>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREabvR30BJaXiYN2Azwc8fPUWJmv1nzMatw9YIxxrygA&s' alt={item.name} style={{ borderRadius: '4px' }} />
                                <Typography variant='h6'>{item.name}</Typography>
                                <Typography variant='h6'>{'₹ ' + item.price}</Typography>
                            </Card>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default CartItems