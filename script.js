// —————————————————————————————
// SAMPLERS
// —————————————————————————————
let settingsVolume = -10;

// Piano sampler
const pianoSampler = new Tone.Sampler({
	urls: {
		C1: "c1.mp3",
		C2: "c2.mp3",
		C3: "c3.mp3",
		C4: "c4.mp3",
		C5: "c5.mp3",
		C6: "c6.mp3"
	},
	envelope: {
		attack: 0.05,
		decay: 0.2,
		sustain: .5,
		release: .5
	},
	baseUrl: "assets/audio/piano/",
	volume: settingsVolume,
}).toDestination();
function playPiano(sample) {
	pianoSampler.triggerAttackRelease(sample, .5, "+0", `+${Math.random()*.5+.5}`);
}

// Percussion sampler
const percussionSampler = new Tone.Sampler({
	urls: {
		C0: "agogo-low.mp3",
		D0: "agogo-high.mp3",
		E0: "block.mp3",
		F0: "bongo-low.mp3",
		G0: "bongo-high.mp3",
		A0: "cabasa-low.mp3",
		B0: "cabasa-high.mp3",
		C1: "castanet.mp3",
		D1: "chimes.mp3",
		E1: "clap.mp3",
		F1: "conga-low.mp3",
		G1: "conga-high.mp3",
		A1: "cowbell.mp3",
		B1: "crash-low.mp3",
		C2: "crash-mid.mp3",
		D2: "crash-high.mp3",
		E2: "cuica-low.mp3",
		F2: "cuica-high.mp3",
		G2: "drum-low.mp3",
		A2: "drum-high.mp3",
		B2: "gong.mp3",
		C3: "guiro.mp3",
		D3: "guiro-hit.mp3",
		E3: "hat-closed.mp3",
		F3: "hat-open.mp3",
		G3: "jingle.mp3",
		A3: "kick-low.mp3",
		B3: "kick-high.mp3",
		C4: "kick-808.mp3",
		D4: "ride-low.mp3",
		E4: "ride-mid.mp3",
		F4: "ride-high.mp3",
		G4: "rim-low.mp3",
		A4: "rim-high.mp3",
		B4: "rim-ring.mp3",
		C5: "shaker.mp3",
		D5: "snare.mp3",
		E5: "snare-deep.mp3",
		F5: "snare-loose.mp3",
		G5: "snare-808.mp3",
		A5: "spin-down.mp3",
		B5: "spin-up.mp3",
		C6: "sticks.mp3",
		D6: "tambourine.mp3",
		E6: "tom0.mp3",
		F6: "tom1.mp3",
		G6: "tom2.mp3",
		A6: "tom3.mp3",
		B6: "tom4.mp3",
		C7: "tom5.mp3",
		D7: "triangle-muted.mp3",
		E7: "triangle-open.mp3",
		F7: "vibraslap.mp3",
		G7: "whistle-low.mp3",
		A7: "whistle-high.mp3",
		B7: "woodblock-low.mp3",
		C8: "woodblock-high.mp3",
		D8: "woodblock-higher.mp3"
	},
	baseUrl: "assets/audio/percussion/",
	volume: settingsVolume,
}).toDestination();
let percussionNotes = ["C0","D0","E0","F0","G0","A0","B0","C1","D1","E1","F1","G1","A1","B1","C2","D2","E2","F2","G2","A2","B2","C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5","B5","C6","D6","E6","F6","G6","A6","B6","C7","D7","E7","F7","G7","A7","B7","C8","D8"]
function playPercussion(sample) {
	if (sample == "random") {
		percussionSampler.triggerAttackRelease(percussionNotes[Math.floor(Math.random()*percussionNotes.length)], 1);
	} else {
		percussionSampler.triggerAttackRelease(sample, 1);
	}
}

// Pitched tom sampler
const tomSampler = new Tone.Sampler({
	urls: {
		C3: "tom2.mp3",
	},
	baseUrl: "assets/audio/percussion/",
	volume: settingsVolume,
}).toDestination();
function playTom(freq) {
	if (freq == "random") {
		tomSampler.triggerAttackRelease(Math.random()*100+100, 1);
	} else {
		tomSampler.triggerAttackRelease(freq, 1);
	}
}

