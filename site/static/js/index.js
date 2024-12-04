const dm_font_height = 9,
      dm_line_padding = 1,
      dm_line_height = dm_font_height + dm_line_padding*2,
      dm_char_padding = 1;


class DotMatrixLine {
    #line_number;
    #start_row;
    #scroll_interval;
    #scroll_speed;
    #end_row;
    #dots;
    #to_set;

    constructor(wrapper, line, columns, scroll_interval, scroll_speed) {
        this.#line_number = line;
        this.#start_row = line * dm_line_height;
        this.#end_row = this.#start_row + dm_line_height;
        this.#scroll_interval = scroll_interval;
        this.#scroll_speed = scroll_speed;

        this.global_wrapper = $(wrapper);
        this.wrapper = null;
        this.col_count = columns;

        this.#generate_dom_elements();

        this.#dots = this.wrapper.find(".dot");
        this.#to_set = "";
    }

    #generate_dom_elements() {
        this.wrapper = $("<div />").addClass(`dotmatrix-line-wrapper dotmatrix-line-wrapper-${this.#line_number}`);
        this.global_wrapper.append(this.wrapper);

        console.log(this.#start_row)
        for (let row = this.#start_row; row < this.#end_row; row ++) {
            let row_wrapper = $("<div />").addClass(`row-wrapper r${row}`);
        
            this.wrapper.append(row_wrapper);
        
            for (let col = 0; col < this.col_count; col ++) {
                row_wrapper.append(
                    $("<div />").addClass(`dot r${row} c${col}`)
                );
            }
        }
    }

    #set_all() {
        this.clear(false)
        $(`${this.wrapper.selector} ${this.#to_set.slice(0,-2)}`).addClass("active")
        this.#to_set = ""
    }

    #set_active(x,y) {
        this.#to_set += `.r${y}.c${x}, `;
    }

    #get_text_width(text) {
        let width = 0;
        
        for (let char of text) width += characters[char].width + dm_char_padding;
        return width;
    }

    #set_char(char, x=0, y=0) {
        char = characters[char]

        if (y >= this.#end_row || y < this.#start_row) return x;
        if (x >= this.col_count) return x;
        if (x < -1*char.width) return x + char.width;
    
        let start_x = x;
    
        for (let char_row of char.aslist) {
            if (y >= this.#end_row) continue;
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

    #write_simple(text, x=0) {
        for (let char of text) x = this.#set_char(char,x,this.#start_row + dm_line_padding) + 1;
        this.#set_all()
    }

    #write_scroll(text) {
        var width = this.#get_text_width(text);
        var x = JSON.parse(JSON.stringify(this.col_count));

        this.#scroll_interval = setInterval(function(parent) {
            
            parent.clear(false);
            parent.#write_simple(text,x);
            x-=1

            if (x*-1 == width) x = parent.col_count;
        }, this.#scroll_speed, this)
    }

    write(text) {
        if (!text) { this.clear(true); return }

        let width = this.#get_text_width(text);

        this.clear();
        
        if (width < this.col_count) {
            let x = Math.ceil(this.col_count/2) - Math.floor(width/2)
            this.#write_simple(text, x);
        }

        else this.#write_scroll(text);
        console.log(text)
    }
    
    clear(scrolling=true) {
        if (scrolling) clearInterval(this.#scroll_interval)
        this.#dots.removeClass("active");
    }
}

class DotMatrix {
    #scroll_interval;
    #scroll_speed;

    constructor(wrapper,lines,columns) {
        this.#scroll_interval = null;
        this.#scroll_speed = 25;

        this.global_wrapper = $(wrapper);
        this.row_count = lines * dm_line_height;
        this.col_count = columns;

        this.lines = []

        for (let i = 0; i < lines; i++) {
            this.lines.push(new DotMatrixLine(
                this.global_wrapper,
                i,
                this.col_count,
                this.#scroll_interval,
                this.#scroll_speed
            ))
        }
    }

    write(text,line) {
        if (line >= this.lines.length || line < 0) return
        this.lines[line].write(text)
    }
}


let dotmatrix = new DotMatrix(".dotmatrix-wrapper",2,96)

dotmatrix.write("Help, I'm stuck in a DotMatrix Board!",1)
dotmatrix.write("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",0)


dotmatrix.write("Kinesys rocks!",1)