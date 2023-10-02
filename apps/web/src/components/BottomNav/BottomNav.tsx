import home from '../../assets/home.png'
import categories from '../../assets/categories.png'
import cart from '../../assets/cart.png'
import wish from '../../assets/wishlist.png'
import profile from '../../assets/profile.png'
import { useNavigate } from 'react-router-dom'

const BottomNav = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-blackbg w-full p-2 fixed bottom-0 text-white">
            <div className="navcontainer flex justify-between">
                <img src={home} onClick={() => navigate('/')} alt="home button" className='w-16 h-16' />
                <img src={categories} onClick={() => navigate('/categories')} alt="categories button" className='w-10' />
                <img src={cart} alt="cart button" className='w-12' />
                <img src={wish} alt="wish list button" className='w-10 h-10' />
                <img src={profile} alt="profile button" className='w-10 h-10' />
            </div>
        </div>
    )
}

export default BottomNav