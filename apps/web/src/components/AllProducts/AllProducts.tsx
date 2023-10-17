import { useNavigate, useParams } from "react-router-dom"
import BottomNav from "../BottomNav/BottomNav"
import { useEffect, useState } from "react"
import { SERVER_IP } from "configs"

const AllProducts = () => {
    const [products, setProducts] = useState<any>([{
        id: 0,
        imagesUrl: [''],
        name: '',
        price: 20,
        category: 'example cat'
    }])
    const params = useParams()
    const navigate = useNavigate()

    // "CONSTRUCTION" | "INDUSTRIAL" | "FURNITURE" | "GIFTS" | "TELEVISION" | "HEALTH" | "ELECTRICALEQUIPS"
    let paramCat: string;

    switch (params.category) {
        case 'construction':
            paramCat = 'CONSTRUCTION'
            break;

        case 'industrial':
            paramCat = 'INDUSTRIAL'
            break;

        case 'furniture':
            paramCat = 'FURNITURE'
            break;

        case 'GIFTS':
            break;

        case 'television':
            paramCat = 'TELEVISION'
            break;

        case 'health':
            paramCat = 'HEALTH'
            break;

        case 'electricalequips':
            paramCat = 'ELECTRICALEQUIPS'
            break;

        default:
            break;
    }

    useEffect(() => {
        fetch(
            `${SERVER_IP}/getnextitems`,
            {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id: 1,
                    category: paramCat
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
                                    <img src={item.imagesUrl[0].url} className="w-48 h-[6.3rem] rounded-lg shadow-lg" alt="" />
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