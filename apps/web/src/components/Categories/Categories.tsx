import { useNavigate } from "react-router-dom"

const Categories = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="mt-20 px-5 pt-3 bg-blackbg">
                <div className="category-containe grid gap-4 grid-cols-2 lg:grid-cols-3 text-white place-content-center text-center maxwt md:w-[80%] lg:w-[80%] xl:w-[80%]">
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>📱</p>
                        <p onClick={() => navigate('/products/electronics')}>Electronics</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>🏠</p>
                        <p onClick={() => navigate('/products/construction')}>Construction</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>🚗</p>
                        <p onClick={() => navigate('/products/industrial')}>Industrial</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>🛋️</p>
                        <p onClick={() => navigate('/products/furniture')}>Furniture</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>🎁</p>
                        <p onClick={() => navigate('/products/gifts')}>Gifts</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>📺</p>
                        <p onClick={() => navigate('/products/television')}>Television</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>🩺</p>
                        <p onClick={() => navigate('/products/health')}>Health</p>
                    </div>
                    <div className="p-5 md:p-10 bg-blackbg rounded-lg border md:h-[200px] md:w-[200px] md:mx-auto">
                        <p>🔌</p>
                        <p onClick={() => navigate('/products/electricalequips')}>Electrical equipments</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories