<?php



class controller
{
    public $response;
    public $errors = "";
    public $model;
    public $model_cls;

    public function __construct()
    {
        $model_class_name = "Model_" . $this->model_cls;
        require_once("./Models/$model_class_name.php");
        $this->model = new $model_class_name();
    }

    public function getPostJsonData()
    {
       return json_decode(file_get_contents('php://input'));
    }
}
