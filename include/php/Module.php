<?php

require_once 'include/php/event_message.php';

interface Module {

    public function doAction(event_message $em);
}

?>