<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/leasehold_profile/leasehold_profile_model.php';

class show_manage_page implements action_listener {

    public function actionPerformed(event_message $em) {

        $register_profile = new leasehold_profile_model();
        $return_value = $register_profile->leasehold_search($em);
        return json_encode($return_value);
    }

}

?>
