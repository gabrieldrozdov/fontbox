// ——————————————————————————————————————————
// INSTRUMENTS
// ——————————————————————————————————————————

// Piano sampler
const pianoSampler = new Tone.Sampler({
	urls: {
		C1: "piano-c1.mp3",
		C2: "piano-c2.mp3",
		C3: "piano-c3.mp3",
		C4: "piano-c4.mp3",
		C5: "piano-c5.mp3"
	},
	envelope: {
		attack: 0,
		decay: 0.2,
		sustain: 1,
		release: 1
	},
	baseUrl: "assets/audio/piano/",
	volume: 2,
}).toDestination();
function playPiano(sample, duration) {
	pianoSampler.triggerAttackRelease(sample, duration/500);
}

// Synth sampler
const synthSampler = new Tone.Sampler({
	urls: {
		C1: "synth-c1.mp3",
		C2: "synth-c2.mp3",
		C3: "synth-c3.mp3",
		C4: "synth-c4.mp3",
		C5: "synth-c5.mp3"
	},
	envelope: {
		attack: 0,
		decay: 0.2,
		sustain: 1,
		release: 1
	},
	baseUrl: "assets/audio/synth/",
	volume: -8,
}).toDestination();
function playSynth(sample, duration) {
	synthSampler.triggerAttackRelease(sample, duration/500);
}

// Pitched tom sampler
const tomSampler = new Tone.Sampler({
	urls: {
		C1: "tom-c1.mp3",
		C2: "tom-c2.mp3",
		C3: "tom-c3.mp3",
		C4: "tom-c4.mp3",
		C5: "tom-c5.mp3"
	},
	baseUrl: "assets/audio/toms/",
	volume: -3,
}).toDestination();
function playTom(freq) {
	tomSampler.triggerAttackRelease(freq, 1);
}

// Kick sampler
const kickSampler = new Tone.Sampler({
	urls: {
		C1: "kick-c1.mp3",
		C2: "kick-c2.mp3",
		C3: "kick-c3.mp3",
		C4: "kick-c4.mp3",
		C5: "kick-c5.mp3"
	},
	baseUrl: "assets/audio/kick/",
	volume: 0,
}).toDestination();
function playKick(freq) {
	kickSampler.triggerAttackRelease(freq, 1);
}

// snare sampler
const snareSampler = new Tone.Sampler({
	urls: {
		C1: "snare-c1.mp3",
		C2: "snare-c2.mp3",
		C3: "snare-c3.mp3",
		C4: "snare-c4.mp3",
		C5: "snare-c5.mp3"
	},
	baseUrl: "assets/audio/snare/",
	volume: 0,
}).toDestination();
function playSnare(freq) {
	snareSampler.triggerAttackRelease(freq, 1);
}

// Hihat sampler
const hihatSampler = new Tone.Sampler({
	urls: {
		C1: "hihat-c1.mp3",
		C2: "hihat-c2.mp3",
		C3: "hihat-c3.mp3",
		C4: "hihat-c4.mp3",
		C5: "hihat-c5.mp3"
	},
	baseUrl: "assets/audio/hihat/",
	volume: 0,
}).toDestination();
function playHihat(freq) {
	hihatSampler.triggerAttackRelease(freq, 1);
}

// Pitched woodblock sampler
const blockSampler = new Tone.Sampler({
	urls: {
		C1: "woodblock-c1.mp3",
		C2: "woodblock-c2.mp3",
		C3: "woodblock-c3.mp3",
		C4: "woodblock-c4.mp3",
		C5: "woodblock-c5.mp3"
	},
	baseUrl: "assets/audio/woodblock/",
	volume: 0,
}).toDestination();
function playBlock(freq) {
	blockSampler.triggerAttackRelease(freq, 1);
}

// Guitar sampler
const guitarSampler = new Tone.Sampler({
	urls: {
		C1: "guitar-c1.mp3",
		C2: "guitar-c2.mp3",
		C3: "guitar-c3.mp3",
		C4: "guitar-c4.mp3",
		C5: "guitar-c5.mp3"
	},
	baseUrl: "assets/audio/guitar/",
	volume: -5,
}).toDestination();
function playGuitar(freq, duration) {
	guitarSampler.triggerAttackRelease(freq, duration/500);
}

// Horn sampler
const hornSampler = new Tone.Sampler({
	urls: {
		C1: "horn-c1.mp3",
		C2: "horn-c2.mp3",
		C3: "horn-c3.mp3",
		C4: "horn-c4.mp3",
		C5: "horn-c5.mp3"
	},
	baseUrl: "assets/audio/horn/",
	volume: -5,
}).toDestination();
function playHorn(freq, duration) {
	hornSampler.triggerAttackRelease(freq, duration/800);
}

// Voice sampler ("Animalese")
let voiceSamplerLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
let voiceSamplers = {}
for (let letter of voiceSamplerLetters) {
	voiceSamplers[letter] = new Tone.Sampler({
		urls: {
			C2: `voice-${letter}.mp3`
		},
		baseUrl: "assets/audio/newvoice/",
		volume: 0,
	}).toDestination();
}
function playVoice(letter, pitch) {
	letter = letter.toLowerCase();
	if (letter != " " && voiceSamplerLetters.includes(letter)) {
		voiceSamplers[letter].triggerAttackRelease(pitch, 1);
	}
}

const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const octaves = [1,2,3,4,5];

// ——————————————————————————————————————————
// SETTINGS/CONTROLS
// ——————————————————————————————————————————

