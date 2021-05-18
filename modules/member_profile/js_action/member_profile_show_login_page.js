class member_profile_show_login_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }
    showResult(xhttp) {
        var str = `
        <div class="container-fluid" id="login_section">

            <h4 class="mb-4">登入</h4>

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

            <button class="btn btn-block my-4 waves-effect" type="button" onclick ="(new member_profile_do_login_action('member_profile', 'do_login_action', 'index_register_postion')).run()">登入</button>
            
            <p>不是會員?
                <a href="">註冊</a>
            </p>
        </div>
`;
        this.loadModuleScript(this.module, "do_login_action");
        document.getElementById(this.position_id).innerHTML = str;
    }
}
