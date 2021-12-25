songamazingenglish = ""
songamazingpunjabi = ""
leftWristx = 0
leftWristy = 0
rightWristx = 0
rightWristy = 0
leftwristscore = 0
rightwristscore = 0
songstylestatus = ""

function setup() {
    canvas = createCanvas(700, 700);
    canvas.position(90, 60)
    video = createCapture(VIDEO);
    posenet = ml5.poseNet(video, modelLoaded)
    posenet.on('pose', gotPoses)
    video.hide()
}

function preload() {
    songamazingpunjabi = loadSound("Tunak Tunak Tun - Daler Mehndi.mp3");
    songamazingenglish = loadSound("Rick_Astley_-_Never_Gonna_Give_You_Up_Qoret.com.mp3")
}

function draw() {
    image(video, 0, 0, 700, 700);

    if (leftwristscore > 0.2) {
        songamazingenglish.stop()
        songamazingpunjabi.play()
    }

    if (rightwristscore > 0.2) {
        songamazingpunjabi.stop()
        songamazingenglish.play()
    }
}

function modelLoaded() {
    console.log("posenetisinitialized")
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        leftWristx = results[0].pose.leftWrist.x;
        rightWristx = results[0].pose.rightWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristy = results[0].pose.rightWrist.y;
        leftwristscore = results[0].pose.keypoints[9].score
        rightwristscore = results[0].pose.keypoints[10].score

    }
}

function play() {
    songamazingpunjabi.play()
}

function stop() {
    songamazingenglish.stop()
    songamazingpunjabi.stop()
}