// All possible settings values (with associated display values)
const settings = {
	"font": {
		"Arial": `<span style="font-family: 'Arial';">A</span>`,
		"Times New Roman": `<span style="font-family: 'Times New Roman';">A</span>`,
		"Comic Sans MS": `<span style="font-family: 'Comic Sans MS';">A</span>`,
		"Papyrus": `<span style="font-family: 'Papyrus'; transform: translateY(2.5px);">A</span>`,
		"Courier": `<span style="font-family: 'Courier';">A</span>`,
		"Impact": `<span style="font-family: 'Impact';">A</span>`,
		"Didot": `<span style="font-family: 'Didot';">A</span>`,
		"Futura": `<span style="font-family: 'Futura';">A</span>`,
		"Copperplate": `<span style="font-family: 'Copperplate';">A</span>`,
		"Chalkduster": `<span style="font-family: 'Chalkduster';">A</span>`,
		"Baskerville": `<span style="font-family: 'Baskerville';">A</span>`,
		"Party LET": `<span style="font-family: 'Party LET'; transform: translateY(2.5px);">A</span>`,
		"Silom": `<span style="font-family: 'Silom'; transform: translateY(1px);">A</span>`,
		"?": `?`
	},
	"motion": {
		"translate": `<svg viewBox="0 0 100 100"><polygon points="30 6.25 10 31.25 25 31.25 25 81.25 35 81.25 35 31.25 50 31.25 30 6.25"/><polygon points="75 68.75 75 18.75 65 18.75 65 68.75 50 68.75 70 93.75 90 68.75 75 68.75"/></svg>`,
		"rotate": `<svg viewBox="0 0 100 100"><path d="M76.88,27.6l-7.68,6.4c3.62,4.33,5.8,9.91,5.8,16,0,13.79-11.21,25-25,25v-15l-25,20,25,20v-15c19.3,0,35-15.7,35-35,0-8.51-3.05-16.33-8.12-22.4Z"/><path d="M25,50c0-13.79,11.21-25,25-25v15l25-20L50,0v15c-19.3,0-35,15.7-35,35,0,8.51,3.05,16.33,8.12,22.4l7.68-6.4c-3.62-4.33-5.8-9.91-5.8-16Z"/></svg>`,
		"scalex": `<svg viewBox="0 0 100 100"><polygon points="93.75 50 68.75 30 68.75 45 31.25 45 31.25 30 6.25 50 31.25 70 31.25 55 68.75 55 68.75 70 93.75 50"/></svg>`,
		"scaley": `<svg viewBox="0 0 100 100"><polygon points="50 93.75 70 68.75 55 68.75 55 31.25 70 31.25 50 6.25 30 31.25 45 31.25 45 68.75 30 68.75 50 93.75"/></svg>`,
		"scale": `<svg viewBox="0 0 100 100"><polygon points="83.146 16.854 83.146 16.854 83.145 16.854 47.79 16.854 51.326 20.39 51.326 20.39 61.932 30.997 30.996 61.932 20.39 51.326 16.854 47.79 16.854 83.146 52.21 83.146 48.674 79.61 48.674 79.61 38.068 69.004 69.004 38.068 79.61 48.674 83.146 52.21 83.146 16.854 83.146 16.854"/></svg>`,
		"party": `<svg viewBox="0 0 100 100"><path d="M99.5,36.253l-29.315-12.869-6.12,31.425,13.288-6.959.046-.024c8.412,18.976,2.579,29.871-5.079,33.45-7.835,3.659-14.709-.277-17.456-6.052-4.233-8.899-1.634-15.706,1.378-23.588,3.289-8.61,7.018-18.369.347-30.236-5.003-8.903-13.221-14.014-22.545-14.022h-.021c-8.762,0-16.863,4.713-21.146,12.302-2.942,5.214-6.381,15.957,1.603,31.358l-.268.119L.5,57.24l28.421,14.74,8.142-30.963-13.416,5.953c-4.611-8.647-5.364-16.523-2.061-22.375,2.513-4.452,7.276-7.217,12.437-7.217h.013c5.61.005,10.653,3.257,13.837,8.922,4.373,7.78,2.015,13.953-.972,21.768-3.181,8.326-7.14,18.688-1.066,31.452,3.992,8.395,11.881,13.164,20.414,13.163,3.4,0,6.905-.758,10.305-2.347,12.802-5.981,20.734-22.872,9.725-47.159l13.224-6.925Z"/></svg>`,
		"?": `?`,
		"X": ``,
	},
	"pulse": {
		"circle": `<svg viewBox="0 0 100 100"><path d="M50,10c22.056,0,40,17.944,40,40s-17.944,40-40,40S10,72.056,10,50,27.944,10,50,10M50,0C22.386,0,0,22.386,0,50s22.386,50,50,50,50-22.386,50-50S77.614,0,50,0h0Z"/></svg>`,
		"square": `<svg viewBox="0 0 100 100"><path d="M83.375,16.625v66.75H16.625V16.625h66.75M93.375,6.625H6.625v86.75h86.75V6.625h0Z"/></svg>`,
		"diamond": `<svg viewBox="0 0 100 100"><path d="M50,14.142l35.858,35.858-35.858,35.858L14.142,50,50,14.142M50,0L0,50l50,50,50-50L50,0h0Z"/></svg>`,
		"cross": `<svg viewBox="0 0 100 100"><polygon points="93.535 13.535 86.465 6.465 50 42.93 13.535 6.465 6.465 13.535 42.93 50 6.465 86.465 13.535 93.535 50 57.07 86.465 93.535 93.535 86.465 57.07 50 93.535 13.535"/></svg>`,
		"burst": `<svg viewBox="0 0 100 100"><polygon points="100 45 68.66 45 95.802 29.33 90.802 20.67 63.66 36.34 79.33 9.198 70.67 4.198 55 31.34 55 0 45 0 45 31.34 29.33 4.198 20.67 9.198 36.34 36.34 9.198 20.67 4.198 29.33 31.34 45 0 45 0 55 31.34 55 4.198 70.67 9.198 79.33 36.34 63.66 20.67 90.802 29.33 95.802 45 68.66 45 100 55 100 55 68.66 70.67 95.802 79.33 90.802 63.66 63.66 90.802 79.33 95.802 70.67 68.66 55 100 55 100 45"/></svg>`,
		"?": `?`,
		"X": ``
	},
	"sound": {
		"voice": `<svg viewBox="0 0 100 100"><path d="M30.734,47.862l10.419,2.548-4.368-45.922-11.72-2.866L0,40.347l10.549,2.579,5.48-9.149,14,3.423.705,10.661ZM19.768,27.515l8.705-14.433,1.063,16.822-9.769-2.389Z"/><path d="M57.254,69.704c4.048-2.487,5.689-6.681,4.497-11.081-1.667-6.147-7.835-9.683-13.981-8.017l-21.092,5.719,11.402,42.053,22.386-6.07c6.404-1.736,10.13-8.234,8.358-14.767-1.421-5.241-5.919-8.258-11.57-7.838ZM38.534,62.14l8.671-2.351c2.457-.666,4.796.783,5.463,3.241.667,2.459-.555,4.873-2.948,5.522l-8.8,2.386-2.385-8.798ZM55.234,84.282l-9.965,2.702-2.526-9.317,9.834-2.666c2.717-.737,5.203.742,5.922,3.394s-.612,5.168-3.265,5.887Z"/><path d="M88.717,38.936c.386,5.275-2.44,9.433-7.079,10.5-6.14,1.411-11.944-2.895-13.611-10.146-1.652-7.186,1.68-13.936,7.494-15.272,4.377-1.006,8.772,1.354,10.833,5.832l9.159-6.232c-4.35-7.253-13.274-10.773-22.095-8.746-11.955,2.748-18.743,14.213-15.845,26.821,2.883,12.543,14.207,19.914,26.227,17.151,9.147-2.102,15.761-9.538,16.2-18.099l-11.283-1.809Z"/></svg>`,
		"piano": `<svg viewBox="0 0 100 100"><path d="M30,65v35H0v-50h17.5v15h12.5ZM57.5,60h20V0h-20v60ZM22.5,60h20V0h-20v60ZM52.5,65v-15h-5v15h-12.5v35h30v-35h-12.5ZM82.5,50v15h-12.5v35h30v-50h-17.5Z"/></svg>`,
		"synth": `<svg viewBox="0 0 100 100"><path d="M0,69.15v21.85c6.62,0,8.1-8.92,9.17-15.43,1.15-6.91,2.06-16.15,2.95-25.08.58-5.92,1.32-13.36,2.16-19.69.84,6.33,1.58,13.77,2.17,19.69.89,8.93,1.8,18.17,2.94,25.08,1.08,6.51,2.56,15.43,9.18,15.43s8.09-8.92,9.17-15.43c1.14-6.91,2.06-16.15,2.94-25.08.59-5.92,1.33-13.36,2.17-19.69.84,6.33,1.58,13.77,2.17,19.69.88,8.93,1.8,18.17,2.94,25.08,1.08,6.51,2.55,15.43,9.18,15.43s8.09-8.92,9.17-15.43c1.14-6.91,2.06-16.15,2.94-25.08.59-5.92,1.33-13.36,2.17-19.7.84,6.34,1.58,13.78,2.17,19.7.88,8.93,1.8,18.17,2.94,25.08,1.08,6.51,2.56,15.43,9.18,15.43s8.1-8.92,9.17-15.43c1.15-6.91,2.06-16.15,2.95-25.08.59-5.93,1.33-13.37,2.17-19.71V9c-6.62,0-8.1,8.92-9.18,15.43-1.14,6.91-2.05,16.15-2.94,25.08-.59,5.92-1.33,13.37-2.17,19.71-.84-6.34-1.58-13.79-2.17-19.71-.89-8.93-1.8-18.17-2.95-25.08-1.07-6.51-2.55-15.43-9.17-15.43s-8.1,8.92-9.18,15.43c-1.14,6.91-2.05,16.15-2.94,25.08-.59,5.92-1.32,13.36-2.17,19.69-.84-6.33-1.57-13.77-2.16-19.69-.89-8.93-1.8-18.17-2.95-25.08-1.07-6.51-2.55-15.43-9.17-15.43s-8.1,8.92-9.17,15.43c-1.15,6.91-2.06,16.15-2.95,25.08-.58,5.92-1.32,13.36-2.16,19.69-.84-6.33-1.58-13.77-2.17-19.69-.88-8.93-1.8-18.17-2.94-25.08-1.08-6.51-2.55-15.43-9.18-15.43s-8.09,8.92-9.17,15.43c-1.14,6.91-2.06,16.15-2.94,25.08-.59,5.91-1.33,13.32-2.17,19.64Z"/></svg>`,
		"horn": `<svg viewBox="0 0 100 100"><path d="M95.374,0c-2.452,0-4.478,1.919-4.614,4.367-.95,17.148-7.759,25.761-21.262,29.709-11.882,3.474-37.195,6.566-46.219,7.597-1.749.2-3.28-1.169-3.28-2.929h0c0-1.515-1.148-2.783-2.655-2.933l-14.104-1.41C1.506,34.227,0,35.59,0,37.334v25.332C0,64.41,1.506,65.773,3.241,65.599l14.104-1.41c1.507-.151,2.655-1.419,2.655-2.933v-.104c0-1.724,1.471-3.082,3.189-2.938,1.146.096,2.563.22,4.185.371-1.381,2.962-2.121,6.373-2.121,10.156,0,13.739,9.714,22.617,24.746,22.617,15.727,0,24.746-8.243,24.746-22.617,0-.122-.013-.234-.014-.355,9.281,5.071,15.072,12.821,16.01,27.288.158,2.43,2.175,4.326,4.61,4.326h.022c2.555,0,4.626-2.071,4.626-4.626V4.626c0-2.555-2.071-4.626-4.626-4.626h0ZM50,79.357c-10.535,0-12.746-5.773-12.746-10.617,0-3.065.893-6.499,4.214-8.61,6.956.887,14.428,2.052,20.493,3.505.612,1.55.786,3.303.786,5.105,0,5.515-1.544,10.617-12.746,10.617Z"/></svg>`,
		"guitar": `<svg viewBox="0 0 100 100"><path d="M25.046,100h-9.908V0h9.908v100ZM44.954,0h-9.908v100h9.908V0ZM64.954,0h-9.908v100h9.908V0ZM84.863,0h-9.908v100h9.908V0Z"/></svg>`,
		"kick": `<svg viewBox="0 0 100 100"><path d="M100,50c0,26.61-20.79,48.36-47.01,49.9v-17.78c6.53-1.38,11.44-7.18,11.44-14.12,0-7.97-6.46-14.43-14.43-14.43s-14.43,6.46-14.43,14.43c0,6.94,4.91,12.74,11.44,14.12v17.78C20.79,98.36,0,76.61,0,50,0,22.39,22.39,0,50,0s50,22.39,50,50Z"/></svg>`,
		"snare": `<svg viewBox="0 0 100 100"><path d="M99.442,54.028v19.228c0,12.671-22.138,22.935-49.442,22.935S.558,85.928.558,73.256v-19.228c0-5.308,3.896-10.189,10.42-14.074l3.44,4.058c-4.404,2.877-6.975,6.317-6.975,10.016,0,3.532,2.324,6.812,6.353,9.61,7.503,5.206,20.914,8.669,36.204,8.669s28.701-3.463,36.204-8.669c4.029-2.798,6.353-6.078,6.353-9.61,0-3.632-2.483-7.012-6.741-9.857l3.449-4.067c6.375,3.86,10.177,8.683,10.177,13.924ZM42.946,54.235c-.816-1.212-2.174-1.829-3.534-1.771L12.333,6.452c-1.567-2.663-5.054-3.454-7.617-1.728-2.563,1.726-3.14,5.255-1.262,7.708l32.46,42.387c-.565,1.239-.503,2.729.313,3.941,1.25,1.856,3.767,2.347,5.623,1.097,1.856-1.25,2.347-3.767,1.097-5.623ZM58.151,59.857c1.856,1.25,4.373.759,5.623-1.097.817-1.212.878-2.702.313-3.941L96.546,12.433c1.878-2.453,1.301-5.982-1.262-7.708-2.563-1.726-6.05-.935-7.617,1.728l-27.079,46.011c-1.361-.057-2.718.559-3.534,1.771-1.25,1.856-.759,4.373,1.097,5.623ZM49.97,30.931c-3.6,0-7.11.18-10.49.52l2.49,5.24c2.59-.21,5.26-.31,8-.31s5.41.1,8,.31l2.49-5.24c-3.38-.34-6.89-.52-10.49-.52Z"/></svg>`,
		"tom": `<svg viewBox="0 0 100 100"><path d="M99.442,51.837v25.228c0,12.671-22.138,22.935-49.442,22.935S.558,89.737.558,77.065v-25.228c0-5.308,3.896-10.189,10.42-14.074l3.44,4.058c-4.404,2.877-6.975,6.317-6.975,10.016,0,3.532,2.324,6.812,6.353,9.61,7.503,5.206,20.914,8.669,36.204,8.669s28.701-3.463,36.204-8.669c4.029-2.798,6.353-6.078,6.353-9.61,0-3.632-2.483-7.012-6.741-9.857l3.449-4.067c6.375,3.86,10.177,8.683,10.177,13.924ZM26.113,49.086c2.398,5.541,8.833,8.089,14.373,5.691,5.54-2.398,8.088-8.833,5.69-14.374-1.78-4.113-5.785-6.571-9.998-6.587L21.545,0l-8.025,3.473,14.634,33.816c-2.872,3.082-3.821,7.684-2.041,11.797ZM59.514,54.777c5.54,2.398,11.976-.15,14.373-5.691,1.78-4.113.83-8.716-2.041-11.797L86.48,3.473l-8.025-3.473-14.634,33.816c-4.212.016-8.218,2.474-9.998,6.587-2.398,5.541.15,11.976,5.69,14.374Z"/></svg>`,
		"hihat": `<svg viewBox="0 0 100 100"><path d="M55,42.531h45s-7.661-6.683-28.969-9.588c-1.393-2.716-6.072-10.151-16.031-12.104V0h-10v20.84c-9.959,1.953-14.638,9.388-16.031,12.104C7.661,35.848,0,42.531,0,42.531h45v10.938H0s7.661,6.683,28.969,9.588c1.393,2.716,6.072,10.151,16.031,12.104v24.84h10v-24.84c9.959-1.953,14.638-9.388,16.031-12.104,21.309-2.905,28.969-9.588,28.969-9.588h0s-45,0-45,0v-10.938Z"/></svg>`,
		"woodblock": `<svg viewBox="0 0 100 100"><path d="M59.602,85.788c1.252,4.712-1.552,9.546-6.263,10.799l-11.825,3.143c-4.712,1.252-9.546-1.552-10.799-6.263L9.656,14.24c-1.252-4.711,1.552-9.546,6.263-10.799L27.744.298c4.712-1.252,9.546,1.552,10.799,6.263l21.059,79.227ZM90.473,83.898l-12.678-47.696c4.888-3.126,8.028-8.745,7.586-15.074-.574-8.23-7.398-14.897-15.639-15.293-9.479-.456-17.308,7.095-17.308,16.474,0,8.839,6.959,16.034,15.694,16.454l12.68,47.705c.709,2.669,3.448,4.257,6.116,3.548h0c2.669-.709,4.257-3.448,3.548-6.116Z"/></svg>`,
		"?": `?`,
		"X": ``
	},
	"note": {
		"C": `C`,
		"C#": `C#`,
		"D": `D`,
		"Eb": `Eb`,
		"E": `E`,
		"F": `F`,
		"F#": `F#`,
		"G": `G`,
		"Ab": `Ab`,
		"A": `A`,
		"Bb": `Bb`,
		"B": `B`,
		"?": `?`
	},
	"octave": {
		"1": `1`,
		"2": `2`,
		"3": `3`,
		"4": `4`,
		"5": `5`,
		"?": `?`
	}
}

