<?php

require_once 'include/php/action_listener.php';
require_once 'include/php/PDO_mysql.php';
require_once 'include/php/event_message.php';
require_once 'modules/recall_profile/recall_profile_model.php';

class show_recall_page implements action_listener {

    public function actionPerformed(event_message $em) {

        $recall_profile = new recall_profile_model();
        $return_value = $recall_profile->recall_search($em);
        return json_encode($return_value);
    }

}

?>