/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const PersonnelPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageAPIContextProvider = ({children}) => {
    const [personnel, setPersonnel] = useState([]);
    // const [allPersonnel, setAllPersonnel] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    // volkan deneme 29 Subat Persembe:
    // const [personnelAcceptedDayOffs, setPersonnelAcceptedDayOffs] = useState([]);
    // setPersonnelAcceptedDayOffs(response.data.filter(dayOff => dayOff.requestStatus === "ACCEPTED"));


    useEffect(() => {
        if(isAuthenticated.role!=="PERSONNEL" && isAuthenticated.role!=="SUPERVISOR"){
            return navigate("/login")
        }
        setIsLoading(true);
        const getRequests = async () => {
            try {
                const response1 = await axios.get(`http://localhost:80/personnel/get/${isAuthenticated.token}`)
                console.log("PERSONEL RESPONSE DÖNEN: ", response1.data);
                setPersonnel(response1.data)
                // const response2 = await axios.get(`http://localhost:9091/api/v1/personnel/get-all`)
                // console.log("allpersonnel", response2.data);
                // setAllPersonnel(response2.data)
            } catch (error) {
                console.log('Error while fetching the data', error);   
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);


    const handleEditMyInfo = async (newPersonnelInfo) => {
        const formData = new FormData();

        for (const key in newPersonnelInfo) {
          formData.append(key, newPersonnelInfo[key]);
        }
      
        formData.append("token", isAuthenticated.token);
      
        console.log("HAZIRLANAN FORM DATA: ", formData);
      
        try {
          const response = await axios.put("http://localhost:80/personnel/update", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          console.log("PERSONEL EKLE DÖNEN RESPONSE: ", response);
      
          if (response.status === 200) {
            // setEmployees(prevEmployees => [...prevEmployees, response.data]);
            // setIsAddingEmployee(false);
            window.location.reload(true);
          }
        } catch (error) {
          console.error("Error updating personnel:", error);
        }
    };


    return (
        <PersonnelPageAPIContext.Provider value={{personnel, handleEditMyInfo}}>
            {isLoading ? (
                <div className="loader">
                <div className="box box0">
                  <div></div>
                </div>
                <div className="box box1">
                  <div></div>
                </div>
                <div className="box box2">
                  <div></div>
                </div>
                <div className="box box3">
                  <div></div>
                </div>
                <div className="box box4">
                  <div></div>
                </div>
                <div className="box box5">
                  <div></div>
                </div>
                <div className="box box6">
                  <div></div>
                </div>
                <div className="box box7">
                  <div></div>
                </div>
                <div className="ground">
                  <div></div>
                </div>
              </div>
            ) : (
                children
            )}
        </PersonnelPageAPIContext.Provider>
    )
}










