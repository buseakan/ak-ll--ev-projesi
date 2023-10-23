<?php

class ResponseModel
{
    public string $message;
    public bool $success;

    public function setMessage(string $message)
    {
        $this->message = $message;
        return $this;
    }
}
class ResponseSuccessModel extends ResponseModel
{
    public function __construct()
    {
        $this->success = true;
    }
}
class ResponseErrorModel extends ResponseModel
{
    public function __construct()
    {
        $this->success = false;
    }
}
class ResponseDataModel extends ResponseModel
{
    public $data;

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }
}
class ResponseSuccessDataModel extends ResponseDataModel
{
    public function __construct()
    {
        $this->success = true;
    }
}
class ResponseErrorDataModel extends ResponseDataModel
{
    public function __construct()
    {
        $this->success = false;
    }
}

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get("/devices/{userId}", function (Request $request, Response $response) {
    $userId = $request->getAttribute("userId");
    $db = new Db();
    try {
        $db = $db->connect();
        $devices = $db->query("Select * from devices where userId=$userId")->fetchAll(PDO::FETCH_OBJ);
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson((new ResponseSuccessDataModel())
                    ->setMessage("Listeleme başarılı")
                    ->setData($devices),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->get("/device/{id}", function (Request $request, Response $response) {
    $id = $request->getAttribute("id");
    $db = new Db();
    try {
        $db = $db->connect();
        $device = $db->query("Select * from devices where id=$id")->fetch(PDO::FETCH_OBJ);
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson((new ResponseSuccessDataModel())
                    ->setMessage("Getirme başarılı")
                    ->setData($device),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->post("/deviceadd", function (Request $request, Response $response) {

    $userId = $request->getParam("userId");
    $name = $request->getParam("name");
    $typeId = $request->getParam("typeId");
    $color = $request->getParam("color");
    $volume = $request->getParam("volume");
    $db = new Db();
    try {
        $db = $db->connect();
        $sql1 = "INSERT INTO devices(userId,name,typeId,color,volume)
        VALUES(:userId,:name,:typeId,:color,:volume)";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("userId", $userId);
        $stmt1->bindParam("name", $name);
        $stmt1->bindParam("typeId", $typeId);
        $stmt1->bindParam("color", $color);
        $stmt1->bindParam("volume", $volume);
        $stmt1->execute();
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson(
                (new ResponseSuccessModel())->setMessage("Aygıt ekleme başarılı"),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->post("/deviceupdate", function (Request $request, Response $response) {

    $id = $request->getParam("id");
    $userId = $request->getParam("userId");
    $name = $request->getParam("name");
    $typeId = $request->getParam("typeId");
    $color = $request->getParam("color");
    $volume = $request->getParam("volume");
    $isOpen = $request->getParam("isOpen");
    $isOpen = $isOpen == false ? 0 : 1;
    $db = new Db();
    try {
        $db = $db->connect();
        $sql1 = "update devices set userId=:userId, name=:name,typeId=:typeId,
        color=:color,volume=:volume,isOpen=:isOpen where id=:id";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("id", $id);
        $stmt1->bindParam("userId", $userId);
        $stmt1->bindParam("name", $name);
        $stmt1->bindParam("typeId", $typeId);
        $stmt1->bindParam("color", $color);
        $stmt1->bindParam("volume", $volume);
        $stmt1->bindParam("isOpen", $isOpen);
        $stmt1->execute();
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson(
                (new ResponseSuccessModel())->setMessage("Aygıt düzenleme başarılı"),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->delete("/devicedelete/{id}", function (Request $request, Response $response) {
    $id = $request->getAttribute("id");
    $db = new Db();
    try {
        $db = $db->connect();
        $sql1 = "delete from devices where id=:id";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("id", $id);
        $stmt1->execute();
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson(
                (new ResponseSuccessModel())->setMessage("Aygıt kaldırma başarılı"),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});

$app->get("/types", function (Request $request, Response $response) {
    $db = new Db();
    try {
        $db = $db->connect();
        $types = $db->query("Select * from types")->fetchAll(PDO::FETCH_OBJ);
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson((new ResponseSuccessDataModel())
                    ->setMessage("Listeleme başarılı")
                    ->setData($types),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->get("/types/{id}", function (Request $request, Response $response) {
    $id = $request->getAttribute("id");
    $db = new Db();
    try {
        $db = $db->connect();
        $type = $db->query("Select * from types where id=$id")->fetch(PDO::FETCH_OBJ);
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson((new ResponseSuccessDataModel())
                    ->setMessage("Listeleme başarılı")
                    ->setData($type),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->post("/typeadd", function (Request $request, Response $response) {

    $name = $request->getParam("name");
    $db = new Db();
    try {
        $db = $db->connect();
        $sql1 = "INSERT INTO types(name)
        VALUES(:name)";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("name", $name);
        $stmt1->execute();
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson(
                (new ResponseSuccessModel())->setMessage("Aygıt türü ekleme başarılı"),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->post("/typeupdate", function (Request $request, Response $response) {

    $id = $request->getParam("id");
    $name = $request->getParam("name");
    $db = new Db();
    try {
        $db = $db->connect();
        $sql1 = "update types set name=:name where id=:id";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("id", $id);
        $stmt1->bindParam("name", $name);
        $stmt1->execute();
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson(
                (new ResponseSuccessModel())->setMessage("Aygıt türü düzenleme başarılı"),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});
$app->delete("/typedelete/{id}", function (Request $request, Response $response) {
    $id = $request->getAttribute("id");
    $db = new Db();
    try {
        $db = $db->connect();
        $sql1 = "delete from types where id=:id";
        $stmt1 = $db->prepare($sql1);
        $stmt1->bindParam("id", $id);
        $stmt1->execute();
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson(
                (new ResponseSuccessModel())->setMessage("Aygıt türü silme başarılı"),
                null,
                JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
            );
    } catch (\Throwable $th) {
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", "application/json")
            ->withJson($th, null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    }
});


$app->post('/kayit', function (Request $request, Response $response) {

    $name = $request->getParam("name");
    $email = $request->getParam("email");
    $passwordr = $request->getParam("password");
    $isAdmin = 0;

    $db = new Db();
    //$testToken = new Db();
    try {
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);
        $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $passwordr);
        if (!(strlen(trim($name)) > 0)) {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorModel()
                    )->setMessage("Ad ve soyad boş olamaz"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }
        if (!(strlen(trim($passwordr)) > 0)) {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorModel()
                    )->setMessage("Şifre boş olamaz"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }
        if (!(strlen(trim($email)) > 0)) {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorModel()
                    )->setMessage("Eposta boş olamaz"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }
        if (!($email_check > 0)) {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorModel()
                    )->setMessage("Geçersiz eposta"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }
        if (!($password_check > 0)) {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorModel()
                    )->setMessage("Geçersiz şifre"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }

        $db = $db->connect();
        $userData = '';
        $sql = "SELECT id FROM users WHERE email=:email";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("email", $email);
        $stmt->execute();
        $mainCount = $stmt->rowCount();
        //$created=time();
        if ($mainCount == 0) {
            /*Inserting user values*/
            $sql1 = "INSERT INTO users(name,email,password,isAdmin)VALUES
            (:name,:email,:password,false)";
            $stmt1 = $db->prepare($sql1);
            $stmt1->bindParam("name", $name);
            $stmt1->bindParam("email", $email);
            $password = hash('sha256', $passwordr);
            $stmt1->bindParam("password", $password);
            $stmt1->execute();
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseSuccessModel()
                    )->setMessage("Kayıt işlemi başarılı"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        } else {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorModel()
                    )->setMessage("Bu kullanıcı zaten kayıtlı"),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }
        return $response
            ->withStatus(200)
            ->withHeader("Content-Type", 'application/json')
            ->withJson(array(
                "error" => array(
                    "text"  => "Girdiğiniz bilgileri kontrol ediniz !"
                )
            ), null, JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK);
    } catch (PDOException $e) {
        return $response->withJson(
            array(
                "error" => array(
                    "text"  => $e->getMessage(),
                    "code"  => $e->getCode()
                )
            ),
            null,
            JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
        );
    }
    $db = null;
});

$app->post('/giris', function (Request $request, Response $response) {

    $email = $request->getParam("email");
    $passwordr = $request->getParam("password");

    $db = new Db();
    try {

        $db = $db->connect();
        $userData = '';
        $statement = "SELECT * FROM users WHERE email=:email and password=:password";
        $prepare = $db->prepare($statement);
        $prepare->bindParam("email", $email);
        $password = hash('sha256', $passwordr);
        $prepare->bindParam("password", $password);

        $course = $prepare->execute();
        $userData = $prepare->fetch(PDO::FETCH_OBJ);

        if ($userData) {
            $user = internalUserDetails($userData->email);
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseSuccessDataModel())
                        ->setMessage("Giriş Başarılı")
                        ->setData($user),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        } else {
            return $response
                ->withStatus(200)
                ->withHeader("Content-Type", 'application/json')
                //->withJson($user->token);
                ->withJson((new ResponseErrorDataModel())
                        ->setMessage("Giriş yaparken bir hata meydana geldi")
                        ->setData($userData),
                    null,
                    JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
                );
        }
    } catch (PDOException $e) {
        return $response->withJson(
            array(
                "error" => array(
                    "text"  => $e->getMessage(),
                    "code"  => $e->getCode()
                )
            ),
            null,
            JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
        );
    }
    $db = null;
});

function internalUserDetails($input)
{
    $db = new Db();
    $testToken = new Db();
    try {
        $db = $db->connect();
        $sql = "SELECT * FROM users WHERE email=:input";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("input", $input);
        $stmt->execute();
        $usernameDetails = $stmt->fetch(PDO::FETCH_OBJ);
        $token = $testToken->apiToken($usernameDetails->user_id);
        //$token = $db->apiToken($usernameDetails->user_id);
        $usernameDetails->token = $token;
        $db = null;
        return $usernameDetails;
        //return $token;

    } catch (PDOException $e) {
        // return $response->withJson(
        //     array(
        //         "error" => array(
        //             "text"  => $e->getMessage(),
        //             "code"  => $e->getCode()
        //         )
        //     ),
        //     null,
        //     JSON_UNESCAPED_UNICODE | JSON_NUMERIC_CHECK
        // );
    }
}
