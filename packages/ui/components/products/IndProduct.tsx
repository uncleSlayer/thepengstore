import { Box, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productPlaceholder from "../assets/productPlaceholder.jpg"
import Button from '@mui/material/Button';
import { SERVER_IP } from "configs";
import { indProductType } from "type-checks"


const IndProduct = () => {
    const routerParams = useParams()
    const productId = routerParams.id

    const [productInfo, setProductInfo] = useState<indProductType>({
        id: 1,
        name: 'Example',
        price: 5000,
        description: `
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut iste dolorum, corrupti natus voluptas accusantium neque, nam pariatur similique dolore asperiores esse aliquid maiores sequi. Assumenda facilis reprehenderit ducimus, atque quia suscipit. Beatae illo tempora nisi molestiae placeat eum rerum error sed incidunt mollitia! Cumque maxime fugit debitis facilis. Quia?
        `,
        imageUrl: ''
    })

    useEffect(() => {
        fetch(
            `${SERVER_IP}/getinditem/${productId}`,
            {
                headers: {
                    'Content-type': 'Application/json'
                }
            }
        )
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {

                const imageUrlNonTrimmed = resp.data.imagesUrl
                const imageUrlTrimmed = imageUrlNonTrimmed.slice(1, imageUrlNonTrimmed.length - 1)
                const imageUrlArr = imageUrlTrimmed.split(', ')
                const imageUrl = imageUrlArr[0].slice(1, imageUrlArr[0].length - 1)

                setProductInfo({
                    id: resp.data.id,
                    name: resp.data.name,
                    price: resp.data.price,
                    description: resp.data.description,
                    imageUrl: imageUrl
                })
            })
    }, [])

    return (
        <Box sx={{ margin: '0 5%', marginTop: '70px', display: 'flex' }} >
            <Box sx={{ width: '50%' }}>
                <Typography variant="h6" sx={{ width: '50%' }}> {productInfo.name} </Typography>
                <img src={'https://' + productInfo.imageUrl} style={{ width: '30%', height: '30vh', borderRadius: '4px' }} alt="" />
                <Button variant="contained" sx={{ display: 'block', margin: '1% 0' }}>Add to cart</Button>
            </Box>
            <Box sx={{ width: '50%' }}>
                <Typography variant="h6">Details</Typography>
                <Typography>{productInfo.description}</Typography>
            </Box>
        </Box>
    )
}

export default IndProduct