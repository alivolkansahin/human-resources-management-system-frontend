/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminPagePendingCommentsAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const AdminPagePendingCommentsAPIContextProvider = ({children}) => {
    const [pendingComments, setPendingComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="ADMIN"){
            return navigate("/login")
        }
        const getRequests = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9093/api/v1/admin/get-all-pending-comments')
                console.log("GETALLPENDINGCOMMENTS: ", response);
                setPendingComments(response.data)
            } catch (error) {
                console.error("Error while fetching the get all pending comments data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleCommentRequest = async (commentId, decision) => {
        setIsLoading(true);
        const payload = {
            "commentId": commentId,
            "decision": decision.toString() 
        };
        try {
            const response = await axios.post("http://localhost:9093/api/v1/admin/handle-pending-comment", payload)
            if (response.status === 200) {
                setPendingComments(prevRequest => 
                    prevRequest.filter(request => request.commentId !== commentId)
                );
                // window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error while handle comment request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AdminPagePendingCommentsAPIContext.Provider value={{pendingComments, handleCommentRequest}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </AdminPagePendingCommentsAPIContext.Provider>
    )
}









