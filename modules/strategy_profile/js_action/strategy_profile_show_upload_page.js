class strategy_profile_show_upload_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }

    showResult(xhttp) {
        var str = `
        <div class="container">
            <div class="input-group has-error has-feedback">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">上傳</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="StrategyUpload" onchange="filesCheck(this.id)" accept=".zip">
                    <label class="custom-file-label" id="FileName" for="inputGroupFile01" data-browse="選擇">選擇策略包</label>
                </div>
                <span class="help-block with-errors" id='error'></span>
                <button class="btn btn-block my-4 waves-effect" type="button" id="UploadButton" disabled onclick ="(new strategy_profile_do_upload_action('strategy_profile', 'do_upload_action', 'upload_postion')).run()">上傳</button>
            </div>
        </div>
`;
        
        this.loadModuleScript(this.module, "do_upload_action");
        document.getElementById(this.position_id).innerHTML = str;
    }

}
function ShowStr(x) {
    var Str = document.getElementById(x).files[0];
    $('.custom-file-label').text(Str.name)
    var form = `
    <div class="form-group row" style="margin-top: 3%;">
        <label for="name" class="col-sm-2 col-form-label">策略名稱</label>
        <div class="col-sm-10">
            <input type="text" class="form-control" id="name" placeholder="策略名稱">
        </div>
    </div>
    <div class="form-group row" style="margin-top: 3%;">
        <label for="price" class="col-sm-2 col-form-label">策略訂價</label>
        <div class="col-sm-10">
            <input type="number" class="form-control" id="price" placeholder="策略訂價">
        </div>
    </div>
    <div class="form-group row" style="margin-top: 3%;">
        <label for="text" class="col-sm-2 col-form-label">策略介紹</label>
        <div class="col-sm-10">
            <textarea type="number" class="form-control" id="text" placeholder="策略介紹"></textarea>
        </div>
    </div>
    <button class="btn btn-block my-4 waves-effect" type="button" onclick ="(new strategy_profile_do_upload_action('strategy_profile', 'do_upload_action', 'upload_postion')).run()">上傳</button>`;
    $('#strategyInput').html(form)
}
function filesCheck(id) {
    var files = document.getElementById(id).files;
    var fileNameExtension = ["zip"];
    var correct = 0;
    var str = ``;
    for (var i = 0; i < files.length; i++) {
        str += files[i].name;
        if (i < files.length - 1) {
            str += `, `;
        }
        if ((fileNameExtension.indexOf(files[i].name.substr(-3))) >= 0) {
            correct++;
        } else {
            document.getElementById('error').innerHTML = '錯誤的檔案格式';
        }
    }
    document.getElementById('UploadButton').disabled = false;
    document.getElementById('FileName').innerHTML = str;
    if ((correct === files.length) && (files.length > 0)) {
        document.getElementById('error').innerHTML = '';
        document.getElementById('UploadButton').disabled = false;
    } else {
        document.getElementById('UploadButton').disabled = true;
    }
}