const { ccclass, property, help } = cc._decorator;

import CubeGameFSM from './fsm/CubeGameFSM';
import Timer from './Timer';
import PlayChangeColor from './PlayChangeColor';

@ccclass
@help("https://forum.cocos.com/t/cocos-creator-typescript/46515")
export default class GameMgr extends CubeGameFSM {

    @property
    public scene_ng: string = `ng`;
    @property
    public _game_level: number = 0;
    @property([cc.Integer])
    level_timer: number[] = [];
    @property([cc.Integer])
    level_cube_count: number[] = [];
    @property(cc.Prefab)
    prefab_select_game: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_ui: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_ready_anime: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_cube: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_game_over_anime: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_game_win_anime: cc.Prefab = null;
    @property(cc.Prefab)
    prefab_btn_back_select_game: cc.Prefab = null;
    @property(cc.Node)
    canvas: cc.Node = null;
    @property([cc.Node])
    _cube_array: cc.Node[] = [];
    @property(cc.Integer)
    _cube_target: number = 0;
    @property(cc.Integer)
    _god_index: number = 0;

    start() {
        try {
            this.fsmStartUp();
        }
        catch (err) {
            cc.error(err);
        }
    }

    playCubeBoom(cube: cc.Node) {
        cube.stopAllActions();
        cube.removeComponent(cc.Button);
        const boom = cube.getComponent(cc.Animation);
        boom.on('finished', (event: string) => {
            cube.destroy();
        }, this);
        boom.play();

        const cube_count = this.level_cube_count[this._game_level - 1]; // 0 base
        this._cube_array[this._cube_target - 1] = null;
        this._cube_target += 1;
        if (this._cube_target > cube_count) {
            this.fireEvent(`game_win`);
        } else {
            this.canvas.getChildByName(`ui`).getChildByName(`label_next`).getComponent(cc.Label).string = `Next: ${this._cube_target}`;
        }
    }

    god(event: cc.Event, data: any) {
        this._god_index = 0;
        event.target.stopAllActions();
        event.target.runAction(
            cc.sequence(
                cc.delayTime(1 / this._cube_array.length),
                cc.callFunc(() => {
                    cc.log(this._god_index);
                    const cube = this._cube_array[this._god_index];
                    if (cube) {
                        this.playCubeBoom(cube);
                    }
                    this._god_index += 1;
                })
            ).repeat(this._cube_array.length)
        );
    }

    ///
    /// FSM start
    ///

    public fireEvent(event, ...data: any[]): void {
        cc.log(`${this.name}.fireEvent : event:${event}, data:${data}`);
        try {
            this.fsmTrigger(event, data);
        }
        catch (err) {
            cc.error(err);
        }
    }

    protected enter_select_game(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.enter_select_game : args:${args}`);
        const select_game = cc.instantiate(this.prefab_select_game);
        const btn_level1 = select_game.getChildByName(`btn_level1`).getComponent(cc.Button);
        btn_level1.node.on('click', (btn: cc.Button) => {
            this._game_level = 1;
            this.fireEvent(`select`);
        }, this);
        const btn_level2 = select_game.getChildByName(`btn_level2`).getComponent(cc.Button);
        btn_level2.node.on('click', (btn: cc.Button) => {
            this._game_level = 2;
            this.fireEvent(`select`);
        }, this);
        const btn_level3 = select_game.getChildByName(`btn_level3`).getComponent(cc.Button);
        btn_level3.node.on('click', (btn: cc.Button) => {
            this._game_level = 3;
            this.fireEvent(`select`);
        }, this);
        this.canvas.addChild(select_game, 0, `select_game`);
    }
    protected leave_select_game(eventName: string, from: string, to: string, ...args: any[]): void {
        this.canvas.removeChild(this.canvas.getChildByName(`select_game`));
    }
    protected enter_game_init(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.enter_game_init : args:${args}`);

        this._cube_target = 1;
        this.canvas.removeChild(this.canvas.getChildByName(`ui`));
        const timer = this.level_timer[this._game_level - 1]; // 0 base
        const ui = cc.instantiate(this.prefab_ui);
        ui.getChildByName(`label_time`).getComponent(cc.Label).string = `Time: ${timer}`;
        ui.getChildByName(`label_level`).getComponent(cc.Label).string = `Level: ${this._game_level}`;
        ui.getChildByName(`label_next`).getComponent(cc.Label).string = `Next: ${this._cube_target}`;
        this.canvas.addChild(ui, 1, `ui`);

        // cube
        for (let cube of this._cube_array) {
            if (cube) {
                cube.destroy();
            }
        }
        this._cube_array = [];

        const cube_count = this.level_cube_count[this._game_level - 1]; // 0 base
        for (let i = 1; i <= cube_count; i++) {
            const cube = cc.instantiate(this.prefab_cube);
            cube.on('click', (btn: cc.Button) => {
                if (cube.name == this._cube_target.toString()) {
                    this.playCubeBoom(cube);
                }
            }, this);
            cube.getChildByName(`label_id`).getComponent(cc.Label).string = i.toString();
            cube.getComponent(cc.Button).interactable = false;
            this.canvas.addChild(cube, 0, `${i}`);
            this._cube_array.push(cube);
        }

