var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = (function (_super) {
    __extends(Player, _super);
    // ctor: gets the apdated static mats from XoGame class and move as input from the user.
    function Player(xoMat, victory_Mat, move) {
        if (move === void 0) { move = Number(prompt(XoGame.x_oStrPrompt + "\nPlease enter your move")); }
        var _this = _super.call(this, xoMat, victory_Mat) || this;
        if (XoGame.endGame("X") == "continue") {
            _this.xoMove = _this.isMoveOk(move);
            _this.placingMoveInPlace(_this.xoMove, "X");
        }
        return _this;
    }
    //Gets the input from the user and not allowing him to enter wrong move.
    Player.prototype.isMoveOk = function (move) {
        var flag = false; // Do the loop until return correct move.
        do {
            if (isNaN(move)) {
                alert(XoGame.x_oStrPrompt + "\nPlease enter numbers only!!");
            }
            else if (move <= 0 || move > Math.pow((XoGame.xoMat.length), 2)) {
                alert(XoGame.x_oStrPrompt + "\nPlease enter number only between 1 to " + Math.pow((XoGame.xoMat.length), 2));
            }
            else if (XoGame.xoArray[move - 1] == 1) {
                alert(XoGame.x_oStrPrompt + "\nThe place '" + move + "' olready tacken!!\n Please try again");
            }
            else {
                return move; // If everything is OK.
            }
            move = Number(prompt(XoGame.x_oStrPrompt + "\nPlease enter your move"));
        } while (flag == false);
    };
    return Player;
}(XoGame));
//# sourceMappingURL=player.js.map