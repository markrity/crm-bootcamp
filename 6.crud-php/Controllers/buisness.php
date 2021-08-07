<?php

require_once('controller.php');


class buisness extends controller
{

    public $model_cls = "buisness";
    public $buisnessID;

    public function __construct()
    {
        parent::__construct();
        $inputJSON = file_get_contents('php://input');
        $this->input = json_decode($inputJSON, TRUE);
    }

    public function getHalls()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $halls = $this->model->getHallsByBuisness($this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }

    public function hallsInfo()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $halls = $this->model->getHallsInfo($this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }
    public function editHall()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $this->hallID = $this->input['hallID'];
        $this->form = $this->input['form'];
        $halls = $this->model->editHallInfo($this->hallID, $this->form, $this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }

    public function addHall()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $this->form = $this->input['form'];
        $halls = $this->model->addHall($this->buisnessID, $this->form);
        $this->response["halls"] = $halls;
        return $this->response;
    }

    public function removeImage()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $this->imgID = $this->input['imgID'];
        $halls = $this->model->removeHallImage($this->imgID, $this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }
    public function uploadHallImage()
    {
        $img = move_uploaded_file(
            $_FILES["image"]["tmp_name"],
            "imgs/" . $_FILES["image"]["name"]
        );
        return $img;
        // $this->fd = $this->input['fd'];
        // $halls = $this->model->uploadHallImage($this->fd, $this->buisnessID);
        // $this->response["halls"] = $halls;
        // return $this->response;
    }

    public function updateHallImgs()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $this->hallID = $this->input['hallID'];
        $this->fileName = $this->input['fileName'];
        $this->isMain = $this->input['isMain'];
        $halls = $this->model->attachImgToHall($this->fileName, $this->hallID, $this->buisnessID, $this->isMain);
        $this->response["halls"] = $halls;
        return $this->response;
    }

    public function getHallImg()
    {
        $this->file = $this->input['file'];
        $this->model->getImg($this->file);
    }

    public function changeMainImg()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $this->hallID = $this->input['hallID'];
        $this->imgID = $this->input['imgID'];
        $halls = $this->model->changeMainImg($this->imgID, $this->hallID, $this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }

    public function removeHall()
    {
        $this->buisnessID = $this->input['buisnessID'];
        $this->hallID = $this->input['hallID'];
        $halls = $this->model->removeHall($this->hallID, $this->buisnessID);
        $this->response["halls"] = $halls;
        return $this->response;
    }
}
