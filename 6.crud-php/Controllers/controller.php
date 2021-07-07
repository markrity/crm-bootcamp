<?php 


    class controller 
    {
        public $response;
        public $errors = "";
        public $model;
        public $model_class;
   
        public $field_array;

        public function __construct()
        {
            $model_class_name = "Model_" . $this->model_class;
            require_once("./Models/$model_class_name.php");
            $this->model = new $model_class_name();
        }


        public function getAll() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $clients = $this->model->getAll($data->account_id);
            $this->response["clients"] = $clients;
            return $this->response;
        }

        public function add() 
        {
            $json = file_get_contents('php://input');
            var_dump($json);
            $data = json_decode($json);
            var_dump($data);
            $data_array = [];
            foreach ($this->field_array as $field) {
                $data_array[$field] = $data->$field;
            }
            $res = $this->model->add($data_array);
            $this->response["status"] = $res;
            return $this->response;
        }

        public function delete() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $clients = $this->model->delete($data->client_id);
            $this->response["clients"] = $clients;
            return $this->response;
        }

        public function edit() 
        {
            $json = file_get_contents('php://input');
            $data = json_decode($json);
            $clients = $this->model->update($data);
            $this->response["clients"] = $clients;
            return $this->response;
        }

        
    }

?>