// 0th entry are the setall/default values
let activeSettings = [
	{
		"font": "Arial",
		"motion": "translate",
		"pulse": "circle",
		"sound": "voice",
		"note": "C",
		"octave": "3",
		"time": "250"
	}
];

// Assign a new value to a letter’s setting by setting name
function assignSetting(index, name, value) {
	activeSettings[index][name] = value;
	displaySetting(index, name);
}

// Set a letter’s time value
function assignTime(index) {
	const letter = document.querySelector(`[data-index="${index}"]`);
	const setting = letter.querySelector(`[data-input="time"]`);
	let value = parseInt(setting.value);

	if (value < 50) {
		value = 50;
	} else if (value > 1000 || isNaN(value)) {
		value = 1000;
	}
	activeSettings[index]['time'] = value;

	// Setall case
	if (index == 0) {
		for (let i=1; i<activeSettings.length; i++) {
			assignSetting(i, 'time', value);
		}
	}
}

// Display the correct icon for a letter’s setting by the setting’s name
function displaySetting(index, name) {
	const letter = document.querySelector(`.controls-sequencer-letter[data-index="${index}"]`);
	const setting = letter.querySelector(`[data-input="${name}"]`);
	const value = activeSettings[index][name];

	if (name == "time") {
		setting.value = value;
	} else {
		setting.innerHTML = settings[name][value];
	}
}

