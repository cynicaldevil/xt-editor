// ensures symmetry by having each line contained in a div
export const cleanup_string = (str) => {
    let pos_first_div = str.indexOf('<div>');
    if(pos_first_div === -1) {
        return '<div>' + str + '</div>';
    }
    else if(pos_first_div > 0) {
        return '<div>' + str.substr(0, pos_first_div) + '</div>' + str.substr(pos_first_div);
    }
    else {
        return str;
    }
};

export const find_link = (str) => {
    let i;
    const opening_tag = '&lt;a&gt;';
    const closing_tag = '&lt;/a&gt;'
    let compare = opening_tag;
    let length_compare = 9;
    let start_index;
    let links = [];

    for(i = 0; i < str.length; i++) {
        let substr = str.substring(i, i + length_compare);
        if(substr === compare) {
            if (compare === opening_tag) {
                start_index = i + compare.length;
                compare = closing_tag;
                length_compare = compare.length;
            } else {
                compare = opening_tag;
                length_compare = compare.length;
                links.push(str.substring(start_index, i));
                this.props.updateLinks(links);
                console.log(str.substring(start_index, i));
            }
        }
    }
};
