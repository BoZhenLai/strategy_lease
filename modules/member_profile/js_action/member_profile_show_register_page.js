class member_profile_show_register_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }

    showResult(xhttp) {
        var str = `
        <div class="container-fluid" id="register_section">

            <h4 class="mb-4">註冊</h4>
            <!-- Default form register -->
            <form id="register_form" role="form" data-toggle="validator">

                <div class="form-group">
                    <!-- Id -->
                    <input type="text" name="RegisterId" class="form-control" placeholder="帳號" data-error="請輸入使用者帳號" required="required">
                    <div class="help-block with-errors"></div>
                </div>


                <div class="form-row">
                    <div class="col">
                        <div class="form-group">
                            <!-- First name -->
                            <input type="text" name="RegisterFirstName" class="form-control" placeholder="姓氏" data-error="請輸入使用者姓氏" required="required">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <!-- Last name -->
                            <input type="text" name="RegisterLastName" class="form-control" placeholder="名字" data-error="請輸入使用者名字" required="required">
                            <div class="help-block with-errors"></div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <!-- E-mail -->
                    <input type="email" name="RegisterEmail" class="form-control" placeholder="電子郵件" value="" required="required" data-error="電子郵件格式錯誤">
                    <div class="help-block with-errors"></div>
                </div>
                <div class="form-group">
                    <!-- Password -->
                    <input type="password" id="password" name="RegisterPassword" class="form-control" placeholder="密碼" pattern="(?=.*[0-9)(?=.*[a-zA-Z]).{8,16}" data-error="密碼長度需為8-16個字元，並且包含一個英文字母和一個數字" required="required">
                    <div class="help-block with-errors"></div>
                    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                        請輸入包含英、數字組合的密碼 8-16 字元
                    </small>
                </div>
                <div class="form-group">
                    <input id="CheckPassword" name="CheckPassword" class="form-control" type="password" placeholder="確認密碼" data-match="#password" data-error="密碼不一致" required="required">
                    <div class="help-block with-errors"></div>
                </div>
                <div class="form-group">
                    <!-- Phone number -->
                    <input type="text" name="RegisterPhone" class="form-control" placeholder="手機號碼" pattern=".{10}" data-error="無效的手機號碼" required="required">
                    <div class="help-block with-errors mb-4"></div>
                    <small id="defaultRegisterFormPhoneHelpBlock" class="form-text text-muted mb-4">
                        
                    </small>
                </div>

                <!-- Newsletter -->
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter">
                    <label class="custom-control-label" for="defaultRegisterFormNewsletter">訂閱我們的最新資訊</label>
                </div>

                <div class="form-group">
                    <!-- Sign up button -->
                    <input type="submit" class="btn my-4 btn-block" value="註冊" onclick="(new member_profile_do_register_action('member_profile', 'do_register_action', 'index_register_postion')).run()"></button>
                </div>
                <!-- Social register -->

                <!-- Terms of service -->
                <h6>點擊註冊即視為您同意我們的                    
                    <a href="" target="_blank">服務條款</a>                    
                </h6> 

            </form>
            <!-- Default form register -->
        </div>
`;

        this.loadModuleScript(this.module, "do_register_action");
        document.getElementById(this.position_id).innerHTML = str;

    }
}
