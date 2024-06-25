import { Queue } from "queue-typescript";

export interface Speaker {
    side: string;
    id: string;
}

export interface AlgoInput {
    history: Speaker[];
    turnsElapsed: {
        [key: string]: number
    };
    currentSpeaker: Speaker | null;
    inFavorQueue: Queue<Speaker>;
    notInFavorQueue: Queue<Speaker>;

    speakerDuration: number;
    eachSpeakerTurn: number;
}
