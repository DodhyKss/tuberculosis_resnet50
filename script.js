
// the link to your model resnet50 provided by Teachable Machine export panel
const model_resnet50 = "./@teacheablemachine/tensorflow/resnet_50/resnet50_model.json";
const metadata_resnet50 = "./@teacheablemachine/tensorflow/resnet_50/metadata.json"

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
            
    stop.classList.add('show');
    stop.classList.remove('hide');
    start.classList.add('hide');
    start.classList.remove('show');

    // load the model and metadata
    generateResnet50 = await tmImage.load(model_resnet50, metadata_resnet50);
    maxPredictions = generateResnet50.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await generateResnet50.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

function viewLogin(){            
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    const container = document.getElementById('content');
    const formLogin = document.getElementById('login');
    const judul_1 = document.getElementById('judul-1');
    const judul_2 = document.getElementById('judul-2');
    // remove
    var video = document.getElementById('video');
    

    if(password == "tuberculosis123*" && username == "tuberculosis"){
        container.classList.add('show');
        container.classList.remove('hide');
        formLogin.classList.add('hide');
        formLogin.classList.remove('show');
        judul_1.classList.add('show');
        judul_1.classList.remove('hide');
        judul_2.classList.add('hide');
        judul_2.classList.remove('show');
    }
    // remove
    else if (password == "Tbc1815*" && username == "tuberculosis"){
        container.classList.add('hide');
        container.classList.remove('show');
        formLogin.classList.add('hide');
        formLogin.classList.remove('show');
        judul_1.classList.add('hide');
        judul_1.classList.remove('show');
        judul_2.classList.add('hide');
        judul_2.classList.remove('show');
        video.style.display = 'block';

    } else {
        alert("Maaf Password atau Username anda Salah!");
    }
}

function stopCam() {
    location.reload();
} 


