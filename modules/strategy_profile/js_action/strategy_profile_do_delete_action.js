class strategy_profile_do_delete_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        var selectStrategyId = document.getElementById('selectStrategyId').value;
        var selectDeleteStrategyNmae = document.getElementById('selectStrategyDeleteNmae').value;
        var selectStrategyDeleteFileName = document.getElementById('selectStrategyDeleteFileName').value;
        this.args = "selectStrategyId=" + selectStrategyId;
        this.args += "&selectDeleteStrategyNmae=" + selectDeleteStrategyNmae;
        this.args += "&selectStrategyDeleteFileName=" + selectStrategyDeleteFileName;
        this.args += "&strategyUploader=" + localStorage['member_id'];
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
                                    刪除成功
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">刪除成功</h5>
                                    <p class="card-text">請按確認鍵返回前頁</p>
                                    <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
                                </div>
                            </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            } else {
                var str = `
                            <div class="card text-center mb-3">
                                <div class="card-header h5">
                                    刪除失敗
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">刪除失敗</h5>
                                    <p class="card-text">請按確認鍵返回前頁,重新刪除策略</p>
                                    <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
                                </div>
                            </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            }
        } catch (e)
        {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            document.getElementById(this.position_id).innerHTML = msg;
        }
    }

    ajax_error(msg) {

        document.getElementById(this.position_id).innerHTML = msg.status;
    }

}