// Display the correct icon for all of a letter’s settings
function displayAllSettings(index) {
	for (let name of Object.keys(settings)) {
		displaySetting(index, name);
	}
	displaySetting(index, 'time');
}

// Fix setall display values
displayAllSettings(0);

// Assign a random value to a letter’s setting by the setting’s name
function randomizeSetting(index, name) {
	if (name == "time") {
		activeSettings[index]['time'] = Math.round(Math.random()*990+10);
	} else {
		const options = Object.keys(settings[name]);
		activeSettings[index][name] = options[Math.floor(Math.random()*options.length)];
	}

	displaySetting(index, name);
}

// Assign random values to all of a letter’s settings
function randomizeAllSettings(index) {
	for (let name of Object.keys(settings)) {
		randomizeSetting(index, name);
	}
	randomizeSetting(index, 'time');
}

// Randomize all settings across all letters
function goRando() {
	for (let i=0; i<activeSettings.length; i++) {
		randomizeAllSettings(i);
	}
}

// Toggle a letter’s setting to iterate its value
function toggleSetting(index, name) {
	const options = Object.keys(settings[name]);
	const currentValue = activeSettings[index][name];

	let value = options.indexOf(currentValue);
	value++;
	if (value == options.length) {
		value = 0;
	}

	let newValue = options[value];
	activeSettings[index][name] = newValue;
	displaySetting(index, name);

	// Setall case
	if (index == 0) {
		for (let i=1; i<activeSettings.length; i++) {
			assignSetting(i, name, newValue);
		}
	}
}

