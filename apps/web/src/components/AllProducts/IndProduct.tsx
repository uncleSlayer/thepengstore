import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BottomNav from "../BottomNav/BottomNav"

const IndProduct = () => {
    const [product, setProduct] = useState({
        category: '',
        description: '',
        id: 0,
        imagesUrl: [{
            id: '',
            url: '',
            productsId: ''
        }],
        name: '',
        price: 0
    })

    const params = useParams()

    useEffect(() => {
        fetch(
            'http://localhost:8000/getinditem/' + params.id,
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
                console.log(resp.data)
                setProduct(resp.data)
            })
    }, [])

    return (
        <>
            <div className="mt-24 p-2 border-slate-300 border-[1px] rounded-lg w-4/5 m-auto shadow-lg">
                <p className="font-bold py-2"> {product.name} </p>
                <img className="rounded-lg shadow-lg my-2" src={product.imagesUrl[0].url} alt="" />
                <p className="py-2"> Price: ₹{product.price} </p>
                {/* <p className="py-2"> {product.description} </p> */}
                <p className="py-2"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime facere aperiam cumque quo labore repellat recusandae animi nemo. Tenetur error dignissimos animi pariatur ut impedit debitis autem corrupti hic reprehenderit non totam temporibus cumque</p>
            </div>
            <button className="fixed bottom-24 font-sans font-bold mx-auto left-0 right-0 w-32 border-2 bg-blackbg text-white rounded-lg shadow-lg px-2 py-1">Add to cart</button>
            <BottomNav />
        </>
    )
}

export default IndProduct