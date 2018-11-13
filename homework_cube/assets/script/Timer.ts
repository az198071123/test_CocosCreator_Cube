const { ccclass, property } = cc._decorator;

@ccclass
export default class Timer extends cc.Component {

    @property
    private _end_time: number = 0;
    @property
    onTimeOut: Function;
    startTimer(end_time: number , time_out : Function) {
        this._end_time = end_time;
        this.onTimeOut = time_out;
    }

    update(dt) {
        if (this._end_time > 0) {
            this._end_time -= dt;
            if (this._end_time < 0) {
                this._end_time = 0;
                if(this.onTimeOut != null){
                    this.onTimeOut();
                }
            }
            this.getComponent(cc.Label).string = `Time: ` + Math.floor(this._end_time).toString();
        }
    }
}
