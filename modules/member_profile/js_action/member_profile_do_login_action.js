class member_profile_do_login_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true; //是否呼叫後端php檔案
        var LoginId = document.getElementsByName('LoginId')[0].value;
        var LoginPassword = document.getElementsByName('LoginPassword')[0].value;

        this.args = "LoginId=" + LoginId;
        this.args += "&LoginPassword=" + LoginPassword;

    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);

            if ((obj['status_code'] != 0) || (!obj['data_set'][0])) {

                var str = `
        <div class="container-fluid" id="login_section">

            <h4 class="mb-4">登入</h4>
            <h6 class="mb-4" style="color: red;">帳號或密碼輸入錯誤</h6>
            <input type="text" name="LoginId" class="form-control mb-4" placeholder="帳號">

            <input type="password" name="LoginPassword" class="form-control mb-4" placeholder="密碼">

            <div class="d-flex justify-content-around">
                <div>
                    <!-- Remember me -->
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                        <label class="custom-control-label" for="defaultLoginFormRemember">記住我</label>
                    </div>
                </div>
                <div>
                    <a href="">忘記密碼?</a>
                </div>
            </div>

            <button class="btn btn-block my-4" type="button" onclick ="(new member_profile_do_login_action('member_profile', 'do_login_action', 'index_register_postion')).run()">登入</button>

            <p>不是會員?
                <a href="">註冊</a>
            </p>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            } else {
                    
                this.loadModuleScript("strategy_prfile", "show_upload_page");
                this.loadModuleScript("member_profile", "show_manage_page");
                localStorage['member_id'] = obj['data_set'][0].memberId;
                localStorage['member_name'] = obj['data_set'][0].memberName;
                localStorage['member_email'] = obj['data_set'][0].memberEmail;
                localStorage['member_phone'] = obj['data_set'][0].memberPhone;
                localStorage['member_account'] = obj['data_set'][0].memberAccount;
                localStorage['member_permission'] = obj['data_set'][0].memberPermission;
                window.location.reload();
            }
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            document.getElementById(this.position_id).innerHTML = msg;
        }
    }
    ajax_error(msg) {
        document.getElementById(this.position_id).innerHTML = msg.status;
    }
}