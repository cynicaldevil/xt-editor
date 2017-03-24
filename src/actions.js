export const switchParagraphs = (index1, index2) => {
    return {
        type: 'SWITCH_PARAGRAPHS',
        index1,
        index2
    }
};

export const updateParagraphs = (paragraphs) => {
    return {
        type: 'UPDATE_PARAGRAPHS',
        paragraphs
    }
};

export const updateLinks = (links) => {
    return {
        type: 'UPDATE_LINKS',
        links
    }
}
