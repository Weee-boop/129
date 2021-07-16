
song=""
song1=""
song2=""
left_wrist_y=0;
right_wrist_y=0;
rightWrist_score=0;
leftWrist_score=0;

function preload(){
 song1=loadSound("mp3.mp3")   
 song2=loadSound("mp1.mp2.mp3")   
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center()
    video= createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}
function modelLoaded(){
    console.log("poseNet is initialized")
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWrist_score=results[0].pose.keypoints[9].score;
        rightWrist_score=results[0].pose.keypoints[10].score;
        left_wrist_y=results[0].pose.leftWrist.y
        right_wrist_y=results[0].pose.rightWrist.y
        left_wrist_x=results[0].pose.leftWrist.x
        right_wrist_x=results[0].pose.rightWrist.x
        console.log("left wrist y="+results[0].pose.leftWrist.y);
        console.log("right wrist y ="+results[0].pose.rightWrist.y);
        console.log("left wrist x="+results[0].pose.leftWrist.x);
        console.log("right wrist x ="+results[0].pose.rightWrist.x);
        console.log("left wrist score="+results[0].pose.keypoints[9].score);
        console.log("right wrist score ="+results[0].pose.keypoints[10].score);
       
    }

}
function draw() {
    image(video, 0, 0, 400, 400);
    document.getElementById("song name").innerHTML= song
    if(leftWrist_score>0.2){
        circle(left_wrist_x,left_wrist_y,30)
        fill('red')
       song2.play()
       song1.stop()
       song=("Chop Suey!")
    }
    if(rightWrist_score>0.2){
        circle(right_wrist_x,right_wrist_y,30)
        fill('red')
        song1.play()
        song2.stop()
        song=("Somebody To Shove")
    }
}