// Highlight/unhighlight setting for setall toggles
function highlightSetting(settingName) {
	const toggles = document.querySelectorAll(`[data-input="${settingName}"]`);
	for (let toggle of toggles) {
		toggle.dataset.highlight = 1;
	}
}
function unhighlightSetting(settingName) {
	const toggles = document.querySelectorAll(`[data-input="${settingName}"]`);
	for (let toggle of toggles) {
		toggle.dataset.highlight = 0;
	}
}

// Transport direction
let transportMode = "forward";
function changeDirection(direction) {
	transportMode = direction;
	for (let transportToggle of document.querySelectorAll('[data-transport]')) {
		if (transportToggle.dataset.transport == direction) {
			transportToggle.dataset.active = 1;
		} else {
			transportToggle.dataset.active = 0;
		}
	}
}

// Pause/resume loop
let paused = false;
function togglePlayback() {
	const playbackToggle = document.querySelector('#toggle-playback');
	if (paused) {
		playbackToggle.dataset.state = 0;
		mainLoop();
		paused = false;
	} else {
		playbackToggle.dataset.state = 1;
		clearTimeout(loop);
		paused = true;
	}
}

// Font properties
let fontsize = 10;
let tracking = 0;
let leading = 1;
function changeFontSize(change) {
	const fontsizeDown = document.querySelector("#toggle-fontsize-down");
	const fontsizeUp = document.querySelector("#toggle-fontsize-up");
	fontsizeDown.dataset.state = 1;
	fontsizeUp.dataset.state = 1;

	fontsize += change;
	if (fontsize < 5) {
		fontsize = 5;
		fontsizeDown.dataset.state = 0;
	} else if (fontsize > 20) {
		fontsize = 20;
		fontsizeUp.dataset.state = 0;
	}
	document.documentElement.style.setProperty('--fontsize', fontsize + "vw");
}
function changeTracking(change) {
	const trackingDown = document.querySelector("#toggle-tracking-down");
	const trackingUp = document.querySelector("#toggle-tracking-up");
	trackingDown.dataset.state = 1;
	trackingUp.dataset.state = 1;

	tracking += change;
	if (tracking < -.2) {
		tracking = -.2;
		trackingDown.dataset.state = 0;
	} else if (tracking > .2) {
		tracking = .2;
		trackingUp.dataset.state = 0;
	}
	document.documentElement.style.setProperty('--tracking', tracking + "em");
}
function changeLeading(change) {
	const leadingDown = document.querySelector("#toggle-leading-down");
	const leadingUp = document.querySelector("#toggle-leading-up");
	leadingDown.dataset.state = 1;
	leadingUp.dataset.state = 1;

	leading += change;
	if (leading < .6) {
		leading = .6;
		leadingDown.dataset.state = 0;
	} else if (leading > 1.4) {
		leading = 1.4;
		leadingUp.dataset.state = 0;
	}
	document.documentElement.style.setProperty('--leading', leading + "em");
}

