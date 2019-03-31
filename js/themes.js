var red_cyan = {
    leftPrimary : 'cyan',
    leftSecondary : '#005959',
    rightPrimary : 'red',
    rightSecondary : '#590000',
    background : '#16161d',
    stickInfo : 'white',
    padInfo : 'cyan',
    buttonInfo : 'lime'
}

var violet_lime = {
    leftPrimary : '#8f00ff',
    leftSecondary : '#4f008e',
    rightPrimary : 'lime',
    rightSecondary : '#007c0f',
    background : '#16161d',
    stickInfo : 'white',
    padInfo : '#8f00ff',
    buttonInfo : 'lime'
}

var blue_yellow = {
    leftPrimary : 'yellow',
    leftSecondary : '#a2a01c',
    rightPrimary : 'blue',
    rightSecondary : '#14126b',
    background : '#16161d',
    stickInfo : 'white',
    padInfo : 'yellow',
    buttonInfo : 'lime'
}

var pale = {
    leftPrimary : '#FCFCD5',
    leftSecondary : '#dfdfbd',
    rightPrimary : '#FFEFAD',
    rightSecondary : '#e0d299',
    background : '#a7996f',
    stickInfo : 'black',
    padInfo : 'black',
    buttonInfo : 'black'
}

var themes = [red_cyan, blue_yellow, violet_lime, pale]
var selectedTheme = 0;

function changeTheme() {
    if (selectedTheme + 1 == themes.length ){
        return selectedTheme = 0;
    } else {
        return selectedTheme += 1;
    }
}

function updateTheme(theme) {
    let LstickInfo = document.getElementsByClassName('LstickInfo');
    LstickInfo[0].style.backgroundColor = theme.leftSecondary;
    LstickInfo[0].style.color = theme.stickInfo;

    let RstickInfo = document.getElementsByClassName('RstickInfo');
    RstickInfo[0].style.backgroundColor = theme.rightSecondary;
    RstickInfo[0].style.color = theme.stickInfo;

    let Info = document.getElementsByClassName('Info');
    Info[0].style.color = theme.buttonInfo;
    Info[0].style.background = theme.background;

    let Lstick = document.getElementsByClassName('Lstick');
    Lstick[0].style.backgroundColor = theme.leftPrimary

    let Rstick = document.getElementsByClassName('Rstick');
    Rstick[0].style.backgroundColor = theme.rightPrimary

    let controlInfo = document.getElementsByClassName('controlInfo');
    controlInfo[0].style.color = theme.padInfo;
    controlInfo[0].style.backgroundColor = theme.background;

}

export { changeTheme, updateTheme, themes }
