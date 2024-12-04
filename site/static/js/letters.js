class Character {
    constructor(w,start_row,grid) {
        this.width = w;
        this.height = 9;
        this.linear = "0".repeat(w * start_row) + grid;
        this.aslist = this.linear.match(new RegExp(`.{1,${w}}`, 'g'));
        // insert missing zeros at the end as well
    }
}

const characters = {
    // Lower Case Letters
    "a": new Character(4,3,"0110101010100101"),
    "b": new Character(4,0,"1000100010001110100110011110"),
    "c": new Character(3,2,"011100100100011"),
    "d": new Character(4,0,"0001000100010111100110010111"),
    "e": new Character(4,2,"01101001111010000110"),
    "f": new Character(3,0,"001010010111010010010"),
    "g": new Character(4,2,"0111100110010111000100010110"),
    "h": new Character(4,0,"1000100010001110100110011001"),
    "i": new Character(1,1,"101111"),
    "j": new Character(2,1,"0100010101010110"),
    "k": new Character(3,0,"100100101110100110101"),
    "l": new Character(2,0,"10101010101001"),
    "m": new Character(5,2,"1101010101100011000110001"),
    "n": new Character(4,2,"11101001100110011001"),
    "o": new Character(4,2,"01101001100110010110"),
    "p": new Character(4,2,"1110100110011110100010001000"),
    "q": new Character(4,2,"0111100110010111000100010001"),
    "r": new Character(3,2,"011100100100100"),
    "s": new Character(3,2,"011100010001110"),
    "t": new Character(3,0,"010010111010010010001"),
    "u": new Character(4,2,"10011001100110010111"),
    "v": new Character(5,2,"1000110001010100101000100"),
    "w": new Character(5,2,"1000110001100011010101010"),
    "x": new Character(5,2,"1000101010001000101010001"),
    "y": new Character(4,2,"100110011001011100010110"),
    "z": new Character(3,2,"111001010100111"),

    // Upper Case Letters
    "A": new Character(5,0,"01110100011000111111100011000110001"),
    "B": new Character(4,0,"1110100110011110100110011110"),
    "C": new Character(4,0,"0111100010001000100010000111"),
    "D": new Character(4,0,"1110100110011001100110011110"),
    "E": new Character(4,0,"0111100010001110100010001111"),
    "F": new Character(4,0,"0111100010001110100010001000"),
    "G": new Character(4,0,"0111100010001010100110010110"),
    "H": new Character(5,0,"10001100011000111111100011000110001"),
    "I": new Character(1,0,"1111111"),
    "J": new Character(3,0,"111001001001001001110"),
    "K": new Character(4,0,"1001101010101100101010101001"),
    "L": new Character(3,0,"100100100100100100111"),
    "M": new Character(7,0,"1110110100100110010011000001100000110000011000001"),
    "N": new Character(5,0,"11110100011000110001100011000110001"),
    "O": new Character(5,0,"01110100011000110001100011000101110"),
    "P": new Character(4,0,"1110100110011110100010001000"),
    "Q": new Character(5,0,"01110100011000110001100011001001101"),
    "R": new Character(4,0,"1110100110011110110010101001"),
    "S": new Character(4,0,"0111100010000110000100011110"),
    "T": new Character(5,0,"11111001000010000100001000010000100"),
    "U": new Character(5,0,"10001100011000110001100011000111110"),
    "V": new Character(5,0,"10001100011000110001100010101000100"),
    "W": new Character(5,0,"10001100011000110001100011010101010"),
    "X": new Character(5,0,"10001100010101000100010101000110001"),
    "Y": new Character(5,0,"10001100010101001010001000010000100"),
    "Z": new Character(5,0,"11111000010001000100010001000011111"),

    // Punctuation and whitespace
    " ": new Character(2,9,""),
    ".": new Character(1,6,"1"),
    ",": new Character(2,5,"010110"),
    "'": new Character(2,0,"010110"),
    "/": new Character(4,0,"00010001001000100100010010001000"),
    "!": new Character(1,0,"1111101"),
    ":": new Character(1,3,"101")

};