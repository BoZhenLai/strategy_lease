class admin_profile_show_account_page extends ActionHandler {
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
            <h4 class="mb-4" align="center">未有策略交易</h4>
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
            } else {
                var count = 0;
                var str = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>網站收益</h2>
                </div>
                <div class="col-md-2"></div>
            </div>
            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <table id="accountTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th class="th-sm">編號</th>
                                <th class="th-sm">策略名稱</th>
                                <th class="th-sm">交易日期</th>
                                <th class="th-sm">交易價格</th>
                                <th class="th-sm">抽成收益</th>
                                <th class="th-sm">承租者</th>
                                <th class="th-sm">出租者</th>
                            </tr>
                        </thead>
                        <tbody>`;
                for (i = 0; i < obj['data_set'].length; i++) {

                    str += `
                            <tr>
                                <td>` + obj.data_set[i].leaseholdId + `</td>
                                <td>` + obj.data_set[i].strategyName + `</td>
                                <td>` + obj.data_set[i].leaseholdStartTime + `</td>
                                <td>$` + obj.data_set[i].leaseholdPrice + `</td>
                                <td>$` + obj.data_set[i].leaseholdPrice * 0.02 + `</td>
                                <td>` + obj.data_set[i].memberId + `</td>
                                <td>` + obj.data_set[i].strategyUploader + `</td>
                            </tr>`;
                    count += obj.data_set[i].leaseholdPrice * 0.02;
                }
                str += `</tbody>
                    </table>
                </div>
                <div class="col-md-2"></div>
            </div>
            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4>總收益 $ ` + count + `</h4>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>`;
                //this.loadModuleScript(this.module, "do_insert_action");
                //this.loadModuleScript(this.module, "do_update_action");

                document.getElementById(this.position_id).innerHTML = str;
                //new strategy_profile_show_upload_page('strategy_profile', 'show_upload_page', 'upload_postion').run();
                $('#accountTable').DataTable();
                $('.dataTables_length').addClass('bs-select');
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