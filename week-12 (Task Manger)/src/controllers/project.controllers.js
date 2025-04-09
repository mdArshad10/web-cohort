import { Project } from "../models/Project.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

// @Desc: get a all project
// @Method: [GET]      /api/v1/projects?page=1&limit=10
// @Access: public
const getProjects = AsyncHandler(async (req, res, next) => {
  // get all projects
  const limit = req.query.limit ?? 10;
  const page = req.query.page ?? 1;
  const skip = (page - 1) * limit;
  let searchParams = {};

  if (req.query.keyword) {
    searchParams = {
      name: { $regex: req.query.keyword, options: "i" },
    };
  }

  const projects = await Project.find(searchParams).skip(skip).limit(limit);

  res.status(200).json(new ApiResponse(200, { projects }, "get all projects"));
});

// @Desc: get a project
// @Method: [GET]      /api/v1/projects/:id
// @Access: public
const getProjectById = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ApiError(400, "project is not exist"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, { project }, "get a Particular Project"));
});

// @Desc: create a project
// @Method: [GET]      /api/v1/projects
// @Access: private
const createProject = AsyncHandler(async (req, res, next) => {
  // create project
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    createdBy: req.user._id,
  });
  res
    .status(200)
    .json(new ApiResponse(201, { project }, "new project is created"));
});

// @Desc: create a project
// @Method: [PATCH]      /api/v1/projects/:id
// @Access: private
const updateProject = AsyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        description,
      },
    },
    { new: true },
  );
  res.status(200).json(new ApiResponse(200, { project }, "Project updated"));
});

// @Desc: create a project
// @Method: [DELETE]      /api/v1/projects/:id
// @Access: private
const deleteProject = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await Project.findByIdAndDelete(id, { new: true });
  res.status(200).json(new ApiResponse(200, {}, "Project is deleted"));
});

// @Desc: create a project
// @Method: [GET]    /api/v1/projects/:id
// @Access: private
const getProjectMembers = AsyncHandler(async (req, res, next) => {});

const addMemberToProject = AsyncHandler(async (req, res, next) => {
  // add member to project
});

const deleteMember = AsyncHandler(async (req, res, next) => {
  // delete member from project
});

const updateMemberRole = AsyncHandler(async (req, res, next) => {
  // update member role
});

export { createProject };
