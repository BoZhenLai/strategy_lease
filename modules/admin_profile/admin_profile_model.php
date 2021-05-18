<?php

require_once 'include/php/model.php';

class admin_profile_model extends model {

    public function __construct() {
        parent::__construct();
    }

    public function member_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $sql = "SELECT * FROM `member_profile` WHERE `memberPermission` = 0";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        if ($result) {
            $ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_value['status_code'] = 0;
            $return_value['status_message'] = $sql;
            $return_value['data_set'] = $ds;
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
        }
        return $return_value;
    }

    public function strategy_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $sql = "SELECT * FROM `strategy_profile`";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        if ($result) {
            $ds = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_value['status_code'] = 0;
            $return_value['status_message'] = $sql;
            $return_value['data_set'] = $ds;
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
        }
        return $return_value;
    }

    public function account_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $memberId = $post['memberId'];
        $sql = "SELECT `leaseholdId`,`leaseholdStartTime`,`leaseholdPrice`,`memberId`,`strategy_profile`.`strategyId`,`strategyUploader`,`strategyName`
                FROM `leasehold_profile`,`strategy_profile`
                WHERE `leasehold_profile`.`strategyId`=`strategy_profile`.`strategyId`";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();
        if ($result) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $return_value['status_code'] = 0;
            $return_value['data_set'] = $data;
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
        }
        return $return_value;
    }

}

?>