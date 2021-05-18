<?php

//require_once './Ppython.php';

$method = $_POST['method'];
switch ($method) {
    case 'add':
        strategy_upload($_FILES['files']);
        break;
    case 'move':
        strategy_move($_POST['memberId'], $_POST['strategyFilename']);
        break;
    case 'addimgdir':
        img_mkdir($_POST['memberId']);
        break;
    case 'imgadd':
        img_upload($_FILES['files']);
        break;
    case 'imgupdate':
        img_update($_POST['UpdateImg'], $_POST['memberId']);
        break;
    case 'delete':
        strategy_delete($_POST['fileName'], $_POST['strategyUploader']);
        break;
    case 'do':
        strategy_do($_POST['fileName'], $_POST['column']);
        break;
    case 'getConfig':
        strategy_getconfig($_POST['fileName']);
        break;
}

function strategy_upload($files) {

    $fileTmp = $files['tmp_name'];
    $fileName = $files['name'];
    $dirPath = "./strategy/" . basename($fileName, '.zip');

    if ($files["error"] > 0) {
        $return_value['status_code'] = 1; // 上傳過程錯誤
        echo json_encode($return_value);
    } else {
        if (!move_uploaded_file($fileTmp, "./" . $fileName)) {
            $return_value['status_code'] = 1; // 上傳過程錯誤
            echo json_encode($return_value);
            exit();
        } else {
            if (!is_dir($dirPath)) {
                mkdir($dirPath, 0777);
            }
            $zip = new ZipArchive;
            $result = $zip->open('./' . $fileName);
            if ($result) {
                $zip->extractTo($dirPath . "/");
                $zip->close();
            } else {
                echo $result;
            }
            $mainFile = glob($dirPath . '/main.py'); // 取得main.py檔個數
            $configFile = glob($dirPath . '/config.json'); // config.json檔個數

            if ((count($mainFile) != 1) || (count($configFile) != 1)) { // 檢查檔案內容
                unlink('./' . $fileName);
                deldir($dirPath . "/");

                if (rmdir($dirPath . "/")) {
                    $return_value['status_code'] = 2; // 檔案內容不符
                } else {
                    $return_value['status_code'] = 1; // 上傳過程錯誤
                };

                echo json_encode($return_value);
                exit();
            } else {

                $json_string = file_get_contents($dirPath . '/config.json'); // 從檔案中讀取資料到PHP變數
                //echo $json_string;

                $data = json_decode($json_string, true); // 用引數true把JSON字串強制轉成PHP陣列
                //print_r("asd" . $data[0]["strategyName"]);
                if ((!isset($data["strategyName"])) || (!isset($data["request"]))) {
                    unlink('./' . $fileName);
                    $return_value['status_code'] = 3; // 設定檔欄位有誤
                    echo json_encode($return_value);
                    exit();
                } else {
                    /* foreach ($data[0]["request"] as $key => $value) {
                      print_r("key" . $key);
                      print_r("value" . $value);
                      } */
                    $return_value['status_code'] = 0;
                    unlink("./" . $fileName);
                }
            }

            $return_value['strategy_name'] = $data["strategyName"];
            $return_value['strategy_filename'] = $fileName;
            $return_value['strategy_size'] = $files["size"] / 1024;

            echo json_encode($return_value);
        }
    }
}

function strategy_move($memberId, $strategyFilename) {

    $dirPath = "./strategy/" . $memberId . "/" . basename($strategyFilename, '.zip');
    if (is_dir($dirPath)) {
        deldir("./strategy/" . basename($strategyFilename, '.zip') . "/");
        if (rmdir("./strategy/" . basename($strategyFilename, '.zip') . "/")) {
            $return_value['status_code'] = 4; // 檔案已存在
        } else {
            $return_value['status_code'] = 1; // 上傳過程錯誤
        };
    } else {
        rename("./strategy/" . basename($strategyFilename, '.zip'), $dirPath);
        $return_value['status_code'] = 0;
    }

    echo json_encode($return_value);
}

