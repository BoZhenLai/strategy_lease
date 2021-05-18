class member_profile_do_update_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {

        var UpdateName = document.getElementById('UpdateName').value;
        var UpdateEmail = document.getElementById('UpdateEmail').value;
        var UpdatePhone = document.getElementById('UpdatePhone').value;
        var UpdateImg = document.getElementById('UpdateImg').value;
        if (!UpdateName) {
            UpdateName = localStorage['member_name'];
        }
        if (!UpdateEmail) {
            UpdateEmail = localStorage['member_email'];
        }
        if (!UpdatePhone) {
            UpdatePhone = localStorage['member_phone'];
        }

        if ((UpdateName === localStorage['member_name']) && (UpdateEmail === localStorage['member_email']) && (UpdatePhone === localStorage['member_phone'])) {
            if (UpdateImg === localStorage['member_id']) {
                this.php = false; //是否呼叫後端php檔案
            } else {
                console.log("asdasdfqqq");
                this.php = true;
                this.args = "UpdateImg=" + UpdateImg;
                this.args += "&memberId=" + localStorage['member_id'];
                localStorage['member_update_name'] = UpdateName;
                localStorage['member_update_email'] = UpdateEmail;
                localStorage['member_update_phone'] = UpdatePhone;
            }
        } else {
            if (UpdateImg === localStorage['member_id']) {
                this.php = true; //是否呼叫後端php檔案
                this.args = "UpdateName=" + UpdateName;
                this.args += "&UpdateEmail=" + UpdateEmail;
                this.args += "&UpdatePhone=" + UpdatePhone;
                this.args += "&memberId=" + localStorage['member_id'];
                localStorage['member_update_name'] = UpdateName;
                localStorage['member_update_email'] = UpdateEmail;
                localStorage['member_update_phone'] = UpdatePhone;
            } else {
                this.php = true; //是否呼叫後端php檔案
                this.args = "UpdateName=" + UpdateName;
                this.args += "&UpdateEmail=" + UpdateEmail;
                this.args += "&UpdatePhone=" + UpdatePhone;
                this.args += "&UpdateImg=" + UpdateImg;
                this.args += "&memberId=" + localStorage['member_id'];
                localStorage['member_update_name'] = UpdateName;
                localStorage['member_update_email'] = UpdateEmail;
                localStorage['member_update_phone'] = UpdatePhone;
            }
        }
        console.log(this.args);
    }
    showResult(xhttp) {
        var str = `
        <div class="card text-center mb-3">
            <div class="card-header h5">
                儲存成功
            </div>
            <div class="card-body">
                <h5 class="card-title">儲存成功</h5>
                <p class="card-text">請按確認鍵返回前頁</p>
                <a class="btn btn-primary" onclick="(new ` + localStorage['profile_location'] + `_` + localStorage['action_location'] + `('` + localStorage['profile_location'] + `','` + localStorage['action_location'] + `', 'body')).run()">確認</a>
            </div>
        </div>
`;
        document.getElementById(this.position_id).innerHTML = str;
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
                                    儲存成功
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">儲存成功</h5>
                                    <p class="card-text">請按確認鍵返回前頁</p>
                                    <a class="btn btn-primary" onclick="(window.location.reload())">確認</a>
                                </div>
                            </div>
`;
                localStorage['member_name'] = localStorage['member_update_name'];
                localStorage['member_email'] = localStorage['member_update_email'];
                localStorage['member_phone'] = localStorage['member_update_phone'];
                document.getElementById(this.position_id).innerHTML = str;
            } else {
                console.log(obj['sql']);
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