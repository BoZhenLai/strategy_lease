<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/member_profile/member_profile_model.php';

class do_login_action implements action_listener {

    public function actionPerformed(event_message $em) {

        $login_profile = new member_profile_model();
        $return_value = $login_profile->member_login($em);
        return json_encode($return_value);
    }

}

?>