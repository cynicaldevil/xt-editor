const topReducer = (state = { value: '', paragraphs: [] }, action) => {
    switch (action.type) {
        case 'SWITCH_PARAGRAPHS' : {
            return {
                ...state,
                paragraphs: state.paragraphs.map((value, index) => {
                    if (value === action.para1) {
                        return action.para2;
                    } else if (value === action.para2) {
                        return action.para1;
                    } else {
                        return value;
                    }
                }),
            }
        }
        case 'UPDATE_PARAGRAPHS': {
            return {
                ...state,
                paragraphs: action.paragraphs
            }
        }
        case 'UPDATE_VALUE': {
            return {
                ...state,
                value: action.value
            }
        }
        default:
            return state;
    }
};

export default topReducer;
