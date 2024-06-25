import { AlgoInput, Speaker } from "./dust.types";
import _ from "lodash";

export function determineNextSpeaker(state: AlgoInput): Speaker | null {
    if (state.currentSpeaker === null) {
        return _.sample([state.inFavorQueue.front, state.notInFavorQueue.front]);
    }

    state.history.push(state.currentSpeaker);
    state.turnsElapsed[state.currentSpeaker.id] = state.turnsElapsed[state.currentSpeaker.id] + 1;
    if (state.turnsElapsed[state.currentSpeaker.id] >= state.eachSpeakerTurn) {
        return null;
    }

    let nextSpeaker: Speaker;
    if (state.currentSpeaker.side === "inFavor") {
        state.inFavorQueue.dequeue();
        state.inFavorQueue.enqueue(state.currentSpeaker);
        nextSpeaker = {
            side: "notInFavor",
            id: state.notInFavorQueue.front.id
        }
    } else {
        state.notInFavorQueue.dequeue();
        state.notInFavorQueue.enqueue(state.currentSpeaker);
        nextSpeaker = {
            side: "inFavor",
            id: state.inFavorQueue.front.id
        }
    }

    return nextSpeaker;
}
