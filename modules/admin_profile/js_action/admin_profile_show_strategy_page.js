class admin_profile_show_strategy_page extends ActionHandler {

    constructor(module, action, position_id) {

        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
    }

    ajax_success(xhttp) {
        try {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            var str = `
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
                            <button class="btn btn-unique" onclick="sendOffForm()">下架</button>
                        </div>
                        <input type="hidden" id="selectStrategyId">
                    </div>
                </div>
            </div>
            
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <h2>策略管理</h2>
                    </div>
                    <div class="col-md-2"></div>
                </div>
                <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
            </div>
            <div class="container">
                <table id="strategyTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">編號</th>
                            <th class="th-sm">策略名稱</th>
                            <th class="th-sm">檔案名稱</th>
                            <th class="th-sm">上傳日期</th>
                            <th class="th-sm">價格</th>
                            <th class="th-sm">作者</th>
                            <th class="th-sm">租賃次數</th>
                            <th class="th-sm">狀態</th>
                            <th class="th-sm"></th>
                        </tr>
                    </thead>
                    <tbody>`;
            for (i = 0; i < obj.data_set.length; i++) {
                if ((obj.data_set[i].strategyPermission == 1) || (obj.data_set[i].strategyPermission == 2)) {
                    str += `<tr>
                            <td>` + obj.data_set[i].strategyId + `</td>
                            <td>` + obj.data_set[i].strategyName + `</td>
                            <td>` + obj.data_set[i].strategyFileName + `</td>
                            <td>` + obj.data_set[i].strategyUploadDate + `</td>
                            <td>` + obj.data_set[i].strategyPrice + `</td>
                            <td>` + obj.data_set[i].strategyUploader + `</td>
                            <td>` + obj.data_set[i].strategyOrderCount + `</td>
                            <td>已上架</td>
                            <td>` + `<button type="button" class="btn btn-danger waves-effect" onclick="selectStrategyOff(` + obj['data_set'][i].strategyId + `,'` + obj['data_set'][i].strategyName + `')">下架</button></td>
                        </tr>`;
                } else {
                    str += `<tr>
                            <td>` + obj.data_set[i].strategyId + `</td>
                            <td>` + obj.data_set[i].strategyName + `</td>
                            <td>` + obj.data_set[i].strategyFileName + `</td>
                            <td>` + obj.data_set[i].strategyUploadDate + `</td>
                            <td>未上架</td>
                            <td>` + obj.data_set[i].strategyUploader + `</td>
                            <td>` + obj.data_set[i].strategyOrderCount + `</td>
                            <td>未上架</td>
                            <td></td>
                        </tr>`;
                }
            }
            str += `</tbody>
                </table>
            </div>`;
            this.loadModuleScript("strategy_profile", "do_off_action");
            document.getElementById(this.position_id).innerHTML = str;
            localStorage['profile_location'] = this.module;
            localStorage['action_location'] = 'show_strategy_page';
            $('#strategyTable').DataTable();
            $('.dataTables_length').addClass('bs-select');
        } catch (e) {
            var msg = e + "<br>";
            msg += "JSON String: " + json_str;
            document.getElementById(this.position_id).innerHTML = msg;
        }
    }

    ajax_error(msg) {
        document.getElementById(this.position_id).innerHTML = msg.status;
    }
}
