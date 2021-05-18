class recall_profile_show_column_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
        this.args = "selectStrategyFileName=" + document.getElementById('selectStrategyFileName').value;
        console.log(this.args)
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);

            if (!obj['request']) {
                var str = `
        <div class="container-fluid">
            <h4 class="mb-4" align="center">您未上傳任何策略</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion"></div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            } else {
                var keys = Object.keys(obj['request']);
                console.log(keys[1]);
                console.log(obj['request'][keys[1]]);
                console.log(keys.length);
                console.log(obj['request'].length);
                var str = ``;
                for (i = 0; i < obj['request'].length; i++) {
                    str += `
                <div class="md-form input-group input-group-lg">
                <div class="input-group-prepend">
                    <span class="input-group-text md-addon" id="inputGroupMaterial-sizing-lg">` + obj['request'][i]['displayName'] + `</span>
                </div>
                <input type="` + obj['request'][i]['columnType'] + `" id="` + obj['request'][i]['columnName'] + `" name="selectStrategyColumn" class="form-control my-4" min="1">
            </div>
`;
                }
                str += `<button class="btn btn-block my-4" type="button" onclick ="(new recall_profile_do_recall_action('recall_profile', 'do_recall_action', 'body')).run()"><i class="fas fa-play"></i>開始回測</button>`;

                this.loadModuleScript(this.module, "do_recall_action");
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