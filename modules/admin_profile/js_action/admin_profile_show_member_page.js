class admin_profile_show_member_page extends ActionHandler {

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
            <div class="modal fade" id="memberPermissionForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">

                    <div class="modal-content">
                        <div class="modal-header text-center">
                            <h4 class="modal-title w-100 font-weight-bold">停止權限</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body mx-3" align="center">
                            <h3 id="memberName"></h3>
                            <h5>確定要停權此用戶嗎?</h5>
                        </div>
                        
                        <div class="modal-footer d-flex justify-content-center">
                            <button class="btn btn-unique" onclick="sendPermissionForm()">停權</button>
                        </div>
                        <input type="hidden" id="memberId">
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <h2>會員管理</h2>
                    </div>
                    <div class="col-md-2"></div>
                </div>
                <hr size="10px" width="100%" style="margin-top:20px;margin-bottom:3%">
            </div>
            <div class="container">
                <table id="memberTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead>
                        <tr>
                            <th class="th-sm">會員編號</th>
                            <th class="th-sm">名稱</th>
                            <th class="th-sm">帳號</th>
                            <th class="th-sm">信箱</th>
                            <th class="th-sm">手機</th>
                            <th class="th-sm"></th>
                        </tr>
                    </thead>
                    <tbody>`;
            for (i = 0; i < obj.data_set.length; i++) {
                str += `<tr>
                            <td>` + obj.data_set[i].id + `</td><td>` +
                        obj.data_set[i].memberName + `</td><td>` +
                        obj.data_set[i].memberId + `</td><td>` +
                        obj.data_set[i].memberEmail + `</td><td>` +
                        obj.data_set[i].memberPhone + `</td><td>` +
                        `<button type="button" class="btn btn-mdb-color m-0" onclick="changePermission(` + obj['data_set'][i].id + `,'` + obj['data_set'][i].memberName + `')">停權</button></td></tr>`;
            }
            str += `</tbody>
                </table>
            </div>`;
            document.getElementById(this.position_id).innerHTML = str;
            $('#memberTable').DataTable();
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

function changePermission(memberId, memberName) {
    document.getElementById('memberId').value = memberId;
    document.getElementById('memberName').innerHTML = memberName;
    $('#memberPermissionForm').modal('show');
}
