class recall_profile_show_recall_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
        this.args = "Uploader=" + localStorage['member_id'];
        console.log(this.args)
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj['status_code']);

            if ((obj['status_code'] != 0) || (!obj['data_set'][0])) {
                var str = `
        <div class="container-fluid">
            <h4 class="mb-4" align="center">您未上傳或租賃任何策略</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion"></div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_recall_page';
            } else {
                var str = `
        <div class="modal fade" tabindex="-1" id="outputTable" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">

                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">詳細資訊</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3" id="output">

                    </div>

                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn waves-effect" data-toggle="modal" data-target="#outputTable">Close</button>
                    </div>
                </div>
            </div>
        </div>
                
        <div class="container-fluid">

            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>策略回測</h2>
                </div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <h4>已上傳</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>上傳日期</th>
                                <th>詳細內容</th>
                                <th>回測</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    if (obj['data_set'][i].strategyUploader === localStorage['member_id']) {
                        if (obj['data_set'][i].strategyPermission == 0) {
                            str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].strategyUploadDate + `</td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="getOutput('` + obj['data_set'][i].strategyFileName + `')">詳細資訊</button>
                                </td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="selectRecallStrategy(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyFileName + `','` + obj['data_set'][i].strategyUploadDate + `')">回測</button>
                                </td>
                            </tr>
                            `;
                            console.log(obj['data_set'][i].strategyId);
                        }
                    }
                }
                str += `
                        </tbody>
                    </table>
                    <input type="hidden" id="selectRecallStrategyId">



                    <hr size="10px" width="100%" style="margin-top:5%;margin-bottom:5%">

                    <h4>上架中</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>上傳日期</th>
                                <th>詳細內容</th>
                                <th>回測</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    console.log(obj['data_set'][i].strategyPermission);
                    if (obj['data_set'][i].strategyUploader === localStorage['member_id']) {
                        if (obj['data_set'][i].strategyPermission != 0) {
                            str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].strategyUploadDate + `</td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="getOutput('` + obj['data_set'][i].strategyFileName + `')">詳細資訊</button>
                                </td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="selectRecallStrategy(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyFileName + `','` + obj['data_set'][i].strategyUploadDate + `')">回測</button>
                                </td>
                            </tr>
                            `;
                        }
                    }
                }
                str += `
                        </tbody>
                    </table>

                    <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">

                    <h4>已租賃</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>上傳日期</th>
                                <th>詳細內容</th>
                                <th>回測</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    if (obj['data_set'][i].strategyUploader != localStorage['member_id']) {
                        str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].strategyUploadDate + `</td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="getOutput('` + obj['data_set'][i].strategyFileName + `')">詳細資訊</button>
                                </td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="selectRecallStrategy(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyFileName + `','` + obj['data_set'][i].strategyUploadDate + `')">回測</button>
                                </td>
                            </tr>
                            `;
                    }
                }
                str += `
                        </tbody>
                    </table>

                </div>
                <div class="col-md-1"></div>
                <div class="col-md-4">
            <h4>選擇策略</h4>
            <div class="my-4" id="selectRecallStrategy" align="center"></div>
            <div class="my-4" id="selectStrategyColumn"></div>
            <input type="hidden" id="selectOutputFileName">
        </div>
        <div class="col-md-1"></div>
    </div>
`;
                this.loadModuleScript(this.module, "show_column_page");
                this.loadModuleScript(this.module, "show_output_page");
                document.getElementById(this.position_id).innerHTML = str;
                document.getElementById('selectRecallStrategy').innerHTML = `<h5>尚未選擇回測策略</h5>`;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_recall_page';
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
function selectRecallStrategy(strategyId, strategyFileName, strategyUploadDate) {

    var str = `<table class="table table-striped table-sm" cellspacing="1" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略檔名</th>
                                <th>上傳日期</th>
                                <th>詳細內容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="selectStrategyFileName">` + strategyFileName + `</td>
                                <td id="strategyUploadDate">` + strategyUploadDate + `</td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="getOutput('` + strategyFileName + `')">詳細資訊</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
   `;
    document.getElementById('selectRecallStrategy').innerHTML = str;
    document.getElementById('selectStrategyFileName').value = strategyFileName;
    document.getElementById('selectRecallStrategyId').value = strategyId;
    new recall_profile_show_column_page('recall_profile', 'show_column_page', 'selectStrategyColumn').run();

}
function getOutput(strategyFileName) {

    document.getElementById('selectOutputFileName').value = strategyFileName;
    $('#outputTable').modal('show');
    new recall_profile_show_output_page('recall_profile', 'show_output_page', 'output').run();

}

