import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { useHistory } from 'react-router-dom';
import { useParams } from "react-router";

import "./user_form.css"
import { useStateValue } from './StateProvider';

import axios from "axios"
function UserResponseForm() {
  var quest = [];
  var post_answer = [];
  var history = useHistory()
    var {docId} = useParams();
   var [answer,setAnswer] = useState([])

   const [questions,setQuestions] = useState();
   const [doc_desc,setDocDesc] = useState();
   const [doc_name,setDocName] = useState();



   useEffect(()=>{
 
      axios.get(`http://localhost:9000/data/${docId}`).then((request,response)=>{
        var question_data=request.data.questions;

        var doc_name=request.data.document_name
        var doc_descip = request.data.doc_desc
        console.log(doc_name+" "+doc_descip)
        setDocName(doc_name)
        setDocDesc(doc_descip)
        setQuestions( question_data)
        console.log(request.data.questions)
            request.data.questions.map((q)=>{
            answer.push({
              "question": q.questionText,
              "answer" : " "
            })
            
          })
         request.data.questions.map((q,qindex)=>{
             quest.push(    {"header": q.questionText, "key": q.questionText })
          })


      });

  

    

    },[])




   function select(que,option){


   var k =answer.findIndex((ele)=>(ele.question == que))

   answer[k].answer=option
    setAnswer(answer)
    console.log(answer)
  }


   var  post_answer_data = {}

   function selectinput(que,option){
    var k =answer.findIndex((ele)=>(ele.question == que))

    answer[k].answer=option
     setAnswer(answer)
     console.log(answer)
   }

   function selectcheck(e,que,option){
     var d =[]
  var k =answer.findIndex((ele)=>(ele.question == que))
  if(answer[k].answer){
    d=answer[k].answer.split(",")

  }

  if(e == true){
    d.push(option)
  }
  else{
    var n=d.findIndex((el)=>(el.option == option))
    d.splice(n,1)

  }

   answer[k].answer=d.join(",")

    setAnswer(answer)
    console.log(answer)
   }


function submit(){
  answer.map((ele)=>{

    post_answer_data[ele.question] = ele.answer
   })


  axios.post(`http://localhost:9000/student_response/${doc_name}`,{
      "column": quest,
      "email":emailInput,
      "answer_data" :[post_answer_data]
  })
  history.push(`/submitted`)
}
const [emailInput,setUserEmail] = useState();

    return (  
      <div className="submit">
        <div className="user_form">
            <div className="user_form_section">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} >{doc_name}</Typography>
                    <Typography style={{fontSize:"15px"}} >{doc_desc}</Typography>

                </div>
                <div className="user_title_section">
                   <input type="email" onChange={(e)=>{setUserEmail(e.target.value)}} placeholder="enter your email" required/>
                </div>
              
                {
                questions?.map((question,qindex)=>(
                    <div className="user_form_questions">
                    <Typography  style={{fontSize:"15px",fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom:"8px",fontSize:"14px"}} >{qindex+1}.  {question.questionText}</Typography>
                    {
                            question.options.map((ques,index)=>(
                              
                              <div key={index} style={{marginBottom:"5px"}}>
                                  <div style={{display: 'flex'}}>
                                  <div className="form-check">
                                    
                                      {

                                        question.questionType != "radio" ? (  
                                          question.questionType != 'text' ? (
                                        <label>
                                        <input
                                        
                                        type={question.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={question.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectcheck(e.target.checked,question.questionText,ques.optionText)}}
                                        /> {ques.optionText}
                                        </label>): (

                                        <label>
                                        <input

                                        type={question.questionType}
                                        name={qindex}
                                        value= {ques.optionText}
                                        className="form-check-input"
                                        required={question.required}
                                        style={{margnLeft:"5px",marginRight:"5px"}}
                                        onChange={(e)=>{selectinput(question.questionText,e.target.value)}}
                                        /> {ques.optionText}
                                        </label>
                                        )
                                        
                                        )
                                        
                                        :(  <label>
                                          <input
                                            
                                            type={question.questionType}
                                            name={qindex}
                                            value= {ques.optionText}
                                            className="form-check-input"
                                            required={question.required}
                                            style={{margnLeft:"5px",marginRight:"5px"}}
                                            onChange={()=>{select(question.questionText,ques.optionText)}}
                                          />
                                      {ques.optionText}
                                        </label>)

                                      }
                                  
                                  </div>
                                  </div>
                                </div>
                            ))
                    }
                    </div>
                ))
                
                }         
                 
            <div className="user_form_submit">
            <Button  variant="contained" color="primary" onClick={submit} style={{fontSize:"14px"}}>Submit</Button>

            </div>
       
            <div className="user_footer">
                Google Forms
            </div>
            </div>
            
        </div>
        </div>
    )
}

export default UserResponseForm

