import React from 'react';
import QuizPage from './QuizPage'

let API='https://opentdb.com/api.php?amount=10&type=multiple';
//category options
const categories= {
  10:"Books",
  11:"Films",
  17:"Science & Nature",
  27:"Animals",
  18:"Computers",
  19:"Mathematics",
  21:"Sports",
  29:"Comics"
}
class Homepage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      quizPage:false, //shows homepage onload
      api:""
    }
  }
  render(){
    if(!this.state.quizPage){
      return(
        <div className="wrapper">
          <h1 className="heading">Pop  Quiz</h1>
          <div className="category-container">{Object.keys(categories).map((key,index) => {
            return <div className="category-name" onClick={()=>this.generateQuestion(key)}>
              <p className="category-text">{categories[key]}</p>
              <img className="category-logo" alt={`${categories[key]}`} src={`/images/${categories[key]}.svg`}/>
            </div>
          })}</div>
      </div>
      )
    }
    else{
      return(
        <QuizPage homepage = {this.getQuizPage}
                  api = {this.state.api}
        />
      )
    }
  }

  generateQuestion = (id) => {
    this.getAPI(id)
    this.getQuizPage();
  }
  getAPI = (id) => {
    API += `&category=${id}`;
    this.setState({api:API})
  }
  getQuizPage = () => {
    this.setState(state => ({
      quizPage:!state.quizPage //toggle quizPage state
      }))
  }
}
export default Homepage;
