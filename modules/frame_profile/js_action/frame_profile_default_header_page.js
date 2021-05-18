class frame_profile_default_header_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }

    includecssFile()
    {
        var headID = document.getElementsByTagName("head")[0];
        var newCss = document.createElement('link');
        newCss.type = 'text/css';
        newCss.rel = "stylesheet";
        newCss.href = "css/headerstyle.css";
        headID.appendChild(newCss);
    }
    showResult(xhttp) {
        if (!localStorage['member_permission']) {
            this.includecssFile();
            var str = `
        <style>
            html,
            body,
            header,
            .view {
                height: 100%;
            }
        </style>
        <nav class="navbar navbar-expand-lg navbar-dark elegant-color-dark">
            <div class="container">
                <a class="navbar-brand" href="#"><strong>投資策略交易平台</strong></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto nav-flex-row-reverse">
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new member_profile_show_login_page('member_profile', 'show_login_page', 'index_register_postion')).run()">登入</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="view">
            <div class="full-bg-img">
                <div class="mask rgba-black-strong flex-center">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="white-text text-center wow fadeInUp col-lg-6">
                                <h2>投資策略交易平台</h2>
                                <h5>在投資者最佳交流平台上找到適合自己的投資秘方</h5>
                                <br>
                                <p>在史蒂夫和戴夫都使用eToro投資金融市場之後......</p>
                            </div>
                            <div class="col-lg-6" id="index_register_postion"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
            document.getElementById(this.position_id).innerHTML = str;
            new member_profile_show_register_page('member_profile', 'show_register_page', 'index_register_postion').run();
            new strategy_profile_show_market_page('strategy_profile', 'show_market_page', 'body').run();
        } else if (localStorage['member_permission'] == 0) {

            var str = `
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark elegant-color-dark">
            <div id="reload_location" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()" style="display:none"></div>
            <div class="container">
                <a class="navbar-brand" href="#">投資策略交易平台</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Content"
                        aria-controls="Content" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="Content">
                    <ul class="navbar-nav mr-auto nav-flex-row" id="navbar">
                        <li class="nav-item active">
                            <a class="nav-link" onclick="(new strategy_profile_show_market_page('strategy_profile', 'show_market_page', 'body')).run()">
                                策略商店
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new recall_profile_show_recall_page('recall_profile', 'show_recall_page', 'body')).run()">回測</a>
                        </li>
            
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new strategy_profile_show_manage_page('strategy_profile', 'show_manage_page', 'body')).run()">我的策略</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto nav-flex-row-reverse">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-555" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">會員中心</a>
                            <div class="dropdown-menu dropdown-secondary" aria-labelledby="navbarDropdownMenuLink-555">
                                <a class="dropdown-item" onclick="(new member_profile_show_manage_page('member_profile', 'show_manage_page', 'body')).run()">基本資料</a>
                                <a class="dropdown-item" onclick="(new leasehold_profile_show_manage_page('leasehold_profile', 'show_manage_page', 'body')).run()">租賃清單</a> 
                                <a class="dropdown-item" onclick="(new leasehold_profile_show_account_page('leasehold_profile', 'show_account_page', 'body')).run()">帳務管理</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new member_profile_show_logout_page('member_profile', 'show_logout_page', 'body')).run()">登出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
`;
            this.loadModuleScript('strategy_profile', 'do_insert_action');
            document.getElementById(this.position_id).innerHTML = str;
            document.getElementById('reload_location').click();
            if ((!localStorage['profile_location']) && (!localStorage['action_location'])) {
                new strategy_profile_show_market_page('strategy_profile', 'show_market_page', 'body').run();
            }


        } else {
            this.includecssFile();
            var str = `
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark elegant-color-dark">
            <div class="container">
                <a class="navbar-brand" href="#">投資策略交易平台</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Content"
                        aria-controls="Content" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="Content">
                    <ul class="navbar-nav mr-auto nav-flex-row" id="navbar">
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new admin_profile_show_member_page('admin_profile', 'show_member_page', 'body')).run()">會員管理</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new admin_profile_show_strategy_page('admin_profile', 'show_strategy_page', 'body')).run()">策略管理</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new admin_profile_show_account_page('admin_profile', 'show_account_page', 'body')).run()">網站收益</a>
                        </li>
                    </ul>

                    <ul class="navbar-nav ml-auto nav-flex-row-reverse">
                        <li class="nav-item">
                            <a class="nav-link">管理者，你好</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onclick="(new member_profile_show_logout_page('member_profile', 'show_logout_page', 'body')).run()">登出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
`;
            document.getElementById(this.position_id).innerHTML = str;
            this.loadModuleScript("admin_profile", "show_strategy_page")
            this.loadModuleScript("admin_profile", "show_account_page")
            new admin_profile_show_member_page('admin_profile', 'show_member_page', 'body').run();

        }
    }
}