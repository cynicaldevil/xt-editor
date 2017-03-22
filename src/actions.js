export const switchParagraphs = (para1, para2) => {
    return {
        type: 'SWITCH_PARAGRAPHS',
        para1,
        para2
    }
};

export const updateValue = (value) => {
    return {
        type: 'UPDATE_VALUE',
        value
    }
};

export const updateParagraphs = (paragraphs) => {
    return {
        type: 'UPDATE_PARAGRAPHS',
        paragraphs
    }
};
