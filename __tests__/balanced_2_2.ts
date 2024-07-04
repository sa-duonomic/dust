import { determineNextState } from "../main";
import { State, Speaker } from "../dust.types";
import { createSpeakersList } from "./helpers";
import { Queue } from "queue-typescript";

let history:State[] = []

it('system selects first speaker', () => {
    let speakers = createSpeakersList();
    let input: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s3: 0, s4: 0},
        currentSpeaker: null,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let expected1: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s3: 0, s4: 0 },
        currentSpeaker: speakers.s0,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let expected2: State = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s3: 0, s4: 0 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4]),
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
        turnsElapsed: { s0: 0, s1: 0, s3: 0, s4: 0 },
        currentSpeaker: speakers.s0,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s3: 0, s4: 0 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1,speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3,speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s1 as second speaker', () => {
    let speakers = createSpeakersList();

    let input: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s3: 0, s4: 0 },
        currentSpeaker: speakers.s3,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1,speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3,speakers.s4]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s3: 1, s4: 0 },
        currentSpeaker: speakers.s1,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1,speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4,speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});

it('system selects s4 as second speaker', () => {
    let speakers = createSpeakersList();

    let input: State = {
        history,
        turnsElapsed: { s0: 1, s1: 0, s3: 1, s4: 0 },
        currentSpeaker: speakers.s1,
        inFavorQueue: new Queue<Speaker>(...[speakers.s1,speakers.s0]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4,speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };

    history.push(input)

    let expected: State = {
        history,
        turnsElapsed: { s0: 1, s1: 1, s3: 1, s4: 0 },
        currentSpeaker: speakers.s4,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0,speakers.s1]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s4,speakers.s3]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    let actual = determineNextState(input);
    expect(actual).toEqual(expected);
});