function img_mkdir($memberId) {

    $dirPath = "./memberProfile/" . $memberId;
    $strategy_dirPath = "./strategy/" . $memberId;
    mkdir($dirPath, 0777);
    mkdir($strategy_dirPath, 0777);
    copy("./img/preset.png", $dirPath . "/" . $memberId . ".jpg");
    $return_value['status_code'] = 0;
    echo json_encode($return_value);
}

function img_upload($files) {

    $fileTmp = $files['tmp_name'];
    $fileName = $files['name'];
    $dirPath = "./img/" . $fileName;
    if ($files["error"] > 0) {
        $return_value['status_code'] = 1; // 上傳過程錯誤
        echo json_encode($return_value);
    } else {

        if (move_uploaded_file($fileTmp, $dirPath)) {
            $return_value['status_code'] = 0;
        } else {
            $return_value['status_code'] = 1; // 上傳過程錯誤
            echo json_encode($return_value);
            exit();
        }
    }

    $return_value['img_filename'] = $fileName;
    echo json_encode($return_value);
}

function img_update($UpdateImg, $memberId) {

    if (rename("./img/" . $UpdateImg, "./memberProfile/" . $memberId . "/" . $memberId . ".jpg")) {
        $return_value['status_code'] = 0;
    } else {
        $return_value['status_code'] = 1;
    }


    echo json_encode($return_value);
}

function strategy_delete($fileName, $strategyUploader) {

    $dirPath = "./strategy/" . $strategyUploader . "/" . basename($fileName, '.zip') . "/"; //設定需要刪除的資料夾路徑
    deldir($dirPath); //呼叫函式，傳入路徑

    if (rmdir($dirPath)) {
        $return_value['status_code'] = 0;
    } else {
        $return_value['status_code'] = 1;
    };
    echo json_encode($return_value);
}

function deldir($dirPath) { //清空資料夾函式和清空資料夾後刪除空資料夾函式的處理
    if (is_dir($dirPath)) { //如果是目錄則繼續
        $p = scandir($dirPath); //掃描一個資料夾內的所有資料夾和檔案並返回陣列
        foreach ($p as $val) {

            if ($val != "." && $val != "..") { //排除目錄中的.和..
                if (is_dir($dirPath . $val)) { //如果是目錄則遞迴子目錄，繼續操作
                    deldir($dirPath . $val . '/'); //子目錄中操作刪除資料夾和檔案
                    rmdir($dirPath . $val . '/'); //目錄清空後刪除空資料夾
                } else {
                    unlink($dirPath . $val); //如果是檔案直接刪除
                }
            }
        }
    }
}

function strategy_do($fileName, $column) {
    $python = new Ppython();
    // $pyscript = './strategy/' . basename($fileName, '.zip') . '/' . 'main.py';
    // $cmd = "$python $pyscript";
    // for ($i = 0; $i < count($column); $i++) {
    //     $cmd .= " " . $column[$i];
    // }
    $name = basename($fileName, '.zip');
    $command = $python->py($name . ".main::main", $column);
    if ($command) {
        $return_value['data_set'] = $command;
        $return_value['status_code'] = 0;
    } else {
        $return_value['status_code'] = 1; //python執行發生錯誤
    }
    echo json_encode($return_value);
    // $result=ppython("main::abc",$cmd);
    // echo json_encode($result);
}

function strategy_getconfig($fileName) {
    $dirPath = "./" . basename($fileName, '.zip');
    $json_string = file_get_contents($dirPath . '/config.json'); // 從檔案中讀取資料到PHP變數

    $data = json_decode($json_string, true); // 用引數true把JSON字串強制轉成PHP陣列
    $return_value['strategyName'] = $data["strategyName"];
    $return_value['request'] = $data["request"];

    echo json_encode($return_value);
}

//print_r($_FILES['files']);
//echo json_encode($array);
?>