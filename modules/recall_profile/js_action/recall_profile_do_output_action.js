class recall_profile_do_output_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
        this.args = "output=" + document.getElementById('output').value;
        console.log(this.args);
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
            if(obj['status_code'] != 0) {
                var str = `
                <div class="card text-center mb-3">
                    <div class="card-header h5">
                        保存失敗
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">回測結果保存</h5>
                        <h6 class="card-title">結果保存過程發生錯誤,請重新回測</h6>
                        <p class="card-text">請按確認鍵返回前頁</p>
                        <a class="btn btn-primary" onclick="(new recall_profile_show_recall_page('recall_profile', 'show_recall_page', 'body')).run()">確認</a>
                    </div>
                </div>
`;
            } else {
                var str = `<div class="card text-center mb-3">
                <div class="card-header h5">
                    保存成功
                </div>
                <div class="card-body">
                    <h5 class="card-title">保存成功</h5>
                    <p class="card-text">請按確認鍵返回前頁</p>
                    <a class="btn btn-primary" onclick="(new recall_profile_show_recall_page('recall_profile', 'show_recall_page', 'body')).run()">確認</a>
                </div>
            </div>
    `;
            }
           
            document.getElementById(this.position_id).innerHTML = str;


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
