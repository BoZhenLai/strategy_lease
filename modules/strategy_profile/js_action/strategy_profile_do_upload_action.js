class strategy_profile_do_upload_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {

        this.php = true; //是否呼叫後端php檔案
        this.files = document.getElementById('StrategyUpload').files;

        /*this.file = document.getElementById('StrategyUpload').files;
         this.file[1] = document.getElementById('StrategyUpload').files[1]
         console.log(this.file[0]);
         console.log(this.file[1]);*/

    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
            if (obj['status_code'] === 0) {

                var str = ``;
                str += `<input type="hidden" id="StrategyName" value="` + obj['strategy_name'] + `">`;
                str += `<input type="hidden" id="StrategyFileName" value="` + obj['strategy_filename'] + `">`;

                this.loadModuleScript(this.module, "do_insert_action");
                document.getElementById(this.position_id).innerHTML = str;
                new strategy_profile_do_insert_action('strategy_profile', 'do_insert_action', 'body').run();

            } else if (obj['status_code'] === 1) {

                var str = `
                <div class="card text-center mb-3">
                    <div class="card-header h5">
                        上傳失敗
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">檔案上傳</h5>
                        <h6 class="card-title">檔案過程發生錯誤,請重新上傳</h6>
                        <p class="card-text">請按確認鍵返回前頁</p>
                        <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
                    </div>
                </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            } else if (obj['status_code'] === 2) {

                var str = `
                <div class="card text-center mb-3">
                    <div class="card-header h5">
                        上傳失敗
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">檔案內容不符</h5>
                        <h6 class="card-title">請重新上傳一個內含main.py及config.json的ZIP格式壓縮檔</h6>
                        <p class="card-text">請按確認鍵返回前頁</p>
                        <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
                    </div>
                </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            } else if (obj['status_code'] === 3) {

                var str = `
                <div class="card text-center mb-3">
                    <div class="card-header h5">
                        上傳失敗
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">設定檔欄位不符</h5>
                        <h6 class="card-title">請確認config.json設定檔欄位是否正確</h6>
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
