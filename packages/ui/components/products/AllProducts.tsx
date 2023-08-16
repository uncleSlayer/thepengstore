import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { SERVER_IP } from 'configs'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Fab from '@mui/material/Fab';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const AllProducts = () => {

    type productsArrayType = {
        id: number,
        name: string,
        price: number,
        description: string,
        imagesUrl: string
    }

    const [products, setProducts] = useState<productsArrayType[]>([])
    const [lastProductId, setLastProductId] = useState(0)

    useEffect(() => {
        fetch(
            SERVER_IP + '/getnextitems',
            {
                method: 'post',
                headers: {
                    "Content-type": "Application/json"
                },
                body: JSON.stringify({
                    id: lastProductId
                })
            }
        )
            .then(
                (resp) => {
                    return resp.json()
                }
            )
            .then((resp) => {
                setProducts(resp.data)
            })
    }, [])

    return (
        <Box sx={{ marginTop: '50px', padding: '2%', display: 'flex', fontFamily: 'roboto' }}>
            <Box sx={{ width: '25%' }} >some other infos</Box>
            <Box sx={{ width: '100%', padding: '1%' }} >
                <Grid container spacing={4} >
                    {
                        products.map((product) => {

                            const stringUrlTrimmed = product.imagesUrl.slice(1, (product.imagesUrl.length - 1))
                            const arr = stringUrlTrimmed.split(', ').map((url) => {
                                return url.slice(1, url.length - 1)
                            })

                            return (
                                <Grid item key={String(product.id)} sx={{ width: '25%' }}>
                                    <Card sx={{ padding: '5%', height: '390px' }}>
                                        <img src={'https://' + arr[0]} />
                                        <Typography sx={{ height: '125px' }}>{product.name}</Typography>
                                        <Typography>{'₹' + product.price}</Typography>
                                        {/* <Fab>
                                            <FavoriteBorderIcon sx={{ position: 'absolute', bottom: '100px' }} />
                                        </Fab> */}
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Box>
        </Box >
    )
}

export default AllProducts