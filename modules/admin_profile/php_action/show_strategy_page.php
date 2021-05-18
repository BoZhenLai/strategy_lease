<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/admin_profile/admin_profile_model.php';

class show_strategy_page implements action_listener {

    public function actionPerformed(event_message $em) {

        $profile = new admin_profile_model();
        $return_value = $profile->strategy_search($em);
        return json_encode($return_value);
    }

}

?>