// TODO: volume

// Toggle animations
let animations = true;
function toggleAnimations() {
	const animationsToggle = document.querySelector('#toggle-animations');
	if (animations) {
		animationsToggle.dataset.state = 0;
		animations = false;
	} else {
		animationsToggle.dataset.state = 1;
		animations = true;
	}
}

// Hide/show controls panel
function showControls() {
	const container = document.querySelector('.container');
	container.dataset.controls = 1;
}
function hideControls() {
	const container = document.querySelector('.container');
	container.dataset.controls = 0;
}

// ——————————————————————————————————————————
// LOOP
// ——————————————————————————————————————————

// Initialize everything
let loop, effectAnimation;
let activeLetter = 1;
let inputWord = "";
let inputWordLength = 0;
function initalize() {
	// Restart loop
	clearTimeout(loop);
	clearTimeout(effectAnimation);
	activeLetter = 1;

	// Delete generated content
	const content = document.querySelector('.content');
	const controlsLetters = document.querySelector('.controls-sequencer-letters');
	content.innerHTML = "";
	controlsLetters.innerHTML = "";

	// Reset settings
	activeSettings = [activeSettings[0]];

	// Set new word
	const inputText = document.querySelector('#input-text');
	inputWord = inputText.value;

	// Check if word just contains spaces
	const container = document.querySelector('.container');
	inputWordLength = inputWord.replace(/\s/g, '').length
	if (inputWordLength > 0) {
		container.dataset.intro = 0;
		generateLetters();

		// Restart 
		if (!paused) {
			mainLoop();
		}
	} else {
		container.dataset.intro = 1;
	}
}

// Generate letters for stage and sequencer
let uppercaseWider = ['M', 'W'];
let uppercaseMedium = ['A','B','C','D','E','F',"G",'H','J',"K","L",'O','P','Q','R','S','T','U','V','X','Y','Z'];
let uppercaseNarrower = ['I'];
let lowercaseWider = ['m','w']
let lowercaseNarrower = ['f','i','j','l','t','r'];
function generateLetters() {
	const content = document.querySelector('.content');
	const sequencerLetters = document.querySelector('.controls-sequencer-letters');
	let index = 1;
	for (let letter of inputWord) {
		let stageLetter = document.createElement('div');
		stageLetter.classList.add('letter');
		if (letter != " ") {

			if (uppercaseWider.includes(letter)) {
				stageLetter.style.width = '.9em';
			} else if (uppercaseMedium.includes(letter)) {
				stageLetter.style.width = '.7em';
			} else if (uppercaseNarrower.includes(letter)) {
				stageLetter.style.width = '.4em';
			} else if (lowercaseWider.includes(letter)) {
				stageLetter.style.width = '.8em';
			} else if (lowercaseNarrower.includes(letter)) {
				stageLetter.style.width = '.3em';
			} else {
				stageLetter.style.width = '.5em';
			}

			stageLetter.innerHTML = letter + "<div class='letter-effect'></div>";
			stageLetter.dataset.index = index;

			// Set initial settings
			activeSettings.push(structuredClone(activeSettings[0]));

			// Generate letter in sequencer controls
			let sequencerLetter = document.createElement('div');
			sequencerLetter.classList.add('controls-sequencer-letter');
			sequencerLetter.dataset.index = index;
			sequencerLetter.innerHTML += `
				<div class="controls-sequencer-letter-label">${letter}</div>
				<div class="controls-sequencer-letter-spacer"></div>
				<div class="controls-sequencer-letter-toggle" data-input="rando" onclick="randomizeAllSettings(${index})">
					<svg viewBox="0 0 100 100"><path d="M75,70h-10c-8.258,0-13.227-7.839-19.401-20,6.174-12.162,11.143-20,19.401-20h10v15l25-20-25-20v15h-10c-12.18,0-19.345,9.002-25,19.146-5.655-10.144-12.82-19.146-25-19.146H0v10h15c8.258,0,13.228,7.838,19.401,20-6.174,12.161-11.143,20-19.401,20H0v10h15c12.18,0,19.345-9.002,25-19.146,5.655,10.144,12.82,19.146,25,19.146h10v15l25-20-25-20v15Z"/></svg>
				</div>
				<div class="controls-sequencer-letter-divider"></div>
				<div class="controls-sequencer-letter-toggle" data-input="font" onclick="toggleSetting(${index}, 'font')"></div>
				<div class="controls-sequencer-letter-divider"></div>
				<div class="controls-sequencer-letter-toggle" data-input="motion" onclick="toggleSetting(${index}, 'motion')"></div>
				<div class="controls-sequencer-letter-toggle" data-input="pulse" onclick="toggleSetting(${index}, 'pulse')"></div>
				<div class="controls-sequencer-letter-divider"></div>
				<div class="controls-sequencer-letter-toggle" data-input="sound" onclick="toggleSetting(${index}, 'sound')"></div>
				<div class="controls-sequencer-letter-divider"></div>
				<div class="controls-sequencer-letter-toggle" data-input="note" onclick="toggleSetting(${index}, 'note')"></div>
				<div class="controls-sequencer-letter-toggle" data-input="octave" onclick="toggleSetting(${index}, 'octave')"></div>
				<div class="controls-sequencer-letter-divider"></div>
				<input type="number" min="50" max="1000" data-input="time" class="controls-sequencer-letter-time" oninput="assignTime(${index})"/>
				<div class="controls-sequencer-letter-trigger" onclick="triggerLetter(${index})"></div>
			`;
			sequencerLetters.appendChild(sequencerLetter);
			displayAllSettings(index);
			index++;
		} else {
			stageLetter.innerHTML = "&nbsp;";
		}
		content.appendChild(stageLetter);
	}
}

