import { useState } from "react"
import axios from "axios";
import { SERVER_IP } from "configs";

const ProductUpload = () => {
    // CONSTRUCTION
    // INDUSTRIAL
    // FURNITURE
    // GIFTS
    // TELEVISION
    // HEALTH
    // ELECTRICALEQUIPS

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [productCategory, setProductCategory] = useState<'CONSTRUCTION' | 'INDUSTRIAL' | 'FURNITURE' | 'GIFTS' | 'TELEVISION' | 'HELTH' | "ELECTRICALEQUIPS" | string>('CONSTRUCTION')
    const [productImages, setProductImages] = useState<FileList | null>(null)

    const handleFormSubmit = () => {

        const formData = new FormData()

        formData.append('name', productName)
        formData.append('price', String(productPrice))
        formData.append('description', productDescription)
        formData.append('category', productCategory)

        if (productImages) {
            for (const file of productImages) {
                formData.append('image', file)
            }
        }

        axios.post(`${SERVER_IP}/upload-item`, formData)
            .then(resp => console.log(resp))
    }

    return (
        <div className='mt-24 mx-2'>
            <form encType="multipart/form-data">
                <p>name: </p>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="my-1 border-2 rounded-lg p-2 text-sm h-8" />

                <p>price</p>
                <input type="number" value={productPrice} onChange={(e) => setProductPrice(parseInt(e.target.value))} name="" id="" className="my-1 border-2 rounded-lg p-2 text-sm h-8" />

                <p>description</p>
                <input type="text" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="my-1 border-2 rounded-lg p-2 text-sm h-8" />

                <p>category</p>
                <select name="" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} id="" className="">
                    <option value="CONSTRUCTION" className="">construction</option>
                    <option value="INDUSTRIAL">industrial</option>
                    <option value="FURNITURE">furniture</option>
                    <option value="GIFTS">gifts</option>
                    <option value="HEALTH">Health</option>
                    <option value="ELECTRICALEQUIPS">Electrical equipments</option>
                </select>

                <div className="imagesInput my-2">
                    <p>images</p>
                    <input onChange={(e) => setProductImages(e.target.files)} type="file" name="" id="" className="" multiple />
                </div>

                <input onClick={handleFormSubmit} type="submit" className="cursor-pointer border bg-slate-200 rounded-lg px-2 py-1 hover:shadow-lg" />
            </form>
        </div>
    )
}

export default ProductUpload