class member_profile_do_register_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true; //是否呼叫後端php檔案
        var RegisterId = document.getElementsByName('RegisterId')[0].value;
        var RegisterFirstName = document.getElementsByName('RegisterFirstName')[0].value;
        var RegisterLastName = document.getElementsByName('RegisterLastName')[0].value;
        var RegisterEmail = document.getElementsByName('RegisterEmail')[0].value;
        var RegisterPassword = document.getElementsByName('RegisterPassword')[0].value;
        var RegisterPhone = document.getElementsByName('RegisterPhone')[0].value;

        this.args = "RegisterId=" + RegisterId;
        this.args += "&RegisterName=" + RegisterFirstName + RegisterLastName;
        this.args += "&RegisterEmail=" + RegisterEmail;
        this.args += "&RegisterPassword=" + RegisterPassword;
        this.args += "&RegisterPhone=" + RegisterPhone;

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
                                    註冊成功
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">註冊成功</h5>
                                    <p class="card-text">註冊成功</p>
                                    <a class="btn btn-primary" onclick="(new member_profile_show_login_page('member_profile', 'show_login_page', 'index_register_postion')).run()">登入</a>
                                </div>
                            </div>
`;

                document.getElementById(this.position_id).innerHTML = str;
            } else if (obj['status_code'] === 2) {
                var str = `
                            <div class="card text-center mb-3">
                                <div class="card-header h5">
                                    註冊失敗
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">該帳號已存在</h5>
                                    <p class="card-text">該帳號已被註冊，請重新輸入</p>
                                    <a class="btn btn-primary" onclick="(new member_profile_show_register_page('member_profile', 'show_register_page', 'index_register_postion')).run()">註冊</a>
                                </div>
                            </div>
`;

                document.getElementById(this.position_id).innerHTML = str;
            } else {
                console.log('state1');
                document.getElementById(this.position_id).innerHTML = obj['sql'];
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

