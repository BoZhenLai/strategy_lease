class member_profile_show_logout_page extends ActionHandler {
    constructor(module, action, position_id) {
        super(module, action);
        this.position_id = position_id;
    }
    prepareArgs() {
        this.php = false;
    }
    showResult(xhttp) {
        localStorage.clear();
        window.location.reload();
    }
}