// Main loop controller
function mainLoop() {
	triggerLetter(activeLetter);
	loop = setTimeout(selectNextLetter, activeSettings[activeLetter]['time']);
}

// Trigger letter by index
function triggerLetter(index) {
	// Highlight letter in controls panel
	for (let sequencerLetter of document.querySelectorAll('.controls-sequencer-letter')) {
		sequencerLetter.dataset.flash = 0;
	}
	const sequencerLetter = document.querySelector(`.controls-sequencer-letter[data-index="${index}"]`);
	sequencerLetter.dataset.flash = 1;

	// Animate active letter on the stage
	const letter = document.querySelector(`.letter[data-index="${index}"]`);
	const effect = letter.querySelector('.letter-effect');

	// Pick note+octave to play
	let note = activeSettings[index]['note'];
	let noteOptions = Object.keys(settings['note']);
	if (note == "?") {
		note = noteOptions[Math.floor(Math.random()*(noteOptions.length-1))];
	}
	let octave = activeSettings[index]['octave'];
	let octaveOptions = Object.keys(settings['octave']);
	if (octave == "?") {
		octave = octaveOptions[Math.floor(Math.random()*(octaveOptions.length-1))];
	}

	// Sound/instrument
	let sound = activeSettings[index]['sound'];
	let soundOptions = Object.keys(settings['sound']);
	if (sound == "?") {
		sound = soundOptions[Math.floor(Math.random()*(soundOptions.length-2))];
	}
	if (sound == "voice") {
		let voiceLetter = inputWord.replace(/\s/g, '')[index-1];
		playVoice(voiceLetter, note+octave);
	} else if (sound == "piano") {
		playPiano(note+octave, activeSettings[index]['time']);
	} else if (sound == "synth") {
		playSynth(note+octave, activeSettings[index]['time']);
	} else if (sound == "horn") {
		playHorn(note+octave, activeSettings[index]['time']);
	} else if (sound == "guitar") {
		playGuitar(note+octave, activeSettings[index]['time']);
	} else if (sound == "kick") {
		playKick(note+octave);
	} else if (sound == "snare") {
		playSnare(note+octave);
	} else if (sound == "tom") {
		playTom(note+octave);
	} else if (sound == "hihat") {
		playHihat(note+octave);
	} else if (sound == "woodblock") {
		playBlock(note+octave);
	}

	// Set transition speed (if animations active)
	if (animations) {
		letter.style.transition = `all ${activeSettings[index]["time"]}ms cubic-bezier(0.25, 1, 0.5, 1), font-family 0s, font-weight 0s`;
		effect.style.transition = `all ${activeSettings[index]["time"]}ms cubic-bezier(0.25, 1, 0.5, 1), font-family 0s, font-weight 0s`;
	} else {
		letter.style.transition = 'unset';
		effect.style.transition = 'unset';
	}

	// Font
	let font = activeSettings[index]['font'];
	let fontOptions = Object.keys(settings['font']);
	if (font == "?") {
		font = fontOptions[Math.floor(Math.random()*(fontOptions.length-2))];
	}
	if (font == "Arial") {
		letter.style.fontFamily = `"Arial"`;
	} else if (font == "Times New Roman") {
		letter.style.fontFamily = `"Times New Roman"`;
	} else if (font == "Comic Sans MS") {
		letter.style.fontFamily = `"Comic Sans MS"`;
	} else if (font == "Papyrus") {
		letter.style.fontFamily = `"Papyrus"`;
	} else if (font == "Courier") {
		letter.style.fontFamily = `"Courier"`;
	} else if (font == "Impact") {
		letter.style.fontFamily = `"Impact"`;
	} else if (font == "Didot") {
		letter.style.fontFamily = `"Didot"`;
	} else if (font == "Futura") {
		letter.style.fontFamily = `"Futura"`;
	} else if (font == "Copperplate") {
		letter.style.fontFamily = `"Copperplate"`;
	} else if (font == "Chalkduster") {
		letter.style.fontFamily = `"Chalkduster"`;
	} else if (font == "Baskerville") {
		letter.style.fontFamily = `"Baskerville"`;
	} else if (font == "Party LET") {
		letter.style.fontFamily = `"Party LET"`;
	} else if (font == "Silom") {
		letter.style.fontFamily = `"Silom"`;
	}

	// Motion mode
	let motion = activeSettings[index]['motion'];;
	let motionOptions = Object.keys(settings['motion']);
	if (motion == "?") {
		motion = motionOptions[Math.floor(Math.random()*(motionOptions.length-2))];
	}
	if (motion == "party") {
		letter.style.transform = `scale(${Math.random()*1+.5}) translateY(${Math.random()*50-25}%) rotate(${Math.random()*40-20}deg)`;
	} else if (motion == "translate") {
		letter.style.transform = `translateY(${Math.random()*100-50}%)`;
	} else if (motion == "rotate") {
		letter.style.transform = `rotate(${Math.random()*90-45}deg)`;
	} else if (motion == "scalex") {
		letter.style.transform = `scaleX(${Math.random()*1.5+.1})`;
	} else if (motion == "scaley") {
		letter.style.transform = `scaleY(${Math.random()*3+.1})`;
	} else if (motion == "scale") {
		letter.style.transform = `scale(${Math.random()*3+.1})`;
	} else {
		letter.style.transform = `unset`;
	}

	// Pulse mode
	let pulse = activeSettings[index]['pulse'];;
	let pulseOptions = Object.keys(settings['pulse']);
	if (pulse == "?") {
		pulse = pulseOptions[Math.floor(Math.random()*(pulseOptions.length-2))];
	}
	if (pulse == "circle") {
		effect.innerHTML = `<svg viewBox="0 0 100 100"><path d="M50,0C22.386,0,0,22.386,0,50s22.386,50,50,50,50-22.386,50-50S77.614,0,50,0h0Z"/></svg>`;
	} else if (pulse == "square") {
		effect.innerHTML = `<svg viewBox="0 0 100 100"><path d="M93.375,6.625H6.625v86.75h86.75V6.625h0Z"/></svg>`;
	} else if (pulse == "diamond") {
		effect.innerHTML = `<svg viewBox="0 0 100 100"><path d="M50,0L0,50l50,50,50-50L50,0h0Z"/></svg>`;
	} else if (pulse == "cross") {
		effect.innerHTML = settings['pulse'][pulse];
	} else if (pulse == "burst") {
		effect.innerHTML = settings['pulse'][pulse];
	} else {
		effect.innerHTML = '<svg></svg>';
	}

	const effectIcon = effect.querySelector('svg');
	effectIcon.style.width = "1em";
	effectIcon.style.height = "1em";
	effectIcon.style.fill = `hsl(${Math.floor(Math.random()*360)}deg, 100%, 50%)`;
	effectIcon.style.fill = titleColors[Math.floor(Math.random()*titleColors.length)];
	effectIcon.style.transition = "0s";
	effectAnimation = setTimeout(() => {
		effectIcon.style.transition = `all ${activeSettings[index]['time']}ms cubic-bezier(0.25, 1, 0.5, 1), font-family 0s, font-weight 0s`;
		effectIcon.style.width = "0";
		effectIcon.style.height = "0";
	}, 100)

	// Change body background
	const body = document.querySelector('body');
	body.style.backgroundColor = titleColors[Math.floor(Math.random()*titleColors.length)];
}

