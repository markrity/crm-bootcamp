<?php 

    class DataBase{

        private $host= "localhost";
        private $user= "root";
        private $password= "";
        private $dataBase =  "crm";
        private $con;

        public function connect(){
            $this->con = null;
            try
            {
                $this->con = new PDO('mysql:host'.$this->host.'; dbname = '.$this->dataBase,$this->user,$this->password);
                $this->con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            }catch(PDOExecption $e){
                echo "connection error".$e->getMessage();
            }

        }
    }
