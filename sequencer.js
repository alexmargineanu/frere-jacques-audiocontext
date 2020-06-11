// In WESTERN music, there are 12 notes, or semitones, per octave
const SEMITONES_OCTAVE = 12;

// using 440 Hz as the reference (note A)
let BASE_FREQUENCY = 440;

// a note can be described as a function of the number of semitones away from A 440 Hz:
// f(s) = 440 * 2^s/12
const eqTemperament = s => Math.floor(BASE_FREQUENCY * (Math.pow(2, s / SEMITONES_OCTAVE)));

// map of notes and their coresponding semitones
// A is 0 semitones away from A, Bb is 1 semitones away from A, etc
const NOTES_TO_SEMITONES = { 'A':0, 'Bb':1, 'B':2, 'C':3, 'C#':4, 'D':5, 'Eb':6, 'E':7, 'F':8, 'F#':9, 'G':10, 'G#':11 };

// Setup the audio context and create an oscilator that will produce the sound
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Takes a string of notes and converts each note
// to a frequency that can be played by the oscilator
const sequencer = (sequence) => {
    const oscilator = audioContext.createOscillator();
    const oscilatorGain = audioContext.createGain();

    // Connect the oscilator though the gain to the speaker
    oscilatorGain.connect(audioContext.destination);
    oscilator.connect(oscilatorGain);
    const notes = sequence.split(' ');
    oscilator.start();

    if (notes.length && notes.length > 0){
      notes.map((note, i) => {
          setTimeout(() => {
            const semitone = NOTES_TO_SEMITONES[note];
            if (semitone) {
                oscilatorGain.gain.value = 0.3;
                oscilator.frequency.value = eqTemperament(semitone);
            } else {
                oscilatorGain.gain.value = 0;
            }
          }, i * x);
      });
      setTimeout(()=>oscilator.stop(), notes.length * x);
    }
}

// Use spaces to separate the notes A, Bb, B, etc
// double spaces to add "silence"
// you can run multiple sequencers in parralel

sequencer('C D E C  C D E C  E F G  E F G  G A G F E C  G A G F E C  C G C  C G C');
