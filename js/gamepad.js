var gamepads, gp,
    Laxes = [ 2 ],
    Raxes = [ 2 ],
    visualPadList = new Array();
var grid = document.getElementById('GPgrid');

window.addEventListener('gamepadconnected', createPadUI);
window.addEventListener('load', windowLoaded);

function newElement (tipo, classe, id) {
    var el = document.createElement(tipo);
    if (classe != undefined) {
        el.setAttribute('class', classe);
    }
    if (id != undefined) {
        el.setAttribute('id', 'n' + id);
    }
    return el;
}

function visualPad (gp, n) {
    this.gamepadUI = newElement('table', 'Gamepad', n);
    grid.appendChild(this.gamepadUI);

    //Linha 1 ( L(x/y) botao pressionado R(x/y))
    this.gamepadInfo = newElement('tr', 'GamepadInfo', n);  //// BUG: provavel bug no layout
    if (gp.axes != undefined) { //caso tenha analógicos
        this.LstickInfo = newElement('td', 'LstickInfo', n);
        this.gamepadInfo.appendChild(this.LstickInfo);
    }
    this.info = newElement('td', 'Info', n);
    this.gamepadInfo.appendChild(this.info);
    if (gp.axes != undefined) { //caso tenha analógicos
        this.RstickInfo = newElement('td', 'RstickInfo', n);
        this.gamepadInfo.appendChild(this.RstickInfo);
    }
    this.gamepadUI.appendChild(this.gamepadInfo);

    //Linha 2 ( L(pos) info Gamepad R(pos))
    this.extraInfo = newElement('tr', 'ExtraInfo', n);
    if (gp.axes != undefined) { //caso tenha analógicos
        this.Lstick = newElement('td', 'Lstick', n);
        this.extraInfo.appendChild(this.Lstick);

        this.LsPoint = document.createElement('div');
        this.LsPoint.style.width = '10px';
        this.LsPoint.style.height = '10px';
        this.LsPoint.style.position = 'relative';
        this.LsPoint.style.left = (this.Lstick.clientWidth / 2) + 'px';
        this.LsPoint.style.top = (this.Lstick.clientHeight / 2) + 'px';
        this.LsPoint.style.backgroundColor = 'cyan';
        this.Lstick.style.border = '1px solid cyan';
        this.Lstick.appendChild(this.LsPoint);
    }
    this.controlInfo = newElement('td', 'controlInfo', n);
    this.extraInfo.appendChild(this.controlInfo);
    if (gp.axes != undefined) { //caso tenha analógicos
        this.Rstick = newElement('td', 'Rstick', n);
        this.extraInfo.appendChild(this.Rstick);

        this.RsPoint = document.createElement('div');
        this.RsPoint.style.position = 'relative';
        this.RsPoint.style.left = (this.Rstick.clientWidth / 2) + 'px';
        this.RsPoint.style.top = (this.Rstick.clientHeight / 2) + 'px';
        this.RsPoint.style.width = '10px';
        this.RsPoint.style.height = '10px';
        this.RsPoint.style.backgroundColor = 'red';
        this.Rstick.style.border = '1px solid red';
        this.Rstick.appendChild(this.RsPoint);
    }
    this.gamepadUI.appendChild(this.extraInfo);
}

function windowLoaded () {
    setInterval(pollGamepads, 60);
}
window.addEventListener('gamepaddisconnected', function () {
    grid.innerHTML = 'Waiting for gamepad.';
});

function createPadUI () {
    let i = 0;
    do {
        let vp = new visualPad(gamepads[i], i);
        visualPadList.push(vp);
        i++;
    } while (gamepads[i] != undefined);

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
            visualPadList[i].controlInfo.innerHTML = '<br>' + 'Index ' + gp.index + ': ' + gp.id + ' ' + gp.buttons.length + ' buttons and ' + gp.axes.length + ' axes.';
            gamepadLoop(visualPadList[i], i);
            clearInterval(interval);
        }
    }
}
// setInterval(gamepadLoop, 60);

