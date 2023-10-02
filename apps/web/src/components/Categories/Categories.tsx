import { useNavigate } from "react-router-dom"
import BottomNav from "../BottomNav/BottomNav"

const Categories = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="mt-20 px-5 pt-3 mb-[35px] bg-blackbg h-screen">
                <div className="category-containe grid gap-4 grid-cols-2 text-white place-content-center text-center">
                    <div className="electronics p-10 bg-blackbg rounded-lg border">
                        <p>📱</p>
                        <p onClick={() => navigate('/products/electronics')}>Electronics</p>
                    </div>
                    <div className="Homedecor p-10 bg-blackbg rounded-lg border">
                        <p>🏠</p>
                        <p onClick={() => navigate('/products/construction')}>Construction</p>
                    </div>
                    <div className="vehicle p-10 bg-blackbg rounded-lg border">
                        <p>🚗</p>
                        <p onClick={() => navigate('/products/industrial')}>Industrial</p>
                    </div>
                    <div className="furniture p-10 bg-blackbg rounded-lg border">
                        <p>🛋️</p>
                        <p onClick={() => navigate('/products/furniture')}>Furniture</p>
                    </div>
                    <div className="gifts p-10 bg-blackbg rounded-lg border">
                        <p>🎁</p>
                        <p onClick={() => navigate('/products/gifts')}>Gifts</p>
                    </div>
                    <div className="television p-10 bg-blackbg rounded-lg border">
                        <p>📺</p>
                        <p onClick={() => navigate('/products/television')}>Television</p>
                    </div>
                    <div className="health p-10 bg-blackbg rounded-lg border">
                        <p>🩺</p>
                        <p onClick={() => navigate('/products/health')}>Health</p>
                    </div>
                    <div className=" p-10 bg-blackbg rounded-lg border">
                        <p>🔌</p>
                        <p onClick={() => navigate('/products/electricalequips')}>Electrical equipments</p>
                    </div>
                </div>
            </div>
            <BottomNav />
        </>
    )
}

export default Categories