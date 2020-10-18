//Guard
export class GuardPayload{
    PredictedCard;
    ChosenPlayer;
}

//Priest, Baron, Prince, King
export class ActionPayload{
    ChosenPlayer;
}

//Handymaid, Countess, Princess
export class NoActionPayload{
}