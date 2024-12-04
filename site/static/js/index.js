class DotMatrix {
    #scroll_interval;
    #char_padding;
    #dots;
    #to_set;

    constructor(wrapper,rows,columns) {
        this.wrapper = $(wrapper);
        this.row_count = rows;
        this.col_count = columns;

        this.#char_padding = 1;
        this.#scroll_interval = null;

        this.#generate_dom_elements();

        this.#dots = this.wrapper.find(".dot")

        this.#to_set = []
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

    #set_all() {
        this.clear(false)
        for (let dot of this.#to_set) dot.addClass("active")
        this.#to_set = []
    }

    #set_active(x,y) { this.#to_set.push(this.#get(x,y)); }

    #get_text_width(text) {
        let width = 0;
        
        for (let char of text) width += characters[char].width + this.#char_padding;
        return width;
    }
    
    #set_char(char, x=0, y=0) {
        char = characters[char]

        if (y >= this.row_count || y < 0) return x;
        if (x >= this.col_count) return x;
        if (x < -1*char.width) return x + char.width;
    
        let start_x = x;
    
        for (let char_row of char.aslist) {
            if (y >= this.row_count) continue;
            x = start_x;
    
            for (let char_col of char_row) {
                if (x >= this.col_count) continue;
    
                if (char_col == "1") this.#set_active(x,y);
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

        this.#set_all()
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
        
        if (width < this.col_count) {
            let x = Math.ceil(this.col_count/2) - Math.floor(width/2)
            this.#write_simple(text, x, 2);
        }

        else this.#write_scroll(text, 2);
    }
}

let dotmatrix = new DotMatrix(".dotmatrix-wrapper",12,96)

dotmatrix.write("Kinesys rocks!")
dotmatrix.write("Help, I'm stuck in a DotMatrix Board!")