<?php

require_once 'include/php/model.php';

class member_profile_model extends model {

    public function __construct() {
        parent::__construct();
    }

    public function member_register($em) {

        $conn = PDO_mysql::getConnection();

        $post = $em->getPost();

        $RegisterId = $post['RegisterId'];
        $RegisterName = $post['RegisterName'];
        $RegisterPassword = $post['RegisterPassword'];
        $RegisterEmail = $post['RegisterEmail'];
        $RegisterPhone = $post['RegisterPhone'];
        $hash_password = hash('sha256', $RegisterId . $RegisterPassword);

        $sql = "SELECT memberId FROM `member_profile` WHERE memberId LIKE :RegisterId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':RegisterId', $RegisterId, PDO::PARAM_STR);
        $result = $stmt->execute();

        if ($result) {
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($data) {
                $return_value['status_code'] = 2; // 帳號已被註冊
            } else {

                $sql = "INSERT INTO `member_profile`(`memberId`, `memberPassword`, `memberName`, `memberPhone`, `memberEmail`, `memberPermission`) VALUES (:RegisterId,:hash_password,:RegisterName,:RegisterPhone,:RegisterEmail,'0')";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':RegisterId', $RegisterId, PDO::PARAM_STR);
                $stmt->bindParam(':hash_password', $hash_password, PDO::PARAM_STR);
                $stmt->bindParam(':RegisterPhone', $RegisterPhone, PDO::PARAM_STR);
                $stmt->bindParam(':RegisterName', $RegisterName, PDO::PARAM_STR);
                $stmt->bindParam(':RegisterEmail', $RegisterEmail, PDO::PARAM_STR);
                $result = $stmt->execute();

                if ($result) { //資料庫寫進成功
                    $post_array = array(//複製預設頭像
                        'method' => 'addimgdir',
                        'memberId' => $RegisterId
                    );
                    $result = $this->curl_process($post_array);
                    return json_decode($result, true);
                } else {
                    $return_value['status_code'] = 1; //註冊失敗
                    $return_value['sql'] = $sql;
                }
            }
        } else {
            $return_value['status_code'] = 1; //註冊失敗
            $return_value['sql'] = $sql;
        }
        return $return_value;
    }

    public function member_login($em) {

        $conn = PDO_mysql::getConnection();

        $post = $em->getPost();

        $LoginId = $post['LoginId'];
        $LoginPassword = $post['LoginPassword'];
        $hash_password = hash('sha256', $LoginId . $LoginPassword);

        //$where_statement = $post['where_statement'];
        //if ($where_statement != "") {
        //$sql .= " WHERE " . $where_statement;
        //}

        $sql = "SELECT * FROM `member_profile` WHERE memberId= :LoginId AND memberPassword= :hash_password";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':LoginId', $LoginId, PDO::PARAM_STR);
        $stmt->bindParam(':hash_password', $hash_password, PDO::PARAM_STR);
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

    public function member_update($em) {
        $conn = PDO_mysql::getConnection();
        $post = $em->getPost();
        $variable = 0;
        if (isset($post['UpdateName'])) {
            $UpdateName = $post['UpdateName'];
            $variable = 1;
        }
        if (isset($post['UpdateEmail'])) {
            $UpdateEmail = $post['UpdateEmail'];
            $variable = 1;
        }
        if (isset($post['UpdatePhone'])) {
            $UpdatePhone = $post['UpdatePhone'];
            $variable = 1;
        }

        $memberId = $post['memberId'];

        if ($variable === 1) {

            $sql = "UPDATE `member_profile` SET `memberName`=:UpdateName,`memberEmail`=:UpdateEmail,`memberPhone`=:UpdatePhone WHERE memberId=:memberId";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':UpdateName', $UpdateName, PDO::PARAM_STR);
            $stmt->bindParam(':UpdateEmail', $UpdateEmail, PDO::PARAM_STR);
            $stmt->bindParam(':UpdatePhone', $UpdatePhone, PDO::PARAM_STR);
            $stmt->bindParam(':memberId', $memberId, PDO::PARAM_STR);

            $result = $stmt->execute();

            if ($result) {
                if (isset($post['UpdateImg'])) {
                    $UpdateImg = $post['UpdateImg'];
                    $post_array = array(
                        'method' => 'imgupdate',
                        'UpdateImg' => $UpdateImg,
                        'memberId' => $memberId
                    );
                    $result = $this->curl_process($post_array);
                    //return($result);
                    return json_decode($result, true);
                } else {
                    $return_value['status_code'] = 0;
                    $return_value['sql'] = $sql;
                }
            } else {
                $return_value['status_code'] = 1;
                $return_value['sql'] = $sql;
            }
        } else {
            if (isset($post['UpdateImg'])) {
                $UpdateImg = $post['UpdateImg'];
                $post_array = array(
                    'method' => 'imgupdate',
                    'UpdateImg' => $UpdateImg,
                    'memberId' => $memberId
                );
                $result = $this->curl_process($post_array);
                //return($result);
                return json_decode($result, true);
            }
        }

        return $return_value;
    }

    public function img_upload($em) {
        $fileName = $_FILES['files']['name'][0];
        $post_array = array(
            'method' => 'imgadd',
            'files' => curl_file_create($_FILES['files']['tmp_name'][0], $_FILES['files']['type'][0], $fileName)
        );
        $result = $this->curl_process($post_array);
        //return($result);
        return json_decode($result, true);
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