class member_profile_show_manage_page extends ActionHandler {

    constructor(module, action, position_id) {

        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {

        this.php = false;
    }

    showResult(xhttp) {
        var str = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>會員中心</h2>
                </div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">

            <div class="row">
                <div class="col-lg-2"></div>
                <div class="col-lg-2" id="informationbar">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <input type="file" id="imgUpload" style="display:none" accept=".jpg" onchange="(new member_profile_do_upload_action('member_profile', 'do_upload_action', 'informationbar')).run()"><img src="http://localhost/interview_project/memberProfile/` + localStorage['member_id'] + `/` + localStorage['member_id'] + `.jpg" class="img-thumbnail" onclick="OpenImgUpload()" alt="Sticker">
                                </th>
                                <th scope="col">
                                    <input type="hidden" id="UpdateImg" value="` + localStorage['member_id'] + `">
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
                </div>

                <div class="col-lg-6">
                    <h4 class="mb-6">基本資料</h4>

                    <div class="md-form">
                        <input class="form-control form-control-lg" type="text" id="UpdateName" placeholder="Your name" value="` + localStorage['member_name'] + `"></input>

                    </div>
                    <div class="md-form">
                        <input class="form-control form-control-lg" type="text" id="UpdateEmail" placeholder="E-mail" value="` + localStorage['member_email'] + `"></input>

                    </div>
                    <div class="md-form">
                        <input class="form-control form-control-lg" type="text" id="UpdatePhone" placeholder="Phone" value="` + localStorage['member_phone'] + `"></input>
                    </div>
                    <button class="btn btn-block my-4 waves-effect" type="button" onclick ="(new member_profile_do_update_action('member_profile', 'do_update_action', 'body')).run()">儲存</button>
                </div>
                <div class="col-lg-2"></div>
            </div>
        </div>
`;
        this.loadModuleScript(this.module, "do_upload_action");
        this.loadModuleScript(this.module, "do_update_action");
        document.getElementById(this.position_id).innerHTML = str;
        localStorage['profile_location'] = this.module;
        localStorage['action_location'] = 'show_manage_page';
        console.log(localStorage['profile_location']);
    }
}
function OpenImgUpload() {
    $('#imgUpload').trigger('click');
}
