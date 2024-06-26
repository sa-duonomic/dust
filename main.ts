import { Speaker, State } from "./dust.types";
import _ from "lodash";

export function determineNextState(currState: State): State {
    let nextState = { ...currState };
    let { currentSpeaker } = currState;
    if (currentSpeaker === null) {
        currentSpeaker = _.sample([currState.inFavorQueue.front, currState.notInFavorQueue.front]);
        nextState.currentSpeaker = currentSpeaker;
        return nextState;
    }

    nextState.currentSpeaker = currentSpeaker;
    nextState.history.push(currState);
    nextState.turnsElapsed[currentSpeaker.id] = currState.turnsElapsed[currentSpeaker.id] + 1;
    // TODO: Add termination condition

    if (currentSpeaker.side === "inFavor") {
        nextState.inFavorQueue.dequeue();
        nextState.inFavorQueue.enqueue(currentSpeaker);
        nextState.currentSpeaker = {
            side: "notInFavor",
            id: currState.notInFavorQueue.front.id
        }
    } else {
        nextState.notInFavorQueue.dequeue();
        nextState.notInFavorQueue.enqueue(currentSpeaker);
        nextState.currentSpeaker = {
            side: "inFavor",
            id: currState.inFavorQueue.front.id
        }

    }

    return nextState;
}