        this.fireEvent(`goto_next`);
    }
    protected leave_game_init(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.leave_game_init : args:${args}`);
    }
    protected enter_game_ready(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.enter_game_ready : args:${args}`);
        const ready_anime = cc.instantiate(this.prefab_ready_anime);
        ready_anime.getComponent(cc.Animation).on('finished', (event: string) => {
            this.fireEvent(`game_play`);
        }, this);
        this.canvas.addChild(ready_anime, 0, `ready_anime`);
    }
    protected leave_game_ready(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.leave_game_ready : args:${args}`);
        this.canvas.removeChild(this.canvas.getChildByName(`ready_anime`));
    }
    protected enter_game_play(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.enter_game_play : args:${args}`);

        // bg color
        const timer = this.level_timer[this._game_level - 1]; // 0 base
        if (this._game_level >= 2) {
            const component_color = this.canvas.getChildByName(`sprite_BG`).addComponent(PlayChangeColor);
            component_color.game_timer = timer;
        }

        // start timer
        this.canvas.getChildByName(`ui`).getChildByName(`label_time`).getComponent(Timer).startTimer(timer, () => {
            this.fireEvent(`time_out`);
        });
        // start cube move
        for (let cube of this._cube_array) {
            if (cube) {
                cube.getComponent(cc.Button).interactable = true;

                const move_time = 1.0;
                const act = cc.sequence(
                    cc.callFunc(() => {
                        cube.runAction(
                            cc.moveTo(move_time, cc.v2(
                                this.node.getContentSize().width / 2 + Math.random() * cc.winSize.width - this.node.getContentSize().width / 2 - cc.winSize.width / 2,
                                this.node.getContentSize().height / 2 + Math.random() * cc.winSize.height - this.node.getContentSize().height / 2 - cc.winSize.height / 2)))
                    }, this),
                    cc.delayTime(move_time),
                    cc.delayTime(2.0)
                );

                cube.runAction(act.repeatForever());

                //cube.runAction(cc.repeatForever(cc.sequence(cc.hide(), cc.delayTime(0.1), cc.show(), cc.delayTime(0.1))));
            }
        }
    }
    protected leave_game_play(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.leave_game_play : args:${args}`);
    }
    protected enter_game_over(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.enter_game_over : args:${args}`);

        this.canvas.getChildByName(`sprite_BG`).removeComponent(PlayChangeColor);

        const game_over_anime = cc.instantiate(this.prefab_game_over_anime);
        game_over_anime.on('click', (btn: cc.Button) => {
            this.fireEvent(`play_again`);
        }, this);
        this.canvas.addChild(game_over_anime, 0, `game_over_anime`);

        // stop cube
        for (let cube of this._cube_array) {
            if (cube) {
                cube.removeComponent(cc.Button);
                cube.stopAllActions();
            }
        }

        const btn_back_select_game = cc.instantiate(this.prefab_btn_back_select_game);
        btn_back_select_game.on('click', (btn: cc.Button) => {
            this.fireEvent(`back_select_game`);
        }, this);
        this.canvas.addChild(btn_back_select_game, 0, `btn_back_select_game`);
    }
    protected leave_game_over(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.leave_game_over : args:${args}`);
        this.canvas.removeChild(this.canvas.getChildByName(`game_over_anime`));
        this.canvas.removeChild(this.canvas.getChildByName(`btn_back_select_game`));
        this.canvas.removeChild(this.canvas.getChildByName(`ui`));
    }
    protected enter_game_win(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.enter_game_win : args:${args}`);
        const game_win_anime = cc.instantiate(this.prefab_game_win_anime);
        game_win_anime.on('click', (btn: cc.Button) => {
            this.fireEvent(`play_again`);
        }, this);
        this.canvas.addChild(game_win_anime, 0, `game_win_anime`);
        // stop timer
        this.canvas.getChildByName(`ui`).getChildByName(`label_time`).removeComponent(Timer);
        this.fireEvent(`goto_next`);
    }
    protected leave_game_win(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.leave_game_win : args:${args}`);
        this.canvas.removeChild(this.canvas.getChildByName(`game_win_anime`));
    }
    protected action_select(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.action_select : args:${args}`);
    }
    protected action_game_play(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.action_game_play : args:${args}`);
    }
    protected action_click_cube(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`${this.name}.action_click_cube : args:${args}`);
    }
    protected global_enter(eventName: string, from: string, to: string, ...args: any[]): void {

    }
    protected global_leave(eventName: string, from: string, to: string, ...args: any[]): void {

    }
    protected global_before(eventName: string, from: string, to: string, ...args: any[]): void {

    }
    protected global_after(eventName: string, from: string, to: string, ...args: any[]): void {
        cc.log(`global_after(${eventName},${from},${to},${args})`);
        this.getComponent(cc.Label).string = `State: ${to}`;
    }
}
