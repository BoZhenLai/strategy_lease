class strategy_profile_show_information_page extends ActionHandler {

    constructor(module, action, position_id) {

        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
        this.args = "selectStrategyId=" + document.getElementById('selectStrategyId').value;
        this.args += "&selectStrategyFileName=" + document.getElementById('selectStrategyFileName').value;
        console.log(this.args);
    }
    ajax_success(xhttp) {

        try
        {
            var json_str = xhttp.responseText;
            var obj = JSON.parse(json_str);
            console.log(obj['status_code']);
            if ((obj['status_code'] != 0) || (!obj['data_set'][0])) {
                console.log("nonono");
                var str = `
        <div class="container-fluid">

            <h4 class="mb-4" align="center">市場中未有用戶上傳策略</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion"></div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;
                document.getElementById(this.position_id).innerHTML = str;
                if (localStorage['member_name']) {
                    new strategy_profile_show_upload_page('strategy_profile', 'show_upload_page', 'upload_postion').run();
                }

            } else {
                console.log(obj['data_set'][0].strategyPrice);
                var str = `
        <!-- Modal -->
        <div class="modal fade" id="strategyLeaseForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

            <!-- Add .modal-dialog-centered to .modal-dialog to vertically center the modal -->
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">


                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="selectStrategyNmae">` + obj['data_set'][0].strategyName + `</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="selectStrategyId" value="` + obj['data_set'][0].strategyId + `">
                        <input type="hidden" id="selectStrategyOrderPeriod" value="` + obj['data_set'][0].strategyOrderPeriod + `">
                        <input type="hidden" id="selectStrategyPrice" value="` + obj['data_set'][0].strategyPrice + `">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="row">作者</th>
                                    <th scope="row">租賃次數</th>
                                    <th scope="row">年化報酬率 0% </th>
                                    <th scope="row">勝率 0% </th>
                                    <th scope="row">報酬率 0% </th>
                                    <th scope="row">租賃期間/天</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="col" id="selectstrategyUploader">` + obj['data_set'][0].strategyUploader + `</td>
                                    <td scope="col" id="selectStrategyCount">` + obj['data_set'][0].strategyOrderCount + `</td>
                                    <td scope="col" id="selectStrategyc">10%</td>
                                    <td scope="col" id="selectStrategyb">10%</td>
                                    <td scope="col" id="selectStrategya">10%</td>
                                    <td scope="col">` + obj['data_set'][0].strategyOrderPeriod + `</td>
                                </tr>
                            </tbody>
                        </table>
                        <h5>付款資訊</h5>
                        <div id="paymentPage" align="right">
                            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                            <p>帳戶餘額:` + localStorage['member_account'] + `</p>
                            策略總價:<a>` + obj['data_set'][0].strategyPrice + `</a>
                            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                            <div id="accountBalance" ></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="leaseholdButton" disabled onclick ="sendleaseholdForm()">承租</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>策略商店</h2>
                </div>
                <div class="col-md-2"></div>
            </div>
            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-4">
                    <!-- Card deck -->
                    <div class="card-deck">

                        <!-- Card -->
                        <div class="card mb-4">
                            <!--Card image-->
                            <div class="view overlay">
                                <img class="card-img-top" src="http://140.133.74.200/img/` + obj['data_set'][0].memberId + `/` + obj['data_set'][0].memberId + `.jpg" alt="Card image cap">
                                <a href="#!">
                                    <div class="mask rgba-white-slight"></div>
                                </a>
                            </div>

                            <!--Card content-->
                            <div class="card-body elegant-color white-text rounded-bottom">

                                <!-- Title -->
                                <h4 class="card-title">` + obj['data_set'][0].strategyName + `</h4>
                                <hr class="hr-light">
                                <!-- Text -->
                                <p class="card-text white-text mb-4">作者 ` + obj['data_set'][0].memberName + `</p>
                                <p class="card-text white-text mb-4">年化報酬率 0% </p>
                                <p class="card-text white-text mb-4">勝率 0% </p>
                                <p class="card-text white-text mb-4">報酬率 0% </p>

                                <hr class="hr-light">
                                <h4 class="white-text mb-4" align="center">$ ` + obj['data_set'][0].strategyPrice + `/` + obj['data_set'][0].strategyOrderPeriod + `天</h4>
                                <!-- Link -->
                                <p class="card-text white-text d-flex justify-content-end">已租賃 ` + obj['data_set'][0].strategyOrderCount + `次</p>
                            </div>

                        </div>
                        <!-- Card -->
                    </div>
                    <!-- Card deck -->
                </div>
                <input type="hidden" id="selectStrategyFileName" value="` + obj['data_set'][0].strategyFileName + `">
                <input type="hidden" id="selectOutputFileName" value="` + obj['data_set'][0].strategyFileName + `">
                <div class="col-md-4" >
                    <h4>回測測試</h4>
                    <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
                    <div id="selectStrategyColumn" align="center"></div>`
                if (obj['data_set'][0].strategyUploader === localStorage['member_id']) {
                    str += `<button type="button" class="btn btn-block" disabled>租賃</button>`;
                } else {
                    str += `<button type="button" class="btn btn-block" onclick="selectStrategy(` + obj['data_set'][0].strategyPrice + `)">租賃</button>`;
                }
                str += `
                </div>
                <div class="col-md-2"></div>
            </div>
            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
            <h4 align="center">詳細資訊</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="output"></div>
                <div class="col-md-2"></div>
            </div>
        </div>
`;


                this.loadModuleScript("leasehold_profile", "do_leasehold_action");
                this.loadModuleScript(this.module, "do_update_action");

                document.getElementById(this.position_id).innerHTML = str;

                if (obj['data_set'][0].strategyPermission == 1) {
                    new recall_profile_show_column_page('recall_profile', 'show_column_page', 'selectStrategyColumn').run();
                } else {
                    document.getElementById('selectStrategyColumn').innerHTML = '<h5>作者尚未開放回測策略</h5>';
                }
                new recall_profile_show_output_page('recall_profile', 'show_output_page', 'output').run();
                $('#marketTable').DataTable();
                $('.dataTables_length').addClass('bs-select');
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
function selectStrategy(strategyPrice) {

    if (localStorage['member_account'] - strategyPrice >= 0) {
        var str = `<p>帳戶餘額:` + (localStorage['member_account'] - strategyPrice).toString();
        document.getElementById('leaseholdButton').disabled = false;
    } else {
        var str = `<p>帳戶餘額不足</p>`;
        document.getElementById('leaseholdButton').disabled = true;
    }

    document.getElementById('accountBalance').innerHTML = str;
    $('#strategyLeaseForm').modal('show');

}
function sendleaseholdForm() {
    $('#strategyLeaseForm').modal('hide');
    new leasehold_profile_do_leasehold_action('leasehold_profile', 'do_leasehold_action', 'body').run();
}