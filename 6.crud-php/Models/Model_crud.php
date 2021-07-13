<?php 
    require_once("Model.php");
    class Model_crud extends Model
    {
        public $table_name;
        public $headers;
        public $values;
       

        public function __construct()
        {
            parent::__construct();

        }

        public function getAll($account_id) {
            $sql = "SELECT * FROM $this->table_name WHERE (account_id=$account_id)";
           
            $res = $this->getDB()->query($sql)->fetch_all(MYSQLI_ASSOC);
            return $res;
        }

        public function add($data) {
           $headers = "";
           $values = "";
           foreach ($data as $key => $value) {
               $headers .= "`$key`," ;
               $values .= "'$value',";
           }
            $headers = substr_replace($headers ,"",-1);
            $values = substr_replace($values ,"",-1);
            $sql = "INSERT INTO $this->table_name ($headers) VALUES ($values)";
            $res = $this->getDB()->query($sql);
            return $res;
         }

         public function delete($id) {
            $sql = "DELETE FROM $this->table_name WHERE (id = $id)";
            $res = $this->getDB()->query($sql);
            return $res;
        }

        public function update($data) {
            $set_statement = "";
            foreach ($data as $key => $value) {
                $set_statement .= "$key = '$value'," ;
            }
            $set_statement = substr_replace($set_statement ,"",-1);

            $sql = "UPDATE $this->table_name SET $set_statement WHERE (id = $data->id)";
            var_dump($sql);
            $res = $this->getDB()->query($sql);
            return $res;
        }
        
    }

?>