// Pitched woodblock sampler
const blockSampler = new Tone.Sampler({
	urls: {
		C4: "woodblock-higher.mp3",
	},
	baseUrl: "assets/audio/percussion/",
	volume: settingsVolume,
}).toDestination();
function playBlock(freq) {
	blockSampler.triggerAttackRelease(freq, 1);
}

// Voice sampler ("Animalese")
let voiceSamplerLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
let voiceSamplers = {}
for (let letter of voiceSamplerLetters) {
	voiceSamplers[letter] = new Tone.Sampler({
		urls: {
			C3: `${letter}.mp3`
		},
		baseUrl: "assets/audio/voice/",
		volume: settingsVolume,
	}).toDestination();
}
function playVoice(phrase, pitch, speed) {
	phrase = phrase.toLowerCase();
	if (phrase != "") {
		let letter = phrase[0];
		if (letter != " ") {
			voiceSamplers[letter].triggerAttackRelease(pitch, 1);
		}
		let newPhrase = phrase.slice(1);
		setTimeout(() => {
			playVoice(newPhrase, pitch, speed);
		}, speed)
	}
}

const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const octaves = [1,2,3,4,5];

// —————————————————————————————
// MAIN CODE
// —————————————————————————————
const body = document.querySelector('body');
const container = document.querySelector('.container');
const content = document.querySelector('.content');
const controls = document.querySelector('.controls');
const controlsSetall = controls.querySelector('.controls-setall');
const controlsLetters = controls.querySelector('.controls-letters');

// Track settings
let settingsDefaults = [0,0,0,0,0,0,0];
let settingsLetters = [];
let settingsNames = ["font","motion","pulse","sound","note","octave","time"];
let settingsValues = [
	['Apfel Brukt',"Apfel 500","Apfel 600","Apfel 700","Apfel 800","?"],
	["party","width","rotate","position","scale","?"],
	["party","?"],
	["voice","piano","tom","block","percussion","?"],
	["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B","?"],
	[1,2,3,4,5,"?"]
];

// Set random defaults
function randomizeDefaults() {
	for (let i=0; i<settingsDefaults.length; i++) {
		const settingName = settingsNames[i];

		// Set random value
		if (settingName == "time") {
			settingsDefaults[i] = Math.round(Math.random()*990+10);
			const controlsSetallTime = controlsSetall.querySelector(`[data-input="time"]`);
			controlsSetallTime.value = settingsDefaults[i];
			controlsSetallTime.addEventListener("input", defaultsTime);
			controlsSetallTime.addEventListener("mouseenter", () => {highlightSetting("time")});
			controlsSetallTime.addEventListener("mouseleave", () => {unhighlightSetting("time")});
			continue
		}
		const settingValue = Math.floor(Math.random()*settingsValues[i].length);
		settingsDefaults[i] = settingValue;

		// Display correct value in toggle
		const controlsSetallToggle = controlsSetall.querySelector(`[data-input="${settingName}"]`);
		if (settingName == "note") {
			controlsSetallToggle.innerText = settingsValues[i][settingValue];
		} else {
			if (settingsValues[i][settingsDefaults[i]] == "?") {
				controlsSetallToggle.innerText = "?";
			} else {
				controlsSetallToggle.innerText = settingValue+1;
			}
		}
		controlsSetallToggle.addEventListener("click", () => {defaultsToggle(settingName)});
		controlsSetallToggle.addEventListener("mouseenter", () => {highlightSetting(settingName)});
		controlsSetallToggle.addEventListener("mouseleave", () => {unhighlightSetting(settingName)});
	}
}
randomizeDefaults();

// Highlight/unhighlight setting for setall toggles
function highlightSetting(settingName) {
	let toggles = document.querySelectorAll(`[data-input="${settingName}"]`);
	for (let toggle of toggles) {
		toggle.dataset.highlight = 1;
	}
}
function unhighlightSetting(settingName) {
	let toggles = document.querySelectorAll(`[data-input="${settingName}"]`);
	for (let toggle of toggles) {
		toggle.dataset.highlight = 0;
	}
}

