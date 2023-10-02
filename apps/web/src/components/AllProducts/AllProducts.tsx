import { useNavigate, useParams } from "react-router-dom"
import BottomNav from "../BottomNav/BottomNav"
import { useEffect, useState } from "react"
import { SERVER_IP } from "configs"

const AllProducts = () => {
    const [products, setProducts] = useState<any>([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(
            'http://localhost:8000/getnextitems',
            {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: 0,
                    category: 'FURNITURE'
                })
            }
        )
            .then((resp) => {
                return resp.json()
            })
            .then((resp) => {
                setProducts(resp.data)
            })
    }, [])

    return (
        <div className="mt-20 px-2 p-2">
            <div className="grid grid-cols-2 pb-24">
                {
                    products.map((item: any) => {
                        return (
                            <div key={item.id} onClick={() => navigate(`/product/${item.id}`)} className="p-2 border rounded-lg shadow-lg m-2 brder-[1px] border-slate-300">
                                <div className="product-container flex flex-col items-center">
                                    <img src={item.imagesUrl[0].url} className="w-48 rounded-lg shadow-lg" alt="" />
                                    <p>{item.name}</p>
                                    <p className="font-bold">Price: {item.price}</p>
                                    <p className="bg-slate-300 px-2 rounded-sm">{item.category.toLowerCase()}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <BottomNav />
        </div>
    )
}

export default AllProducts