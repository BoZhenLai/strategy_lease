<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/recall_profile/recall_profile_model.php';

class do_recall_action implements action_listener {

    public function actionPerformed(event_message $em) {

        $recall_profile = new recall_profile_model();
        $return_value = $recall_profile->strategy_recall($em);
        return json_encode($return_value);
    }

}

?>