class leasehold_profile_do_leasehold_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        var StrategyId = document.getElementById('selectStrategyId').value;
        var StrategyOrderPeriod = document.getElementById('selectStrategyOrderPeriod').value;
        var StrategyPrice = document.getElementById('selectStrategyPrice').value;
        this.args = "StrategyId=" + StrategyId;
        this.args += "&StrategyOrderPeriod=" + StrategyOrderPeriod;
        this.args += "&StrategyPrice=" + StrategyPrice;
        this.args += "&memberId=" + localStorage['member_id'];
        localStorage['selectStrategyPrice'] = StrategyPrice;
        console.log(this.args);

    }

    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);

            if (obj['status_code'] === 0) {
                var str = `
        <div class="card text-center mb-3">
            <div class="card-header h5">
                租賃成功
            </div>
            <div class="card-body">
                <h5 class="card-title">租賃成功</h5>
                <p class="card-text">請按確認鍵返回前頁</p>
                <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
            </div>
        </div>
`;
                localStorage['member_account'] = localStorage['member_account'] - localStorage['selectStrategyPrice'];
                document.getElementById(this.position_id).innerHTML = str;

            } else {
                var str = `
        <div class="card text-center mb-3">
            <div class="card-header h5">
                租賃失敗
            </div>
            <div class="card-body">
                <h5 class="card-title">租賃失敗</h5>
                <p class="card-text">請按確認鍵返回前頁</p>
                <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
            </div>
        </div>
`;
                //str += obj['sql'];
                document.getElementById(this.position_id).innerHTML = str;
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