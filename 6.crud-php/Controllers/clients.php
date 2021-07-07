<?php 

 
    require_once("controller.php");

    class clients extends controller
    {
       
         public $model_class = "clients";
        // public $field_array =["fullname", "phone", "email", "account_id"];
        
        public function __construct()
        {
           parent::__construct();
           //$this->model_class = "clients";
           $this->field_array =["fullname", "phone", "email", "account_id"];
        }


        // public function getAll() 
        // {
        //     $json = file_get_contents('php://input');
        //     $data = json_decode($json);
        //     $clients = $this->model->getAll($data->account_id);
        //     $this->response["clients"] = $clients;
        //     return $this->response;
        // }

        // public function add() 
        // {
        //     $json = file_get_contents('php://input');
        //     $data = json_decode($json);
        //     $data_array = [];
        //     foreach ($this->field_array as $field) {
        //         $data_array[$field] = $data->$field;
        //     }
        //     $res = $this->model->add($data_array);
        //     $this->response["status"] = $res;
        //     return $this->response;
        // }

        // public function delete() 
        // {
        //     $json = file_get_contents('php://input');
        //     $data = json_decode($json);
         
        //     $clients = $this->model->delete($data->client_id);
        //     $this->response["clients"] = $clients;
        //     return $this->response;
        // }

        // public function edit() 
        // {
        //     $json = file_get_contents('php://input');
        //     $data = json_decode($json);
         
        //     $clients = $this->model->update($data);
        //     $this->response["clients"] = $clients;
        //     return $this->response;
        // }


        public function getPostData()
        {
            $this->response["post"] = $_POST;
            return $this->response;
        }
    
        public function getPostJsonData()
        {
            $json = file_get_contents('php://input');
            // Converts it into a PHP object
            $data = json_decode($json);
            $arr = ["1" => 2];
            $this->response["data"] = $data;
            $this->response["arr"] = $arr;
            $this->response["arr_stringify"] = json_encode($arr);
            return $this->response;
        }

        public function test($key) 
        {
            $this->response = $this->model->getFakeData();
            $this->response["my_key"] = $key;
            $this->response["post"] = $_POST;
            return $this->response;
        }

       
        
    }

?>