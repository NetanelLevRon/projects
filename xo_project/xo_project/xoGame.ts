﻿class XoGame {

    constructor(xoMat: Array<Array<string>>, victoryMat: Array<Array<string>>) {

        XoGame.xoMat = xoMat;
        XoGame.victoryMat = victoryMat;
    }

    //column, mainDiagonal & secondDiagonal: constent size for all sizes mats.
    //needs: for calculating winning posibilities.
    public readonly column: number = XoGame.xoMat.length;
    public readonly mainDiagonal: number = XoGame.xoMat.length * 2;
    public readonly secondDiagonal: number = (XoGame.xoMat.length * 2) + 1;

    public static x_oStrPrompt: string = "";//printing game movements on input prompt box.
    public static x_oStrDoc: string = ""; //printing game movements on document.write.

    //notes about private class members will be given on their sets attributes.
    private static _xoMat: Array<Array<string>>;
    private static _xoArray: Array<number>;
    private static _victoryMat: Array<Array<string>>;

    private _xoMove: number = 0;
    /**
        /@xoMat: updated with a new "x" and "o" in every turn.
        for: 1. sending recent content to print.
              2. using her length for first initializing variables.*/
    static set xoMat(xo: Array<Array<string>>) {
        if (xo.length >= 3) {
            XoGame._xoMat = xo;
        }
    }

    static get xoMat(): Array<Array<string>> {
        return XoGame._xoMat;
    }
    /**
    /@xoArray- updated with a "1" on the cell that his number as the input in every turn.
    for: 1. helps to indicate when it's tie.
          2. helps to indicate random place to put an "o".*/
    static set xoArray(xoArr: Array<number>) {
        if (xoArr.length == XoGame._xoMat.length ** 2) {
            XoGame._xoArray = xoArr;
        }
    }

    static get xoArray(): Array<number> {
        return XoGame._xoArray;
    }
    /**
    /@victoryMat- all possibilities to win.
    for: 1. checking victory.
          2. indication to blocking and winning with "o".*/
    static set victoryMat(victoryMat: Array<Array<string>>) {
        if (victoryMat.length == ((XoGame._xoMat.length * 2) + 2)) {
            XoGame._victoryMat = victoryMat;
        }
    }

    static get victoryMat(): Array<Array<string>> {
        return XoGame._victoryMat;
    }
    /**
    /@xoMove- current move- get from the player and from the computer
    and been send to updating all mats and arrays.*/
    set xoMove(move: number) {
        XoGame.xoArray[move - 1] = 1;
        this._xoMove = move;
    }

    get xoMove(): number {
        return this._xoMove;
    }

    // toString()- print all the current info after two turns and with the end of the game.
    public static toString(): string {           
        XoGame.x_oStrPrompt = "";
        XoGame.x_oStrDoc = "<div style='color: blue; text-align: center;font-family: \"Segoe UI\", sans-serif;'>";

        for (let i: number = 0; i < XoGame.xoMat.length; i++) {
            for (let j: number = 0; j < XoGame.xoMat[i].length; j++) {
                XoGame.x_oStrPrompt += "|    " + XoGame.xoMat[i][j] + "    ";
                XoGame.x_oStrDoc += `|&nbsp;&nbsp;&nbsp;&nbsp;${XoGame.xoMat[i][j]}&nbsp;&nbsp;&nbsp;&nbsp;`;
            }
            XoGame.x_oStrPrompt += `|\n------------------------------------\n`;
            XoGame.x_oStrDoc += `|<br/>---------------------------<br/>`;
        }
        XoGame.x_oStrDoc += "</div>"
        return XoGame.x_oStrDoc;
    }

        /**
    /@endGame- checking if there was a victory or tie and return who is won, tie or if to proceed.
    /@param(x_o)-"x" or "o" according to the sender.*/
    public static endGame(x_o: string): string {

        let checktie: number = 0;

        for (let i: number = 0; i < XoGame.victoryMat.length; i++) {
            for (let j: number = 0, counter: number = 0; j < XoGame.victoryMat[i].length; j++) {
                if (XoGame.victoryMat[i][j] == x_o) {
                    counter++;
                }

                if (XoGame.victoryMat[i][j] != x_o) {    ///for checking victory on larger than 3x3 mats
                    if (counter > 0) {
                        counter--;  // if there wasn't (the current x_o) that means they not sequence.
                    }
                }

                if (counter == 3) {  // only when the current x_o in sequence.
                    return x_o + "-won";
                }
            }
        }

        for (let i: number = 0; i <= XoGame.xoArray.length; i++) {  // The xoArray get expressed here as quickly checker for tie.
            if (XoGame.xoArray[i] == 1) {
                checktie++;
            }
            if (checktie == (XoGame.xoArray.length)) {
                return "tie";
            }
        }
        return "continue";
    }

        /**
    /@placingMoveInPlace- in all mats in all places.
    /@param(move)-xoMove- after all the checks.
    /@param(x_o)-"x" or "o" according to the sender*/
    public placingMoveInPlace(move: number, x_o: string): void {

        for (let i: number = 0, counter = 1; i < XoGame.xoMat.length; i++) {
            for (let j: number = 0; j < XoGame.xoMat[i].length; j++ , counter++) {

                if (move == counter) {  // counter initialized with "1" and when it's equal to move, the place that he need to be is as the following:

                    XoGame.xoMat[i][j] = x_o;  
                    XoGame.victoryMat[i][j] = x_o;
                    XoGame.victoryMat[this.column + j][i] = x_o;
                    if (i == j) {
                        XoGame.victoryMat[this.mainDiagonal][i] = x_o;
                    }
                    if (i + j == (XoGame.xoMat[i].length) - 1) {
                        XoGame.victoryMat[this.secondDiagonal][j] = x_o;
                    }
                }
            }
        }
    }

}



