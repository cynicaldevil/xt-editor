const topReducer = (state = { paragraphs: [], links: [] }, action) => {
    switch (action.type) {
        case 'SWITCH_PARAGRAPHS' : {
            const content1 = state.paragraphs[action.index1];
            const content2 = state.paragraphs[action.index2];
            const new_paras = state.paragraphs.map((para, index) => {
                if (index === action.index1) {
                    return content2;
                } else if (index === action.index2) {
                    return content1;
                } else {
                    return para;
                }
            });
            return {
                ...state,
                paragraphs: new_paras
            };
        }
        case 'UPDATE_PARAGRAPHS': {
            return {
                ...state,
                paragraphs: action.paragraphs
            }
        }
        case 'UPDATE_LINKS': {
            return {
                ...state,
                links: action.links
            }
        }
        default:
            return state;
    }
};

export default topReducer;
