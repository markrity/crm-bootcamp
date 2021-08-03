<?php 

 
    require_once("controller.php");

    class tags extends controller
    {
       
        public $model_class = "tags";
        public function __construct()
        {
           parent::__construct();
           $this->field_array =["text", "client_id", "account_id"];
        }

        public function getTags() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $treatments = $this->model->getTags($data->account_id, $data->client_id);
            $this->response["tags"] = $treatments;
            return $this->response;
        }


    }

?>