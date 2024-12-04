class DotMatrix {
    #scroll_interval;
    #char_padding;
    #dots;

    constructor(wrapper,rows,columns) {
        this.wrapper = $(wrapper);
        this.row_count = rows;
        this.col_count = columns;

        this.#char_padding = 1;
        this.#scroll_interval = null;

        this.#generate_dom_elements();

        this.#dots = this.wrapper.find(".dot")
    }

    #generate_dom_elements() {
        this.wrapper.html("");

        for (let row = 0; row < this.row_count; row ++) {
            let row_wrapper = $("<div />").addClass(`row-wrapper r${row}`);
        
            this.wrapper.append(row_wrapper);
        
            for (let col = 0; col < this.col_count; col ++) {
                row_wrapper.append(
                    $("<div />").addClass(`dot r${row} c${col}`)
                );
            }
        }
    }

    clear(scrolling=true) {
        if (scrolling) clearInterval(this.#scroll_interval)
        this.#dots.removeClass("active");
    }

    #get(x, y) { return this.#dots.filter(`.r${y}.c${x}`); } // row=y, column=x
    #get_vector(x1, x2, y) { return null; }

    #set_active_dom(dots) { dots.addClass("active"); }
    #set_passive_dom(dots) { dots.removeClass("active"); }

    #set_active(x,y) { this.#set_active_dom(this.#get(x,y)); }
    #set_passive(x,y) { this.#set_passive_dom(this.#get(x,y)); }

    #get_text_width(text) {
        let width = 0;
        
        for (let char of text) width += characters[char].width + this.#char_padding;
        return width;
    }

    #set_char(char, x=0, y=0) {
        if (x >= this.col_count) return x;
        if (y >= this.row_count) return x;
    
        let start_x = x;
    
        for (let char_row of characters[char].aslist) {
            if (y >= this.row_count) continue;
            x = start_x;
    
            for (let char_col of char_row) {
                if (x >= this.col_count) continue;
    
                if (char_col == "1") this.#set_active(x,y);
                else this.#set_passive(x,y);
                x++;
            }
    
            y++;
        }
    
        return x;
    }

    #write_simple(text, x=0, y=0) {
        for (let char of text) {
            x = this.#set_char(char,x,y) + 1;
        }
    }

    #write_scroll(text, y=0) {
        var width = this.#get_text_width(text);
        var x = JSON.parse(JSON.stringify(this.col_count));

        this.#scroll_interval = setInterval(function(parent) {
            
            parent.clear(false);
            parent.#write_simple(text,x,y);
            x-=1

            if (x*-1 == width) x = parent.col_count;
        },30, this)
    }

    write(text) {
        let width = this.#get_text_width(text);

        this.clear();
        if (width < this.col_count) this.#write_simple(text, 0, 0);
        else this.#write_scroll(text, 0);
    }
}

/* 

const dotmatrix_wrapper = $(".dotmatrix-wrapper"),
    dotmatrix_rows = 12,
    dotmatrix_cols = 48,
    dotmatrix_letter_padding = 1;


for (let row = 0; row < dotmatrix_rows; row ++) {
    let row_wrapper = $("<div />").addClass(`row-wrapper r${row}`)

    dotmatrix_wrapper.append(row_wrapper)

    for (let col = 0; col < dotmatrix_cols; col ++) {
        row_wrapper.append(
            $("<div />").addClass(`dot r${row} c${col}`)
        )
    }
}

const dotmatrix_dots = dotmatrix_wrapper.find(".dot")


const dotmatrix_clear = () => dotmatrix_dots.removeClass("active")


const dotmatrix_get = (row, col) => dotmatrix_dots.filter(`.r${row}.c${col}`)
const dotmatrix_get_vector_row = (rs, re, c) => null


const dotmatrix_set_dot_active = dots => dots.addClass("active")
const dotmatrix_set_dot_passive = dots => dots.removeClass("active")

const dotmatrix_set_coord_active = (row, col) => dotmatrix_set_dot_active(dotmatrix_get(row, col))  // row=y, column=x
const dotmatrix_set_coord_passive = (row, col) => dotmatrix_set_dot_passive(dotmatrix_get(row, col))  // row=y, column=x


const dotmatrix_get_text_width = text => {
    let width = 0;
    
    for (let char of text) width += characters[char].width + dotmatrix_letter_padding
    return width
}

const dotmatrix_set_char = (char, row=0, col=0) => {
    if (col >= dotmatrix_cols) return col
    if (row >= dotmatrix_rows) return col

    let start_col = col

    for (let char_row of characters[char].aslist) {
        if (row >= dotmatrix_rows) continue
        col = start_col

        for (let char_col of char_row) {
            if (col >= dotmatrix_cols) continue

            if (char_col == "1") dotmatrix_set_coord_active(row,col)
            else dotmatrix_set_coord_passive(row,col)
            col ++
        }

        row ++
    }

    return col
}


const dotmatrix_write = (text, row=0, col=0) => {
    for (let char of text) {
        col = dotmatrix_set_char(char,row,col) + 1
    }
}


*/

let dotmatrix = new DotMatrix(".dotmatrix-wrapper",12,48)

dotmatrix.write("Help, I'm stuck in a DotMatrix Board!")