function defaultsToggle(settingName) {
	const settingIndex = settingsNames.indexOf(settingName);

	// Iterate value
	let settingValue = settingsDefaults[settingIndex];
	settingValue++;
	if (settingValue == settingsValues[settingIndex].length) {
		settingValue = 0;
	}
	settingsDefaults[settingIndex] = settingValue;
	settingsDefaults = settingsDefaults;

	// Display correct value in toggle
	const toggle = controlsSetall.querySelector(`[data-input="${settingName}"]`);
	if (settingName == "note") {
		toggle.innerText = settingsValues[settingIndex][settingValue];
	} else {
		if (settingsValues[settingIndex][settingsDefaults[settingIndex]] == "?") {
			toggle.innerText = "?";
		} else {
			toggle.innerText = settingValue+1;
		}
	}

	// Apply to all letters
	for (let i=0; i<settingsLetters.length; i++) {
		setToDefaults(i, settingName);
	}
}

function defaultsTime() {
	let elmntInput = controlsSetall.querySelector('.controls-letter-number');
	if (parseInt(elmntInput.value) < 10) {
		settingsDefaults[6] = 10;
	} else if (parseInt(elmntInput.value) > 1000) {
		settingsDefaults[6] = 1000;
	} else {
		settingsDefaults[6] = elmntInput.value;
	}

	// Apply to all other letters
	for (let i=0; i<settingsLetters.length; i++) {
		settingsLetters[i][6] = settingsDefaults[6];
		const letterElmnt = controlsLetters.querySelectorAll(".controls-letter")[i];
		const letterElmntTime = letterElmnt.querySelector('.controls-letter-number');
		letterElmntTime.value = settingsDefaults[6];
	}
}

// Controls buttons toggles
function controlsToggle(letterIndex, settingName) {
	const settingIndex = settingsNames.indexOf(settingName);

	// Target correct setting
	let elmnt = controlsLetters.querySelectorAll(".controls-letter")[letterIndex];

	// Iterate value
	let settingValue = settingsLetters[letterIndex][settingIndex];
	settingValue++;
	if (settingValue == settingsValues[settingIndex].length) {
		settingValue = 0;
	}
	settingsLetters[letterIndex][settingIndex] = settingValue;

	// Display correct value in toggle
	const toggle = elmnt.querySelector(`[data-input="${settingName}"]`);
	if (settingName == "note") {
		toggle.innerText = settingsValues[settingIndex][settingValue];
	} else {
		if (settingsValues[settingIndex][settingsLetters[letterIndex][settingIndex]] == "?") {
			toggle.innerText = "?";
		} else {
			toggle.innerText = settingValue+1;
		}
	}
}

// Randomize settings
function controlsRando(letterIndex) {
	settingsLetters[letterIndex] = [
		Math.floor(Math.random()*settingsValues[0].length),
		Math.floor(Math.random()*settingsValues[1].length),
		Math.floor(Math.random()*settingsValues[2].length),
		Math.floor(Math.random()*settingsValues[3].length),
		Math.floor(Math.random()*settingsValues[4].length),
		Math.floor(Math.random()*settingsValues[5].length),
		Math.round(Math.random()*990+10),
	];
	controlsFixValues(letterIndex);
}

