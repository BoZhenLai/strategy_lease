<?php

require_once 'include/php/model.php';

class strategy_profile_model extends model {

    public function __construct() {
        parent::__construct();
    }

    public function strategy_upload($em) {
        $fileName = $_FILES['files']['name'][0];
        $post_array = array(
            'method' => 'add',
            'files' => curl_file_create($_FILES['files']['tmp_name'][0], $_FILES['files']['type'][0], $fileName)
        );
        $result = $this->curl_process($post_array);

        //return($result);
        return json_decode($result, true);
    }

    public function strategy_insert($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();

        $insert_Name = $post["StrategyName"];
        $insert_Filename = $post["StrategyFileName"];
        $insert_Uploader = $post["StrategyUploader"];

        date_default_timezone_set('Asia/Taipei');
        $insert_Date = date("Y/m/d h:i:s");

        $sql = "SELECT strategyId FROM `strategy_profile` ORDER BY strategyId DESC";
        $stmt = $conn->prepare($sql);
        $result = $stmt->execute();

        if ($result) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (!$data) {
                $insert_Id = 1;
            } else {
                $insert_Id = $data[0]['strategyId'] + 1;
            }
        }

        $post_array = array(
            'method' => 'move',
            'strategyFilename' => $insert_Filename,
            'memberId' => $insert_Uploader
        );

        $result = $this->curl_process($post_array);
        $bridge_result = json_decode($result, true);

        if ($bridge_result['status_code'] === 4) {
            $return_value['status_code'] = 4;
        } else {
            $sql = "INSERT INTO `strategy_profile`(`strategyId`, `strategyName`, `strategyFileName`, `strategyUploader`, `strategyUploadDate`) VALUES ('$insert_Id','$insert_Name','$insert_Filename','$insert_Uploader','$insert_Date')";
            $result = $conn->exec($sql);
            if ($result) {
                $return_value['status_code'] = 0;
            } else {
                $return_value['status_code'] = 1;
                $return_value['sql'] = $sql;
            }
        }
        return $return_value;
        //return json_decode($result, true);
    }

    public function strategy_update($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $selectStrategyId = $post['selectStrategyId'];
        $strategyUpdatePrice = $post['strategyUpdatePrice'];
        $strategyUpdateOrderPeriod = $post['strategyUpdateOrderPeriod'];
        $strategyUpdatePermission = $post['strategyUpdatePermission'];
        $sql = "UPDATE `strategy_profile` SET `strategyPrice`='$strategyUpdatePrice',`strategyOrderPeriod`='$strategyUpdateOrderPeriod',`strategyPermission`='$strategyUpdatePermission' WHERE strategyId='$selectStrategyId'";
        $result = $conn->exec($sql);

        if ($result) {
            $return_value['status_code'] = 0;
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
        }
        return $return_value;
    }

    public function strategy_off($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $selectStrategyId = $post['selectStrategyId'];
        $selectStrategyOffName = $post['selectStrategyOffName'];
        $sql = "UPDATE `strategy_profile` SET `strategyPermission`=0 WHERE strategyId='$selectStrategyId'";
        $result = $conn->exec($sql);

        if ($result) {
            $return_value['status_code'] = 0;
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
        }
        return $return_value;
    }

    public function strategy_delete($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $selectStrategyId = $post['selectStrategyId'];
        $strategyDeleteName = $post['selectDeleteStrategyNmae'];
        $strategyDeleteFileName = $post['selectStrategyDeleteFileName'];
        $strategyUploader = $post['strategyUploader'];
        $sql = "DELETE FROM `strategy_profile` WHERE `strategyId`='$selectStrategyId' AND `strategyName`='$strategyDeleteName'";
        $result = $conn->exec($sql);

        if ($result) {
            $post_array = array(
                'method' => 'delete',
                'fileName' => $strategyDeleteFileName,
                'strategyUploader' => $strategyUploader,
            );
            $result = $this->curl_process(http_build_query($post_array));
            return json_decode($result, true);
        } else {
            $return_value['status_code'] = 1;
            $return_value['sql'] = $sql;
            return $return_value;
        }
    }

    public function strategy_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();

        $search_Uploader = $post['Uploader'];
        $sql = "SELECT * FROM `strategy_profile` WHERE strategyUploader='" . $search_Uploader . "'";
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

    public function market_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();

        $sql = "SELECT `strategyId`,`strategyName`,`strategyFileName`,`strategyPrice`,`strategyUploader`,`strategyUploadDate`,`strategyOrderPeriod`,`strategyOrderCount`,`strategyPermission`,`memberId`,`memberName`
                FROM `strategy_profile`,`member_profile`
                WHERE`strategy_profile`.`strategyUploader`=`member_profile`.`memberId`";

        if (isset($post['selectStrategyId'])) {
            $selectStrategyId = $post['selectStrategyId'];
            $sql .= "AND `strategy_profile`.`strategyId` = '$selectStrategyId'";
        } else {
            $sql .= "AND `strategy_profile`.`strategyPermission` <> '0'";
        }

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

    private function curl_process($post_array) {

        $url = "http://localhost/interview_project/bridge.php";
        $headerArray = array("charset='utf-8'");
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_array);
        // curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
        // curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //將結果轉化為字串 不直接輸出
        $output = curl_exec($ch);
        $info = curl_getinfo($ch);
        if (curl_errno($ch)) {
            return 'Curl error:' . curl_error($ch);
        }
        curl_close($ch);
        return $output; //回傳結果為json格式
    }

}

?>