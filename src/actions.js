// redux actions
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

export const updateLinksData = (links_data) => {
    return {
        type: 'UPDATE_LINKS',
        links_data
    }
}
