
## Sequencing "Frère Jacques" using 1 oscilator 

I was interacting with [this gorgeous music tutorial](https://observablehq.com/@freedmand/sounds) by Dylan Freedman and stumbled upon this bit:

> A note in western music can be described as the number of semitones away from a reference pitch.
> Using 440 Hz as the reference, a note can be described as a function of the number of semitones  away from A 440 Hz

Wanting to learn the [AudioContext API](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext), I've used this piece on information to write the most annoying sequencer that can play "Frère Jacques" or any other tune by converting a note like A, B, C, etc to it's corresponding frequency in the [equal temperament](https://en.wikipedia.org/wiki/Equal_temperament) system.

    // In WESTERN music, there are 12 notes, or semitones, per octave
    const SEMITONES_OCTAVE = 12;
    
    // using 440 Hz as the reference (note A)
    let BASE_FREQUENCY = 440;
    
    // a note can be described as a function of the number of semitones away from A 440 Hz:
    // f(s) = 440 * 2^s/12
    const eqTemperament = s => Math.floor(BASE_FREQUENCY * (Math.pow(2, s / SEMITONES_OCTAVE)));

Here is **a demo** of the code to hear the results: [https://playcode.io/619668/](https://playcode.io/619668/)
