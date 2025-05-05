import { AuthProvider, useAuth } from "../Example/AuthContext";
import Favorites from "./Favorite"

const Dashboard = () => {
const { userId } = useAuth();
    return (
        <>
            <AuthProvider>
            <h1>Favorite Cars: </h1>
            <Favorites userId={userId} />
                <h1>Your Account </h1>
            </AuthProvider>
        </>
    )
}

export default Dashboard