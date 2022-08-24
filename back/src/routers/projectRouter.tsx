import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired";
import { projectAuthService } from "../services/projectService";

const projectAuthRouter = Router();
projectAuthRouter.use(loginRequired);

projectAuthRouter.post("/project/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    //req 에서 데이터 가져오기
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;
    const fromDate = req.body.fromDate;
    const toDate = req.body.toDate;

    //데이터 프로젝트 db에 추가하기
    const newProject = await projectAuthService.addProject({
      userId,
      title,
      description,
      fromDate,
      toDate,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

projectAuthRouter.get("/projects/:id", async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const currentProjectInfo = await projectAuthService.getprojectInfo({
      projectId,
    });

    if (currentProjectInfo.errorMessage) {
      throw new Error(currentProjectInfo.errorMessage);
    }

    res.status(200).send(currentProjectInfo);
  } catch (error) {
    next(error);
  }
});
projectAuthRouter.get("/projectlist/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // 사용자의 전체 프로젝트 목록을 가져옴
    const projects = await projectAuthService.getProjects({
      userId,
    });

    if (projects.errorMessage) {
      throw new Error(projects.errorMessage);
    }
    res.status(200).send(projects);
  } catch (error) {
    next(error);
  }
});
projectAuthRouter.put("/projects/:id", async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    // URI로부터 프로젝트 id를 추출함.
    const projectId = req.params.id;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const fromDate = req.body.fromDate ?? null;
    const toDate = req.body.toDate ?? null;

    const toUpdate = { title, description, fromDate, toDate };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedProject = await projectAuthService.setProject({
      userId,
      projectId,
      toUpdate,
    });

    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

projectAuthRouter.delete("/projects/:id", async (req, res, next) => {
  try {
    // req (request) 에서 id 가져오기
    const projectId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await projectAuthService.deleteProject({ projectId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { projectAuthRouter };
