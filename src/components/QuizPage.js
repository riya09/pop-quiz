import React from 'react';

class QuizPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],//array for storing questions
      counter:0,//variable for keeping track of question number
      score:0,
      finished:false,//will change after all questions are shown
      loaded:false,//wait for the page to call api
      clicked:false,//cannot click more than one option
      index:Math.floor(Math.random()*4),//random index for storing correct answer
      bgColor:Array(4).fill("transparent"),/*fil background of options with transparent
      and change depending whether the question is correct or wrong.*/
      next:false
    }
  }
  componentDidMount(){
    //call api
    fetch(this.props.api)
    .then(res => {
      return res.json();
    })
    .then(data => {
      this.setState({data:data.results,loaded:true})
    })
  }
  nextQuestion = () => {
    if(this.state.counter<9 && this.state.next === true){
      //reset everything before moving onto the next question
      this.setState({counter:parseInt(this.state.counter)+1,
        bgColor:Array(4).fill("transparent"),clicked:false,next:false},function(){
        this.setState({index:Math.floor(Math.random()*4)})
      })
    }
    else if(this.state.next === false){
        return false;
    }
    else{
      this.setState({finished:true});
    }
  }

  checkAnswer = (choosen,ques,index,corr_index) => {
      let bgColor = this.state.bgColor;
      if(!this.state.clicked){
        if(choosen === ques.correct_answer){
          bgColor[index]="green";//changes background of the correct index
          this.setState({score:parseInt(this.state.score)+10,bgColor:bgColor,clicked:true,next:true});
        }
        else{
          bgColor[index] = "red";
          bgColor[corr_index] = "green";
          this.setState({bgColor:bgColor,clicked:true,next:true})
        }
      }
  }
  showOption=(ques) => {
    let option=[]
    //store incorrect answer in the first three index and store correct answer randomly in any four
    for(let i=0;i<3;i++)  {
      option[i]=ques.incorrect_answers[i];
    }
    option.splice(this.state.index,0,ques.correct_answer);
    return option.map((j,index) => {
      return <li key={index.toString()} className={`options ${this.state.bgColor[index]}`}
        dangerouslySetInnerHTML={{__html:j}}
        onClick = {() => this.checkAnswer(j,ques,index,this.state.index)}/>
    })
  }
  render(){
    if(this.state.loaded && !this.state.finished){
      return(
        <div className="quiz-container">
          <button className="back-btn" onClick={this.props.homepage}>&larr; Go Back</button>
          <span className="quiz-score">Score : {this.state.score}</span>
          <div className = "quiz-info">
            <p className="quiz-ques"
              dangerouslySetInnerHTML={{
                __html:this.state.data[this.state.counter].question}}/>
            <ul className="option-list">
              {this.showOption(this.state.data[this.state.counter])}
            </ul>
          </div>
          <div className="next-wrapper"><button className="next" onClick={this.nextQuestion}>Next</button></div>
        </div>
      )
    }
    else if(this.state.finished){
      return(
        <div className="quiz-container">
          <div className="quiz-over">
            <h4 className="final-score">You Scored:{this.state.score}</h4>
            <button className="back-btn" onClick={this.props.homepage}>
              Try another Catergory</button>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="quiz-container">
          <div className="loader"></div>
          <button className="back-btn" onClick={this.props.homepage}>&larr; Go Back</button>
        </div>
      )
    }
  }
}
export default QuizPage
