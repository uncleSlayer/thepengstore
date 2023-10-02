import BottomNav from "../BottomNav/BottomNav"

const Profile = () => {

    return (
        <div className="pt-28 bg-skytheme">
            <p className="font-sans">
                Profile
            </p>
            <button className="border p-2">Logout</button>
            <BottomNav />
        </div>
    )
}

export default Profile