function buttonPressed (b) {
    if (b.pressed == true) {
        return true;
    }
}

function checkAxes (L = 2, R = 2, i) {
    //L
    if (L[0] > 0) {   //x
        visualPadList[i].LsPoint.style.left = (75 + (5 * L[0])) + 'px';
        //dir
    } else {
        visualPadList[i].LsPoint.style.left = (75 + (5 * L[0])) + 'px';
        //esq
    }
    if (L[1] > 0) {   //y
        visualPadList[i].LsPoint.style.top = (75 + (5 * L[1])) + 'px';
        //des
    } else {
        visualPadList[i].LsPoint.style.top = (75 + (5 * L[1])) + 'px';
        //sob
    }
    //-------------------------------------------------------
    //R
    if (R[0] > 0) {   //x
        visualPadList[i].RsPoint.style.left = (75 + (5 * R[0])) + 'px';
        //dir
    } else {
        visualPadList[i].RsPoint.style.left = (75 + (5 * R[0])) + 'px';
        //esq
    }
    if (R[1] > 0) {   //y
        visualPadList[i].RsPoint.style.top = (75 + (5 * R[1])) + 'px';
        //des
    } else {
        visualPadList[i].RsPoint.style.top = (75 + (5 * R[1])) + 'px';
        //sob
    }
}

function gamepadLoop (agp, i) {
    try {
        if (gamepads[i] == undefined) { return; }
    } catch (e) {
        return;
    }

    gp = gamepads[i]; //armazena em 'gp' o gamepad ativo
    agp.info.innerHTML = '';
    //A X Y B
    if (buttonPressed(gp.buttons[0])) {
        agp.info.innerHTML += 'A ';
    }
    if (buttonPressed(gp.buttons[1])) {
        agp.info.innerHTML += 'B ';
    }
    if (buttonPressed(gp.buttons[2])) {
        agp.info.innerHTML += 'X ';
    }
    if (buttonPressed(gp.buttons[3])) {
        agp.info.innerHTML += 'Y ';
    }
    // L R
    if (buttonPressed(gp.buttons[4])) {
        agp.info.innerHTML += 'LB ';
    }
    if (buttonPressed(gp.buttons[6])) {
        agp.info.innerHTML += 'LT ';
    }
    if (buttonPressed(gp.buttons[5])) {
        agp.info.innerHTML += 'RB ';
    }
    if (buttonPressed(gp.buttons[7])) {
        agp.info.innerHTML += 'RT ';
    }

    if (buttonPressed(gp.buttons[8])) {
        agp.info.innerHTML += 'back ';
    }
    if (buttonPressed(gp.buttons[9])) {
        agp.info.innerHTML += 'start ';
    }
    if (buttonPressed(gp.buttons[10])) {
        agp.info.innerHTML += 'analog L ';
    }
    if (buttonPressed(gp.buttons[11])) {
        agp.info.innerHTML += 'analog R ';
    }
    if (buttonPressed(gp.buttons[12])) {
        agp.info.innerHTML += 'up ';
    }
    if (buttonPressed(gp.buttons[13])) {
        agp.info.innerHTML += 'down ';
    }
    if (buttonPressed(gp.buttons[14])) {
        agp.info.innerHTML += 'left ';
    }
    if (buttonPressed(gp.buttons[15])) {
        // alert('direita');
        agp.info.innerHTML += 'right ';
    }

    Laxes[0] = Math.round(10 * gp.axes[0]);       // L x
    Laxes[1] = Math.round(10 * gp.axes[1]);       // L y

    Raxes[0] = Math.round(10 * gp.axes[2]);       //R x
    Raxes[1] = Math.round(10 * gp.axes[3]);       //R y
    checkAxes(Laxes, Raxes, i);

    agp.LstickInfo.innerHTML = 'x: ' + Laxes[0] + ' y: ' + Laxes[1];
    agp.RstickInfo.innerHTML = 'x: ' + Raxes[0] + ' y: ' + Raxes[1];
}
