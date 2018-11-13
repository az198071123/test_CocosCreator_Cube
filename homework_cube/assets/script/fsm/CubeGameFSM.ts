
//###{"class":"go.GraphLinksModel","nodeDataArray":[{"text":"SelectGame","isInit":true,"key":-1,"loc":"809.3050000000001 225.71499999999997","callbacks":"{\"enter\":[\"enter_select_game\"],\"leave\":[\"leave_select_game\"]}"},{"text":"GameReady","isInit":false,"key":-2,"loc":"799 461","callbacks":"{\"enter\":[\"enter_game_ready\"],\"leave\":[\"leave_game_ready\"]}"},{"text":"GamePlay","isInit":false,"key":-3,"loc":"799.3125 577.71","callbacks":"{\"enter\":[\"enter_game_play\"],\"leave\":[\"leave_game_play\"]}"},{"text":"GameOver","isInit":false,"key":-4,"loc":"454.1775 700.1925","callbacks":"{\"enter\":[\"enter_game_over\"],\"leave\":[\"leave_game_over\"]}"},{"text":"GameWin","isInit":false,"key":-5,"loc":"1213.8525000000004 702.2925","callbacks":"{\"enter\":[\"enter_game_win\"],\"leave\":[\"leave_game_win\"]}"},{"text":"GameInit","isInit":false,"key":-6,"loc":"821 335","callbacks":"{\"enter\":[\"enter_game_init\"],\"leave\":[\"leave_game_init\"]}"}],"linkDataArray":[{"from":-1,"to":-6,"points":[908.591500829199,277.63437992487786,916.9062986859391,296.93397001810155,915.6901561053995,316.10172848313096,904.4112334662317,335.06602681615846],"text":"select","callbacks":"{\"before\":[\"action_select\"],\"after\":[]}"},{"from":-2,"to":-3,"points":[891.3372468642347,512.9566731333546,897.1545830295313,532.2879512680875,895.6131641087042,554.2066339613925,884.6099980305195,577.7392085547474],"text":"game_play","callbacks":"{\"before\":[\"action_game_play\"],\"after\":[]}"},{"from":-4,"to":-6,"points":[510.2341665078378,700.3183487374286,446.9128301830983,633.6163872498684,446.9578472558418,491.1853492603585,825.9220596982877,379.962431771186],"text":"play_again","callbacks":"{\"before\":[],\"after\":[]}"},{"from":-3,"to":-4,"points":[819.7132867674103,629.3814400146779,765.9169882107209,654.6181728259792,693.8358525647299,681.1925778333664,605.6779214077726,705.6113371833288],"text":"time_out","callbacks":"{\"before\":[],\"after\":[]}"},{"from":-3,"to":-5,"points":[948.5852059718744,619.7238893237438,1037.6629835997576,638.5414158847439,1128.676830993347,665.9101234620415,1225.1430725034434,704.1428049021911],"text":"game_win","callbacks":"{\"before\":[],\"after\":[]}"},{"from":-5,"to":-4,"points":[1213.8526832219457,730.2475685816037,1013.0728363544737,736.1407817602205,812.9065571296536,735.4885601926981,612.1307012883481,728.5904081629045],"text":"goto_next","callbacks":"{\"before\":[],\"after\":[]}"},{"from":-3,"to":-3,"points":[890.2891086302434,629.6047731785225,911.2891086302434,665.9778401374689,839.3663225006837,665.9778401374689,860.3663225006837,629.6047731785225],"text":"click_cube","callbacks":"{\"before\":[\"action_click_cube\"],\"after\":[]}"},{"from":-4,"to":-1,"points":[493.1468677020422,700.4218796568849,288.490552574592,568.2799950349288,543.5861588389548,323.41875315647275,812.7768940836916,268.6882180390984],"text":"back_select_game","callbacks":"{\"before\":[],\"after\":[]}"},{"from":-6,"to":-2,"points":[893.6096105410998,386.9558565778621,897.9116616512867,417.6535065260554,896.950422193525,441.0284761394922,893.033468697291,461.01058433822027],"text":"goto_next","callbacks":"{\"before\":[],\"after\":[]}"}],"globalCallbacksText":"{\"enter\":[\"global_enter\"],\"leave\":[\"global_leave\"],\"before\":[\"global_before\"],\"after\":[\"global_after\"]}"}###
interface StateNameInterface {
    SelectGame: string;
    GameReady: string;
    GamePlay: string;
    GameOver: string;
    GameWin: string;
    GameInit: string;

}
interface EventNameInterface {
    select: string;
    game_play: string;
    play_again: string;
    time_out: string;
    game_win: string;
    goto_next: string;
    click_cube: string;
    back_select_game: string;

}
import StateMachine from "./StateMachine";
export default abstract class FsmImplClass extends cc.Component {