// Randomize ALL settings
function goRando() {
	settingsDefaults = [
		Math.floor(Math.random()*settingsValues[0].length),
		Math.floor(Math.random()*settingsValues[1].length),
		Math.floor(Math.random()*settingsValues[2].length),
		Math.floor(Math.random()*settingsValues[3].length),
		Math.floor(Math.random()*settingsValues[4].length),
		Math.floor(Math.random()*settingsValues[5].length),
		Math.round(Math.random()*990+10),
	];

	// Fix values
	const elmnt = document.querySelector(".controls-setall");
	for (let i=0; i<settingsDefaults.length; i++) {
		const settingName = settingsNames[i];

		// Display correct value in toggle
		const toggle = elmnt.querySelector(`[data-input="${settingName}"]`);
		if (settingName == "note") {
			toggle.innerText = settingsValues[i][settingsDefaults[i]];
		} else if (settingName == "time") {
			toggle.value = settingsDefaults[i];
		} else {
			if (settingsValues[i][settingsDefaults[i]] == "?") {
				toggle.innerText = "?";
			} else {
				toggle.innerText = settingsDefaults[i]+1;
			}
		}
		
		// Apply to all letters
		for (let i=0; i<settingsLetters.length; i++) {
			setToDefaults(i, settingName);
		}
	}
}

// Handle time entry
function controlsTime(letterIndex) {
	let elmnt = controlsLetters.querySelectorAll(".controls-letter")[letterIndex];
	let elmntInput = elmnt.querySelector('.controls-letter-number');
	if (parseInt(elmntInput.value) < 10) {
		settingsLetters[letterIndex][6] = 10;
	} else if (parseInt(elmntInput.value) > 1000) {
		settingsLetters[letterIndex][6] = 1000;
	} else {
		settingsLetters[letterIndex][6] = elmntInput.value;
	}
}

// Display correct values
function controlsFixValues(letterIndex) {
	const elmnt = controlsLetters.querySelectorAll(".controls-letter")[letterIndex];
	for (let i=0; i<settingsLetters[letterIndex].length; i++) {
		const settingName = settingsNames[i];

		// Display correct value in toggle
		const toggle = elmnt.querySelector(`[data-input="${settingName}"]`);
		if (settingName == "note") {
			toggle.innerText = settingsValues[i][settingsLetters[letterIndex][i]];
		} else if (settingName == "time") {
			toggle.value = settingsLetters[letterIndex][i];
		} else {
			if (settingsValues[i][settingsLetters[letterIndex][i]] == "?") {
				toggle.innerText = "?";
			} else {
				toggle.innerText = settingsLetters[letterIndex][i]+1;
			}
		}
	}
}

// Return to defaults
function setToDefaults(letterIndex, settingName) {
	// Target correct setting
	const elmnt = controlsLetters.querySelectorAll(".controls-letter")[letterIndex];

	// Set to default value
	if (settingName == undefined) {
		for (let i=0; i<settingsDefaults.length; i++) {
			const settingName = settingsNames[i];
			settingsLetters[letterIndex][i] = settingsDefaults[i];
	
			// Display correct value in toggle
			const toggle = elmnt.querySelector(`[data-input="${settingName}"]`);
			if (settingName == "note") {
				toggle.innerText = settingsValues[i][settingsDefaults[i]];
			} else if (settingName == "time") {
				toggle.value = settingsDefaults[i];
			} else {
				if (settingsValues[i][settingsDefaults[i]] == "?") {
					toggle.innerText = "?";
				} else {
					toggle.innerText = settingsDefaults[i]+1;
				}
			}
		}
	} else {
		let settingIndex = settingsNames.indexOf(settingName);
		settingsLetters[letterIndex][settingIndex] = settingsDefaults[settingIndex];

		// Display correct value in toggle
		const toggle = elmnt.querySelector(`[data-input="${settingName}"]`);
		if (settingName == "note") {
			toggle.innerText = settingsValues[settingIndex][settingsDefaults[settingIndex]];
		} else if (settingName == "time") {
			toggle.value = settingsDefaults[settingIndex];
		} else {
			if (settingsValues[settingIndex][settingsDefaults[settingIndex]] == "?") {
				toggle.innerText = "?";
			} else {
				toggle.innerText = settingsDefaults[settingIndex]+1;
			}
		}
	}
}

