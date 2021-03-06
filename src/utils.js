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

// strips away HTML tags
const clean_link = (str) => {
    return str.replace(/<div>|<\/div>|<br>/gi, '');
};

// function to scan editor content for link tags and extract links
export const find_links = (str) => {
    let i;
    const opening_tag = '&lt;a&gt;';
    const closing_tag = '&lt;/a&gt;';
    let compare = opening_tag;
    let start_index = -1;
    let links = [];
    // check for nested tags; shows Warning
    let nesting_level = 0;
    let error = false;

    for(i = 0; i < str.length; i++) {

        if(str.substring(i, i + opening_tag.length) === opening_tag) {
            nesting_level++;
            if(nesting_level < 0 || nesting_level > 1) {
                error = true;
                links = [];
                return { links, error };
            }
            // store the position where the link starts from
            start_index = i + compare.length;
        } else if(str.substring(i, i + closing_tag.length) === closing_tag) {
            nesting_level--;
            if(nesting_level < 0 || nesting_level > 1) {
                error = true;
                links = [];
                return { links, error };
            }
            links.push(clean_link(str.substring(start_index, i)));
        }
    }

    if(nesting_level !== 0) {
        error = true;
        links = [];
    }

    return { links, error };
};
