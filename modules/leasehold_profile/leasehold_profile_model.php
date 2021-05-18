<?php

require_once 'include/php/model.php';

class leasehold_profile_model extends model {

    public function __construct() {
        parent::__construct();
    }

    public function leasehold_insert($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();

        $sql = "SELECT * FROM `leasehold_profile`";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        if ($result) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $insert_leaseholdId = count($data) + 1;
        }

        $insert_strategyId = $post["StrategyId"];
        $insert_memberId = $post["memberId"];
        $insert_StrategyPrice = $post["StrategyPrice"];
        date_default_timezone_set('Asia/Taipei');
        $insert_StartTime = date("Y/m/d h:i:s");
        $TimeSet = $insert_StartTime . " +" . (string) $post['StrategyOrderPeriod'] . " days";
        $insert_EndTime = date("Y-m-d h:i:s", strtotime($TimeSet));

        $sql = "INSERT INTO `leasehold_profile`(`leaseholdId`, `leaseholdStartTime`, `leaseholdEndTime`, `leaseholdPrice`, `memberId`, `strategyId`) VALUES ('$insert_leaseholdId','$insert_StartTime','$insert_EndTime','$insert_StrategyPrice','$insert_memberId','$insert_strategyId')";
        $result = $conn->exec($sql);

        if ($result) {
            $sql = "UPDATE `member_profile` SET `memberAccount`=`memberAccount`-$insert_StrategyPrice WHERE `memberId`='$insert_memberId'";
            $result = $conn->exec($sql);

            if ($result) {
                $sql = "UPDATE `member_profile`,`strategy_profile`
                        SET `memberAccount`= `memberAccount`+($insert_StrategyPrice * 0.98)
                        WHERE `strategy_profile`.`strategyUploader`=`member_profile`.`memberId`
                        AND `strategy_profile`.`strategyId`='$insert_strategyId'";
                $result = $conn->exec($sql);

                if ($result) {
                    $sql = "UPDATE `strategy_profile` SET `strategyOrderCount`=`strategyOrderCount`+1 WHERE `strategy_profile`.`strategyId`='$insert_strategyId'";
                    $result = $conn->exec($sql);

                    if ($result) {
                        $return_value['status_code'] = 0;
                    } else {
                        $return_value['status_code'] = 1;
                        $return_value['sql'] = $sql;
                    }
                } else {
                    $return_value['status_code'] = 1;
                    $return_value['sql'] = $sql;
                }
            } else {
                $return_value['status_code'] = 1;
                $return_value['sql'] = $sql;
            }
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
        }

        return $return_value;
    }

    public function leasehold_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $memberId = $post['memberId'];
        $sql = "SELECT `leaseholdId`,`leaseholdStartTime`,`leaseholdEndTime`,`memberId`,`strategy_profile`.`strategyId`,`strategyUploader`,`strategyName`
                FROM `leasehold_profile`,`strategy_profile`
                WHERE `leasehold_profile`.`strategyId`=`strategy_profile`.`strategyId`
                AND `leasehold_profile`.`memberId`='$memberId'";

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

    public function account_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $memberId = $post['memberId'];
        $sql = "SELECT `leaseholdId`,`leaseholdStartTime`,`leaseholdPrice`,`memberId`,`strategy_profile`.`strategyId`,`strategyUploader`,`strategyName`
                FROM `leasehold_profile`,`strategy_profile`
                WHERE `leasehold_profile`.`strategyId`=`strategy_profile`.`strategyId`
                AND (`strategy_profile`.`strategyUploader`='$memberId' OR `leasehold_profile`.`memberId`='$memberId')";
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