class recall_profile_show_output_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
        this.args = "selectOutputFileName=" + document.getElementById('selectOutputFileName').value;
        this.args += "&Uploader=" + localStorage['member_id'];
        console.log(this.args)
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);

            if (!obj['data_set']) {
                var str = `
        <div class="container-fluid">
            <h4 class="mb-4" align="center">該策略尚未儲存回測結果</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion"></div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
            } else {
                var str = ``;
                if (obj['permission'] == 1) {
                    str += `
                    <h5 align="center" style="margin-top:5%;margin-bottom:5%">策略測試值</h5>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                `;
                            var columnkeys = Object.keys(obj['data_set']['column']);
                            for (i = 0; i < columnkeys.length; i++) {
                                if (obj['data_set'] != 0) {
                                    str += `
                                <th>` + columnkeys[i] + `</th>
                            `;
                                }
                            }
                            str += `
                            </tr>
                        </thead>
                        <tbody>
                            <tr>`;
                            for (i = 0; i < columnkeys.length; i++) {
                                if (obj['data_set'] != 0) {
                                    str += `
                                <td>` + obj['data_set']['column'][columnkeys[i]] + `</td>
            
                                `;
                                }
                            }
                            str += `
                            </tr>
                        </tbody>
                    </table>`;
                }
        str += `
        <h5 align="center" style="margin-top:5%;margin-bottom:5%">策略回測值</h5>
        <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
            <thead>
                <tr>
                    <th>日期</th>
                    <th>開盤價</th>
                </tr>
            </thead>
            <tbody>
                `;
                var datakeys = Object.keys(obj['data_set']['data']);
                for (i = 0; i < datakeys.length; i++) {
                    if (obj['data_set'] != 0) {
                        str += `
                <tr>
                    <td>` + datakeys[i] + `</td>
                    <td>` + obj['data_set']['data'][datakeys[i]] + `</td>
                </tr>
                `;
                    }
                }
                str += `
            </tbody>
        </table>
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