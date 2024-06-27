import { determineNextState } from "../main";
import { State, Speaker } from "../dust.types";
import { createSpeakersList } from "./helpers";
import { Queue } from "queue-typescript";

let history:State[] = []

it('system selects first speaker', () => {
    let speakers = createSpeakersList();
    let input: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: null,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let expected1: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: speakers.s0,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let expected2: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect([expected1, expected2]).toContainEqual(actual);
});

it('system selects s3 as second speaker', () => {
    let speakers = createSpeakersList();

    let input: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: speakers.s0,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s1 as third speaker', () => {
    let speakers = createSpeakersList();


    let input: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s2: 0, s3: 1, s4: 0, s5: 0 },
        currentSpeaker: speakers.s1,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s4 as fourth speaker', () => {
    let speakers = createSpeakersList();

    let input: State ={
        history,
        turnsElapsed: { s0: 1, s1: 0, s2: 0, s3: 1, s4: 0, s5: 0 },
        currentSpeaker: speakers.s1,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 0, s3: 1, s4: 0, s5: 0 },
        currentSpeaker: speakers.s4,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s2 as fifth speaker', () => {
    let speakers = createSpeakersList();

    let input: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 0, s3: 1, s4: 0, s5: 0 },
        currentSpeaker: speakers.s4,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 0, s3: 1, s4: 1, s5: 0 },
        currentSpeaker: speakers.s2,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s5 as sixth speaker', () => {
    let speakers = createSpeakersList();

    let input: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 0, s3: 1, s4: 1, s5: 0 },
        currentSpeaker: speakers.s2,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    }; 
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 1, s3: 1, s4: 1, s5: 0 },
        currentSpeaker: speakers.s5,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s0 as seventh speaker', () => {
    let speakers = createSpeakersList();

    let input: State =  {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 1, s3: 1, s4: 1, s5: 0 },
        currentSpeaker: speakers.s5,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 1, s3: 1, s4: 1, s5: 1 },
        currentSpeaker: speakers.s0,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s3 as eight speaker', () => {
    let speakers = createSpeakersList();

    let input: State =  {
        history,
        turnsElapsed: { s0: 1, s1: 1, s2: 1, s3: 1, s4: 1, s5: 1 },
        currentSpeaker: speakers.s0,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 2, s1: 1, s2: 1, s3: 1, s4: 1, s5: 1 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s1 as ninth speaker', () => {
    let speakers = createSpeakersList();

    let input: State  = {
        history,
        turnsElapsed: { s0: 2, s1: 1, s2: 1, s3: 1, s4: 1, s5: 1 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    }; 
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 2, s1: 1, s2: 1, s3: 2, s4: 1, s5: 1 },
        currentSpeaker: speakers.s1,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s4 as tenth speaker', () => {
    let speakers = createSpeakersList();

    let input: State = {
        history,
        turnsElapsed: { s0: 2, s1: 1, s2: 1, s3: 2, s4: 1, s5: 1 },
        currentSpeaker: speakers.s1,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1, speakers.s2, speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    }; 
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 2, s1: 2, s2: 1, s3: 2, s4: 1, s5: 1 },
        currentSpeaker: speakers.s4,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s2 as eleventh speaker', () => {
    let speakers = createSpeakersList();

    let input:  State = {
        history,
        turnsElapsed: { s0: 2, s1: 2, s2: 1, s3: 2, s4: 1, s5: 1 },
        currentSpeaker: speakers.s4,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4, speakers.s5, speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 2, s1: 2, s2: 1, s3: 2, s4: 2, s5: 1 },
        currentSpeaker: speakers.s2,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s5 as Twelth speaker', () => {
    let speakers = createSpeakersList();

    let input:  State = {
        history,
        turnsElapsed: { s0: 2, s1: 2, s2: 1, s3: 2, s4: 2, s5: 1 },
        currentSpeaker: speakers.s2,
        inFavorQueue: new Queue<Speaker>(...[speakers.s2, speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 2, s1: 2, s2: 2, s3: 2, s4: 2, s5: 1 },
        currentSpeaker: speakers.s5,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s5, speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});