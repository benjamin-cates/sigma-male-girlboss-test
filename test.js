const axis_gender = 0;
const axis_chad = 1;
const questions = [
    {question: "How frequently do you play BTD6?", power: 1, axis: axis_chad},
    {question: "Are you heterosexual?", power: -1, axis: axis_chad},
    {question: "Do you like gangsta's paradise?", power: 0.5, axis: axis_chad},
    {question: "Linux?", power: 0.6, axis: axis_chad},
    {question: "Do you have green eyes?", power: -0.5, axis: axis_chad},
    {question: "Are you sincere?", power: 0.6, axis: axis_gender},
    {question: "Are you competitive?", power: -0.9, axis: axis_gender},
    {question: "Do you identify as a woman?", power: 1, axis: axis_gender},
    {question: "Do you avoid cursing?", power: 1, axis: axis_chad},
    {question: "Amogus?",power:-0.5,axis:axis_chad},
    {question: "Boys or girls?",power:0,axis:axis_chad},
    {question: "Are you attracted to Chris Hemsworth?",power:2,axis:axis_chad},
    {question: "Homophobia?",power:-1,axis:axis_chad},
    {question: "Amogus?",power:0.5,axis:axis_chad},
    {question: "Amogus?",power:-0.5,axis:axis_chad},
    {question: "Amogus?",power:0.5,axis:axis_chad},
    {question: "Do you mald?", power:0.6, axis:axis_gender},
    {question: "Chad or soy?", power:-1, axis:axis_chad},
];
var results = [];
var id = -1;
function nextQuestion(strength) {
    results[id] = strength;
    id++;
    if(id == questions.length) return computeResults();
    document.getElementById("question").innerHTML = questions[id].question + " (" + (id+1) + "/" + questions.length + ")";
}
function computeResults() {
    let chadness = 0;
    let femaleness = 0;
    //Calculate maximums
    let maximumchad = 0;
    let maximumfemale = 0;
    questions.forEach(question => {if(question.axis == axis_chad) maximumchad += Math.abs(question.power); else maximumfemale += Math.abs(question.power);});
    for(let i = 0; i < questions.length; i++) {
        if(questions[i].axis == axis_chad) chadness += questions[i].power * results[i];
        if(questions[i].axis == axis_gender) femaleness += questions[i].power * results[i];
    }
    chadness/=maximumchad;
    femaleness/=maximumfemale;
    let quadrant;
    if(chadness > 0 && femaleness <= 0) quadrant = "Sigma male";
    else if(chadness > 0 && femaleness == 0) quadrant = "Enby chad";
    else if(chadness > 0 && femaleness > 0) quadrant = "Girlboss";
    else if(chadness == 0 && femaleness < 0) quadrant = "Male";
    else if(chadness == 0 && femaleness > 0) quadrant = "Female";
    else if(chadness < 0 && femaleness < 0) quadrant = "Soy boy";
    else if(chadness < 0 && femaleness == 0) quadrant = "Enby soy";
    else if(chadness < 0 && femaleness > 0) quadrant = "E-girl";
    chadness=Math.round(chadness*100)/100;
    femaleness=Math.round(femaleness*100)/100;
    document.getElementById("stats").innerHTML = "Chad: " + chadness + "<br>Female: " + femaleness + "<br>Quadrant: " + quadrant;
    document.getElementsByTagName("svg")[0].innerHTML += "<circle r=\"14\" fill=\"red\" cx=\"" + (femaleness * 180 + 250) + "\" cy=\"" + ((chadness*-1) * 180 + 250) + "\"/>"
    document.getElementById("results").style.display = "block";
    document.getElementById("quiz").style.display = "none";
}
