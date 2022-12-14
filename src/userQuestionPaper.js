import { Button, Typography } from '@material-ui/core'
import React ,{useState,useEffect} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { useHistory,useParams } from 'react-router-dom';

import "./user_form.css"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'


import axios from "axios"
function UserQuestionForm() {
  var quest = [];
  var post_answer = [];
  var history = useHistory()
  let {id_} = useParams()

   var [answer,setAnswer] = useState([])
   var [{},dispatch] = useStateValue()
   var [questions,setQuestions]=useState([])
   var [doc_name,setDocName]=useState("")
   var [doc_desc,setDocDesc]=useState("")
    
   useEffect(()=>{
    async function data_adding(){
      var request = await axios.get(`http://localhost:9000/data/${id_}`);
      console.log(request.data,"questionpaper")
      var question_data=request.data.questions;
      console.log(question_data)
      var doc_name=request.data.document_name
      var doc_descip = request.data.doc_desc
      console.log(doc_name+" "+doc_descip)

      setQuestions( question_data)
      dispatch({
        type: actionTypes.SET_DOC_NAME,
        doc_name: doc_name

     }) 

      dispatch({
        type: actionTypes.SET_DOC_DESC,
        doc_desc: doc_descip

   })
      dispatch({
          type: actionTypes.SET_QUESTIONS,
          questions:question_data

       })
    }

    data_adding()
    },[])


   useEffect(()=>{
    async function data_adding(){
      var request = await axios.get(`http://localhost:9000/data/${id_}`);
        setQuestions(request.data.questions)
        setDocDesc(request.data.doc_desc)
        setDocName(request.data.document_name)
        console.log(request.data)

        request.data.questions.map((q)=>{
          answer.push({
            "question": q.questionText,
            "answer" : " ",
            "answerKey": q.answerKey
          })
          
        })

        request.data.questions.map((q,qindex)=>{
          quest.push(    {"header": q.questionText, "key": q.questionText })
       })


    }
    data_adding()
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

  //  console.log(quest)
   console.log(post_answer_data)
   dispatch({
     type:"response",
     response:answer
   })


  axios.post(`http://localhost:9000/student_response/${doc_name}`,{
      "column": quest,
      "answer_data" :[post_answer_data]
  })

  
  history.push(`/submitted`)
}
    return (  
      <div className="submit">
        <div className="user_form">
            <div className="user_form_section">
                <div className="user_title_section">
                    <Typography style={{fontSize:"26px"}} >{doc_name}</Typography>
                    <Typography style={{fontSize:"15px"}} >{doc_desc}</Typography>

                </div>
              
                {
                questions.map((question,qindex)=>(
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

export default UserQuestionForm

