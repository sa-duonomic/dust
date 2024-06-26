import { Queue } from "queue-typescript";

export interface Speaker {
    side: string;
    id: string;
}

export interface State {
    history: State[];
    turnsElapsed: {
        [key: string]: number
    };
    currentSpeaker: Speaker | null;
    inFavorQueue: Queue<Speaker>;
    notInFavorQueue: Queue<Speaker>;
    speakerDuration: number;
    eachSpeakerTurn: number;
}
