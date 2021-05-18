class ActionHandler {
    constructor(module, js_action) {
        this.module = module;
        this.js_action = js_action;
        this.php_action = js_action;
        this.args = null;
        this.php = true;
        this.files = null;
    }
    run() {

        var xhttp = new XMLHttpRequest();
        this.prepareArgs();
        if (!this.php) {
            this.showResult(xhttp);
            return;
        }
        var self = this;
        xhttp.onreadystatechange = function () {

            var ResponseText;
            if (this.readyState === 4 && this.status === 200) {
                console.log("success");
                self.ajax_success(xhttp);
            } else {
                console.log(this.readyState);
                console.log(this.status);
                self.ajax_error(xhttp);

            }
        };

        xhttp.open("POST", "module_dispatcher.php?module=" + this.module + "&action=" + this.php_action, true);
        if (this.files) {
            const formData = new FormData()
            for (let i = 0; i < this.files.length; i++) {
                let file = this.files[i]
                formData.append('files[]', file)
            }
            xhttp.send(formData);

        } else {
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(this.args);
        }
        console.log(this.args);

    }
    loadModuleScript(module, action) {
        var id = module + "_" + action;
        var src = "modules/" + module + "/js_action/" + id + ".js";
        this.loadScript(src, id);
        console.log("gagasaf");
    }
    loadScript(src, id) {
        var script = document.getElementById(id);
        if (script === null) {
            script = document.createElement("script");
            script.src = src;
            script.id = id;
            document.head.appendChild(script);

        }
    }

    addArgs(id, value) {
        if (this.args === null)
            this.args = id + "=" + value;
        else
            this.args += "&" + id + "=" + value;
    }
}