// Move to next letter
function selectNextLetter() {
	if (transportMode == "random") {
		activeLetter = Math.floor(Math.random()*inputWordLength+1);
	} else if (transportMode == "forward") {
		activeLetter++;
		if (activeLetter > inputWordLength) {
			activeLetter = 1;
		}
	} else if (transportMode == "backward") {
		activeLetter--;
		if (activeLetter == 0) {
			activeLetter = inputWordLength;
		}
	}
	mainLoop();
}

// Title animation
const title = document.querySelector('.title');
let titleTemp = "";
for (let letter of title.innerText) {
	titleTemp += `<span>${letter}</span>`;
}
title.innerHTML = titleTemp;
let titleColors = ['var(--blue)', 'var(--red)', "var(--yellow)", "var(--green)", "var(--purple)"];
let titleColorIndex = 0;
let titleLetterIndex = 0;
setInterval(() => {
	let titleLetter = title.querySelectorAll('span')[titleLetterIndex];
	titleLetterIndex++;
	if (titleLetterIndex == title.querySelectorAll('span').length) {
		titleLetterIndex = 0;
	}
	titleLetter.style.transform = `translateY(${Math.round(Math.random()*50-25)}%) rotate(${Math.floor(Math.random()*30-15)}deg) scale(${Math.random()*1.1+.5})`;
	titleLetter.style.color = titleColors[titleColorIndex];
	const fontOptions = Object.keys(settings['font'])
	titleLetter.style.fontFamily = fontOptions[Math.floor(Math.random()*fontOptions.length)];
	titleColorIndex++;
	if (titleColorIndex == titleColors.length) {
		titleColorIndex = 0;
	}
}, 200)