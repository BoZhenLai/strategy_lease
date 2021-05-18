class strategy_profile_show_market_page extends ActionHandler {

    constructor(module, action, position_id) {

        super(module, action);
        this.position_id = position_id;
    }

    prepareArgs() {
        this.php = true;
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

            <h4 class="mb-4" align="center">市場中未有用戶上傳策略</h4>
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8" id="upload_postion"></div>
                <div class="col-md-2"></div>
            </div>
        </div>
        `;
                document.getElementById(this.position_id).innerHTML = str;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_market_page';
                if (localStorage['member_name']) {
                    new strategy_profile_show_upload_page('strategy_profile', 'show_upload_page', 'upload_postion').run();
                }

            } else {
                var str = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h2>策略商店</h2>
                </div>
                <div class="col-md-2"></div>
            </div>`;


                if (obj['data_set'].length > 2) {
                    str += `
            <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:5%">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <h4 align="center">熱門交易策略</h4>
                    <div class="card-deck">`;
                    for (i = 0; i < 3; i++) {
                        str += `
                        <div class="card">
                            <img src="./S__9281668.jpg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">策略名稱</h5>` + obj['data_set'][i].strategyName + `
                                <p class="card-text">租賃次數 ` + obj['data_set'][i].strategyOrderCount + ` 次</p>     
                                <p class="card-text">年化報酬率 0% </p>   
                                <p class="card-text">報酬率 0% </p>    
                                <p class="card-text">報酬率 0% </p>   
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                        `;
                    }
                    str += `
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>`;
                }

                str += `
            <hr size="10px" width="100%" style="margin-top:50px;margin-bottom:3%">`;
                for (i = 0; i < obj['data_set'].length; i++) {
                    if (i % 4 == 0) {
                        str += `
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="card-deck" id="marketCard">`;
                    }
                    str += `
                        <!-- Card -->
                        <div class="card mb-4">
                            <!--Card image-->
                            <div class="view overlay">
                                <img class="card-img-top" src="http://localhost/interview_project/memberProfile/` + obj['data_set'][i].memberId + `/` + obj['data_set'][i].memberId + `.jpg" alt="Card image cap">
                                <a href="#!">
                                    <div class="mask rgba-white-slight"></div>
                                </a>
                            </div>

                            <!--Card content-->
                            <div class="card-body elegant-color white-text rounded-bottom">

                                <!-- Title -->
                                <h4 class="card-title">` + obj['data_set'][i].strategyName + `</h4>
                                <hr class="hr-light">
                                <!-- Text -->
                                <p class="card-text white-text mb-4">作者 ` + obj['data_set'][i].memberName + `</p>
                                <p class="card-text white-text mb-4">年化報酬率 0% </p>
                                <p class="card-text white-text mb-4">勝率 0% </p>
                                <p class="card-text white-text mb-4">報酬率 0% </p>

                                <hr class="hr-light">
                                <h4 class="white-text mb-4" align="center">$ ` + obj['data_set'][i].strategyPrice + `/` + obj['data_set'][i].strategyOrderPeriod + `天</h4>
                                <!-- Link -->
                                <p class="card-text white-text d-flex justify-content-end">已租賃 ` + obj['data_set'][i].strategyOrderCount + `次</p>`;
                    if (localStorage['member_id']) {
                        str += `
                                <a class="white-text d-flex justify-content-end" onclick="selectStrategyInf(` + obj['data_set'][i].strategyId + `, '` + obj['data_set'][i].strategyFileName + `')">
                                    <h5>Read more <i class="fas fa-angle-double-right"></i></h5>
                                </a>
                                `;
                    }
                    str += `</div>
                        </div>
                        <!-- Card -->
                        `;
                    if (i == obj['data_set'].length - 1) {
                        var j = 0;
                        for (j = i; j < ((Math.ceil(i / 4)) * 4) - 1; j++) {
                            str += `
                        <div class="card" style="visibility:hidden"></div>`;
                        }
                        str += `
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>`;
                    }
                    if (i % 4 == 3) {
                        str += `
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>`;
                    }

                }
                if (localStorage['member_id']) {
                    str += `
            <hr size="10px" width="100%" style="margin-top:3%;margin-bottom:3%">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <input type="hidden" id="selectStrategyFileName" value="">
                    <input type="hidden" id="selectStrategyId" value="">
                    <table class="table table-hover" id="marketTable">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">策略名稱</th>
                                <th scope="col">作者</th>
                                <th scope="col">租賃次數</th>
                                <th scope="col">年化報酬率 0% </th>
                                <th scope="col">勝率 0% </th>
                                <th scope="col">報酬率 0% </th>
                                <th scope="col">租賃金額 </th>
                                <th scope="col">租賃期間 </th>
                                `
                    if (localStorage['member_id']) {
                        str += `
                                <th scope="col"></th>
                                `;
                    }
                    str += `
                            </tr>
                        </thead>
                        <tbody>
                            `;
                    for (i = 0; i < obj['data_set'].length; i++) {
                        str += `
                            <tr>
                                <th scope="row">` + (i + 1) + `</th>
                                <td>` + obj['data_set'][i].strategyName + `</td>
                                <td>` + obj['data_set'][i].memberName + `</td>
                                <td>` + obj['data_set'][i].strategyOrderCount + `</td>
                                <td>10</td>
                                <td>10</td>
                                <td>10</td>
                                <td>` + obj['data_set'][i].strategyPrice + `</td>
                                <td>` + obj['data_set'][i].strategyOrderPeriod + `</td>
                                `;
                        if (localStorage['member_id']) {
                            str += `
                                <td><button type="button" class="btn btn-block waves-effect" onclick="selectStrategyInf(` + obj['data_set'][i].strategyId + `, '` + obj['data_set'][i].strategyFileName + `')">Read more </button></td>`;
                        }
                    }
                    str += `
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>
        `;
                }
                this.loadModuleScript("recall_profile", "show_column_page");
                this.loadModuleScript("recall_profile", "show_output_page");
                this.loadModuleScript(this.module, "do_update_action");
                this.loadModuleScript(this.module, "show_information_page");
                document.getElementById(this.position_id).innerHTML = str;
                localStorage['profile_location'] = this.module;
                localStorage['action_location'] = 'show_market_page';
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
function selectStrategyInf(strategyId, strategyFileName) {
    document.getElementById('selectStrategyId').value = strategyId;
    document.getElementById('selectStrategyFileName').value = strategyFileName;
    new strategy_profile_show_information_page('strategy_profile', 'show_information_page', 'body').run();
}