// Generate text
let word = "";
let loop;
function generateText() {
	let letterIndex = 0;
	for (let letter of word) {
		let letterElmnt = document.createElement('div');
		letterElmnt.classList.add('letter');
		letterElmnt.innerHTML = letter + "<div class='letter-effect'></div>";
		if (letter == " ") {
			letterElmnt.dataset.skip = 1;
		} else {
			letterElmnt.dataset.index = letterIndex;

			// Default settings
			settingsLetters.push(settingsDefaults.slice(0));

			// Random settings

			let controlsLetter = document.createElement('div');
			controlsLetter.classList.add('controls-letter');
			controlsLetter.innerHTML += `
				<div class="controls-letter-label">${letter}</div>
				<div class="controls-letter-spacer"></div>
				<div class="controls-letter-rando">
					<svg viewBox="0 0 100 100"><path d="M75,70h-10c-8.258,0-13.227-7.839-19.401-20,6.174-12.162,11.143-20,19.401-20h10v15l25-20-25-20v15h-10c-12.18,0-19.345,9.002-25,19.146-5.655-10.144-12.82-19.146-25-19.146H0v10h15c8.258,0,13.228,7.838,19.401,20-6.174,12.161-11.143,20-19.401,20H0v10h15c12.18,0,19.345-9.002,25-19.146,5.655,10.144,12.82,19.146,25,19.146h10v15l25-20-25-20v15Z"/></svg>
				</div>
				<div class="controls-letter-divider"></div>
				<div class="controls-letter-btn" data-input="font">${settingsLetters[letterIndex][0]+1}</div>
				<div class="controls-letter-divider"></div>
				<div class="controls-letter-btn" data-input="motion">${settingsLetters[letterIndex][1]+1}</div>
				<div class="controls-letter-btn" data-input="pulse">${settingsLetters[letterIndex][2]+1}</div>
				<div class="controls-letter-divider"></div>
				<div class="controls-letter-btn" data-input="sound">${settingsLetters[letterIndex][3]+1}</div>
				<div class="controls-letter-divider"></div>
				<div class="controls-letter-btn" data-input="note">${settingsLetters[letterIndex][4]+1}</div>
				<div class="controls-letter-btn" data-input="octave">${settingsLetters[letterIndex][5]+1}</div>
				<div class="controls-letter-divider"></div>
				<input type="number" min="10" max="1000" value="${settingsLetters[letterIndex][6]}" data-input="time" class="controls-letter-number"/>
				<div class="controls-letter-trigger"></div>
			`;
			controlsLetters.appendChild(controlsLetter);

			const trackedIndex = letterIndex;
			controlsFixValues(trackedIndex);
			controlsLetter.querySelector('.controls-letter-rando').addEventListener("click", () => {controlsRando(trackedIndex)});
			controlsLetter.querySelector('[data-input="font"]').addEventListener("click", () => {controlsToggle(trackedIndex, "font")});
			controlsLetter.querySelector('[data-input="motion"]').addEventListener("click", () => {controlsToggle(trackedIndex, "motion")});
			controlsLetter.querySelector('[data-input="pulse"]').addEventListener("click", () => {controlsToggle(trackedIndex, "pulse")});
			controlsLetter.querySelector('[data-input="sound"]').addEventListener("click", () => {controlsToggle(trackedIndex, "sound")});
			controlsLetter.querySelector('[data-input="note"]').addEventListener("click", () => {controlsToggle(trackedIndex, "note")});
			controlsLetter.querySelector('[data-input="octave"]').addEventListener("click", () => {controlsToggle(trackedIndex, "octave")});
			controlsLetter.querySelector('[data-input="time"]').addEventListener("input", () => {controlsTime(trackedIndex)});
			controlsLetter.querySelector('.controls-letter-trigger').addEventListener("click", () => {triggerLetter(trackedIndex)});
			letterElmnt.addEventListener("click", () => {triggerLetter(trackedIndex)});
			letterIndex++;
		}
		content.appendChild(letterElmnt);
	}
}

// Restart Loop
const controlsText = document.querySelector('.controls-text-input');
controlsText.addEventListener("input", () => {
	clearTimeout(loop);
	targetedLetter = 0;
	content.innerHTML = "";
	controlsLetters.innerHTML = "";
	settingsLetters = [];
	word = controlsText.value;
	if (word.replace(/\s/g, '').length > 0) {
		container.dataset.intro = 0;
		generateText();
		if (!paused) {
			mainLoop();
		}
	} else {
		container.dataset.intro = 1;
	}
})

