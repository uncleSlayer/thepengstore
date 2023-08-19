import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { SERVER_IP } from 'configs'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { allProductsLastItemType, productsArrayType } from "type-checks"
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../assets/spinner.gif'

const AllProducts = () => {

    const [products, setProducts] = useState<productsArrayType[]>([])
    const [lastProductId, setLastProductId] = useState<allProductsLastItemType>(0)
    const [hasMore, setHasMore] = useState(true)

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
                if (resp.data.length < 10) {
                    setHasMore(false)
                }
                setProducts([...products, ...resp.data])
            })

    }, [lastProductId])

    console.log(products)

    return (
        <Box sx={{ marginTop: '50px', padding: '2%', display: 'flex', fontFamily: 'roboto' }}>
            <Box sx={{
                width: '25%', display: {
                    xs: 'none',
                    sm: 'none',
                    md: 'block',
                    lg: 'block',
                    xl: 'block'
                }
            }} >some other infos</Box>
            <Box sx={{ width: '100%', padding: '1%' }} >
                <Grid container spacing={5} >
                    <InfiniteScroll style={{ marginTop: '100px' }} next={() => {
                        console.log('changing')
                        setLastProductId(products[products.length - 1].id)
                    }}
                        hasMore={hasMore}
                        dataLength={products.length}
                        loader={<img src={Spinner} style={{ width: '150px', height: '100px' }} />}
                    >
                        {
                            products.map((product) => {
                                const stringUrlTrimmed = product.imagesUrl.slice(1, (product.imagesUrl.length - 1))
                                console.log(stringUrlTrimmed)
                                const arr = stringUrlTrimmed.split(', ').map((url) => {
                                    return url.slice(1, url.length - 1)
                                })

                                return (
                                    <Grid item key={String(product.id)} sx={{
                                        width: {
                                            xs: '50%',
                                            sm: '33%',
                                            md: '25%'
                                        }
                                    }}>
                                        <Card sx={{
                                            padding: '10%', height: '350px'
                                        }}>
                                            <img src={'https://' + arr[0]} />
                                            <Typography sx={{ height: '1.6rem', overflow: 'hidden', typography: 'p' }}>{product.name}</Typography>
                                            <Typography sx={{ margin: '10px auto' }}>{'₹' + product.price}</Typography>
                                        </Card>
                                    </Grid>
                                )
                            })
                        }
                    </InfiniteScroll>
                </Grid>

            </Box>
        </Box >
    )
}

export default AllProducts