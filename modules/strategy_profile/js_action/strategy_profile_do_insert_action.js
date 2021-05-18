class strategy_profile_do_insert_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {

        this.php = true; //是否呼叫後端php檔案
        this.args = "StrategyUploader=" + localStorage['member_id'];
        this.args += "&StrategyName=" + document.getElementById('StrategyName').value;
        this.args += "&StrategyFileName=" + document.getElementById('StrategyFileName').value;
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
                上傳成功
            </div>
            <div class="card-body">
                <h5 class="card-title">上傳成功</h5>
                <p class="card-text">請按確認鍵返回前頁</p>
                <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
            </div>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;

            } else if (obj['status_code'] === 4) {

                var str = `
                <div class="card text-center mb-3">
                    <div class="card-header h5">
                        上傳失敗
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">已存在相同檔案</h5>
                        <h6 class="card-title">請確認是否已有上傳此檔案</h6>
                        <p class="card-text">請按確認鍵返回前頁</p>
                        <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
                    </div>
                </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            }
            /*else {
             var str = `寫進失敗`;
             str += obj['sql'];
             document.getElementById(this.position_id).innerHTML = str;
             }*/

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