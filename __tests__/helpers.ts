// Speaker Queues
import { Speaker } from "../dust.types";

export function createSpeakersList() {
    let speakers: { [key: string]: Speaker } = {};
    for (let i = 0; i < 3; i++) {
        speakers[`s${i}`] = {
            side: "inFavor",
            id: `s${i}`
        }
    }

    for (let i = 3; i < 6; i++) {
        speakers[`s${i}`] = {
            side: "notInFavor",
            id: `s${i}`
        }
    }

    return speakers
}

