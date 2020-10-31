// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "What is the Greenhouse Effect?",
        
        choiceA : " The name of climate change legislation that passed by congress",
        choiceB : "When you paint your house green to become an environmentalist",
        choiceC : " When the gasses in our atmosphere trap heat and block it from escaping our planet",
        correct : "C"
    },{
        question : "Which of the following are consequences associated with climate change?",
        
        choiceA : "The ice sheets are declining, glaciers are in retreat globally, and our oceans are more acidic than ever",
        choiceB : "Surface temperatures are setting new heat records about each year",
        choiceC : "All Of the above",
        correct : "C"
    },{
        question : "What was agreed to in the “Paris Agreement” that came out of COP-21, held in Paris in 2015?",
        
        choiceA : "To protect biodiversity and end the deforestation of the world’s rainforests",
        choiceB : "To keep global temperature rise well below 2℃ pre-industrial levels and to pursue a path to limit warming to 1.5℃",
        choiceC : "To limit sea level rise to 3 feet above current levels",
        correct : "B"
    },{
        question : "Which of the following gases does not trap heat?",
        
        choiceA : "Nitrogen",
        choiceB : "O2",
        choiceC : "CO2",
        correct : "A"
    },{
        question : "As average global temperature rises,",
        
        choiceA : "Average precipitation is unchanged",
        choiceB : "Average precipitation decreases",
        choiceC : "Average precipitation increases",
        correct : "C"
    },{
        question : "Where have some of the strongest and earliest impacts of global warming occurred?",
        
        choiceA : "In the tropics",
        choiceB : "northern latitudes",
        choiceC : "Impacts of global warming are distributed equally all over the planet.",
        correct : "B"
    },{
        question : "How much has the average global temperature risen by since 1880 (in Fahrenheit)?",
        
        choiceA : " 1.69 degrees",
        choiceB : "5 degrees",
        choiceC : "0.5 degrees",
        correct : "A"
    },{
        question : "Globally, which of the following economic sectors emits the largest percentage of greenhouse gas emissions?",
        
        choiceA : "Buildings",
        choiceB : "Industry",
        choiceC : "Electricity and heat production",
        correct : "C"
    },{
        question : "What percentage of the global greenhouse gas emissions does the transportation sector emit?",
       
        choiceA : "1%",
        choiceB : "14%",
        choiceC : "33%",
        correct : "B"
    },{
        question : "Which of these countries emits the most carbon dioxide?",
        
        choiceA : "China",
        choiceB : "USA",
        choiceC : "UK",
        correct : "A"
    },{
        question : "Which planet's poisonous atmosphere has been described as the product of a 'runaway greenhouse effect?'",
        
        choiceA : "Mars",
        choiceB : "Earth",
        choiceC : "Venus",
        correct : "C"
    },{
        question : "Which of the following lightbulb types uses the least energy, and therefore results in fewer greenhouse gas emissions?",
        
        choiceA : "halogen",
        choiceB : "compact flourescent",
        choiceC : "incandescent",
        correct : "B"
    },{
        question : "How many human deaths per year does the World Health Organization attribute to climate change?",
        
        choiceA : "1,500",
        choiceB : "1,500,000",
        choiceC : "150,000",
        correct : "C"
    },{
        question : "How has the global average temperature changed since the Industrial Revolution?",
        
        choiceA : "Warmer by 0.1 degree C (0.2 degree F)",
        choiceB : "Warmer by more than 1 degree C (2.07 degrees F)",
        choiceC : "Warmer by almost 2 degrees C (3.6 degrees F)",
        correct : "B"
    },{
        question : "What proportion of climate scientists has concluded that humans are the primary driver of today's climate warming?",
        
        choiceA : "59%",
        choiceB : "76%",
        choiceC : "97%",
        correct : "C"
    },{
        question : "The average American contributes approximately how much CO2 to the atmosphere per year?",
        
        choiceA : "20 tons",
        choiceB : "10 tons",
        choiceC : "50 tons",
        correct : "A"
    },{
        question : "Which Arctic animal do many scientists consider most vulnerable to extinction due to global warming?",
        
        choiceA : "polar bears",
        choiceB : "trophical frogs",
        choiceC : "narwhals",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion=Math.floor(Math.random()*lastQuestion);
let count = 0;
let i=0;
var arrr=[runningQuestion];
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    
    let q = questions[runningQuestion];
    
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <10; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(i < 10){
            while(arrr.includes(runningQuestion))
            {
                runningQuestion=Math.floor(Math.random()*lastQuestion);
                
            }
            arrr.push(runningQuestion);
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(i < 10){
        
        while(arrr.includes(runningQuestion))
        {
            runningQuestion=Math.floor(Math.random()*lastQuestion);
            
        }
        arrr.push(runningQuestion);
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(i).style.backgroundColor = "#2e8b57";
    i++;
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(i).style.backgroundColor = "#f00";
    i++;
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/10);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















