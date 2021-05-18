class recall_profile_do_recall_action extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
        var selectStrategyFileName = document.getElementById("selectStrategyFileName").value;
        var array = {};
        this.args = "selectStrategyFileName=" + selectStrategyFileName;
        for (i = 0; i < document.getElementsByName("selectStrategyColumn").length; i++) {
            var key = (document.getElementsByName("selectStrategyColumn")[i]).getAttribute('id');
            var value = document.getElementsByName("selectStrategyColumn")[i].value;
            array[key] = value;
        }
        var selectStrategyColumn = JSON.stringify(array);
        this.args += "&selectStrategyColumn=" + selectStrategyColumn;
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            obj['data_set'] = JSON.parse(obj['data_set']);
            var str = `
            <div class="modal fade" id="recallSaveForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">

                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">保存回測結果</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3" align="center">
                            <h5>確定要保存回測結果嗎?</h5>
                            <h6>此動作將會覆蓋先前保存之回測結果</h6>
                        </div>
                        
                        <div class="modal-footer d-flex justify-content-center">
                            <button class="btn btn-unique" onclick="sendSaveForm()">保存</button>
                        </div>
                        <input type="hidden" id="selectStrategyDeleteFileName">
                    </div>
                </div>
            </div>
            <div class="container-fluid">

                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <h2>回測結果</h2>
                    </div>
                    <div class="col-md-2"></div>
                </div>

                <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">`;

            if (obj['status_code'] != 0 || !obj['data_set']) {
                str += `回測有誤，請更正策略後重新再試，或聯繫平台管理員。`;
            } else {
                str +=  `<div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>開盤價</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                            var dsn =  obj['response']['displayName'];
                            var keys = Object.keys(obj['data_set'][dsn]);
                            console.log(obj);
                for (i = 0; i < keys.length; i++) {
                    if (obj['data_set'] != 0) {
                        str += `
                            <tr>
                                <td>` + keys[i] + `</td>
                                <td>` + obj['data_set'][dsn][keys[i]] + `</td>
                            </tr>
                            `;
                    }
                }
                str += `</tbody></table>`;
                console.log(obj['uploader']);
                if (obj['uploader'] == localStorage['member_id']) {
                    str += `<button type="button" class="btn btn-info waves-effect" onclick="saveRecallResult()">保存回測結果</button>`;
                }
                str += `</div>
                <div class="col-md-2"></div>
                <input type="hidden" id="output" value='` + json_str + `'>
            </div>
        `;
        this.loadModuleScript(this.module, "do_output_action");
            }
           
            document.getElementById(this.position_id).innerHTML = str;


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

function saveRecallResult() {
    $("#recallSaveForm").modal('show');
}

function sendSaveForm() {
    $("#recallSaveForm").modal('hide');
    // this.args += "column=" + obj['column'];
    new recall_profile_do_output_action('recall_profile', 'do_output_action', 'body').run();

}