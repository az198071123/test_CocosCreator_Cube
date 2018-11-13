const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayChangeColor extends cc.Component {

    @property
    private _color_bg: cc.Color = cc.Color.WHITE;

    start() {
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
                    2,
                    this._color_bg.getR(),
                    this._color_bg.getG(),
                    this._color_bg.getB()),
                cc.callFunc(this.startRandom, this))
        );
    }
}