// Main generative loop
let transportMode = "forward";
let targetedLetter = 0;
function mainLoop() {
	// Target letter
	const letterElmnt = content.querySelectorAll('.letter')[targetedLetter];

	// Skip if indicated
	if (parseInt(letterElmnt.dataset.skip) == 1) {
		selectNextLetter();
		return
	}

	const letterIndex = letterElmnt.dataset.index;
	triggerLetter(letterIndex);

	loop = setTimeout(selectNextLetter, settingsLetters[letterIndex][6]);
}

// Trigger letter by index
function triggerLetter(letterIndex) {
	const letterElmnt = content.querySelector(`.letter[data-index="${letterIndex}"`);
	const letterEffect = letterElmnt.querySelector('.letter-effect');

	// Highlight letter in controls panel
	const controlsLetter = controlsLetters.querySelectorAll('.controls-letter')[letterIndex];
	for (let elmnt of controlsLetters.querySelectorAll('.controls-letter')) {
		elmnt.dataset.flash = 0;
	}
	controlsLetter.dataset.flash = 1;

	// Pick note to play
	let note = settingsValues[4][settingsLetters[letterIndex][4]];
	if (note == "?") {
		note = notes[Math.floor(Math.random()*notes.length)];
	}
	let octave = settingsValues[5][settingsLetters[letterIndex][5]];
	if (octave == "?") {
		octave = octaves[Math.floor(Math.random()*octaves.length)];
	}

	// Sound/instrument
	let sound = settingsValues[3][settingsLetters[letterIndex][3]];
	if (sound == "?") {
		sound = settingsValues[3][Math.floor(Math.random()*(settingsValues[3].length-1))];
	}
	if (sound == "voice") {
		playVoice(word[targetedLetter], note+octave, 1000);
	} else if (sound == "piano") {
		playPiano(note+octave);
	} else if (sound == "tom") {
		playTom(note+octave);
	} else if (sound == "block") {
		playBlock(note+octave);
	} else if (sound == "percussion") {
		playPercussion(note+octave);
	}

	// Set transition speed
	if (animations) {
		letterElmnt.style.transition = `all ${settingsLetters[letterIndex][6]}ms cubic-bezier(0.25, 1, 0.5, 1), font-family 0s, font-weight 0s`;
		letterEffect.style.transition = `all ${settingsLetters[letterIndex][6]}ms cubic-bezier(0.25, 1, 0.5, 1), font-family 0s, font-weight 0s`;
	} else {
		letterElmnt.style.transition = 'unset';
		letterEffect.style.transition = 'unset';
	}

	// Font
	let font = settingsValues[0][settingsLetters[letterIndex][0]];
	if (font == "?") {
		font = settingsValues[0][Math.floor(Math.random()*(settingsValues[0].length-1))];
	}
	if (font == "Apfel Brukt") {
		letterElmnt.style.fontFamily = '"Apfel Brukt", "Comic Sans MS", "Comic Sans", cursive';
		letterElmnt.style.fontWeight = 500;
	} else if (font == "Apfel 500") {
		letterElmnt.style.fontFamily = '"Apfel", "Comic Sans MS", "Comic Sans", cursive';
		letterElmnt.style.fontWeight = 500;
	} else if (font == "Apfel 600") {
		letterElmnt.style.fontFamily = '"Apfel", "Comic Sans MS", "Comic Sans", cursive';
		letterElmnt.style.fontWeight = 600;
	} else if (font == "Apfel 700") {
		letterElmnt.style.fontFamily = '"Apfel", "Comic Sans MS", "Comic Sans", cursive';
		letterElmnt.style.fontWeight = 700;
	} else if (font == "Apfel 800") {
		letterElmnt.style.fontFamily = '"Apfel", "Comic Sans MS", "Comic Sans", cursive';
		letterElmnt.style.fontWeight = 800;
	} 

	// Motion mode
	let motion = settingsValues[1][settingsLetters[letterIndex][1]];
	if (motion == "?") {
		motion = settingsValues[1][Math.floor(Math.random()*(settingsValues[1].length-1))];
	}
	if (motion == "party") {
		letterElmnt.style.transform = `scale(${Math.random()*1+.5}) translateY(${Math.random()*50-25}%) rotate(${Math.random()*40-20}deg)`;
	} else if (motion == "width") {
		letterElmnt.style.transform = `scaleX(${Math.random()*1.5+.1})`;
	} else if (motion == "rotate") {
		letterElmnt.style.transform = `rotate(${Math.random()*90-45}deg)`;
	} else if (motion == "position") {
		letterElmnt.style.transform = `translateY(${Math.random()*100-50}%)`;
	} else if (motion == "scale") {
		letterElmnt.style.transform = `scaleY(${Math.random()*3+.1})`;
	}

	// Pulse mode
	let pulse = settingsValues[2][settingsLetters[letterIndex][2]];
	if (pulse == "?") {
		pulse = settingsValues[2][Math.floor(Math.random()*(settingsValues[2].length-1))];
	}
	if (pulse == "party") {
		letterEffect.style.width = "1em";
		letterEffect.style.height = "1em";
		letterEffect.style.backgroundColor = `hsl(${Math.floor(Math.random()*360)}deg, 100%, 50%)`;
		letterEffect.style.backgroundColor = titleColors[Math.floor(Math.random()*titleColors.length)];
		letterEffect.style.transition = "0s";
		setTimeout(() => {
			letterEffect.style.transition = `all ${settingsLetters[letterIndex][6]}ms cubic-bezier(0.25, 1, 0.5, 1), font-family 0s, font-weight 0s`;
			letterEffect.style.width = "0";
			letterEffect.style.height = "0";
		}, 100)
	} else {

	}

	body.style.backgroundColor = titleColors[Math.floor(Math.random()*titleColors.length)];
}

