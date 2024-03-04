import React, { useContext, useEffect, useState } from 'react'
import "./MyCompany.css"
import CommentCardList from '../CompanyInfo/CommentCardList'
import AddComment from '../AddCommentComponent/AddComment'
import { PersonnelPageAPIContext } from '../../context/PersonalPageAPIContext'
import axios from 'axios'
import CommentCardListPersonnel from './CommentCardListPersonnel'
const MyCompany = () => {
    const{personnel} = useContext(PersonnelPageAPIContext);
    const [isShowAddCard, setIsShowAddCard] = useState(false);
    const [comments, setComments] = useState([])

    useEffect(() => {
        const getCompanyInfo = async () => {
            try {
              const response2 = await axios.get(
                `http://localhost:80/comment/get-all-by-company/${personnel.companyId}`
              );
              console.log("Company active comments:", response2.data);
              if(response2.status === 200) {
                setComments(response2.data);
              }
            } catch (error) {
              console.error("Error while fetching company info:", error);
            }
        };
        getCompanyInfo();
      }, []);

      const handleAddCommentBtn = () => {
        setIsShowAddCard(true)
      }

  return (
    <>
      
      <div className='my-company-container'>
          <h2>You can see the comments about your company below..</h2>
          <div className='my-company-container-header'>
              <h3>Comments..
              </h3>
              <button onClick={handleAddCommentBtn}>Add Comment</button>
          </div>
          <div>
              <CommentCardListPersonnel comments={comments}/>
              
          </div>
          {isShowAddCard &&<div>
        <AddComment setIsShowAddCard={setIsShowAddCard} />
      </div>}
      </div>
    </>
    
  )
}

export default MyCompany