    private fsm: any;

    protected fsmTrigger(eventName: string, ...args: any[]) {
        this.fsm[eventName](...args);
    };

    protected fsmIs(stateName: string): boolean {
        return this.fsm.is(stateName);
    };

    protected fsmCan(eventName: string): boolean {
        return this.fsm.can(eventName);
    };

    protected fsmCannot(eventName: string): boolean {
        return this.fsm.cannot(eventName);
    };

    protected fsmCurrent(): string {
        return this.fsm.current;
    };

    protected fsmStartUp() {
        this.fsm = StateMachine.create({ "initial": "SelectGame", "events": [{ "name": "select", "from": "SelectGame", "to": "GameInit" }, { "name": "game_play", "from": "GameReady", "to": "GamePlay" }, { "name": "play_again", "from": "GameOver", "to": "GameInit" }, { "name": "time_out", "from": "GamePlay", "to": "GameOver" }, { "name": "game_win", "from": "GamePlay", "to": "GameWin" }, { "name": "goto_next", "from": "GameWin", "to": "GameOver" }, { "name": "click_cube", "from": "GamePlay", "to": "GamePlay" }, { "name": "back_select_game", "from": "GameOver", "to": "SelectGame" }, { "name": "goto_next", "from": "GameInit", "to": "GameReady" }], "callbacks": { "onenterSelectGame": [this.enter_select_game], "onleaveSelectGame": [this.leave_select_game], "onenterGameReady": [this.enter_game_ready], "onleaveGameReady": [this.leave_game_ready], "onenterGamePlay": [this.enter_game_play], "onleaveGamePlay": [this.leave_game_play], "onenterGameOver": [this.enter_game_over], "onleaveGameOver": [this.leave_game_over], "onenterGameWin": [this.enter_game_win], "onleaveGameWin": [this.leave_game_win], "onenterGameInit": [this.enter_game_init], "onleaveGameInit": [this.leave_game_init], "onbeforeselect": { "SelectGame": [this.action_select] }, "onbeforegame_play": { "GameReady": [this.action_game_play] }, "onbeforeclick_cube": { "GamePlay": [this.action_click_cube] }, "onenterstate": [this.global_enter], "onleavestate": [this.global_leave], "onbeforeevent": [this.global_before], "onafterevent": [this.global_after] } }, this);
    };

    public readonly stateName: StateNameInterface = {
        SelectGame: "SelectGame",
        GameReady: "GameReady",
        GamePlay: "GamePlay",
        GameOver: "GameOver",
        GameWin: "GameWin",
        GameInit: "GameInit"
    };

    public readonly eventName: EventNameInterface = {
        select: "select",
        game_play: "game_play",
        play_again: "play_again",
        time_out: "time_out",
        game_win: "game_win",
        goto_next: "goto_next",
        click_cube: "click_cube",
        back_select_game: "back_select_game"
    };

    protected select(...args: any[]): void { this.fsm["select"](...args); };
    protected game_play(...args: any[]): void { this.fsm["game_play"](...args); };
    protected play_again(...args: any[]): void { this.fsm["play_again"](...args); };
    protected time_out(...args: any[]): void { this.fsm["time_out"](...args); };
    protected game_win(...args: any[]): void { this.fsm["game_win"](...args); };
    protected goto_next(...args: any[]): void { this.fsm["goto_next"](...args); };
    protected click_cube(...args: any[]): void { this.fsm["click_cube"](...args); };
    protected back_select_game(...args: any[]): void { this.fsm["back_select_game"](...args); };

    protected abstract enter_select_game(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract leave_select_game(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract enter_game_ready(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract leave_game_ready(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract enter_game_play(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract leave_game_play(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract enter_game_over(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract leave_game_over(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract enter_game_win(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract leave_game_win(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract enter_game_init(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract leave_game_init(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract action_select(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract action_game_play(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract action_click_cube(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract global_enter(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract global_leave(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract global_before(eventName: string, from: string, to: string, ...args: any[]): void;
    protected abstract global_after(eventName: string, from: string, to: string, ...args: any[]): void;

}
