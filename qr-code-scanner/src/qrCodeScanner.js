

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
let scanning = false;

function logData(res) {
  if (res == "1923ME1106") {
    window.location = "../patient/patient_main_oliver.html";
  }
  else if(res == "1923me1101"){
    window.location = "../patient/patient_main_ethan.html";
  }
  else if(res =="1923CSI1084"){
    window.location = "../patient/patient_main_lucas.html";
  }
  else if(res=="1923EC1133"){
    
    window.location = "../patient/patient_main_chloe.html";
  }
  
}

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    scanning = false;
    logData(res);
    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;
  }
};

btnScanQR.onclick = () => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "facingMode" } })
    .then(function (stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
