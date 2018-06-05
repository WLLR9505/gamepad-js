var gamepads, gb,
    Laxes = [ 2 ],
    Raxes = [ 2 ],
    LsPoint, RsPoint;
var LstickPosition = document.getElementById('Lstick');
var LstickInfo = document.getElementById('LstickInfo');
var RstickPosition = document.getElementById('Rstick');
var RstickInfo = document.getElementById('RstickInfo');
var gamepadInfo = document.getElementById('controlInfo');
var controlInfo = document.getElementById('Info');

window.addEventListener('gamepadconnected', createPadUI);
window.addEventListener('load', windowLoaded);

function windowLoaded () {
    setInterval(pollGamepads, 60);
}
window.addEventListener('gamepaddisconnected', function () {
    controlInfo.innerHTML = 'Waiting for gamepad.';
});

function createPadUI () {
//cria os pontos dos analógicos
    LsPoint = document.createElement('div');
    LsPoint.style.width = '10px';
    LsPoint.style.height = '10px';
    LsPoint.style.position = 'relative';
    LsPoint.style.left = (LstickPosition.clientWidth / 2) + 'px';
    LsPoint.style.top = (LstickPosition.clientHeight / 2) + 'px';
    LsPoint.style.backgroundColor = 'cyan';
    LstickPosition.style.border = '1px solid cyan';
    LstickPosition.appendChild(LsPoint);

    RsPoint = document.createElement('div');
    RsPoint.style.position = 'relative';
    RsPoint.style.left = (RstickPosition.clientWidth / 2) + 'px';
    RsPoint.style.top = (RstickPosition.clientHeight / 2) + 'px';
    RsPoint.style.width = '10px';
    RsPoint.style.height = '10px';
    RsPoint.style.backgroundColor = 'red';
    RstickPosition.style.border = '1px solid red';
    RstickPosition.appendChild(RsPoint);

    pollGamepads();
    gamepadLoop();
}

if (!('GamepadEvent' in window)) {
    var interval = setInterval(pollGamepads, 500);
}

function pollGamepads () {
    gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    for (var i = 0; i < gamepads.length; i++) {
        gp = gamepads[i];
        if (gp) {
            gamepadInfo.innerHTML = '<br>' + 'Index ' + gp.index + ': ' + gp.id + ' ' + gp.buttons.length + ' buttons and ' + gp.axes.length + ' axes.';
            gamepadLoop();
            clearInterval(interval);
        }
    }
}
setInterval(gamepadLoop, 60);

function buttonPressed (b) {
    if (b.pressed == true) {
        return true;
    }
}

function checkAxes (L = 2, R = 2) {
    var t = 0;
    //L
    if (L[0] > 0) {   //x
        LsPoint.style.left = (75 + (5 * L[0])) + 'px';
        //dir
    } else {
        LsPoint.style.left = (75 + (5 * L[0])) + 'px';
        //esq
    }
    if (L[1] > 0) {   //y
        LsPoint.style.top = (75 + (5 * L[1])) + 'px';
        //des
    } else {
        LsPoint.style.top = (75 + (5 * L[1])) + 'px';
        //sob
    }
    //-------------------------------------------------------
    //R
    if (R[0] > 0) {   //x
        RsPoint.style.left = (75 + (5 * R[0])) + 'px';
        //dir
    } else {
        RsPoint.style.left = (75 + (5 * R[0])) + 'px';
        //esq
    }
    if (R[1] > 0) {   //y
        RsPoint.style.top = (75 + (5 * R[1])) + 'px';
        //des
    } else {
        RsPoint.style.top = (75 + (5 * R[1])) + 'px';
        //sob
    }
}

function gamepadLoop () {
    try {
        if (gamepads[0] == undefined) { return; }
    } catch (e) {
        return;
    }

    gp = gamepads[0]; //armazena em 'gp' o gamepad ativo
    controlInfo.innerHTML = '';
    //A X Y B
    if (buttonPressed(gp.buttons[0])) {
        controlInfo.innerHTML += 'A<br>';
    }
    if (buttonPressed(gp.buttons[1])) {
        controlInfo.innerHTML += 'B<br>';
    }
    if (buttonPressed(gp.buttons[2])) {
        controlInfo.innerHTML += 'X<br>';
    }
    if (buttonPressed(gp.buttons[3])) {
        controlInfo.innerHTML += 'Y<br>';
    }
    // L R
    if (buttonPressed(gp.buttons[4])) {
        controlInfo.innerHTML += 'LB<br>';
    }
    if (buttonPressed(gp.buttons[6])) {
        controlInfo.innerHTML += 'LT<br>';
    }
    if (buttonPressed(gp.buttons[5])) {
        controlInfo.innerHTML += 'RB<br>';
    }
    if (buttonPressed(gp.buttons[7])) {
        controlInfo.innerHTML += 'RT<br>';
    }

    if (buttonPressed(gp.buttons[8])) {
        controlInfo.innerHTML += 'back<br>';
    }
    if (buttonPressed(gp.buttons[9])) {
        controlInfo.innerHTML += 'start<br>';
    }
    if (buttonPressed(gp.buttons[10])) {
        controlInfo.innerHTML += 'analog Lb<br>';
    }
    if (buttonPressed(gp.buttons[11])) {
        controlInfo.innerHTML += 'analog Rb<br>';
    }
    if (buttonPressed(gp.buttons[12])) {
        controlInfo.innerHTML += 'cima<br>';
    }
    if (buttonPressed(gp.buttons[13])) {
        controlInfo.innerHTML += 'baixo<br>';
    }
    if (buttonPressed(gp.buttons[14])) {
        controlInfo.innerHTML += 'esquerda<br>';
    }
    if (buttonPressed(gp.buttons[15])) {
        // alert('direita');
        controlInfo.innerHTML += 'direita<br>';
    }

    Laxes[0] = Math.round(10 * gp.axes[0]);       // L x
    Laxes[1] = Math.round(10 * gp.axes[1]);       // L y

    Raxes[0] = Math.round(10 * gp.axes[2]);       //R x
    Raxes[1] = Math.round(10 * gp.axes[3]);       //R y
    checkAxes(Laxes, Raxes);

    LstickInfo.innerHTML = 'x: ' + Laxes[0] + ' y: ' + Laxes[1];
    RstickInfo.innerHTML = 'x: ' + Raxes[0] + ' y: ' + Raxes[1];
}
