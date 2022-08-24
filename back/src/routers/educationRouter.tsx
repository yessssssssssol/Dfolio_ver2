import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { educationAuthService } from "../services/educationService";

const educationAuthRouter = Router();
educationAuthRouter.use(loginRequired);

educationAuthRouter.post("/education/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    //req 에서 데이터 가져오기
    const userId = req.body.userId;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    //데이터 자격증 db에 추가하기
    const newEducation = await educationAuthService.addEducation({
      userId,
      school,
      major,
      position,
      fromDate,
      toDate,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }
    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
});

educationAuthRouter.get("/educations/:id", async (req, res, next) => {
  try {
    const educationId = req.params.id;
    const currentEducationInfo = await educationAuthService.getEducationInfo({
      educationId,
    });

    if (currentEducationInfo.errorMessage) {
      throw new Error(currentEducationInfo.errorMessage);
    }

    res.status(200).send(currentEducationInfo);
  } catch (error) {
    next(error);
  }
});
educationAuthRouter.get("/educationlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // 사용자의 전체 자격증 목록을 가져옴
    const educations = await educationAuthService.getEducations({
      userId,
    });

    if (educations.errorMessage) {
      throw new Error(educations.errorMessage);
    }
    res.status(200).send(educations);
  } catch (error) {
    next(error);
  }
});
educationAuthRouter.put("/educations/:id", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    // URI로부터 자격증 id를 추출함.
    const educationId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const school = req.body.school ?? null;
    const major = req.body.major ?? null;
    const position = req.body.position ?? null;
    const fromDate = req.body.fromDate ?? null;
    const toDate = req.body.toDate ?? null;

    const toUpdate = { school, major, position, fromDate, toDate };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedEducation = await educationAuthService.setEducation({
      userId,
      educationId,
      toUpdate,
    });

    if (updatedEducation.errorMessage) {
      throw new Error(updatedEducation.errorMessage);
    }

    res.status(200).json(updatedEducation);
  } catch (error) {
    next(error);
  }
});

educationAuthRouter.delete("/educations/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const educationId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await educationAuthService.deleteEducation({ educationId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { educationAuthRouter };
