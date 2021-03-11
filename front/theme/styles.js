
const colors = {
    black: '#566270',
    rgbaBlack: 'rgba(0, 0, 0, 0.5)',
    rgbaGray: 'rgba(86, 98, 112, 0.5)',
    white: '#fff',
    ivory: '#FFFFF3',
    lightGray: '#f0f2f5',
    gray: '#dedede',
    lightYellowGray : '#E0E3DA',
    purple: '#A593E0',
    mint: '#64c5ba',
    yellow: '#ffbf2e',
    green: '#26ca3f',
    darkPink : '#ef5285',
    pink: '#ED9282',
    chatSimsimi: '#ffe34f',
    chatUser: '#f18d8b',
};

const nonsenseColors = {
    black: '#333',
    skyBlue: '#a4caff',
    orange: '#ff9256',
    darkYellow : '#ffca19',
    lightPink: '#FADAD8',
};

const deviceSize = {
    mobile: '767px',
    tablet: '1023px',
    laptop: '1460px',
    desktop: '1920px',
};

const device = {
    mobile: `(max-width: ${deviceSize.mobile})`,
    tablet: `(max-width: ${deviceSize.tablet})`,
    laptop: `(min-width: ${deviceSize.laptop})`,
    desktop: `(min-width: ${deviceSize.desktop})`,
};

export const calcRem = (size) => `${size / 16}rem`;

export const theme = {
    calcRem,
    nonsenseColors,
    colors,
    device,
};

// TODO:
// 조합 (1)
// 1. #fd7576
// 2. #fec85d
// 3. #4db9de
// 4. #34324b

// 조합 (2)
// #a7dff8 #ed5586 #64c5ba #64c5baF

// 조합 3
// #A593E0 #E0E3DA #FFFFF3 #566270

// #84B1ED #C89EC4 #EE7785 #67D5B5

// #feee7d #60c5ba #ef5285 #a5dff9

// #9DC8C8 #58C9B9 #519D9E #D1B6E1