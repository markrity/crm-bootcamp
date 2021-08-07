<?php



class controller
{
    public $response;
    public $errors = "";
    public $model;
    public $model_cls;
    public $server_method;
    public $postData = [];
    public $jsonData = [];

    public function __construct()
    {
        $model_class_name = "Model_" . $this->model_cls;
        require_once("./Models/$model_class_name.php");
        $this->model = new $model_class_name();
        $this->server_method = $_SERVER["REQUEST_METHOD"];
        if ($this->server_method == "POST") {
            $this->postData = $_POST;
            $this->jsonData =   json_decode(file_get_contents('php://input'), true);
        }
    }
}
