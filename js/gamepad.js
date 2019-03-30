var gamepads, gp,
    Laxes = [ 2 ],
    Raxes = [ 2 ],
    visualPadList = new Array();
var grid = document.getElementById('GPgrid');
var xboxButtons = [ 'A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'BACK', 'START', 'analog L', 'analog R', 'up', 'down', 'left', 'right' ];

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
    this.gamepadInfo = newElement('tr', 'GamepadInfo', n);
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
        this.LsPoint.style.backgroundColor = 'black';
        this.Lstick.style.border = '5px solid black';
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
        this.RsPoint.style.backgroundColor = 'black';
        this.Rstick.style.border = '5px solid black';
        this.Rstick.appendChild(this.RsPoint);
    }
    this.gamepadUI.appendChild(this.extraInfo);
}

function windowLoaded () {
    grid.innerHTML = 'Waiting for gamepad[...]';
    setInterval(pollGamepads, 60);
}
window.addEventListener('gamepaddisconnected', function () {
    grid.innerHTML = 'Waiting for gamepad[...]';
    visualPadList.pop();
});

function createPadUI () {
    let i = 0;
    if (gamepads.length > 0) {
        grid.innerHTML = '';
        do {
            let vp = new visualPad(gamepads[i], i);
            visualPadList.push(vp);
            i++;
        } while (gamepads[i] != undefined);
    }

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
            if (visualPadList.length == 0) {
                createPadUI();
            }
            visualPadList[i].controlInfo.innerHTML = '<br>' + 'Index ' + gp.index + ': ' + gp.id + ' ' + gp.buttons.length + ' buttons and ' + gp.axes.length + ' axes.';
            gamepadLoop(visualPadList[i], i);
            clearInterval(interval);
        }
    }
}

function buttonPressed (b) {
    if (b.pressed == true) {
        return true;
    }
}

function checkAxes (L = 2, R = 2, i) {
    //L
    visualPadList[i].LsPoint.style.left = (75 + (5 * L[0])) + 'px';
    visualPadList[i].LsPoint.style.top = (75 + (5 * L[1])) + 'px';
    //R
    visualPadList[i].RsPoint.style.left = (75 + (5 * R[0])) + 'px';
    visualPadList[i].RsPoint.style.top = (75 + (5 * R[1])) + 'px';
}

function gamepadLoop (agp, i) {
    try {
        if (gamepads[i] == undefined) { return; }
    } catch (e) {
        return;
    }

    gp = gamepads[i]; //armazena em 'gp' o gamepad ativo
    agp.info.innerHTML = '';

    for (var x = 0; x < gp.buttons.length; x++) {
        if (buttonPressed(gp.buttons[x])) {
            agp.info.innerHTML += xboxButtons[x] + ' ';
        }   //se foram pressionados, exibe na interface
    }   //passa por todos os botões e verifica se foram pressionados

    Laxes[0] = Math.round(10 * gp.axes[0]);       // L x
    Laxes[1] = Math.round(10 * gp.axes[1]);       // L y

    Raxes[0] = Math.round(10 * gp.axes[2]);       //R x
    Raxes[1] = Math.round(10 * gp.axes[3]);       //R y
    checkAxes(Laxes, Raxes, i);

    agp.LstickInfo.innerHTML = 'x: ' + Laxes[0] + ' y: ' + Laxes[1];
    agp.RstickInfo.innerHTML = 'x: ' + Raxes[0] + ' y: ' + Raxes[1];
}
