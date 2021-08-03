<?php 

 
    require_once("controller.php");

    class picPerClient extends controller
    {
       
        public $model_class = "picPerClient";
        public function __construct()
        {
           parent::__construct();
           $this->field_array =["picFileName", "client_id", "account_id"];
        }

        public function getPics() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getPics($data->account_id, $data->client_id);
            $this->response["pics"] = $treatments;
            return $this->response;
        }
       


    }