var prediction_2 = "";

Webcam.set({
    width: 400,
    height: 300,
    image_format : 'png',
    png_quality: 100
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');
console.log("webcam loaded")

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YCIu7htkv/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("result");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("resut_emotion_name").innerHTML = results[0].label;
         prediction_2 = results[0].label;

    speak();
    if(results[0].label == "thumbs up"){
        document.getElementById("update_emoji").innerHTML = "&#128077;";
    }
    if(results[0].label == "rock"){
        document.getElementById("update_emoji").innerHTML = "&#128076;";
    }
    if(results[0].label == "amazing"){
        document.getElementById("update_emoji").innerHTML = "&#129304;";
    }
    
    }
    }