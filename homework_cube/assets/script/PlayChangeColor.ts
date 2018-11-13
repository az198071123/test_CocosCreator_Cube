const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayChangeColor extends cc.Component {

    @property
    private _color_bg: cc.Color = cc.Color.WHITE;
    @property
    private _tint_time: number = 2;
    @property
    private _tint_delta: number = 2;
    @property
    public game_timer: number = 2;

    start() {
        this._tint_delta = this._tint_time;
        this.startRandom();
    }

    randomRGB() {
        this._color_bg = cc.color(
            Math.random() * 256,
            Math.random() * 256,
            Math.random() * 256
        );
    }

    startRandom() {
        cc.log(`${this.name}: startRandom`);
        this.node.runAction(
            cc.sequence(
                cc.callFunc(this.randomRGB, this),
                cc.tintTo(
                    this._tint_delta,
                    this._color_bg.getR(),
                    this._color_bg.getG(),
                    this._color_bg.getB()),
                cc.callFunc(this.startRandom, this))
        );
    }

    update(dt) {
        if (this._tint_delta > 0.1) {
            this._tint_delta -= this._tint_time * dt / this._tint_time * this._tint_time / this.game_timer;
            if (this._tint_delta < 0.1) {
                this._tint_delta = 0.1;
            }
        }
        //cc.log(`${this._tint_delta}`);
    }

    onDestroy() {
        this.node.stopAllActions();
        this.node.runAction(
            cc.tintTo(
                0.5,
                133,
                133,
                133));
    }
}
