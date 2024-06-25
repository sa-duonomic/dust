import { determineNextSpeaker } from "../main";
import { AlgoInput, Speaker } from "../dust.types";
import { createSpeakersList } from "./helpers";
import { Queue } from "queue-typescript";

it('system selects first speaker', () => {
    let speakers = createSpeakersList();
    let input: AlgoInput = {
        history: [],
        turnsElapsed: { s0: 0, s1: 0, s2: 0, s3: 0, s4: 0, s5: 0 },
        currentSpeaker: null,
        inFavorQueue: new Queue<Speaker>(...[speakers.s0, speakers.s1, speakers.s2]),
        notInFavorQueue: new Queue<Speaker>(...[speakers.s3, speakers.s4, speakers.s5]),
        speakerDuration: 90,
        eachSpeakerTurn: 2
    };
    console.log(determineNextSpeaker);
    let output = determineNextSpeaker(input);
    expect([speakers.s0, speakers.s3]).toContain(output);
});
