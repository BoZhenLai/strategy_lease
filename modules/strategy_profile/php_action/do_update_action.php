<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/strategy_profile/strategy_profile_model.php';

class do_update_action implements action_listener {

    public function actionPerformed(event_message $em) {

        $register_profile = new strategy_profile_model();
        $return_value = $register_profile->strategy_update($em);
        return json_encode($return_value);
    }

}

?>
