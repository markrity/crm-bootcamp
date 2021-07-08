<?php



class controller
{
    public $response;
    public $errors = "";
    public $model;
    public $model_cls;
    protected $user_id;
    protected $account_id;

    public function __construct()
    {
        $model_class_name = "Model_" . $this->model_cls;
        require_once("./Models/$model_class_name.php");
        // get the token and it to parse
        $this->parseAuthentication();
        $this->model = new $model_class_name();
        $this->model->account_id = $this->account_id;

    }

    public function getPostJsonData()
    {
       return json_decode(file_get_contents('php://input'));
    }

    protected function parseAuthentication()
    {
        $this->account_id = 1;
        $this->user_id = 1;
    }

    
}
