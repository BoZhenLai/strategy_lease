<?php

require_once 'include/php/model.php';

class recall_profile_model extends model {

    public function __construct() {
        parent::__construct();
    }

    public function strategy_recall($em) {

        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $array = json_decode($post['selectStrategyColumn'], true);
        $recallStrategyFileName = $post['selectStrategyFileName'];
        $post_array = array(
            'method' => 'do',
            'fileName' => $recallStrategyFileName,
            'column' => $array
        );
        $result = $this->curl_process(http_build_query($post_array));
        $result = json_decode($result, true);

        $sql = "SELECT `strategy_profile`.`strategyUploader`
                FROM `strategy_profile`
                WHERE `strategy_profile`.`strategyFileName`='$recallStrategyFileName'";
        $stmt = $conn->prepare($sql);
        $sql_result = $stmt->execute();
        if ($sql_result) {
            $ds = $stmt->fetch(PDO::FETCH_ASSOC);
            $result['uploader'] = $ds['strategyUploader'];
        } else {
            $result['status_code'] = 2; //資料庫存取錯誤
        }
        return $result;
    }

    public function recall_search($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();

        $search_Uploader = $post['Uploader'];

        $sql = "SELECT `strategy_profile`.`strategyId`,`strategy_profile`.`strategyName`,`strategy_profile`.`strategyFileName`,`strategy_profile`.`strategyUploader`,`strategy_profile`.`strategyUploadDate`,`strategy_profile`.`strategyPermission`
                FROM `strategy_profile`
                LEFT JOIN `leasehold_profile`
                ON `strategy_profile`.`strategyId`=`leasehold_profile`.`strategyId`
                WHERE `strategy_profile`.`strategyUploader`='$search_Uploader' OR `leasehold_profile`.`memberId`='$search_Uploader'";

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

    public function recall_set($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();

        $strategyFileName = $post['selectStrategyFileName'];
        $post_array = array(
            'method' => 'getConfig',
            'fileName' => $strategyFileName
        );
        $result = $this->curl_process($post_array);

        return json_decode($result, true);
    }

    public function recall_output($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $output = json_decode($post['output'], true);
        $post_array = array(
            'method' => 'setOutput',
            'array' => $output
        );
        $result = $this->curl_process(http_build_query($post_array));
        return json_decode($result, true);
    }

    public function output_get($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $selectOutputFileName = $post['selectOutputFileName'];
        $search_Uploader = $post['Uploader'];
        $post_array = array(
            'method' => 'getOutput',
            'fileName' => $selectOutputFileName
        );
        $result = $this->curl_process(http_build_query($post_array));
        $result = json_decode($result, true);

        $sql = "SELECT * FROM `strategy_profile`, `leasehold_profile`
                WHERE `strategy_profile`.`strategyFileName` = '$selectOutputFileName'
                AND `strategy_profile`.`strategyUploader` = '$search_Uploader' OR `leasehold_profile`.`memberId` = '$search_Uploader'
                AND `strategy_profile`.`strategyId` = `leasehold_profile`.`strategyId`";

        $stmt = $conn->prepare($sql);
        $sqlresult = $stmt->execute();

        if ($sqlresult) {
            $dn = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(count($dn) > 0) {
                $result['permission'] = 1;
            } else {
                $result['permission'] = 0;
            }
        } else {
            $result['status_code'] = 4;
        }
        return $result;
    }

    private function curl_process($post_array) {
        $username = 'junk';
        $password = 'eve978609175487';
        //$url = "http://localhost/test.php";
        $url = "http://140.133.74.200/strategy/bridge.php";
        $headerArray = array("charset='utf-8'");
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_array);
        // curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
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