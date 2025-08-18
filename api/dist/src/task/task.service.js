"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("typeorm");
const task_collection_resouces_1 = require("./resources/task-collection.resouces");
const task_item_resouces_1 = require("./resources/task-item.resouces");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(createTaskDto, user) {
        try {
            const task = await this.taskRepository.create(Object.assign(Object.assign({}, createTaskDto), { user }));
            await this.taskRepository.save(task);
            return {
                message: 'Task created successfully.',
                statusCode: 201,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAll(user, { limit = 20, offset = 1 }) {
        try {
            const [tasks, total] = await this.taskRepository.findAndCount({
                where: {
                    user: { id: user.id },
                    project: { deletedAt: (0, typeorm_2.IsNull)() },
                },
                relations: ['project'],
                order: { createdAt: 'DESC' },
                skip: limit * (offset - 1),
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);
            return {
                data: (0, task_collection_resouces_1.taskCollectionResource)(tasks),
                meta: {
                    total,
                    limit,
                    offset,
                    totalPages,
                    currenPage: offset,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findAllTaskCount(status, user) {
        try {
            const [taskCount, taskStatusCount] = await Promise.all([
                this.taskRepository.count(),
                this.taskRepository.count({
                    where: { status, user: { id: user.id } },
                }),
            ]);
            return {
                totalTask: taskCount,
                taskCount: taskStatusCount,
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async findOne(id) {
        try {
            const task = await this.taskRepository.findOne({
                where: { id },
                relations: ['project'],
            });
            return (0, task_item_resouces_1.taskItemResources)(task);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async update(id, updateTaskDto) {
        try {
            await this.taskRepository.update(id, updateTaskDto);
            return {
                message: 'Task updated successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    async remove(id) {
        try {
            await this.taskRepository.softDelete(id);
            return {
                message: 'Task delete successfully.',
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map