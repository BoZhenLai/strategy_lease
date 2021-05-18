class strategy_profile_show_manage_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = true;
        this.args = "Uploader=" + localStorage['member_id'];
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj);

            if ((obj['status_code'] != 0) || (!obj['data_set'][0])) {
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
                this.loadModuleScript(this.module, "do_insert_action");
                document.getElementById(this.position_id).innerHTML = str;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_manage_page';
                new strategy_profile_show_upload_page('strategy_profile', 'show_upload_page', 'upload_postion').run();

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
                
        <div class="modal fade" id="strategyUpdateForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">

                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">策略上架</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3">
                        <h3 id="selectStrategyUpdateNmae"></h3>

                        <div class="md-form mb-5">

                            <input type="number" id="selectStrategyUpdatePrice" class="form-control" min="1">
                            <label data-error="wrong" data-success="right" for="strategyUpdatePrice">上架價格</label>
                        </div>

                        <div class="md-form mb-5">

                            <input type="number" id="selectStrategyUpdateOrderPeriod" class="form-control" min="1">
                            <label data-error="wrong" data-success="right" for="selectStrategyUpdateOrderPeriod">租賃期間/天</label>
                        </div>

                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="selectStrategyUpdatePermission" name="strategyUpdatePermission">
                            <label class="custom-control-label" for="selectStrategyUpdatePermission">開放回測功能</label>
                        </div>

                    </div>
                    
                    <div class="modal-footer d-flex justify-content-center">
                        <button class="btn waves-effect" onclick="sendUpdateForm()">上架</button>
                    </div>
                </div>
            </div>
        </div>
                
        <div class="modal fade" id="strategyDeleteForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">

                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">刪除策略</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3" align="center">
                        <h3 id="selectStrategyDeleteNmae"></h3>
                        <h5>確定要刪除嗎?</h5>
                    </div>
                    
                    <div class="modal-footer d-flex justify-content-center">
                        <button class="btn btn-danger waves-effect" onclick="sendDeleteForm()">刪除</button>
                    </div>
                    <input type="hidden" id="selectStrategyDeleteFileName">
                    <input type="hidden" id="selectOutputFileName">
                </div>
            </div>
        </div>

        <div class="modal fade" id="strategyOffForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">

                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">下架策略</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3" align="center">
                        <h3 id="selectStrategyOffName"></h3>
                        <h5>確定要下架嗎?</h5>
                    </div>
                    
                    <div class="modal-footer d-flex justify-content-center">
                        <button class="btn waves-effect" onclick="sendOffForm()">下架</button>
                    </div>
                    <input type="hidden" id="selectStrategyDeleteFileName">
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>我的策略</h2>
                </div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4>已上傳</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>策略檔名</th>
                                <th>上傳日期</th>
                                <th>詳細資訊</th>
                                <th>策略上架</th>
                                <th>刪除策略</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {
                    if (obj['data_set'][i].strategyPermission == 0) {
                        str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].strategyFileName + `</td>
                                <td>` + obj['data_set'][i].strategyUploadDate + `</td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="getOutput('` + obj['data_set'][i].strategyFileName + `')">詳細資訊</button>
                                </td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="selectStrategyUpdate(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyName + `')">上架</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger waves-effect" onclick="selectStrategyDelete(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyName + `','` + obj['data_set'][i].strategyFileName + `')">刪除</button>
                                </td>
                            </tr>
                            `;
                    }
                }
                str += `
                        </tbody>
                    </table>
                    <input type="hidden" id="selectStrategyId">
                </div>
                <div class="col-md-2"></div>
            </div>

            <div class="row" style="margin-top:3%">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion"></div>
                <div class="col-md-2"></div>
            </div>

            <hr size="10px" width="100%" style="margin-top:5%;margin-bottom:5%">

            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4>上架中</h4>
                    <table class="table table-striped table-sm" cellspacing="0" style="text-align: center;">
                        <thead>
                            <tr>
                                <th>策略名稱</th>
                                <th>策略檔名</th>
                                <th>上傳日期</th>
                                <th>訂價</th>
                                <th>租賃次數</th>
                                <th>獲得金額</th>
                                <th>詳細內容</th>
                                <th>策略下架</th>
                            </tr>
                        </thead>
                        <tbody>
                            `;
                for (i = 0; i < obj['data_set'].length; i++) {

                    if (obj['data_set'][i].strategyPermission != 0) {
                        str += `
                            <tr>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].strategyFileName + `</td>
                                <td>` + obj['data_set'][i].strategyUploadDate + `</td>
                                <td>` + obj['data_set'][i].strategyPrice + `</td>
                                <td>` + obj['data_set'][i].strategyOrderCount + `</td>
                                <td>` + obj['data_set'][i].strategyPrice * obj['data_set'][i].strategyOrderCount + `</td>
                                <td>
                                    <button type="button" class="btn waves-effect" onclick="getOutput('` + obj['data_set'][i].strategyFileName + `')">詳細資訊</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-danger waves-effect" onclick="selectStrategyOff(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyName + `')">下架</button>
                                </td>
                            </tr>
                            `;
                    }
                }
                str += `
                        </tbody>
                    </table>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                this.loadModuleScript(this.module, "do_insert_action");
                this.loadModuleScript(this.module, "do_update_action");
                this.loadModuleScript(this.module, "do_delete_action");
                this.loadModuleScript(this.module, "do_off_action");
                this.loadModuleScript("recall_profile", "show_output_page");
                document.getElementById(this.position_id).innerHTML = str;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_manage_page';
                new strategy_profile_show_upload_page('strategy_profile', 'show_upload_page', 'upload_postion').run();

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

function selectStrategyOff(strategyId, strategyName) {
    document.getElementById('selectStrategyId').value = strategyId;
    document.getElementById('selectStrategyOffName').value = strategyName;
    document.getElementById('selectStrategyOffName').innerHTML = strategyName;
    $('#strategyOffForm').modal('show');
}

function sendOffForm() {
    $('#strategyOffForm').modal('hide');
    new strategy_profile_do_off_action('strategy_profile', 'do_off_action', 'body').run();
}

function selectStrategyUpdate(strategyId, strategyNmae) {
    document.getElementById('selectStrategyId').value = strategyId;
    document.getElementById('selectStrategyUpdateNmae').innerHTML = strategyNmae;
    $('#strategyUpdateForm').modal('show');

}
function sendUpdateForm() {
    $('#strategyUpdateForm').modal('hide');
    new strategy_profile_do_update_action('strategy_profile', 'do_update_action', 'body').run();

}

function selectStrategyDelete(strategyId, strategyNmae, strategyFileNmae) {
    document.getElementById('selectStrategyId').value = strategyId;
    document.getElementById('selectStrategyDeleteNmae').value = strategyNmae;
    document.getElementById('selectStrategyDeleteNmae').innerHTML = strategyNmae;
    document.getElementById('selectStrategyDeleteFileName').value = strategyFileNmae;
    $('#strategyDeleteForm').modal('show');

}

function sendDeleteForm() {
    $('#strategyDeleteForm').modal('hide');
    new strategy_profile_do_delete_action('strategy_profile', 'do_delete_action', 'body').run();

}