// Move to next letter
function selectNextLetter() {
	if (transportMode == "random") {
		targetedLetter = Math.floor(Math.random()*word.length);
	} else if (transportMode == "forward") {
		targetedLetter++;
		if (targetedLetter == word.length) {
			targetedLetter = 0;
		}
	} else if (transportMode == "backward") {
		targetedLetter--;
		if (targetedLetter == -1) {
			targetedLetter = word.length-1;
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
	titleColorIndex++;
	if (titleColorIndex == titleColors.length) {
		titleColorIndex = 0;
	}
}, 200)

// Transport direction
function changeDirection(direction) {
	transportMode = direction;
	for (let transportToggle of document.querySelectorAll('.controls-transport-toggle')) {
		if (transportToggle.dataset.transport == direction) {
			transportToggle.dataset.active = 1;
		} else {
			transportToggle.dataset.active = 0;
		}
	}
}

// Pause/resume
let paused = false;
function togglePlayback() {
	const playbackToggle = document.querySelector('.controls-playback-toggle');
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

// Increase/decrease letter spacing
let letterspacing = 0;
function changeSpacing(change) {
	letterspacing += change;
	if (letterspacing < -.1) {
		letterspacing = -.1;
	} else if (letterspacing > .2) {
		letterspacing = .2;
	}
	document.documentElement.style.setProperty('--letterspacing', letterspacing + "em");
}

// Toggle animations
let animations = true;
function toggleAnimations() {
	const animationsToggle = document.querySelector('.controls-settings-animations');
	if (animations) {
		animationsToggle.dataset.state = 0;
		animations = false;
	} else {
		animationsToggle.dataset.state = 1;
		animations = true;
	}
}

// Hide/show controls
function showControls() {
	container.dataset.controls = 1;
}
function hideControls() {
	container.dataset.controls = 0;
}

// TODO: fix voice generation if letter typed outside of allowed characters
	// need a new recording for this
// fix percussion instrument bank

// fade out spacing and volume at edge cases
// make volume actually work

// put in real content for sequencer!
// custom icons? at least fonts for font field