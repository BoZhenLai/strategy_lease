class member_profile_do_upload_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;

    }
    prepareArgs() {
        this.php = true; //是否呼叫後端php檔案
        this.files = document.getElementById('imgUpload').files;

    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);
            if (obj['status_code'] === 0) {

                var str = `
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <input type="file" id="imgUpload" style="display:none" accept=".jpg" onchange="(new member_profile_do_upload_action('member_profile', 'do_upload_action', 'informationbar')).run()"><img src="http://localhost/interview_project/img/` + obj['img_filename'] + `" class="img-thumbnail" onclick="OpenImgUpload()" alt="Sticker">
                                </th>
                                <th scope="col">
                                    <input type="hidden" id="UpdateImg" value="` + obj['img_filename'] + `">
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
`;

                document.getElementById(this.position_id).innerHTML = str;


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
                        <a class="btn btn-primary" onclick="(new strategy_profile_show_manage_page('strategy_profile', 'show_manage_page', 'body')).run()">確認</a>
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
