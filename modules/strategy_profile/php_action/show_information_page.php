<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/strategy_profile/strategy_profile_model.php';

class show_information_page implements action_listener {

    public function actionPerformed(event_message $em) {

        $strategy_profile = new strategy_profile_model();
        $return_value = $strategy_profile->market_search($em);
        return json_encode($return_value);
    }

}

?>