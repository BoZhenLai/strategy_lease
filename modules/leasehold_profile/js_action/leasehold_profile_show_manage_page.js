class leasehold_profile_show_manage_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.args = "memberId=" + localStorage['member_id'];
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj['status_code']);

            if ((obj['status_code'] != 0) || (!obj['data_set'][0])) {
                var str = `
        <div class="container-fluid">
            <h4 class="mb-4" align="center">您未承租任何策略</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion" align="center">
                    <a onclick="(new strategy_profile_show_market_page('strategy_profile', 'show_market_page', 'body')).run()">策略商店</a>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_manage_page';
            } else {

                var str = `

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>策略管理</h2>
                </div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4>已承租</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>承租日期</th>
                                <th>有效日期</th>
                                <th>詳細資訊</th>
                                <th>回測</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    var nowDate = new Date();
                    if (Date.parse(nowDate).valueOf() <= Date.parse(obj['data_set'][i].leaseholdEndTime).valueOf()) {
                        str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].leaseholdStartTime + `</td>
                                <td>` + obj['data_set'][i].leaseholdEndTime + `</td>
                                <td>
                                    <button type="button" class="btn btn-info waves-effect">詳細資訊</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-primary waves-effect">回測</button>
                                </td>
                            </tr>
                            `;
                        console.log(obj['data_set'][i].strategyId);
                    }
                }
                str += `
                        </tbody>
                    </table>
                    <input type="hidden" id="selectStrategyId">
                </div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:5%;margin-bottom:5%">

            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4>已到期</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>承租日期</th>
                                <th>有效日期</th>
                                <th>詳細資訊</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    var nowDate = new Date();
                    if (Date.parse(nowDate).valueOf() > Date.parse(obj['data_set'][i].leaseholdEndTime).valueOf()) {
                        str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].leaseholdStartTime + `</td>
                                <td>` + obj['data_set'][i].leaseholdEndTime + `</td>
                                <td>
                                    <button type="button" class="btn btn-info waves-effect">詳細資訊</button>
                                </td>
                            </tr>
                            `;
                    }
                }
                str += `
                        </tbody>
                    </table>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                //this.loadModuleScript(this.module, "do_insert_action");
                //this.loadModuleScript(this.module, "do_update_action");

                document.getElementById(this.position_id).innerHTML = str;
                //new strategy_profile_show_upload_page('strategy_profile', 'show_upload_page', 'upload_postion').run();
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_manage_page';

            }
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            document.getElementById(this.position_id).innerHTML = msg;
        }
    }
    ajax_error(msg) {
        console.log("no");
        document.getElementById(this.position_id).innerHTML = msg.status;
    }
}

