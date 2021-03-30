
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

// [D] Portfolio
const pfColors = {
    black: '#333',
    yellow: '#ffd54f',
    lightYellow: '#fff4ce',
};

// [D] Nonsense Quiz
const nColors = {
    black: '#333',
    skyBlue: '#a4caff',
    orange: '#ff9256',
    darkYellow: '#ffca19',
    lightPink: '#FADAD8',
    red: '#ff6059',
};

// [D] Personality Test
const pColors = {
    black: '#333',
    yellow: '#F6B352',
    darkRed: '#b0371c',
    orangeRed: '#bc5027',
};

// [D] CatchMind
const cColors = {
    black: '#666',
    orange: '#f5b36e',
    blue: '#59cffa',
    green: '#cae37f',
    red: '#eb6b66',
    ivory: '#fffff4',
};

const deviceSize = {
    mobileS: '640px',
    mobile: '767px',
    tablet: '1023px',
    laptop: '1460px',
    desktop: '1920px',
};

const device = {
    mobileS: `(max-width: ${deviceSize.mobileS})`,
    mobile: `(max-width: ${deviceSize.mobile})`,
    tablet: `(max-width: ${deviceSize.tablet})`,
    laptop: `(min-width: ${deviceSize.laptop})`,
    desktop: `(min-width: ${deviceSize.desktop})`,
};

export const calcRem = (size) => `${size / 16}rem`;

export const theme = {
    calcRem,
    colors,
    nColors,
    pColors,
    cColors,
    device,
    pfColors,
};