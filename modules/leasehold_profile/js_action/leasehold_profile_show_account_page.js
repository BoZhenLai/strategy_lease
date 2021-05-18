class leasehold_profile_show_account_page extends ActionHandler {
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
            console.log(obj['data_set'][0]);

            if ((obj['status_code'] != 0) || (!obj['data_set'][0])) {
                var str = `
        <div class="container-fluid">
            <h4 class="mb-4" align="center">尚未有帳戶異動</h4>
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
                localStorage['action_location'] = 'show_account_page';
            } else {

                var str = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>會員中心</h2>
                </div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
            <div class="row">

                <div class="col-md-2"></div>
                <div class="col-lg-2">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <img src="http://140.133.74.200/img/` + localStorage['member_id'] + `/` + localStorage['member_id'] + `.jpg" class="img-thumbnail">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">
                                    <a onclick="(new member_profile_show_manage_page('member_profile', 'show_manage_page', 'body')).run()">基本資料</a>
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <a onclick="(new leasehold_profile_show_manage_page('leasehold_profile', 'show_manage_page', 'body')).run()">租賃清單</a></th>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <a onclick="(new leasehold_profile_show_account_page('leasehold_profile', 'show_account_page', 'body')).run()">帳務管理</a></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-6">
                    <h4>帳務管理</h4>
                    <h4 align="center">收入</h4>
                    <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                    <table class="table table-striped table-sm" id="acc-table" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>來源</th>
                                <th>金額異動</th>
                                <th>日期</th>
                                <th>對象</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    str += `<tr>`;

                    if (obj['data_set'][i].strategyUploader === localStorage['member_id']) {
                        str += `<td>` + obj['data_set'][i].strategyName + `</td>
                                <td>+ $` + obj['data_set'][i].leaseholdPrice * 0.98 + `</td>
                                <td>` + obj['data_set'][i].leaseholdStartTime + `</td>
                                <td>` + obj['data_set'][i].memberId + `</td>
`;
                    }
                }
                str += `
                            </tr>
                        </tbody>
                    </table>
                
                
                    <h4 align="center">支出</h4>
                    <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>來源</th>
                                <th>金額異動</th>
                                <th>日期</th>
                                <th>對象</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    str += `<tr>`;

                    if (obj['data_set'][i].memberId === localStorage['member_id']) {
                        str += `<td>` + obj['data_set'][i].strategyName + `</td>
                                <td>- $` + obj['data_set'][i].leaseholdPrice + `</td>
                                <td>` + obj['data_set'][i].leaseholdStartTime + `</td>
                                <td>` + obj['data_set'][i].strategyUploader + `</td>
`;
                    }
                }
                str += `
                            </tr>
                        </tbody>
                    </table>
                    
                    <input type="hidden" id="selectStrategyId">
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
                localStorage['action_location'] = 'show_account_page';

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