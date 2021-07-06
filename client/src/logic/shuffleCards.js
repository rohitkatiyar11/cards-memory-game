import { types, values, levelPairMapping } from '../constants/constants'

export default (level) => {
    let cards = generatePairs().splice(0, levelPairMapping[level]);
    let cardArray = [];
    for (let i = 0; i < cards.length; i++) {
        cardArray.push(cards[i][0]);
        cardArray.push(cards[i][1]);
    }
    return shuffle(cardArray);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function generatePairs() {
    let cards = [];
    const sValues = shuffle(values);
    for (let i = 0; i < sValues.length; i++) {
        const sTypes = shuffle(types);
        cards.push([{ value: sValues[i], type: sTypes[0] }, { value: sValues[i], type: sTypes[1] }]);
        cards.push([{ value: sValues[i], type: sTypes[2] }, { value: sValues[i], type: sTypes[3] }])
    }
    return shuffle(cards);
}